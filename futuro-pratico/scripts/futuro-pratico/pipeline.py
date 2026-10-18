"""Local production state; never calls TTS or paid services. Exports are opt-in."""
import argparse, copy, datetime, hashlib, json, re, subprocess, sys
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker
ROOT=Path(__file__).resolve().parents[2]
STAGES=['brief','research','script','storyboard','assets','animation','narration','captions','qa']
def load(path):return json.loads(Path(path).read_text())
def hash_bytes(data):return hashlib.sha256(data).hexdigest()
def write(path,value):Path(path).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def public_file(name):
    if not name or '\\' in name or '..' in name.split('/') or Path(name).is_absolute():raise ValueError('Invalid local public path')
    p=ROOT/'public'/name
    if not p.resolve().is_relative_to((ROOT/'public').resolve()) or p.is_symlink():raise ValueError('Escaped public path')
    return p

def input_hash(ep):
    content={k:v for k,v in ep.items() if k not in ('records','qa','status')}
    files={}
    for section in ['audio','captions']:
        name=ep[section]['file']
        if name:
            p=public_file(name);files[name]=hash_bytes(p.read_bytes()) if p.is_file() else 'MISSING'
    catalog={a['id']:a for a in load(ROOT/'config/futuro-pratico/assets.json')}
    for scene in ep['scenes']:
        for aid in set(scene['assets']+[scene['backgroundId']]+([scene['objectId']] if scene['objectId'] else [])):
            if aid in catalog:
                p=public_file(catalog[aid]['path']);files[aid]=hash_bytes(p.read_bytes()) if p.is_file() else 'MISSING'
            else:files[aid]='MISSING'
    font=ROOT/'public/fonts/Outfit.ttf'
    files['font:Outfit']=hash_bytes(font.read_bytes())
    # A code/config change also invalidates old approvals (conservative policy).
    for directory in ['src/futuro-pratico','config/futuro-pratico']:
        for p in sorted((ROOT/directory).rglob('*')):
            if p.is_file():files[str(p.relative_to(ROOT))]=hash_bytes(p.read_bytes())
    return hash_bytes(json.dumps({'episode':content,'inputs':files},sort_keys=True,ensure_ascii=False).encode())

def validate(ep):
    schema=load(ROOT/'config/futuro-pratico/episode.schema.json')
    errors=[f"{'/'.join(map(str,e.path))}: {e.message}" for e in Draft202012Validator(schema,format_checker=FormatChecker()).iter_errors(ep)]
    if errors:raise ValueError('\n'.join(errors))
    presets=load(ROOT/'config/futuro-pratico/presets.json');p=presets[ep['preset']]
    if ep['fps']!=p['fps'] or (p['height']>p['width'])!=(ep['format']=='vertical'):raise ValueError('Preset, fps and orientation mismatch')
    assets={a['id']:a for a in load(ROOT/'config/futuro-pratico/assets.json')};sources={s['id'] for s in ep['sources']}
    if len(sources)!=len(ep['sources']):raise ValueError('Duplicate source ID')
    for scene in ep['scenes']:
        ids=scene['assets']+[scene['backgroundId']]+([scene['objectId']] if scene['objectId'] else [])
        if any(a not in assets or not public_file(assets[a]['path']).is_file() for a in ids):raise ValueError('Missing asset reference')
        if assets[scene['backgroundId']]['category']!='cenarios':raise ValueError('Background must be a background plate')
        if scene['objectId'] and assets[scene['objectId']]['category']!='objetos':raise ValueError('Object must be a tech object')
        characters=['personagem_1','personagem_2'] if scene['character']=='both' else [] if scene['character']=='none' else [scene['character']]
        if any(f"personagens.{c}_{scene['pose']}" not in scene['assets'] for c in characters):raise ValueError('Sprite used by layout must be declared in asset plan')
        if scene['layout']=='duo' and scene['character']!='both':raise ValueError('Duo layout requires both characters')
        if scene['layout']=='object' and not scene['objectId']:raise ValueError('Object layout requires objectId')
        if any(s not in sources for s in scene['sourceIds']):raise ValueError('Missing source reference')
        if scene['evidence']!='fiction' and not scene['sourceIds']:raise ValueError('Facts/inferences require sources')
    cues=[]
    if ep['captions']['file']:cues=load(public_file(ep['captions']['file']))
    cue_schema={'type':'array','items':{'type':'object','required':['start','end','text'],'additionalProperties':False,'properties':{'start':{'type':'number','minimum':0},'end':{'type':'number','exclusiveMinimum':0},'text':{'type':'string','minLength':1}}}}
    Draft202012Validator(cue_schema).validate(cues)
    result=subprocess.run(['node',str(ROOT/'scripts/futuro-pratico/timeline-check.mjs')],input=json.dumps({**ep,'cues':cues}),text=True,capture_output=True)
    if result.returncode:raise ValueError(result.stderr)
    timeline=json.loads(result.stdout)
    if abs(timeline['durationInFrames']/ep['fps']-ep['targetDurationSeconds'])>1/ep['fps']:raise ValueError('Target duration must match timeline including overlap')
    if ep['audio']['durationSeconds']>timeline['durationInFrames']/ep['fps']:raise ValueError('Audio exceeds timeline')
    if ep['audio']['status']=='ready':
        p=public_file(ep['audio']['file'])
        probe=json.loads(subprocess.run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(p)],check=True,capture_output=True,text=True).stdout)
        if not any(s['codec_type']=='audio' for s in probe['streams']):raise ValueError('File has no audio')
        if abs(float(probe['format']['duration'])-ep['audio']['durationSeconds'])>.15:raise ValueError('Measured audio duration mismatch')
    if ep['captions']['status']=='ready' and (not cues or ep['captions']['timingOrigin'] in ('none','estimated')):raise ValueError('Final captions require real audio timings')
    return timeline

def blockers(ep):
    validate(ep);reasons=[];h=input_hash(ep)
    if any(a['status']!='resolved' for a in ep['missingAssets']):reasons.append('unresolved assets')
    if not ep['script'].strip() or not ep['narration'].strip():reasons.append('missing script/narration')
    if 'PREENCHER' in json.dumps(ep,ensure_ascii=False):reasons.append('unfilled template')
    if ep['audio']['status']!='ready' or not ep['audio']['rightsReviewed']:reasons.append('audio/rights pending')
    if ep['captions']['status']!='ready':reasons.append('captions pending')
    if ep['status'] not in ('ready-to-export','exported'):reasons.append('episode not ready-to-export')
    qa=ep['qa']
    if qa['inputHash']!=h or not qa['reviewer'].strip() or not qa['notes'].strip() or not all(qa[x] for x in ['visual','audio','editorial','rights']):reasons.append('current human QA missing')
    for stage in STAGES:
        rec=ep['records'].get(stage)
        if not rec or rec['inputHash']!=h:reasons.append('missing/stale stage: '+stage);continue
        for output in rec['outputs']:
            p=(ROOT/output['path']).resolve()
            if not p.is_relative_to(ROOT.resolve()) or not p.is_file() or hash_bytes(p.read_bytes())!=output['sha256']:reasons.append('missing/changed output: '+output['path'])
    return reasons

def versions():
    return {'node':subprocess.run(['node','--version'],capture_output=True,text=True,check=True).stdout.strip(),'python':sys.version.split()[0],'remotion':load(ROOT/'package.json')['dependencies']['remotion']}

def main():
    parser=argparse.ArgumentParser();sub=parser.add_subparsers(dest='command',required=True)
    p=sub.add_parser('init');p.add_argument('id');p.add_argument('--destination',default=str(ROOT/'episodes'))
    for command in ['validate','status','gate','record','review','captions','tts-status']:
        p=sub.add_parser(command);p.add_argument('episode')
        if command=='record':p.add_argument('stage',choices=STAGES);p.add_argument('--output',action='append',default=[])
        if command=='review':p.add_argument('--reviewer',required=True);p.add_argument('--notes',required=True);p.add_argument('--approve',nargs='+',choices=['visual','audio','editorial','rights'],required=True)
        if command=='captions':p.add_argument('--destination',required=True)
    args=parser.parse_args()
    if args.command=='init':
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',args.id):raise ValueError('Invalid episode ID')
        path=Path(args.destination)/args.id;path.mkdir(parents=True,exist_ok=False)
        ep=load(ROOT/'docs/futuro-pratico/templates/episode.json');ep['id']=args.id;write(path/'episode.json',ep);print(path/'episode.json');return
    ep=load(args.episode);timeline=validate(ep)
    if args.command=='validate':print(json.dumps({'valid':True,'timeline':timeline},ensure_ascii=False,indent=2))
    elif args.command=='status':print(json.dumps({'inputHash':input_hash(ep),'exportBlockers':blockers(ep)},indent=2))
    elif args.command=='gate':
        reasons=blockers(ep)
        if reasons:raise ValueError('Export blocked: '+', '.join(reasons))
        print(json.dumps({'episode':ep,'timeline':timeline,'inputHash':input_hash(ep)}))
    elif args.command=='record':
        if args.stage=='narration' and ep['audio']['status']!='ready':raise ValueError('Real audio required')
        if args.stage=='captions' and ep['captions']['status']!='ready':raise ValueError('Real captions required')
        if args.stage=='qa' and not all(ep['qa'][x] for x in ['visual','audio','editorial','rights']):raise ValueError('Human review pending')
        outputs=[]
        for name in args.output:
            p=Path(name).resolve()
            if not p.is_relative_to(ROOT.resolve()) or not p.is_file():raise ValueError('Output must exist inside project')
            outputs.append({'path':str(p.relative_to(ROOT)),'sha256':hash_bytes(p.read_bytes())})
        ep['records'][args.stage]={'inputHash':input_hash(ep),'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'toolVersions':versions(),'outputs':outputs};write(args.episode,ep)
    elif args.command=='review':
        if 'audio' in args.approve and ep['audio']['status']!='ready':raise ValueError('Cannot approve audio QA without real audio')
        h=input_hash(ep)
        if ep['qa']['inputHash']!=h:ep['qa']={**ep['qa'],**{k:False for k in ['visual','audio','editorial','rights']}}
        for k in args.approve:ep['qa'][k]=True
        ep['qa'].update(inputHash=h,reviewer=args.reviewer,notes=args.notes);write(args.episode,ep)
    elif args.command=='tts-status':print(json.dumps({'status':'not-configured','provider':None,'localHumanAudioAccepted':True,'action':'configure explicit adapter; no call performed'}))
    elif args.command=='captions':
        if ep['captions']['status']!='ready':raise ValueError('Only real approved timings can generate SRT/VTT')
        cues=load(public_file(ep['captions']['file']));dest=Path(args.destination);dest.mkdir(parents=True,exist_ok=False)
        def stamp(t,sep):
            n=round(t*1000);h,n=divmod(n,3600000);m,n=divmod(n,60000);s,ms=divmod(n,1000);return f'{h:02}:{m:02}:{s:02}{sep}{ms:03}'
        for ext,sep in [('srt',','),('vtt','.')]:
            text='WEBVTT\n\n' if ext=='vtt' else ''
            for i,c in enumerate(cues,1):text+=f'{i}\n{stamp(c["start"],sep)} --> {stamp(c["end"],sep)}\n{c["text"]}\n\n'
            (dest/f'captions.{ext}').write_text(text)
if __name__=='__main__':
    try:main()
    except (ValueError,AssertionError,FileExistsError) as e:print(str(e),file=sys.stderr);sys.exit(1)
