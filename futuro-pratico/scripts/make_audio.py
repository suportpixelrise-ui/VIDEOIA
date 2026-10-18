"""Original procedural soundtrack. No samples, external services, or paid APIs."""
import math, random, wave, array
from pathlib import Path
random.seed(42)
sr = 44100
length = 20
left = [0.0] * (sr * length)
right = [0.0] * (sr * length)
def tone(start, duration, freq, gain, pan=0.0, kind='pluck'):
    first = int(start * sr)
    for j in range(min(int(duration * sr), len(left) - first)):
        t = j / sr
        if kind == 'kick':
            v = math.sin(2*math.pi*(47*t+9*(1-math.exp(-t*35)))) * math.exp(-t*13)
        elif kind == 'air':
            v = (random.random()*2-1) * math.sin(math.pi*t/duration)**2 * .3
        elif kind == 'hat':
            v = (random.random()*2-1) * math.exp(-t*65)
        elif kind == 'pad':
            env = min(1,t/.5) * min(1,(duration-t)/.8)
            v = (math.sin(2*math.pi*freq*t)+.25*math.sin(2*math.pi*freq*2.003*t)) * env * .45
        else:
            env = (1-math.exp(-t*120))*math.exp(-t*5)
            v = (math.sin(2*math.pi*freq*t)+.2*math.sin(2*math.pi*freq*2*t)) * env
        v *= gain
        left[first+j] += v * (1-pan*.35)
        right[first+j] += v * (1+pan*.35)
# C minor / Ab / Eb / Bb. Subtle cinematic bed.
for s, notes in [(0,[130.813,155.563,195.998]),(5,[103.826,130.813,155.563]),(10,[155.563,195.998,233.082]),(15,[116.541,146.832,174.614])]:
    for i,n in enumerate(notes): tone(s,5,n,.08,(i-1)*.7,'pad')
notes=[261.626,391.995,311.127,523.251,391.995,622.254,466.164,391.995]
for k in range(40):
    s=k*.5
    tone(s,.38,55,.25,kind='kick')
    if s>=3:
        tone(s+.25,.1,0,.035,.45,'hat')
        tone(s,.85,notes[k%8],.07,(-1 if k%2 else 1)*.65)
        if s+.26<20: tone(s+.26,.7,notes[k%8],.025,-.5)
for s in [2.65,7.65,12.65,16.65]: tone(s,.55,0,.16,kind='air')
for s in [3,8,13,17]:
    tone(s,1.6,783.99,.08,-.3)
    tone(s+.04,1.6,1046.5,.04,.3)
# Final soft resolve.
tone(17,3,65.406,.12,kind='pad')
peak=max(max(map(abs,left)),max(map(abs,right)),.01)
out=array.array('h')
for i,(l,r) in enumerate(zip(left,right)):
    t=i/sr
    fade=min(1,t/.15,(length-t)/.65)
    out.extend((int(l/peak*.72*fade*32767),int(r/peak*.72*fade*32767)))
path=Path(__file__).resolve().parent.parent/'public/futuro-original.wav'
with wave.open(str(path),'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(out.tobytes())
print(f'Created original stereo soundtrack: {path.name} ({length}s)')
