import importlib.util,json,stat,tempfile,unittest,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('assets',ROOT/'scripts/futuro-pratico/assets.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
class ImportTests(unittest.TestCase):
 def archive(self,entries):
  p=Path(self.tmp.name)/'input.zip'
  with zipfile.ZipFile(p,'w',zipfile.ZIP_DEFLATED) as z:
   for name,content in entries:z.writestr(name,content)
  return p
 def setUp(self):self.tmp=tempfile.TemporaryDirectory()
 def tearDown(self):self.tmp.cleanup()
 def test_reject_paths(self):
  for name in ['../escape','/absolute','C:/windows','a/../../b','\\server\\a','a\\b','a/CON.txt','a/foo.','a//b']:
   with self.subTest(name=name),self.assertRaises(ValueError):a.inspect_zip(self.archive([(name,b'x')]))
 def test_reject_case_and_duplicate(self):
  for names in [('A.txt','a.txt'),('a','a')]:
   with self.assertRaises(ValueError):a.inspect_zip(self.archive([(n,b'x') for n in names]))
 def test_reject_prefix_collision(self):
  for names in [('a','a/b'),('a/b','a')]:
   with self.assertRaises(ValueError):a.inspect_zip(self.archive([(n,b'x') for n in names]))
 def test_reject_symlink(self):
  i=zipfile.ZipInfo('link');i.create_system=3;i.external_attr=(stat.S_IFLNK|0o777)<<16
  with self.assertRaises(ValueError):a.inspect_zip(self.archive([(i,b'/etc/passwd')]))
 def test_limits(self):
  p=self.archive([('a',b'x'*10000)])
  for lim in [dict(entries=0,total=100000,file=100000,ratio=100000),dict(entries=10,total=5,file=100000,ratio=100000),dict(entries=10,total=100000,file=5,ratio=100000),dict(entries=10,total=100000,file=100000,ratio=2)]:
   with self.assertRaises(ValueError):a.inspect_zip(p,lim)
 def test_extract_idempotent_no_overwrite(self):
  p=self.archive([('a/file.txt',b'original')]);rows=a.inspect_zip(p);stage=Path(self.tmp.name)/'stage'
  a.extract(p,stage,rows);a.extract(p,stage,rows);self.assertEqual((stage/'a/file.txt').read_bytes(),b'original')
  (stage/'a/file.txt').write_bytes(b'user change')
  with self.assertRaises(ValueError):a.extract(p,stage,rows)
 def test_svg_active_content_rejected(self):
  for text in ['<svg width="1" height="1"><script/></svg>','<svg width="1" height="1" onload="x"/>','<svg width="1" height="1"><image href="https://x"/></svg>','<!DOCTYPE svg><svg/>']:
   with self.assertRaises(ValueError):a.svg_metadata(text.encode())
 def test_distinct_contents_and_cross_zip_dedup(self):
  from unittest.mock import patch
  root=Path(self.tmp.name)/'project';root.mkdir()
  x=Path(self.tmp.name)/'one.zip';y=Path(self.tmp.name)/'two.zip'
  with zipfile.ZipFile(x,'w') as z:z.writestr('same.md','A');z.writestr('alias.md','A')
  with zipfile.ZipFile(y,'w') as z:z.writestr('same.md','B')
  with patch.object(a,'ROOT',root):
   report=a.import_archives([x,y]);a.import_archives([x,y])
  self.assertEqual(report['summary']['uniqueFiles'],2)
  self.assertEqual(report['entries'][0]['canonicalPath'],report['entries'][1]['canonicalPath'])
  self.assertNotEqual(report['entries'][0]['canonicalPath'],report['entries'][2]['canonicalPath'])
  self.assertTrue(report['entries'][2]['nameConflictWith'])
 def test_manifest_dedup_origin_integrity(self):
  r=json.loads((ROOT/'docs/futuro-pratico/importacao/inventario.json').read_text());groups={}
  for e in r['entries']:groups.setdefault(e['sha256'],set()).add(e['canonicalPath'])
  self.assertEqual(len(r['entries']),167);self.assertEqual(len(groups),116);self.assertTrue(all(len(g)==1 for g in groups.values()))
  self.assertTrue(any(e['duplicateOf'] for e in r['entries']));self.assertTrue(any(e['differences'] for e in r['manifestChecks']))
 def test_catalog_metadata(self):a.validate_catalog()
 def test_no_reference_is_public_sprite(self):
  for p in (ROOT/'public/futuro-pratico').rglob('*'):
   if p.is_file():self.assertIn(p.parent.name,['personagens','retratos','cenarios','objetos','overlays'])
if __name__=='__main__':unittest.main()
