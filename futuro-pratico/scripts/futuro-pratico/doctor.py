import json,shutil,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
def version(cmd):
 p=subprocess.run(cmd,capture_output=True,text=True,cwd=ROOT);return {'ok':p.returncode==0,'version':p.stdout.splitlines()[0] if p.stdout else ''}
report={'node':version(['node','--version']),'npm':version(['npm','--version']),'python':sys.version.split()[0],'chromium':shutil.which('chromium'),'ffmpeg':shutil.which('ffmpeg'),'ffprobe':shutil.which('ffprobe'),'lockfile':(ROOT/'package-lock.json').is_file(),'dependencies':(ROOT/'node_modules/remotion/package.json').is_file(),'tts':'not configured; no service called','research':'requires tools; no research claimed','paidCalls':0}
for mod in ['PIL','jsonschema']:
 try:__import__(mod);report[mod]=True
 except ImportError:report[mod]=False
print(json.dumps(report,indent=2));sys.exit(0 if all([report['node']['ok'],report['npm']['ok'],report['chromium'],report['ffmpeg'],report['ffprobe'],report['dependencies'],report['PIL'],report['jsonschema']]) else 1)
