(()=>{'use strict';
const STYLE='gfdUniversalSearchV232Style',BOX='gfdUniversalSearchResults';
const aliases={stemi:'st elevation myocardial infarction',mi:'myocardial infarction',cva:'stroke',ams:'altered mental status',sob:'shortness of breath',cp:'chest pain',epi:'epinephrine',amio:'amiodarone',narcan:'naloxone',ntg:'nitroglycerin',nitro:'nitroglycerin',asa:'aspirin',d10:'dextrose',d50:'dextrose',bvm:'bag valve mask',ett:'endotracheal',rosc:'return spontaneous circulation',svt:'supraventricular tachycardia',afib:'atrial fibrillation',a fib:'atrial fibrillation',vtach:'ventricular tachycardia',v tach:'ventricular tachycardia',vfib:'ventricular fibrillation',v fib:'ventricular fibrillation',peds:'pediatric',ped:'pediatric',tox:'toxicology',od:'overdose',nkch:'north kansas city hospital',ku:'kansas university hospital',cmh:'childrens mercy hospital'};
let input=null,box=null,index=[],timer=0;
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function words(s){return norm(s).split(' ').filter(Boolean)}
function edit(a,b){if(a===b)return 0;if(!a)return b.length;if(!b)return a.length;let p=Array(b.length+1).fill(0).map((_,i)=>i);for(let i=1;i<=a.length;i++){let n=[i];for(let j=1;j<=b.length;j++)n[j]=Math.min(n[j-1]+1,p[j]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=n}return p[b.length]}
function expand(q){const n=norm(q);return norm(n+' '+(aliases[n]||''))}
function typeOf(el,text){const s=norm((el.dataset?.type||'')+' '+(el.closest?.('[data-section]')?.dataset?.section||'')+' '+(el.closest?.('[id]')?.id||'')+' '+text);if(/hospital|destination|er phone/.test(s))return 'Hospital';if(/medication|meds|drug dose/.test(s))return 'Medication';if(/tool|calculator|criteria|helper|checklist/.test(s))return 'Tool';if(/toxic|street drug|overdose/.test(s))return 'Toxicology';if(/phone|hotline|contact/.test(s))return 'Phone';return 'Protocol'}
function titleOf(el){return (el.dataset?.searchTitle||el.getAttribute?.('aria-label')||el.querySelector?.('h1,h2,h3,h4,strong,.title,.name')?.textContent||el.textContent||'').replace(/\s+/g,' ').trim()}
function rebuild(){
 const els=[...document.querySelectorAll('button,[role="button"],a[href],.card,.protocol-card,.tool-card,[data-search-title]')];
 const seen=new Set();index=[];
 for(const el of els){if(el.closest('#'+BOX)||el.closest('#gfdProfileBackdrop'))continue;const title=titleOf(el);if(title.length<2||title.length>180)continue;const key=norm(title);if(!key||seen.has(key))continue;seen.add(key);index.push({el,title,type:typeOf(el,title),hay:norm(title+' '+(el.dataset?.keywords||'')+' '+(el.getAttribute?.('title')||''))})}
}
function score(item,q){
 const qq=expand(q),qt=words(qq),h=item.hay;if(!qt.length)return -1;let s=0;
 for(const w of qt){if(h===w)s+=120;else if(h.startsWith(w))s+=70;else if(h.includes(' '+w)||h.includes(w+' '))s+=55;else if(h.includes(w))s+=38;else{let best=99;for(const hw of words(h))if(Math.abs(hw.length-w.length)<=2)best=Math.min(best,edit(hw,w));if((w.length>=5&&best<=2)||(w.length>=3&&best<=1))s+=18;else return -1}}
 if(norm(item.title).startsWith(norm(q)))s+=45;if(item.type==='Protocol')s+=4;return s
}
function inject(){
 if(document.getElementById(STYLE))return;const s=document.createElement('style');s.id=STYLE;s.textContent=`
#gfdUniversalSearchResults{position:absolute;z-index:10020;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid #cbd5e1;border-radius:12px;box-shadow:0 12px 30px #0f172a33;max-height:min(62vh,520px);overflow:auto;text-align:left}
.gfd-us-head{padding:8px 11px 6px;color:#64748b;font-size:10px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;background:#f8fafc;position:sticky;top:0}
.gfd-us-row{width:100%;border:0;border-top:1px solid #eef2f7;background:#fff;color:#0f172a;padding:10px 12px;display:grid;grid-template-columns:auto 1fr auto;gap:9px;align-items:center;text-align:left;min-height:48px}
.gfd-us-row:active,.gfd-us-row:hover{background:#eff6ff}.gfd-us-kind{font-size:9px;font-weight:950;letter-spacing:.05em;text-transform:uppercase;background:#e2e8f0;color:#334155;border-radius:999px;padding:4px 6px}.gfd-us-title{font-size:13px;font-weight:850;line-height:1.25}.gfd-us-arrow{color:#64748b;font-weight:900}.gfd-us-empty{padding:15px;color:#64748b;font-size:13px}
body.dark-mode #gfdUniversalSearchResults{background:#111827;border-color:#475569}body.dark-mode .gfd-us-head{background:#0f172a;color:#94a3b8}body.dark-mode .gfd-us-row{background:#111827;color:#f8fafc;border-color:#263244}body.dark-mode .gfd-us-row:active,body.dark-mode .gfd-us-row:hover{background:#173a5e}body.dark-mode .gfd-us-kind{background:#334155;color:#e5e7eb}body.dark-mode .gfd-us-empty{color:#cbd5e1}
`;document.head.appendChild(s)
}
function findInput(){
 const candidates=[...document.querySelectorAll('input[type="search"],input[placeholder*="search" i],input[id*="search" i]')].filter(x=>!x.closest('#gfdProfileBackdrop'));
 return candidates.find(x=>x.offsetParent!==null)||candidates[0]||null
}
function mount(){
 inject();const found=findInput();if(!found)return false;if(found===input&&box)return true;input=found;
 const host=input.parentElement;if(!host)return false;if(getComputedStyle(host).position==='static')host.style.position='relative';
 document.getElementById(BOX)?.remove();box=document.createElement('div');box.id=BOX;box.hidden=true;host.appendChild(box);
 input.setAttribute('autocomplete','off');input.setAttribute('aria-autocomplete','list');input.setAttribute('aria-controls',BOX);
 input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>show(input.value),40)});
 input.addEventListener('focus',()=>{if(input.value.trim())show(input.value)});
 input.addEventListener('keydown',e=>{if(e.key==='Escape'){box.hidden=true;input.blur()}});
 document.addEventListener('pointerdown',e=>{if(box&&!box.contains(e.target)&&e.target!==input)box.hidden=true},{passive:true});
 rebuild();return true
}
function show(q){
 if(!box)return;const query=q.trim();if(!query){box.hidden=true;return}rebuild();
 const hits=index.map(x=>({x,s:score(x,query)})).filter(r=>r.s>=0).sort((a,b)=>b.s-a.s).slice(0,12);
 box.innerHTML=hits.length?'<div class="gfd-us-head">Search the entire app</div>'+hits.map((r,i)=>`<button type="button" class="gfd-us-row" data-i="${i}"><span class="gfd-us-kind">${r.x.type}</span><span class="gfd-us-title"></span><span class="gfd-us-arrow">›</span></button>`).join(''):'<div class="gfd-us-empty">No app results. Try a medication name, protocol, tool, hospital, phone number topic, or common abbreviation.</div>';
 hits.forEach((r,i)=>{const row=box.querySelector('[data-i="'+i+'"]');row.querySelector('.gfd-us-title').textContent=r.x.title;row.onclick=()=>open(r.x)});
 box.hidden=false
}
function open(item){
 box.hidden=true;const el=item.el;try{el.scrollIntoView({block:'center',behavior:'auto'})}catch(e){}
 if(typeof el.click==='function')el.click();else el.dispatchEvent(new MouseEvent('click',{bubbles:true}));
 input.value='';input.dispatchEvent(new Event('input',{bubbles:true}))
}
function start(){if(!mount()){let tries=0;const t=setInterval(()=>{tries++;if(mount()||tries>30)clearInterval(t)},250)}new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(()=>{if(!input||!document.contains(input))mount();else rebuild()},180)}).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();