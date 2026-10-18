"""Reuse the working Edge TTS setup. Native-rate speech, measured chapters,
word-aligned Caption JSON, original procedural sound effects and a ducked mix.
No existing videos, scenes, soundtrack or narration files are overwritten.
"""
import asyncio, json, math, os, subprocess, wave, array, random, re, sys
from pathlib import Path
import generate_narration as base
ROOT=base.ROOT
OUT=ROOT/'public/teste-02'
SCRIPT=ROOT/'docs/teste-02/ROTEIRO.json'
FPS=30
async def main():
    if '--sound-only' in sys.argv:
        saved=json.loads((ROOT/'src/teste02/plan.json').read_text())
        chapters=saved['chapters'];cursor=saved['durationInFrames']
    else:
        OUT.mkdir(exist_ok=True)
        story=json.loads(SCRIPT.read_text())
        chapters=[];cursor=0;all_captions=[]
        for i,ch in enumerate(story['chapters']):
            file=OUT/f'voz-{i+1:02}.mp3'; meta=file.with_suffix('.json')
            cached=json.loads(meta.read_text()) if meta.exists() else {}
            if not file.exists() or cached.get('text')!=ch['text']:
                words=[];partial=file.with_suffix('.partial.mp3')
                try:
                    speech=base.edge_tts.Communicate(ch['text'],story['voice'],rate='+0%',pitch='+0Hz',boundary='WordBoundary',proxy=os.environ.get('HTTPS_PROXY'))
                    with partial.open('wb') as f:
                        async for chunk in speech.stream():
                            if chunk['type']=='audio': f.write(chunk['data'])
                            elif chunk['type']=='WordBoundary': words.append({k:chunk[k] for k in ['offset','duration','text']})
                    base.ffprobe(partial);partial.replace(file)
                    cached={'text':ch['text'],'voice':story['voice'],'rate':'+0%','words':words}
                    meta.write_text(json.dumps(cached,ensure_ascii=False,indent=2)+'\n')
                finally: partial.unlink(missing_ok=True)
            words=cached['words'];assert words
            # Keep all spoken samples; trim only the service's trailing silence.
            speech_duration=min(base.ffprobe(file),(words[-1]['offset']+words[-1]['duration'])/1e7+0.28)
            duration=max(round(ch['seconds']*FPS),math.ceil(speech_duration*FPS)+8)
            entry={**ch,'from':cursor,'durationInFrames':duration,'voiceFrom':cursor+3,'voiceSeconds':speech_duration,'src':f'teste-02/voz-{i+1:02}.mp3','captions':[]}
            text_cursor=0
            for j,w in enumerate(words):
                a=(w['offset']/1e7+0.1)*1000;b=(w['offset']+w['duration'])/1e4+100
                found=re.search(re.escape(w['text']),ch['text'][text_cursor:],re.I)
                display=w['text']
                if found:
                    end=text_cursor+found.end()
                    punctuation=re.match(r'[.,!?;:]+',ch['text'][end:])
                    display=ch['text'][text_cursor+found.start():end]+(punctuation.group(0) if punctuation else '')
                    text_cursor=end+(len(punctuation.group(0)) if punctuation else 0)
                cap={'text':(' ' if j else '')+display,'startMs':round(a,2),'endMs':round(b,2),'timestampMs':round((a+b)/2,2),'confidence':None}
                entry['captions'].append(cap)
                all_captions.append({**cap,'startMs':cap['startMs']+cursor/FPS*1000,'endMs':cap['endMs']+cursor/FPS*1000,'timestampMs':cap['timestampMs']+cursor/FPS*1000})
            chapters.append(entry);cursor+=duration
            print(f"{i+1} {ch['id']}: voice {speech_duration:.2f}s / scene {duration/FPS:.2f}s",flush=True)
        plan={'status':'ready','voice':story['voice'],'fps':FPS,'durationInFrames':cursor,'chapters':chapters}
        (ROOT/'src/teste02/plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n')
        (OUT/'captions.json').write_text(json.dumps(all_captions,ensure_ascii=False,indent=2)+'\n')
        # Canonical caption element copied unchanged from Remotion's official source.
        lines=['import {Sequence, useVideoConfig} from "remotion";','import {BasicCaptions} from "./BasicCaptions";','export const Teste02Captions = () => {const {fps}=useVideoConfig(); return <>']
        for c in chapters:
            lines.append(f'<Sequence name="Legenda {c["id"]}" from={{{c["from"]}}} durationInFrames={{{c["durationInFrames"]}}} premountFor={{fps}}>')
            lines.append('<div className="teste02-captions"><BasicCaptions name="Fala" premountFor={fps} width={840} combineTokensWithinMilliseconds={1350} style={{position:"absolute",left:100,top:1460}} captions={'+json.dumps(c['captions'],ensure_ascii=False)+'}/></div></Sequence>')
        lines=[line.replace(' from={0}', '') for line in lines]
        lines.append('</>;};')
        (ROOT/'src/teste02/Captions.tsx').write_text('\n'.join(lines)+'\n')
        if '--captions-only' in sys.argv:
            print('Updated measured plan and punctuated captions only; existing audio retained.');return
        # Voice-only master with pauses, never time-stretched.
        args=['ffmpeg','-v','error','-y']
        for c in chapters:args+=['-i',str(ROOT/'public'/c['src'])]
        graph=[]
        for i,c in enumerate(chapters):graph.append(f'[{i}:a]atrim=duration={c["voiceSeconds"]},aresample=48000,adelay={round(c["voiceFrom"]/FPS*1000)}:all=1[v{i}]')
        graph.append(''.join(f'[v{i}]' for i in range(len(chapters)))+f'amix=inputs={len(chapters)}:normalize=0,apad,atrim=duration={cursor/FPS},loudnorm=I=-16:TP=-2:LRA=7[out]')
        args+=['-filter_complex',';'.join(graph),'-map','[out]','-ac','1','-ar','48000','-c:a','pcm_s16le',str(OUT/'narracao.wav')]
        subprocess.run(args,check=True)
    # New original accents; use the existing music as a bed. No samples or APIs.
    sr=24000;buf=[0.0]*math.ceil(cursor/FPS*sr);random.seed(2026)
    def ping(at,freq=740,amp=.09,dur=.45,air=False):
        start=int(at*sr)
        for j in range(min(int(sr*dur),len(buf)-start)):
            t=j/sr
            v=(random.random()*2-1)*math.sin(math.pi*t/dur)**2*.3 if air else (math.sin(2*math.pi*freq*t)+.15*math.sin(2*math.pi*freq*1.5*t))*math.exp(-t*10)*(1-math.exp(-t*100))
            buf[start+j]+=amp*v
    for i,c in enumerate(chapters):
        ping(c['from']/FPS,660+i*55,.055)
        if i: ping(max(0,c['from']/FPS-.32),0,.1,.55,True)
    # Accent the same spoken landmarks that drive the card and exception animations.
    for ci,term,freq in [(3,'assunto',880),(3,'prazo',1040),(4,'tarefa',660),(4,'resposta',880),(5,'faltou',440),(5,'revisão',740),(7,'qual',880)]:
        c=chapters[ci]
        match=next(w for w in c['captions'] if re.sub(r'[^\w]','',w['text'].strip().lower())==term)
        ping(c['from']/FPS+match['startMs']/1000,freq,.06)
    samples=array.array('h',(int(max(-.9,min(.9,v))*32767) for v in buf))
    with wave.open(str(OUT/'efeitos-originais.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(samples.tobytes())
    # Smooth music loop, avoiding the original track's 20s ending fade.
    # The 3–17s region is crossfaded to itself at every loop junction.
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(ROOT/'public/futuro-original.wav'),'-filter_complex',"[0:a]atrim=start=3:end=17,asetpts=PTS-STARTPTS,asplit=2[a][b];[a][b]acrossfade=d=0.6:c1=tri:c2=tri[out]",'-map','[out]','-c:a','pcm_s16le',str(OUT/'music-loop.wav')],check=True)
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(OUT/'narracao.wav'),'-stream_loop','-1','-i',str(OUT/'music-loop.wav'),'-i',str(OUT/'efeitos-originais.wav'),'-filter_complex',f'[0:a]asplit=2[v][side];[1:a]volume=0.25,afade=t=in:d=0.8[m];[m][side]sidechaincompress=threshold=0.025:ratio=6:attack=18:release=320[d];[v][d][2:a]amix=inputs=3:normalize=0,atrim=duration={cursor/FPS},afade=t=out:st={cursor/FPS-.6}:d=0.6,alimiter=limit=0.89:level=false:latency=true[out]','-map','[out]','-ar','48000','-ac','2','-c:a','pcm_s16le',str(OUT/'mix-final.wav')],check=True)
    print(f'READY {cursor} frames / {cursor/FPS:.2f} seconds',flush=True)
if __name__=='__main__':asyncio.run(main())
