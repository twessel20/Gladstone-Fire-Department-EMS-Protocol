(()=>{'use strict';
const STYLE='gfdUniversalSearchV326Style',BOX='gfdUniversalSearchResults';
const synonyms={
 stemi:'st elevation myocardial infarction',mi:'myocardial infarction',cva:'stroke',ams:'altered mental status',sob:'shortness of breath',cp:'chest pain',
 epi:'epinephrine',amio:'amiodarone',narcan:'naloxone',ntg:'nitroglycerin',nitro:'nitroglycerin',asa:'aspirin',benadryl:'diphenhydramine',zofran:'ondansetron',
 d10:'dextrose',d50:'dextrose',bvm:'bag valve mask',ett:'endotracheal',rosc:'return spontaneous circulation',svt:'supraventricular tachycardia',
 afib:'atrial fibrillation','a fib':'atrial fibrillation',aflutter:'atrial flutter','a flutter':'atrial flutter',vtach:'ventricular tachycardia','v tach':'ventricular tachycardia',
 vfib:'ventricular fibrillation','v fib':'ventricular fibrillation',peds:'pediatric',ped:'pediatric',tox:'toxicology',od:'overdose',niv:'noninvasive ventilation',
 nkch:'north kansas city hospital',ku:'kansas university hospital',cmh:'childrens mercy hospital'
};
const ROUTES=[
 {ids:['transcutaneous-pacing-procedure'],terms:['pace','pacer','pacing','tcp','transcutaneous','transcutaneous pacing','external pacing','zoll pacing'],weight:560},
 {ids:['transcutaneous-pacing-procedure'],terms:['heart block','mobitz ii','third degree block','third degree heart block','complete heart block'],weight:180},
 {titles:['bradycardia'],terms:['brady','bradycardia','slow heart rate','symptomatic bradycardia','heart block','mobitz','mobitz ii','second degree block','third degree block','third degree heart block','complete heart block'],weight:560},
 {ids:['bipap-cpap'],terms:['cpap','bipap','bi pap','niv','noninvasive ventilation','non invasive ventilation','positive pressure','respiratory support'],weight:560},
 {ids:['zoll-ventilator-procedure'],terms:['z vent','z-vent','zoll vent','zoll ventilator','vent','ventilator','portable ventilator','vent setup','vent settings','vent alarms','low flow oxygen'],weight:560},
 {ids:['versed-midazolam'],titles:['versed','midazolam'],terms:['versed','midazolam','sedation','pacing sedation','tcp sedation'],weight:540},
 {titles:['diltiazem'],terms:['diltiazem','cardizem','dilt','rate control','afib rvr','atrial fibrillation rvr'],weight:540},
 {titles:['adenosine','adenocard'],terms:['adenosine','adenocard','svt medication'],weight:540},
 {titles:['naloxone'],terms:['naloxone','narcan','opioid reversal'],weight:540},
 {titles:['epinephrine'],terms:['epinephrine','epi','adrenaline'],weight:500},
 {titles:['amiodarone'],terms:['amiodarone','amio'],weight:500},
 {titles:['nitroglycerin'],terms:['nitroglycerin','nitro','ntg'],weight:500},
 {titles:['aspirin'],terms:['aspirin','asa'],weight:500},
 {titles:['diphenhydramine'],terms:['diphenhydramine','benadryl'],weight:500},
 {titles:['ondansetron'],terms:['ondansetron','zofran'],weight:500},
 {titles:['dextrose'],terms:['dextrose','d10','d50','low blood sugar'],weight:500},
 {titles:['narrow complex tachydysrhythmias','narrow complex tachycardia'],terms:['svt','supraventricular tachycardia','afib','a fib','atrial fibrillation','aflutter','a flutter','atrial flutter','narrow complex','rvr'],weight:520},
 {titles:['wide complex tachydysrhythmias','wide complex tachycardia'],terms:['vtach','v tach','ventricular tachycardia','wide complex','wide complex tachycardia'],weight:520},
 {titles:['cardiac arrest'],terms:['cardiac arrest','vfib','v fib','ventricular fibrillation','pulseless vtach','pulseless v tach','rosc'],weight:520},
 {titles:['stroke','cerebrovascular'],terms:['stroke','cva','facial droop','stroke alert'],weight:520},
 {titles:['stemi','acute coronary','chest pain'],terms:['stemi','mi','heart attack','myocardial infarction','chest pain','acs'],weight:500},
 {titles:['poisoning','toxicology','overdose'],terms:['overdose','od','poisoning','poison','tox','toxicology','ingestion'],weight:520},
 {titles:['burns','burn'],terms:['burn','burns','thermal burn','parkland','tbsa'],weight:520},
 {titles:['seizure'],terms:['seizure','seizures','status epilepticus','convulsion'],weight:500},
 {titles:['anaphylaxis','allergic'],terms:['anaphylaxis','allergic reaction','allergy'],weight:500},
 {titles:['hypoglycemia'],terms:['hypoglycemia','low blood sugar'],weight:500},
 {titles:['hyperglycemia'],terms:['hyperglycemia','high blood sugar','dka'],weight:500},
 {titles:['respiratory distress'],terms:['respiratory distress','asthma','copd','chf','shortness of breath','sob','wheezing'],weight:430},
 {titles:['pediatric','broselow'],terms:['pediatric','peds','ped','broselow','child dosing'],weight:380}
];
let input=null,box=null,index=[],timer=0,active=-1,currentHits=[];
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function words(s){return norm(s).split(' ').filter(Boolean)}
function edit(a,b){if(a===b)return 0;if(!a)return b.length;if(!b)return a.length;let p=Array(b.length+1).fill(0).map((_,i)=>i);for(let i=1;i<=a.length;i++){let n=[i];for(let j=1;j<=b.length;j++)n[j]=Math.min(n[j-1]+1,p[j]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=n}return p[b.length]}
function phraseMatch(query,term){const q=norm(query),t=norm(term);if(!q||!t)return false;if(q===t)return true;if(q.length>=3&&(t.startsWith(q)||q.startsWith(t)))return true;return q.length>=4&&(q.includes(t)||t.includes(q))}
function routeMatchesItem(route,item){if(route.ids?.includes(item.id))return true;const title=norm(item.title);return (route.titles||[]).some(t=>title.includes(norm(t)))}
function routeTerms(item){const out=[];for(const r of ROUTES)if(routeMatchesItem(r,item))out.push(...r.terms);return out.join(' ')}
function routeBoost(item,q){let score=0;for(const r of ROUTES){if(!routeMatchesItem(r,item))continue;for(const term of r.terms){if(phraseMatch(q,term)){score=Math.max(score,r.weight+(norm(q)===norm(term)?160:0));break}}}return score}
function dataType(x){const c=norm(x.category);if(c.includes('medication'))return 'Medication';if(c.includes('procedure'))return 'Procedure';if(/hospital|destination/.test(c))return 'Hospital';if(c.includes('appendix'))return 'Reference';if(c.includes('guideline'))return 'Guideline';return 'Protocol'}
function buildDataIndex(seen){
 try{
  if(typeof data==='undefined'||!Array.isArray(data))return;
  for(const x of data){
   if(!x||!x.id||!x.title)continue;
   const title=String(x.title).trim(),key='data:'+x.id;if(seen.has(key))continue;seen.add(key);seen.add('title:'+norm(title));
   const aliases=Array.isArray(x.aliases)?x.aliases.join(' '):String(x.aliases||'');
   const lines=Array.isArray(x.lines)?x.lines.join(' ').slice(0,1800):'';
   const searchable=String(x.search||'').slice(0,1800);
   const item={source:'data',id:x.id,title,type:dataType(x),category:String(x.category||''),aliases,el:null};
   item.hay=norm(title+' '+aliases+' '+x.id.replace(/-/g,' ')+' '+routeTerms(item)+' '+lines+' '+searchable);
   index.push(item)
  }
 }catch(e){}
}
function domType(el,text){const s=norm((el.dataset?.type||'')+' '+(el.closest?.('[data-section]')?.dataset?.section||'')+' '+(el.closest?.('[id]')?.id||'')+' '+text);if(/hospital|destination|er phone/.test(s))return 'Hospital';if(/medication|meds|drug dose/.test(s))return 'Medication';if(/procedure/.test(s))return 'Procedure';if(/tool|calculator|criteria|helper|checklist/.test(s))return 'Tool';if(/toxic|street drug|overdose/.test(s))return 'Toxicology';if(/phone|hotline|contact/.test(s))return 'Phone';return 'App'}
function titleOf(el){return (el.dataset?.searchTitle||el.getAttribute?.('aria-label')||el.querySelector?.('h1,h2,h3,h4,strong,.title,.name')?.textContent||el.textContent||'').replace(/\s+/g,' ').trim()}
function buildDomIndex(seen){
 const els=[...document.querySelectorAll('button,[role="button"],a[href],.card,.protocol-card,.tool-card,[data-search-title]')];
 for(const el of els){if(el.closest('#'+BOX)||el.closest('#gfdProfileBackdrop')||el.closest('[data-zv-source-overlay]'))continue;const title=titleOf(el);if(title.length<2||title.length>180)continue;const nk=norm(title);if(!nk||seen.has('title:'+nk))continue;const key='dom:'+nk;if(seen.has(key))continue;seen.add(key);seen.add('title:'+nk);index.push({source:'dom',id:null,el,title,type:domType(el,title),category:'',aliases:'',hay:norm(title+' '+(el.dataset?.keywords||'')+' '+(el.getAttribute?.('title')||''))})}
}
function rebuild(){index=[];const seen=new Set();buildDataIndex(seen);buildDomIndex(seen)}
function baseScore(item,q){
 const qn=norm(q),qt=words(qn),h=item.hay;if(!qt.length)return -1;let s=0;
 for(const w of qt){if(h===w)s+=140;else if(h.startsWith(w))s+=85;else if(h.includes(' '+w+' ')||h.endsWith(' '+w))s+=70;else if(h.includes(w))s+=45;else{let best=99;for(const hw of words(h).slice(0,220))if(Math.abs(hw.length-w.length)<=2)best=Math.min(best,edit(hw,w));if((w.length>=5&&best<=2)||(w.length>=3&&best<=1))s+=18;else return -1}}
 const title=norm(item.title);if(title===qn)s+=220;else if(title.startsWith(qn))s+=95;else if(title.includes(qn))s+=55;
 const syn=synonyms[qn];if(syn&&h.includes(norm(syn)))s+=75;
 s+=routeBoost(item,q);
 if(item.type==='Procedure')s+=16;else if(item.type==='Medication')s+=12;else if(item.type==='Protocol')s+=8;
 return s
}
function inject(){
 if(document.getElementById(STYLE))return;const s=document.createElement('style');s.id=STYLE;s.textContent=`
#gfdUniversalSearchResults{position:absolute;z-index:10020;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid #cbd5e1;border-radius:12px;box-shadow:0 12px 30px #0f172a33;max-height:min(66vh,560px);overflow:auto;text-align:left}
.gfd-us-head{padding:8px 11px 6px;color:#64748b;font-size:10px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;background:#f8fafc;position:sticky;top:0;z-index:2}.gfd-us-row{width:100%;border:0;border-top:1px solid #eef2f7;background:#fff;color:#0f172a;padding:10px 12px;display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:9px;align-items:center;text-align:left;min-height:50px}.gfd-us-row.active,.gfd-us-row:active,.gfd-us-row:hover{background:#eff6ff}.gfd-us-kind{font-size:9px;font-weight:950;letter-spacing:.05em;text-transform:uppercase;background:#e2e8f0;color:#334155;border-radius:999px;padding:4px 6px}.gfd-us-copy{min-width:0}.gfd-us-title{display:block;font-size:13px;font-weight:900;line-height:1.25}.gfd-us-sub{display:block;font-size:10px;color:#64748b;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gfd-us-arrow{color:#64748b;font-weight:900}.gfd-us-empty{padding:15px;color:#64748b;font-size:13px}
body.dark-mode #gfdUniversalSearchResults{background:#111827;border-color:#475569}body.dark-mode .gfd-us-head{background:#0f172a;color:#94a3b8}body.dark-mode .gfd-us-row{background:#111827;color:#f8fafc;border-color:#263244}body.dark-mode .gfd-us-row.active,body.dark-mode .gfd-us-row:active,body.dark-mode .gfd-us-row:hover{background:#173a5e}body.dark-mode .gfd-us-kind{background:#334155;color:#e5e7eb}body.dark-mode .gfd-us-sub,body.dark-mode .gfd-us-empty{color:#cbd5e1}
`;document.head.appendChild(s)
}
function findInput(){const candidates=[...document.querySelectorAll('input[type="search"],input[placeholder*="search" i],input[id*="search" i]')].filter(x=>!x.closest('#gfdProfileBackdrop'));return candidates.find(x=>x.offsetParent!==null)||candidates[0]||null}
function setActive(n){if(!box||!currentHits.length){active=-1;return}active=(n+currentHits.length)%currentHits.length;box.querySelectorAll('.gfd-us-row').forEach((r,i)=>r.classList.toggle('active',i===active));box.querySelector('.gfd-us-row.active')?.scrollIntoView({block:'nearest'})}
function mount(){
 inject();const found=findInput();if(!found)return false;if(found===input&&box)return true;input=found;const host=input.parentElement;if(!host)return false;if(getComputedStyle(host).position==='static')host.style.position='relative';document.getElementById(BOX)?.remove();box=document.createElement('div');box.id=BOX;box.hidden=true;host.appendChild(box);input.setAttribute('autocomplete','off');input.setAttribute('aria-autocomplete','list');input.setAttribute('aria-controls',BOX);
 input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>show(input.value),35)});input.addEventListener('focus',()=>{if(input.value.trim())show(input.value)});
 input.addEventListener('keydown',e=>{if(box?.hidden)return;if(e.key==='Escape'){box.hidden=true;input.blur();return}if(e.key==='ArrowDown'){e.preventDefault();setActive(active+1);return}if(e.key==='ArrowUp'){e.preventDefault();setActive(active-1);return}if(e.key==='Enter'&&active>=0&&currentHits[active]){e.preventDefault();open(currentHits[active].x)}});
 document.addEventListener('pointerdown',e=>{if(box&&!box.contains(e.target)&&e.target!==input)box.hidden=true},{passive:true});return true
}
function show(q){
 if(!box)return;const query=q.trim();if(!query){box.hidden=true;currentHits=[];active=-1;return}rebuild();currentHits=index.map(x=>({x,s:baseScore(x,query)})).filter(r=>r.s>=0).sort((a,b)=>b.s-a.s||a.x.title.localeCompare(b.x.title)).slice(0,14);active=-1;
 box.innerHTML=currentHits.length?'<div class="gfd-us-head">Protocols • medications • procedures • tools</div>'+currentHits.map((r,i)=>`<button type="button" class="gfd-us-row" data-i="${i}"><span class="gfd-us-kind">${r.x.type}</span><span class="gfd-us-copy"><span class="gfd-us-title"></span><span class="gfd-us-sub"></span></span><span class="gfd-us-arrow">›</span></button>`).join(''):'<div class="gfd-us-empty">No result yet. Try the condition, medication, device, procedure, abbreviation, brand name, or common field term.</div>';
 currentHits.forEach((r,i)=>{const row=box.querySelector('[data-i="'+i+'"]');row.querySelector('.gfd-us-title').textContent=r.x.title;row.querySelector('.gfd-us-sub').textContent=r.x.source==='data'?(r.x.category||'GFD app destination'):'App shortcut';row.onclick=()=>open(r.x)});box.hidden=false
}
function open(item){
 box.hidden=true;active=-1;
 if(item.source==='data'&&item.id&&typeof openP==='function'){try{openP(item.id);finish();return}catch(e){}}
 const el=item.el;if(el){try{el.scrollIntoView({block:'center',behavior:'auto'})}catch(e){}if(typeof el.click==='function')el.click();else el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}finish()
}
function finish(){if(!input)return;input.value='';input.dispatchEvent(new Event('input',{bubbles:true}))}
function start(){if(!mount()){let tries=0;const t=setInterval(()=>{tries++;if(mount()||tries>40)clearInterval(t)},250)}new MutationObserver(()=>{if(!input||!document.contains(input)){clearTimeout(timer);timer=setTimeout(mount,100)}}).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();