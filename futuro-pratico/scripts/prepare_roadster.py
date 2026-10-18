"""Roadster Test03. Reuses the validated TTS/TLS, local music, Caption element,
FFmpeg and fonts. No reinstall and no change to earlier narration or videos."""
import asyncio,json,math,os,re,subprocess,wave,array,random,sys
from pathlib import Path
import generate_narration as base
ROOT=base.ROOT;OUT=ROOT/'public/teste-03';FPS=30
async def main():
 story=json.loads((ROOT/'docs/teste-03/ROTEIRO.json').read_text());chapters=[];cursor=0
 for i,c in enumerate(story['chapters']):
  file=OUT/f'voz-{i+1:02}.mp3';meta=file.with_suffix('.json');cached=json.loads(meta.read_text()) if meta.exists() else {}
  if not file.exists() or cached.get('text')!=c['text']:
   partial=file.with_suffix('.partial.mp3');words=[]
   try:
    speech=base.edge_tts.Communicate(c['text'],story['voice'],rate='+0%',pitch='+0Hz',boundary='WordBoundary',proxy=os.environ.get('HTTPS_PROXY'))
    with partial.open('wb') as f:
     async for chunk in speech.stream():
      if chunk['type']=='audio':f.write(chunk['data'])
      elif chunk['type']=='WordBoundary':words.append({k:chunk[k] for k in ['offset','duration','text']})
    base.ffprobe(partial);partial.replace(file);cached={'voice':story['voice'],'rate':'+0%','text':c['text'],'words':words};meta.write_text(json.dumps(cached,ensure_ascii=False,indent=2)+'\n')
   finally:partial.unlink(missing_ok=True)
  words=cached['words'];assert words
  spoken=min(base.ffprobe(file),(words[-1]['offset']+words[-1]['duration'])/1e7+.24)
  duration=max(round(c['seconds']*FPS),math.ceil(spoken*FPS)+8)
  caps=[];scan=0
  for k,w in enumerate(words):
   found=re.search(re.escape(w['text']),c['text'][scan:],re.I);text=w['text']
   if found:
    end=scan+found.end();punct=re.match(r'[.,!?;:]+',c['text'][end:]);text=c['text'][scan+found.start():end]+(punct.group(0) if punct else '');scan=end+(len(punct.group(0)) if punct else 0)
   a=w['offset']/1e4+100;b=(w['offset']+w['duration'])/1e4+100
   caps.append({'text':(' ' if k else '')+text,'startMs':round(a,2),'endMs':round(b,2),'timestampMs':round((a+b)/2,2),'confidence':None})
  chapters.append({**c,'from':cursor,'durationInFrames':duration,'voiceFrom':cursor+3,'voiceSeconds':spoken,'src':f'teste-03/voz-{i+1:02}.mp3','captions':caps});cursor+=duration
  print(c['id'],f'{spoken:.2f}s voice / {duration/FPS:.2f}s scene',flush=True)
 # The requested 50–60s range is checked before any full rendering.
 if not 50<=cursor/FPS<=60:raise RuntimeError(f'Adjust script/pause lengths before editing: {cursor/FPS:.2f}s exceeds requested duration range')
 plan={'status':'ready','voice':story['voice'],'fps':FPS,'durationInFrames':cursor,'chapters':chapters};(ROOT/'src/teste03/plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n')
 lines=['import {Sequence,useVideoConfig} from "remotion";','import {BasicCaptions} from "../teste02/BasicCaptions";','export const RoadsterCaptions=()=>{const {fps}=useVideoConfig();return <>']
 global_caps=[]
 for c in chapters:
  start=f' from={{{c["from"]}}}' if c['from'] else ''
  lines.append(f'<Sequence name="Legenda {c["id"]}"{start} durationInFrames={{{c["durationInFrames"]}}} premountFor={{fps}}><div className="roadster-captions"><BasicCaptions name="Narração" width={{840}} combineTokensWithinMilliseconds={{1200}} style={{{{position:"absolute",left:100,top:1450}}}} premountFor={{fps}} captions={{'+json.dumps(c['captions'],ensure_ascii=False)+'}/></div></Sequence>')
  for cap in c['captions']:global_caps.append({**cap,'startMs':cap['startMs']+c['from']/FPS*1000,'endMs':cap['endMs']+c['from']/FPS*1000})
 lines.append('</>;};');(ROOT/'src/teste03/Captions.tsx').write_text('\n'.join(lines)+'\n');(OUT/'captions.json').write_text(json.dumps(global_caps,ensure_ascii=False,indent=2)+'\n')
 args=['ffmpeg','-v','error','-y'];graph=[]
 for c in chapters:args+=['-i',str(ROOT/'public'/c['src'])]
 for i,c in enumerate(chapters):graph.append(f'[{i}:a]atrim=duration={c["voiceSeconds"]},aresample=48000,adelay={round(c["voiceFrom"]/FPS*1000)}:all=1[v{i}]')
 graph.append(''.join(f'[v{i}]' for i in range(len(chapters)))+f'amix=inputs={len(chapters)}:normalize=0,apad,atrim=duration={cursor/FPS},loudnorm=I=-16:TP=-2:LRA=7[out]')
 args+=['-filter_complex',';'.join(graph),'-map','[out]','-ar','48000','-ac','1','-c:a','pcm_s16le',str(OUT/'narracao.wav')];subprocess.run(args,check=True)
 # Discrete original impacts, electric movement and cold-gas hiss. Not event sound.
 sr=24000;buf=[0.0]*math.ceil(cursor/FPS*sr);random.seed(3)
 def effect(at,duration=.45,kind='ping',gain=.04):
  start=int(at*sr)
  for k in range(min(int(duration*sr),len(buf)-start)):
   t=k/sr
   if kind=='air':v=(random.random()*2-1)*math.sin(math.pi*t/duration)**2*.5
   elif kind=='impact':v=math.sin(2*math.pi*(45*t+3*(1-math.exp(-t*28))))*math.exp(-t*10)
   else:v=(math.sin(2*math.pi*620*t)+.2*math.sin(2*math.pi*930*t))*math.exp(-t*12)*(1-math.exp(-t*100))
   buf[start+k]+=gain*v
 for c in chapters:
  effect(c['from']/FPS,.6,'air',.035)
 for i,sec,kind in [(0,.6,'air'),(0,2.35,'impact'),(1,.8,'ping'),(2,1.3,'air'),(2,4.3,'air'),(3,2.5,'air'),(4,.2,'air'),(6,3.0,'impact')]:effect(chapters[i]['from']/FPS+sec,.65,kind,.06)
 with wave.open(str(OUT/'efeitos-originais.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(array.array('h',(int(max(-.9,min(.9,x))*32767) for x in buf)).tobytes())
 # Silence the music briefly on the claim/measurement distinction.
 c=chapters[4];silence=c['from']/FPS+c['voiceSeconds']-.9
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(OUT/'narracao.wav'),'-stream_loop','-1','-i',str(ROOT/'public/teste-02/music-loop.wav'),'-i',str(OUT/'efeitos-originais.wav'),'-filter_complex',f"[0:a]asplit=2[v][side];[1:a]lowpass=f=2200,volume=0.18,afade=t=in:d=0.8,volume='if(between(t,{silence},{silence+.6}),0.05,1)':eval=frame[m];[m][side]sidechaincompress=threshold=0.022:ratio=6:attack=20:release=320[d];[v][d][2:a]amix=inputs=3:normalize=0,atrim=duration={cursor/FPS},afade=t=out:st={cursor/FPS-.5}:d=0.5,alimiter=limit=0.89:level=false:latency=true[out]",'-map','[out]','-ar','48000','-ac','2','-c:a','pcm_s16le',str(OUT/'mix-final.wav')],check=True)
 print(f'READY: {cursor} frames / {cursor/FPS:.2f}s',flush=True)
if __name__=='__main__':asyncio.run(main())
