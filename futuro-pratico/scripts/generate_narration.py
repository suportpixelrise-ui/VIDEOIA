"""Generate natural-rate pt-BR narration, then measure and place each phrase.
Run with /workspace/.tools/futuro-tts/bin/python scripts/generate_narration.py.
Does not alter the original soundtrack or MP4. Requires Edge's service access.
"""
import asyncio, json, math, os, subprocess
from pathlib import Path
import edge_tts
# edge-tts 7.3.1 builds its own certifi SSL context. Add the platform's
# trusted proxy CA without disabling hostname or certificate verification.
proxy_ca = os.environ.get('CODEX_PROXY_CERT')
if proxy_ca and Path(proxy_ca).is_file():
    from edge_tts.communicate import _SSL_CTX
    _SSL_CTX.load_verify_locations(cafile=proxy_ca)
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/narracao'
FPS = 30
VOICE = 'pt-BR-AntonioNeural'
PHRASES = [
    'Você ainda não usa inteligência artificial?',
    'Com ela, você pode criar sites,',
    'automatizar tarefas',
    'e produzir conteúdos incríveis.',
    'O futuro já começou.',
    'E você, vai ficar de fora?',
]
MIN_SCENES = [120, 126, 108, 114, 162]
def ffprobe(path):
    return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(path)],text=True))
async def main():
    OUT.mkdir(parents=True,exist_ok=True)
    measured=[]
    for i,text in enumerate(PHRASES):
        path=OUT/f'frase-{i+1:02}.mp3'
        meta=OUT/f'frase-{i+1:02}.json'
        cached = json.loads(meta.read_text()) if meta.exists() else {}
        if not path.exists() or cached.get('voice') != VOICE or cached.get('text') != text:
            partial=path.with_suffix('.partial.mp3')
            words=[]
            try:
                speech=edge_tts.Communicate(text,VOICE,rate='+0%',pitch='+0Hz',boundary='WordBoundary',proxy=os.environ.get('HTTPS_PROXY') or None)
                with partial.open('wb') as audio:
                    async for chunk in speech.stream():
                        if chunk['type']=='audio': audio.write(chunk['data'])
                        elif chunk['type']=='WordBoundary': words.append({k:chunk[k] for k in ['offset','duration','text']})
                if partial.stat().st_size==0: raise RuntimeError('Edge TTS returned empty audio')
                ffprobe(partial)
                partial.replace(path)
                meta.write_text(json.dumps({'voice':VOICE,'text':text,'rate':'+0%','words':words},ensure_ascii=False,indent=2)+'\n')
            finally:
                partial.unlink(missing_ok=True)
        measured.append(math.ceil(ffprobe(path)*FPS))
        print(f'Phrase {i+1}: {measured[-1]/FPS:.2f}s (native speed)')
    # Never compress speech. Extend scenes only when the natural recording needs it.
    scene_durations=[max(MIN_SCENES[i], measured[i]+18) for i in range(4)]
    scene_durations.append(max(MIN_SCENES[4], measured[4]+measured[5]+36))
    starts=[0]
    for d in scene_durations: starts.append(starts[-1]+d)
    clips=[]
    for i in range(6):
        scene=min(i,4)
        start=starts[scene]+5 if i<5 else starts[4]+5+measured[4]+16
        clips.append({'src':f'narracao/frase-{i+1:02}.mp3','from':start,'durationInFrames':measured[i],'text':PHRASES[i]})
    plan={'status':'ready','voice':VOICE,'fps':FPS,'durationInFrames':starts[-1],
          'sceneDurations':scene_durations,'voiceWindows':[[c['from'],c['from']+c['durationInFrames']] for c in clips],
          'clips':clips,'closingQuestionFrame':clips[5]['from']-starts[4],
          'note':'Native voice speed. Pauses inserted between phrases; no atempo or playback speed adjustment.'}
    # Separate reusable voice master, with the exact video pauses. No music mixed in.
    args=['ffmpeg','-hide_banner','-loglevel','error','-y']
    for c in clips: args+=['-i',str(ROOT/'public'/c['src'])]
    filters=[]
    for i,c in enumerate(clips):
        filters.append(f'[{i}:a]aresample=48000,adelay={round(c["from"]/FPS*1000)}:all=1[a{i}]')
    filters.append(''.join(f'[a{i}]' for i in range(6))+f'amix=inputs=6:normalize=0,apad,atrim=duration={starts[-1]/FPS},loudnorm=I=-16:TP=-2:LRA=7[out]')
    args+=['-filter_complex',';'.join(filters),'-map','[out]','-ar','48000','-ac','1','-c:a','pcm_s16le',str(OUT/'futuro-pratico-narracao.wav')]
    subprocess.run(args,check=True)
    # Reference mix for checking ducking and audible sync before the only final render.
    # Side-chain compression reacts smoothly to actual speech, including its internal pauses.
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y',
        '-i',str(OUT/'futuro-pratico-narracao.wav'),'-stream_loop','-1','-i',str(ROOT/'public/futuro-original.wav'),
        '-filter_complex',f'[0:a]asplit=2[voice][side];[1:a]volume=0.32[music];[music][side]sidechaincompress=threshold=0.015:ratio=8:attack=25:release=350[ducked];[voice][ducked]amix=inputs=2:normalize=0,atrim=duration={starts[-1]/FPS},afade=t=out:st={starts[-1]/FPS-.45}:d=0.45,alimiter=limit=0.89:level=false:latency=true[out]',
        '-map','[out]','-ar','48000','-ac','2','-c:a','pcm_s16le',str(OUT/'futuro-pratico-mix-v2.wav')],check=True)
    (ROOT/'src/narration-plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n')
    print(f'Ready: {starts[-1]} frames / {starts[-1]/FPS:.2f}s; narration and mix saved.')
if __name__=='__main__':
    asyncio.run(main())
