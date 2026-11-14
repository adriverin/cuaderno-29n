'use strict';
const BlindMode = (() => {
 // Hide attribution, preserving the actual policy (including its territorial scope).
 function masker(parties) {
  const names=[...parties.flatMap(p=>[p.name,p.short]),'Partido Popular','Partido Socialista Obrero Español','Movimiento Sumar','Sumar','Izquierda Unida','IU','PSdeG-PSOE','PSC-PSOE','PSC','PSOE','PP','VOX','BNG','ERC','Junts','EH Bildu','EAJ-PNV','PNV','Podemos','Frente Amplio'];
  const people=['Noemí Santana','Jaime de los Santos','Alberto Núñez Feijóo','Núñez Feijóo','Feijóo','Pedro Sánchez','Sánchez','Santiago Abascal','Abascal','Irene Montero','Montero','Ada Colau','Colau','Ione Belarra','Belarra','Yolanda Díaz','Gabriel Rufián','Rufián','Míriam Nogueras','Nogueras','Carles Puigdemont','Puigdemont','Arnaldo Otegi','Otegi','Aitor Esteban','Esteban','José María Llanos','Llanos','Ana Pontón','Pontón','Néstor Rego','Rego','Carme da Silva'];
  const pattern=list=>new RegExp('(?<![\\p{L}\\p{N}])(?:'+[...new Set(list)].sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![\\p{L}\\p{N}])','giu');
  const partiesRE=pattern(names),peopleRE=pattern(people);
  return text=>String(text??'').replace(partiesRE,'[partido]').replace(peopleRE,'[representante]');
 }
 function shuffledIds(ids,random=Math.random){const a=[...ids];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function restoreOrder(saved,ids){const valid=new Set(ids),seen=new Set(),out=[];for(const id of Array.isArray(saved)?saved:[]){if(valid.has(id)&&!seen.has(id)){out.push(id);seen.add(id);}}return out.concat(ids.filter(id=>!seen.has(id)));}
 return {masker,shuffledIds,restoreOrder};
})();
if(typeof module!=='undefined')module.exports=BlindMode;
