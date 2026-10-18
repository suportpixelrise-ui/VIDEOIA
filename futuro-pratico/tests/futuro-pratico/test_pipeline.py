import copy,importlib.util,json,subprocess,tempfile,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('pipeline',ROOT/'scripts/futuro-pratico/pipeline.py');p=importlib.util.module_from_spec(spec);spec.loader.exec_module(p)
class PipelineTests(unittest.TestCase):
 def setUp(self):self.ep=p.load(ROOT/'docs/futuro-pratico/templates/episode.json')
 def test_template_valid_but_not_exportable(self):
  self.assertEqual(p.validate(self.ep)['durationInFrames'],240);self.assertIn('audio/rights pending',p.blockers(self.ep));self.assertIn('unfilled template',p.blockers(self.ep))
 def test_invalid_schema_timeline_asset_source(self):
  for mutate in [lambda e:e.update(fps=0),lambda e:e.update(fps=30),lambda e:e['scenes'][0].update(durationSeconds=-1),lambda e:e['scenes'][0].update(transitionSeconds=1),lambda e:e['scenes'][0].update(backgroundId='cenarios.missing'),lambda e:e['scenes'][0].update(evidence='fact'),lambda e:e['scenes'][0].update(sourceIds=['missing']),lambda e:e['scenes'][0].update(assets=[])]:
   ep=copy.deepcopy(self.ep);mutate(ep)
   with self.assertRaises(Exception):p.validate(ep)
 def test_revisions_invalidate_review_and_stage(self):
  h=p.input_hash(self.ep);self.ep['qa'].update(inputHash=h,reviewer='test',visual=True,audio=True,editorial=True,rights=True,notes='test only');self.ep['records']['brief']={'inputHash':h,'at':'test','toolVersions':{},'outputs':[]}
  self.assertEqual(p.input_hash(self.ep),h);self.ep['script']='Changed';self.assertNotEqual(p.input_hash(self.ep),h)
  self.assertIn('missing/stale stage: brief',p.blockers(self.ep));self.assertIn('current human QA missing',p.blockers(self.ep))
 def test_missing_or_escaping_audio_rejected(self):
  for name in ['../secret','/etc/passwd','a\\b']:
   with self.assertRaises(ValueError):p.public_file(name)
 def test_init_is_non_destructive(self):
  with tempfile.TemporaryDirectory() as d:
   args=['python3',str(ROOT/'scripts/futuro-pratico/pipeline.py'),'init','test-infra','--destination',d]
   a=subprocess.run(args,capture_output=True);self.assertEqual(a.returncode,0)
   target=Path(d)/'test-infra/episode.json';before=target.read_bytes()
   b=subprocess.run(args,capture_output=True);self.assertNotEqual(b.returncode,0);self.assertEqual(target.read_bytes(),before)
 def test_ready_fixture_gate_and_changed_audio(self):
  # Synthetic bytes and mocked ffprobe are a unit fixture, never final audio.
  from unittest.mock import patch
  from types import SimpleNamespace
  real_run=p.subprocess.run
  def run(args,**kwargs):
   if args[0]=='ffprobe':return SimpleNamespace(stdout=json.dumps({'streams':[{'codec_type':'audio'}],'format':{'duration':'10'}}),returncode=0)
   return real_run(args,**kwargs)
  with tempfile.TemporaryDirectory(dir=ROOT/'public',prefix='fp-unit-') as directory:
   folder=Path(directory);audio=folder/'fixture.wav';audio.write_bytes(b'SYNTHETIC TEST FIXTURE')
   captions=folder/'captions.json';captions.write_text(json.dumps([{'start':0,'end':1,'text':'Teste de legenda'}]))
   ep=copy.deepcopy(self.ep);ep['topic']='Teste';ep['objective']='Teste';ep['script']='Roteiro fictício';ep['narration']='Narração fictícia';ep['scenes'][0].update(action='Teste',title='Teste',screenText='Teste')
   ep['audio'].update(status='ready',file=str(audio.relative_to(ROOT/'public')),durationSeconds=10,rightsReviewed=True)
   ep['captions'].update(status='ready',file=str(captions.relative_to(ROOT/'public')),timingOrigin='human-audio');ep['status']='ready-to-export'
   h=p.input_hash(ep);ep['qa'].update(inputHash=h,reviewer='unit test',notes='Synthetic fixture only',visual=True,audio=True,editorial=True,rights=True)
   for stage in p.STAGES:ep['records'][stage]={'inputHash':h,'at':'test','toolVersions':{},'outputs':[]}
   with patch.object(p.subprocess,'run',side_effect=run):self.assertEqual(p.blockers(ep),[])
   audio.write_bytes(b'CHANGED SYNTHETIC FIXTURE');self.assertNotEqual(p.input_hash(ep),h)
   with patch.object(p.subprocess,'run',side_effect=run):self.assertIn('current human QA missing',p.blockers(ep))
 def test_caption_export_srt_vtt(self):
  with tempfile.TemporaryDirectory(dir=ROOT/'public',prefix='fp-unit-') as directory:
   folder=Path(directory);captions=folder/'captions.json';captions.write_text(json.dumps([{'start':0.123,'end':1.456,'text':'Olá'}]))
   ep=copy.deepcopy(self.ep);ep['audio']['durationSeconds']=10;ep['captions'].update(status='ready',file=str(captions.relative_to(ROOT/'public')),timingOrigin='human-audio')
   episode=folder/'episode.json';episode.write_text(json.dumps(ep));dest=folder/'output'
   result=subprocess.run(['python3',str(ROOT/'scripts/futuro-pratico/pipeline.py'),'captions',str(episode),'--destination',str(dest)],capture_output=True,text=True)
   self.assertEqual(result.returncode,0,result.stderr);self.assertIn('00:00:00,123 --> 00:00:01,456',(dest/'captions.srt').read_text());self.assertTrue((dest/'captions.vtt').read_text().startswith('WEBVTT'))
 def test_skills_yaml_and_references(self):
  result=subprocess.run(['python3',str(ROOT/'scripts/futuro-pratico/check_skills.py')],capture_output=True,text=True)
  self.assertEqual(result.returncode,0,result.stderr)
 def test_export_blocks_before_renderer(self):
  result=subprocess.run(['node',str(ROOT/'scripts/futuro-pratico/export.mjs'),str(ROOT/'docs/futuro-pratico/templates/episode.json'),'vertical-compact','/tmp/NEVER-RENDER.mp4'],capture_output=True,text=True)
  self.assertNotEqual(result.returncode,0);self.assertIn('Export blocked',result.stderr);self.assertFalse(Path('/tmp/NEVER-RENDER.mp4').exists())
if __name__=='__main__':unittest.main()
