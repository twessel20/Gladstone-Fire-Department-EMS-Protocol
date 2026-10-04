(()=>{'use strict';
const STYLE='gfdProtocolReadabilityV236Style';
const HEADING=/^(indications?|contraindications?|precautions?|side effects?|treatment|assessment|procedure|notes?|medical control|adult|pediatric|special considerations?|transport|destination|documentation|broken seal procedure|purpose|definition|definitions|warning|warnings|caution|considerations?)\s*:?$/i;
const BULLET=/^[•●▪◦]\s*/;const ENUM=/^(\d+\.|[A-Z]\.|\([a-z0-9]+\))\s+/;
const CLINICAL=/assessment|treatment|airway|breathing|circulation|cardiac|arrest|stemi|stroke|seizure|shock|trauma|burn|overdose|anaphyl|respiratory|altered|hypogly|hypergly|pain|nausea|brady|tachy|fibrillation|asthma|copd|obstetric|pediatric|medical emergency|behavioral/i;
const REFERENCE=/professionalism|authorization|systems design|drug accountability|documentation|appendix|faq|form|policy|guideline/i;
function cleanText(s){return String(s||'').replace(/\uFFFE|\uFFFD|￾/g,'-').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').trim()}
function terminal(s){return /[.!?;:”")\]]$/.test(s)}
function startsNew(s){return HEADING.test(s)||BULLET.test(s)||ENUM.test(s)||/^[A-Z][A-Z0-9 /&()-]{4,}:?$/.test(s)}
function mergeLines(lines){const out=[];for(const raw of lines){const s=cleanText(raw);if(!s)continue;if(!out.length||startsNew(s)||terminal(out.at(-1))||startsNew(out.at(-1))){out.push(s);continue}const p=out.at(-1);if(p.length>=45||/[,(:-]$/.test(p)||/^[a-z(]/.test(s))out[out.length-1]=cleanText(p+' '+s);else out.push(s)}return out}
function classify(s){if(HEADING.test(s)||/^[A-Z][A-Z0-9 /&()-]{4,}:?$/.test(s))return'head';if(BULLET.test(s)||ENUM.test(s))return'item';return'para'}
function clinical(root,raw){const context=(root.closest('.card')?.querySelector('.title,h1,h2,h3')?.textContent||'')+' '+raw.slice(0,6).join(' ');return CLINICAL.test(context)&&!REFERENCE.test(context)}
function enhance(root){if(!root||root.dataset.readability236==='1')return;
 // Existing purpose-built flowcharts are authoritative UI; never flatten or replace them.
 if(root.querySelector('.flowchart,.workflow-sheet,.flow-node,.workflow-node,.flow-decision')){root.dataset.readability236='1';return}
 const lines=[...root.querySelectorAll(':scope > .line')];if(lines.length<2)return;const raw=lines.map(x=>x.textContent||''),merged=mergeLines(raw);if(!merged.length)return;
 const isClinical=clinical(root,merged),frag=document.createDocumentFragment();let list=null,step=0;
 for(const text of merged){const kind=classify(text);
  if(kind==='head'){list=null;const h=document.createElement('div');h.className=isClinical?'gfd-flow-heading':'gfd-proto-heading';h.textContent=text.replace(/:$/,'');frag.appendChild(h);continue}
  if(isClinical&&(kind==='item'||(kind==='para'&&text.length<190))){list=null;if(step>0){const a=document.createElement('div');a.className='gfd-flow-arrow';a.textContent='↓';a.setAttribute('aria-hidden','true');frag.appendChild(a)}step++;const d=document.createElement('div');d.className='gfd-flow-step';const k=document.createElement('div');k.className='gfd-flow-step-num';k.textContent=String(step);const body=document.createElement('div');body.className='gfd-flow-step-text';body.textContent=text.replace(BULLET,'').replace(ENUM,'');d.append(k,body);frag.appendChild(d);continue}
  if(kind==='item'){if(!list){list=document.createElement('div');list.className='gfd-proto-list';frag.appendChild(list)}const d=document.createElement('div');d.className='gfd-proto-item';d.textContent=text.replace(BULLET,'');list.appendChild(d);continue}
  list=null;const p=document.createElement('p');p.className=isClinical?'gfd-flow-note':'gfd-proto-paragraph';p.textContent=text;frag.appendChild(p)
 }
 lines.forEach(x=>x.remove());root.appendChild(frag);root.dataset.readability236='1'}
function scan(root=document){root.querySelectorAll?.('.protocol-body').forEach(enhance)}
function styles(){if(document.getElementById(STYLE))return;document.getElementById('gfdProtocolReadabilityV235Style')?.remove();const s=document.createElement('style');s.id=STYLE;s.textContent=`
.gfd-proto-heading,.gfd-flow-heading{margin:18px 0 8px;padding:8px 10px;border-left:4px solid #2f6690;background:#eef6ff;border-radius:8px;color:#173a5e;font-size:13px;font-weight:950;letter-spacing:.035em;text-transform:uppercase}.gfd-proto-paragraph{margin:9px 0;font-size:16px;line-height:1.52;max-width:72ch}.gfd-proto-list{display:grid;gap:7px;margin:8px 0 12px}.gfd-proto-item{position:relative;padding-left:22px;font-size:16px;line-height:1.48}.gfd-proto-item:before{content:'•';position:absolute;left:5px;color:#2f6690;font-weight:950}
.gfd-flow-step{display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;align-items:start;background:#fff;border:1px solid #cbd5e1;border-left:5px solid #2f6690;border-radius:12px;padding:11px 12px;box-shadow:0 1px 2px #00000008}.gfd-flow-step-num{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#173a5e;color:#fff;font-size:13px;font-weight:950}.gfd-flow-step-text{font-size:15.5px;line-height:1.48;padding-top:3px}.gfd-flow-arrow{text-align:center;color:#2f6690;font-size:22px;font-weight:950;line-height:1;padding:4px 0}.gfd-flow-note{margin:9px 0;padding:10px 12px;background:#f8fafc;border:1px solid #dbe4ee;border-radius:10px;font-size:15px;line-height:1.5}
body.dark-mode .gfd-proto-heading,body.dark-mode .gfd-flow-heading{background:#102a43;color:#dbeafe;border-color:#60a5fa}body.dark-mode .gfd-proto-paragraph,body.dark-mode .gfd-proto-item,body.dark-mode .gfd-flow-step-text{color:#f1f5f9}body.dark-mode .gfd-flow-step{background:#111827;border-color:#475569;border-left-color:#60a5fa}body.dark-mode .gfd-flow-step-num{background:#2f6690;color:#fff}body.dark-mode .gfd-flow-note{background:#172033;color:#f1f5f9;border-color:#475569}
`;document.head.appendChild(s)}
function start(){styles();scan();new MutationObserver(rs=>rs.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('.protocol-body'))enhance(n);scan(n)}}))).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();