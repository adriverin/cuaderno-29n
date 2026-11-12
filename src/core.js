'use strict';
const NotebookCore = (() => {
 const CURRENT_KINDS = new Set(['manifesto_2026','official_position','statement']);
 const empty = () => ({schema:1,ratings:{},topicWeights:{},updatedAt:null});
 const isAgreement = n => Number.isInteger(n) && n >= -2 && n <= 2;
 function validateImport(input, validIds, validTopics) {
  if (!input || input.schema !== 1 || !input.ratings || typeof input.ratings !== 'object' || Array.isArray(input.ratings)) throw new Error('El archivo no tiene el formato de un cuaderno 29N.');
  const result=empty();let ignored=0;
  for(const [id,r] of Object.entries(input.ratings)) {
   if(!validIds.has(id)){ignored++;continue;}
   if(!r || typeof r!=='object' || !(r.agreement===null || isAgreement(r.agreement)) || !Number.isInteger(r.importance) || r.importance<1 || r.importance>5 || typeof r.essential!=='boolean' || typeof r.note!=='string' || r.note.length>12000) throw new Error('Hay una respuesta con valores inválidos. No se ha importado nada.');
   result.ratings[id]={agreement:r.agreement,importance:r.importance,essential:r.essential,note:r.note};
  }
  if(input.topicWeights && typeof input.topicWeights==='object') for(const [id,n] of Object.entries(input.topicWeights)){if(validTopics.has(id) && Number.isInteger(n) && n>=0 && n<=5)result.topicWeights[id]=n;}
  return {state:result,ignored};
 }
 const ratingFor=(state,id)=>state.ratings[id] || {agreement:null,importance:3,essential:false,note:''};
 function summarize(positions,state,partyId,commonTopics=null){
  const all=positions.filter(p=>p.partyId===partyId && CURRENT_KINDS.has(p.kind));
  const groups=new Map();let rated=0,essentials=0,essentialAgainst=0;
  for(const p of all){const r=ratingFor(state,p.id);if(r.essential)essentials++;if(r.essential && r.agreement<0)essentialAgainst++;if(!isAgreement(r.agreement))continue;rated++;if(commonTopics && !commonTopics.has(p.topic))continue;const g=groups.get(p.topic)||{sum:0,weight:0};g.sum+=r.agreement*r.importance;g.weight+=r.importance;groups.set(p.topic,g);}
  let sum=0,weight=0,usedTopics=0;
  for(const [t,g] of groups){const w=state.topicWeights[t]??3;if(w===0)continue;sum+=(g.sum/g.weight)*w;weight+=w;usedTopics++;}
  return {score:weight?Math.round(50*sum/weight):null,rated,total:all.length,topics:groups.size,usedTopics,essentials,essentialAgainst};
 }
 function commonRatedTopics(positions,state,partyIds){
  if(partyIds.length<2)return new Set();
  const sets=partyIds.map(id=>new Set(positions.filter(p=>p.partyId===id && CURRENT_KINDS.has(p.kind) && isAgreement(ratingFor(state,p.id).agreement) && (state.topicWeights[p.topic]??3)>0).map(p=>p.topic)));
  return new Set([...sets[0]].filter(t=>sets.every(s=>s.has(t))));
 }
 return {empty,isAgreement,validateImport,ratingFor,summarize,commonRatedTopics,CURRENT_KINDS};
})();
if(typeof module!=='undefined')module.exports=NotebookCore;
