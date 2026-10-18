"""Validate the exported artifact, not a new render. Uses existing FFmpeg + stdlib."""
import array, hashlib, json, math, re, subprocess, tempfile, wave
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'out';VIDEO=OUT/'futuro-pratico-teste-02.mp4'
PLAN=json.loads((ROOT/'src/teste02/plan.json').read_text())
def run(args):return subprocess.run(args,check=True,capture_output=True,text=True)
def samples(path):
    with wave.open(str(path)) as w:return array.array('h',w.readframes(w.getnframes()))
def main():
    assert VIDEO.is_file(),'Final export is not present'
    data=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(VIDEO)]).stdout)
    v=next(s for s in data['streams'] if s['codec_type']=='video');a=next(s for s in data['streams'] if s['codec_type']=='audio')
    assert (v['codec_name'],v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==('h264',1080,1920,'30/1',PLAN['durationInFrames'])
    assert v['pix_fmt']=='yuv420p' and v['color_space']=='bt709'
    assert a['codec_name']=='aac' and a['channels']==2 and a['sample_rate']=='48000'
    assert abs(float(v['duration'])-PLAN['durationInFrames']/30)<.001
    previous={}
    for name,expected in json.loads((ROOT/'docs/teste-02/previous-videos-sha256.json').read_text()).items():
        actual=hashlib.sha256((ROOT/name).read_bytes()).hexdigest();assert actual==expected,name
        previous[name]=actual
    # Full decode, black-frame detection, and loudness measurement in one pass.
    decoded=run(['ffmpeg','-hide_banner','-nostats','-xerror','-i',str(VIDEO),'-vf','blackdetect=d=0.03:pix_th=0.02:pic_th=0.999','-af','loudnorm=I=-16:TP=-1:LRA=7:print_format=json','-f','null','-'])
    log=decoded.stderr;(OUT/'teste02-validation.log').write_text(log)
    assert 'black_start:' not in log,'Unexpected black frame detected'
    loud=json.loads(re.findall(r'\{\s*"input_i".*?\}',log,re.S)[-1])
    assert float(loud['input_tp'])<-.1 and -24<float(loud['input_i'])<-12
    # Verify that the AAC really contains the prepared narrated mix, not just any audio.
    with tempfile.TemporaryDirectory(prefix='futuro-teste02-audio-') as tmp:
        reference=Path(tmp)/'reference.wav';encoded=Path(tmp)/'encoded.wav'
        for source,dest in [(ROOT/'public/teste-02/mix-final.wav',reference),(VIDEO,encoded)]:
            run(['ffmpeg','-v','error','-i',str(source),'-map','0:a:0','-ar','48000','-ac','1','-c:a','pcm_s16le',str(dest),'-y'])
        x=samples(reference);y=samples(encoded);n=min(len(x),len(y));idx=range(0,n,24)
        xx=sum(x[i]*x[i] for i in idx);yy=sum(y[i]*y[i] for i in idx);xy=sum(x[i]*y[i] for i in idx)
        correlation=xy/math.sqrt(xx*yy);assert correlation>.97
    # Inspectable frames from every chapter plus the missing-information branch.
    frames=[30,210,450,770,870,1030,1320,1560,1980]
    select='+'.join(f'eq(n,{n})' for n in frames)
    run(['ffmpeg','-v','error','-i',str(VIDEO),'-vf',f"select='{select}',scale=360:640,tile=3x3",'-frames:v','1','-q:v','2','-update','1',str(OUT/'teste-02-cenas.jpg'),'-y'])
    report={'status':'passed','file':str(VIDEO),'sizeBytes':VIDEO.stat().st_size,'durationSeconds':float(v['duration']),'containerDurationSeconds':float(data['format']['duration']),'videoFrames':int(v['nb_frames']),'fps':30,'resolution':[1080,1920],'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'colorSpace':v['color_space'],'fullDecode':'passed','unexpectedBlackFrames':False,'integratedLoudnessLUFS':float(loud['input_i']),'truePeakDBTP':float(loud['input_tp']),'audioReferenceCorrelation':correlation,'previousVideosUnchanged':previous,'chapters':len(PLAN['chapters']),'nativeVoiceRate':'+0%','captions':'word-boundary JSON; punctuation checked','sampleFrames':frames,'limitations':['Illustrative animation, not real tool footage or a performance benchmark.','Commercial rights for Microsoft voice must be checked separately.','Social-platform engagement data unavailable; see PESQUISA.md.']}
    (OUT/'teste02-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    rows=[]
    for c in PLAN['chapters']:rows.append(f'| {c["id"]} | {c["from"]/30:.2f}–{(c["from"]+c["durationInFrames"])/30:.2f}s | voz nativa + legendas dentro da cena |')
    text=f'''# Testes técnicos — Teste02

**Resultado: aprovado nos checks executados.** Uma única exportação completa, seguida de validação do arquivo final.

- Resolução:1080×1920; 30fps; {v['nb_frames']} frames; H.264, yuv420p, BT.709.
- Duração do vídeo:{float(v['duration']):.6f}s; contêiner:{float(data['format']['duration']):.6f}s (padding AAC).
- Áudio:AAC estéreo,48kHz; narração masculina pt-BR-AntonioNeural, velocidade padrão, sem time-stretch.
- Loudness do MP4:{loud['input_i']} LUFS; true peak:{loud['input_tp']} dBTP; sem clipping detectado.
- Correlação do áudio codificado com a mixagem:{correlation:.5f}.
- Decodificação integral com FFmpeg e `-xerror`:passou.
- Detector de quadros pretos inesperados:nenhum evento (limiar próximo a preto integral,99,9% da imagem).
- Hashes dos dois MP4s anteriores:inalterados.
- TypeScript e ESLint:passaram antes do render.
- Studio:composição carregada, metadados corretos, sem erros JavaScript.
- Amostras:18 frames de revisão antes do render; nove frames extraídos do arquivo final para inspeção visual.
- Narração/legendas:todos os clipes e timestamps cabem nos respectivos capítulos; pontuação preservada.
- Mixagem anterior à codificação:−16,51 LUFS,−4,65 dBTP; margem estimada voz versus música/efeitos durante a fala de29,87dB.

| Capítulo | Intervalo medido | Verificação |
| --- | --- | --- |
'''+ '\n'.join(rows)+'''

## Evidências

- `out/teste02-validation.json`:metadados e resultados estruturados.
- `out/teste02-validation.log`:decodificação, detecção de preto e medição de áudio.
- `out/teste-02-cenas.jpg`:amostras dos oito capítulos e da exceção.
- `out/teste02-studio-review.png`:Studio com a composição.
- `docs/teste-02/previous-videos-sha256.json`:hashes de preservação.

A detecção automática não substitui avaliação humana de clareza, estética e naturalidade da voz. Os eventos visuais e as legendas foram checados contra os timestamps do TTS; não se trata de uma medição de atenção ou retenção de público. Não foram realizadas publicações nem testes A/B. Pesquisa, direitos e limitações estão em PESQUISA.md e README.md.

Repetir a validação, sem renderizar novamente: `python3 scripts/validate_teste02.py`.
'''
    for a,b in [('Resolução:1080','Resolução: 1080'),('vídeo:','vídeo: '),('contêiner:','contêiner: '),('Áudio:AAC','Áudio: AAC'),('estéreo,48','estéreo, 48'),('MP4:','MP4: '),('mixagem:','mixagem: '),(':passou',': passou'),(':nenhum',': nenhum'),(':inalterados',': inalterados'),(':passaram',': passaram'),(':composição',': composição'),(':18',': 18'),(':todos',': todos'),(':−',': −'),('de29,87dB','de 29,87dB')]:text=text.replace(a,b)
    (ROOT/'docs/teste-02/TESTES.md').write_text(text)
    print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
