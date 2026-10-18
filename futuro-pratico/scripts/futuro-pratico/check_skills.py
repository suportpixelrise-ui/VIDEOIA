"""Validate real YAML and relative references; does not claim live Codex activation."""
import re
from pathlib import Path
import yaml
ROOT=Path(__file__).resolve().parents[3]
def validate():
 files=sorted((ROOT/'.agents/skills').glob('fp-*/SKILL.md'));assert len(files)==5
 for p in files:
  text=p.read_text();parts=text.split('---',2);assert len(parts)==3 and not parts[0].strip(),p
  meta=yaml.safe_load(parts[1]);assert isinstance(meta,dict)
  assert meta['name']==p.parent.name and re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*',meta['name']),p
  assert isinstance(meta['description'],str) and meta['description'].strip(),p
  for link in re.findall(r'\]\(([^)]+)\)',text):
   if not link.startswith(('https://','http://','#')):assert (p.parent/link).is_file(),(p,link)
 print('5 Skills: valid YAML, unique names and resolvable relative references')
if __name__=='__main__':validate()
