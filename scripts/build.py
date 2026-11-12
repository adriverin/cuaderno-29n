from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent
parts = [ROOT/'research'/n for n in ('pp_vox.json','left.json','territorial.json','bng.json')]
sources, parties = [], []
for path in parts:
    if path.exists():
        data = json.loads(path.read_text())
        sources.extend(data['sources']); parties.extend(data['parties'])
topics = [
 ('vivienda','Vivienda'),('economia','Economía e impuestos'),('empleo','Trabajo y salarios'),
 ('sanidad','Sanidad y cuidados'),('educacion','Educación y cultura'),('pensiones','Pensiones y protección'),
 ('inmigracion','Inmigración'),('igualdad','Igualdad y derechos'),('territorio','Modelo territorial'),
 ('instituciones','Democracia e instituciones'),('clima','Clima y energía'),('exterior','Europa y política exterior'),
 ('seguridad','Seguridad y justicia'),('tecnologia','Tecnología y ciencia'),('rural','Campo, mar y transporte')]
data={'version':'2026-11-11.1','updated':'2026-11-11','topics':[{'id':i,'name':n} for i,n in topics], 'parties':parties,'sources':sources}
data['methodSources']=[
 {'title':'Convocatoria oficial: Real Decreto 806/2026','url':'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742'},
 {'title':'Candidaturas proclamadas: BOE 3 de noviembre','url':'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103'},
 {'title':'Resultados de referencia de julio de 2023 (escrutinio provisional)','url':'https://resultados.generales23j.es/assets/files/congreso.pdf'},
 {'title':'Congreso: función de investidura del presidente','url':'https://www.congreso.es/es/cem/func'}]
ids=set(); source_ids={s['id'] for s in sources}; topic_ids={t[0] for t in topics}
assert len(source_ids)==len(sources),'Duplicate source ID'
for party in parties:
    assert party['id'] not in ids,'Duplicate party ID'
    ids.add(party['id'])
    for p in party['positions']:
        assert p['id'] not in ids,f"Duplicate position: {p['id']}"
        ids.add(p['id'])
        assert p['topic'] in topic_ids,f"Unknown topic: {p['topic']}"
        assert p['sourceIds'] and all(s in source_ids for s in p['sourceIds']), f"Unknown source in {p['id']}"
    for ideal in party.get('ideals',[]):
        assert all(s in source_ids for s in ideal.get('sourceIds',[])), 'Unknown ideal source'
encoded=json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
template=(ROOT/'src/template.html').read_text()
for token,path in [('__CSS__','src/styles.css'),('__CORE__','src/core.js'),('__APP__','src/app.js')]:
    template=template.replace(token,(ROOT/path).read_text())
template=template.replace('__DATA__',encoded)
(ROOT/'index.html').write_text(template)
(ROOT/'research/dataset.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(f"Built index.html: {len(parties)} parties, {sum(len(p['positions']) for p in parties)} policy cards, {len(sources)} sources.")
