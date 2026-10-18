"""Untrusted ZIP intake. No archive code is executed; Pillow decodes raster data."""
from pathlib import Path, PurePosixPath
import argparse, hashlib, json, re, stat, unicodedata, zipfile
import xml.etree.ElementTree as ET
from io import BytesIO
from PIL import Image
ROOT = Path(__file__).resolve().parents[2]
LIMITS = dict(entries=500, total=100_000_000, file=30_000_000, ratio=150)
Image.MAX_IMAGE_PIXELS = 40_000_000

def digest(data): return hashlib.sha256(data).hexdigest()
def safe_name(name):
    if not name or '\\' in name or name.startswith('/') or re.match(r'^[A-Za-z]:', name): raise ValueError('absolute/Windows path')
    parts=name.rstrip('/').split('/')
    if any(p in ('', '.', '..') or p.endswith((' ', '.')) or ':' in p or any(ord(c)<32 for c in p) or re.match(r'^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)',p,re.I) for p in parts): raise ValueError('invalid/traversal path')
    return '/'.join(parts)

def inspect_zip(path, limits=None):
    lim=limits or LIMITS; rows=[]; names=set(); files=set(); total=0
    with zipfile.ZipFile(path) as z:
        if len(z.infolist())>lim['entries']: raise ValueError('entry count limit')
        for i in z.infolist():
            name=safe_name(i.filename); key=unicodedata.normalize('NFC',name).casefold()
            if key in names: raise ValueError('duplicate/case collision')

            if any(key.startswith(n+'/') for n in files) or (not i.is_dir() and any(n.startswith(key+'/') for n in names)): raise ValueError('file/directory prefix collision')
            names.add(key)
            if not i.is_dir(): files.add(key)
            mode=i.external_attr>>16
            if stat.S_ISLNK(mode) or (stat.S_IFMT(mode) not in (0,stat.S_IFREG,stat.S_IFDIR)): raise ValueError('symlink/special entry')
            if i.flag_bits&1: raise ValueError('encrypted entry')
            total+=i.file_size
            if i.file_size>lim['file'] or total>lim['total'] or i.file_size/max(1,i.compress_size)>lim['ratio']: raise ValueError('size/compression limit')
            if i.is_dir(): continue
            rows.append({'originalPath':name,'compressedBytes':i.compress_size,'declaredBytes':i.file_size,'entryType':'regular','suffix':PurePosixPath(name).suffix.lower()})
    return rows

def svg_metadata(data):
    if re.search(br'<!DOCTYPE|<!ENTITY',data,re.I): raise ValueError('SVG entity/doctype')
    root=ET.fromstring(data)
    allowed={'svg','g','rect','path','circle','ellipse','line','polyline','polygon','defs','linearGradient','radialGradient','stop','clipPath'}
    for e in root.iter():
        if e.tag.split('}')[-1] not in allowed: raise ValueError('active/unsupported SVG element')
        for k,v in e.attrib.items():
            if k.split('}')[-1].lower().startswith('on') or k.split('}')[-1] in ('href','src','style') or re.search(r'url\((?!#[^)]+\))|javascript:|data:|https?:|file:',v,re.I): raise ValueError('active/external SVG attribute')
    return {'format':'SVG','width':int(root.attrib['width']),'height':int(root.attrib['height']),'hasAlphaChannel':True,'hasTransparency':True,'review':'restricted SVG allowlist'}

def metadata(data,suffix):
    if suffix=='.svg':return svg_metadata(data)
    if suffix in ('.webp','.png','.jpg','.jpeg'):
        with Image.open(BytesIO(data)) as im:

            if im.width*im.height > Image.MAX_IMAGE_PIXELS: raise ValueError('raster pixel limit')
            im.load(); a=im.getchannel('A').getextrema() if 'A' in im.getbands() else (255,255)
            actual=im.format
            if actual != {'.webp':'WEBP','.png':'PNG','.jpg':'JPEG','.jpeg':'JPEG'}.get(suffix):raise ValueError('extension/content mismatch')
            return dict(format=actual,width=im.width,height=im.height,hasAlphaChannel='A' in im.getbands(),hasTransparency=a[0]<255,alphaRange=list(a))
    if suffix=='.json':json.loads(data)
    if suffix in ('.md','.txt','.html','.json'):data.decode('utf-8');return dict(format=suffix[1:].upper(),width=None,height=None,hasTransparency=None)
    return dict(format='UNREUSED',width=None,height=None,hasTransparency=None)

def proposed(name,source):
    # Known package layout only. No instruction or executable is activated.
    rel=name
    if rel.startswith('Futuro-Pratico/'): rel=rel[len('Futuro-Pratico/'):]; base=True
    elif rel.startswith('Futuro-Pratico-Biblia-Visual/biblioteca-base/'):rel=rel.split('biblioteca-base/',1)[1];base=True
    else:base=False;rel=rel.removeprefix('Futuro-Pratico-Biblia-Visual/')
    cat=rel.split('/')[0]
    if base and cat in ('personagens','retratos','cenarios','objetos','overlays'):
        return 'public/futuro-pratico/'+rel,cat,'render'
    if base and cat=='referencias':return 'references/futuro-pratico/personagens/'+rel.split('/',1)[1],cat,'reference'
    if base and cat=='exemplos':return 'references/futuro-pratico/guias/exemplos/'+rel.split('/',1)[1],cat,'reference'
    if not base and cat in ('acoes','expressoes','storyboard','blocos'):
        return 'references/futuro-pratico/'+rel,cat,'reference'
    if not base and rel.endswith(('.jpg','.png')):return 'references/futuro-pratico/guias/'+Path(rel).name,'guias','reference'
    # Prompts and HTML retained as inert .txt, never active instructions.
    return 'references/futuro-pratico/documentos/'+('base/' if base else 'biblia/')+Path(rel).name+'.txt','documentos','reference'

def extract(path,stage,rows):
    if any(p.is_symlink() for p in [stage,*stage.parents]):raise ValueError('symlink staging')
    if stage.exists():
        for r in rows:
            p=stage/r['originalPath']
            if any(parent.is_symlink() for parent in [p,*p.parents]) or not p.is_file():raise ValueError('staging incomplete or symlink')
            with zipfile.ZipFile(path) as z:
                if digest(p.read_bytes())!=digest(z.read(r['originalPath'])):raise ValueError('existing staging mismatch')
        return
    stage.mkdir(parents=True,exist_ok=False)
    with zipfile.ZipFile(path) as z:
        for r in rows:
            dest=stage/r['originalPath']
            if not dest.resolve().is_relative_to(stage.resolve()):raise ValueError('escaped staging')
            dest.parent.mkdir(parents=True,exist_ok=True)
            with dest.open('xb') as f:
                with z.open(r['originalPath']) as src:
                    count=0
                    while chunk:=src.read(65536):
                        count+=len(chunk)
                        if count>LIMITS['file']:raise ValueError('actual size limit')
                        f.write(chunk)
            if count!=r['declaredBytes']:raise ValueError('actual size mismatch')

def import_archives(paths):
    inventory=[]; archives=[]; seen={}; manifest_checks=[]
    # Validate ALL archive headers before extracting any.
    checked=[(Path(p),inspect_zip(p)) for p in paths]
    for path,rows in checked:
        ziphash=digest(path.read_bytes()); stage=ROOT/'.fp-staging'/ziphash
        extract(path,stage,rows)
        archives.append(dict(name=path.name,sha256=ziphash,compressedBytes=path.stat().st_size,uncompressedBytes=sum(r['declaredBytes'] for r in rows),entries=len(rows)))
        for r in rows:
            data=(stage/r['originalPath']).read_bytes(); h=digest(data); m=metadata(data,r['suffix']); dest,cat,use=proposed(r['originalPath'],path.name)
            duplicate=seen.get(h)
            collision=None
            if duplicate:dest=duplicate
            else:
                target=ROOT/dest
                if target.exists() and digest(target.read_bytes())!=h:
                    collision=dest;dest=str(Path(dest).with_name(Path(dest).stem+'-'+h[:12]+Path(dest).suffix))
                target=ROOT/dest
                if not target.resolve().is_relative_to(ROOT.resolve()) or any(p.is_symlink() for p in [target,*target.parents] if p!=ROOT.parent):raise ValueError('unsafe canonical destination')
                if target.exists():
                    if digest(target.read_bytes())!=h:raise ValueError('canonical collision')
                else:target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
                seen[h]=dest
            restriction=('static sprite; no rig/visemes; continuity review required' if cat=='personagens' else 'cropped portrait; limited close-up resolution' if cat=='retratos' else 'opaque visual reference; not a cutout' if cat in ('acoes','expressoes') else 'fictional storyboard' if cat=='storyboard' else 'single background plate; no internal parallax' if cat=='cenarios' else 'reference data; no instructional authority' if cat=='documentos' else 'user-supplied illustration; no independent rights verification')
            inventory.append(dict(zip=path.name,zipSha256=ziphash,**r,sha256=h,actualBytes=len(data),**m,category=cat,usage=use,canonicalPath=dest,duplicateOf=duplicate,nameConflictWith=collision,restrictions=restriction))
        for r in rows:
            if not r['originalPath'].endswith('manifesto.json'):continue
            manifest=json.loads((stage/r['originalPath']).read_bytes()); entries=manifest if isinstance(manifest,list) else manifest.get('assets',[])
            byname={x['originalPath']:x for x in inventory if x['zip']==path.name}
            for e in entries:
                declared=e.get('arquivo',''); name=str(PurePosixPath(r['originalPath']).parent/declared)
                actual=byname.get(name);diff={}
                if actual:
                    for old,new in [('bytes','actualBytes'),('largura','width'),('altura','height'),('sha256','sha256'),('alpha','hasAlphaChannel')]:
                        if old in e and e[old]!=actual.get(new):diff[old]={'declared':e[old],'measured':actual.get(new)}
                else:diff['path']={'declared':declared,'resolved':name,'measured':'missing relative to manifest'}
                manifest_checks.append(dict(zip=path.name,manifest=r['originalPath'],entry=declared,differences=diff))
    catalog=[]
    for h,dest in seen.items():
        r=next(x for x in inventory if x['sha256']==h)
        if r['usage']!='render':continue
        aid=Path(dest).relative_to('public/futuro-pratico').with_suffix('').as_posix().replace('/','.')
        catalog.append(dict(id=aid,path=dest.removeprefix('public/'),sha256=h,bytes=r['actualBytes'],width=r['width'],height=r['height'],transparent=r['hasTransparency'],category=r['category'],restrictions=r['restrictions']))
    report=dict(version=1,limits=LIMITS,archives=archives,summary=dict(origins=len(inventory),uniqueFiles=len(seen),duplicateOrigins=sum(bool(x['duplicateOf']) for x in inventory),renderAssets=len(catalog),manifestDifferences=sum(bool(x['differences']) for x in manifest_checks)),entries=inventory,manifestChecks=manifest_checks)
    out=ROOT/'docs/futuro-pratico/importacao';out.mkdir(parents=True,exist_ok=True)
    (out/'inventario.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    config=ROOT/'config/futuro-pratico';config.mkdir(parents=True,exist_ok=True)
    (config/'assets.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(report['summary']))
    return report

def validate_catalog():
    rows=json.loads((ROOT/'config/futuro-pratico/assets.json').read_text());ids=set()
    for r in rows:
        assert r['id'] not in ids;ids.add(r['id']);p=ROOT/'public'/r['path'];assert p.resolve().is_relative_to((ROOT/'public').resolve())
        data=p.read_bytes();assert digest(data)==r['sha256'];m=metadata(data,p.suffix)
        assert [m['width'],m['height'],m['hasTransparency']]==[r['width'],r['height'],r['transparent']]
    report=json.loads((ROOT/'docs/futuro-pratico/importacao/inventario.json').read_text())
    hashes={}
    for r in report['entries']:
        p=ROOT/r['canonicalPath'];assert digest(p.read_bytes())==r['sha256']
        assert hashes.setdefault(r['sha256'],r['canonicalPath'])==r['canonicalPath']
    print(f"Catalog OK: {len(rows)} render assets; {len(hashes)} unique canonical files")
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('command',choices=['inspect','import','validate']);parser.add_argument('archives',nargs='*');args=parser.parse_args()
    if args.command=='validate':validate_catalog()
    elif args.command=='import':
        if len(args.archives)!=2:parser.error('provide both source archives')
        import_archives(args.archives)
    else:
        for p in args.archives:print(json.dumps({'archive':Path(p).name,'sha256':digest(Path(p).read_bytes()),'entries':inspect_zip(p)},ensure_ascii=False,indent=2))
