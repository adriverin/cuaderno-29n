"""Verify full editorial coverage and compatibility with existing saved answers."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parent.parent
review = json.loads((ROOT / 'research/editorial-review.json').read_text())
data = json.loads((ROOT / 'research/dataset.json').read_text())
old = {p['id']: p for p in review['cards']}
seen = set()

def fingerprint(value):
    encoded = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(encoded.encode()).hexdigest()

def numbers(value):
    return set(re.findall(r'\d+(?:[.,]\d+)*', value))

for party in data['parties']:
    for p in party['positions']:
        assert p['id'] not in seen
        seen.add(p['id'])
        previous = old[p['id']]
        assert p['summary'] != previous['originalSummary'], p['id']
        assert numbers(previous['originalSummary']) <= numbers(p['title'] + ' ' + p['summary']), p['id']
        meta = {k: v for k, v in p.items() if k not in ('title', 'summary', 'qualification')}
        assert fingerprint(meta) == previous['metadataSha256'], p['id']
    for i, ideal in enumerate(party['ideals'], 1):
        id = party['id'] + '-principio-' + str(i)
        seen.add(id)
        assert ideal['text'] != old[id]['originalTitle'], id
        assert fingerprint({k: v for k, v in ideal.items() if k != 'text'}) == old[id]['metadataSha256'], id
assert seen == set(old)
assert len(seen) == 387
assert len(seen) - sum(p['kind'] == 'historical' for a in data['parties'] for p in a['positions']) == 377
print('All 387 cards reviewed; figures, IDs, evidence types and source metadata preserved.')
