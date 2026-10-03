(()=>{
'use strict';
const KEY='gfdPatientContextV1';
const COLORS=['Gray','Pink','Red','Purple','Yellow','White','Blue','Orange','Green'];
const DEFAULT={mode:'adult',age:'',ageUnit:'years',weightKg:'',weightSource:'',broselowColor:''};
let ctx=load();

function load(){try{return {...DEFAULT,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return {...DEFAULT}}}
function save(){localStorage.setItem(KEY,JSON.stringify(ctx));document.dispatchEvent(new CustomEvent('gfd:patient-context',{detail:{...ctx}}));renderStatus();decorateClinicalView()}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#039;'}[m]))}
function poundsToKg(lb){const n=parseFloat(lb);return Number.isFinite(n)?Math.round((n/2.2046226218)*10)/10:''}
function kgToLb(kg){const n=parseFloat(kg);return Number.isFinite(n)?Math.round((n*2.2046226218)*10)/10:''}

function injectStyles(){
 const s=document.createElement('style');
 s.id='gfd-patient-context-styles';
 s.textContent=`
.gfd-patient-mode{margin-top:9px;display:grid;grid-template-columns:1fr 1fr;gap:7px}
.gfd-patient-mode button{min-height:42px;border:1px solid #ffffff66;background:#ffffff18;color:#fff;border-radius:10px;font-weight:900;font-size:14px}
.gfd-patient-mode button.on{background:#fff;color:#173a5e;box-shadow:inset 0 -3px 0 #d7c79a}
.gfd-ped-status{display:none;margin-top:8px;border-radius:10px;padding:8px 10px;background:#fff7ed;color:#7c2d12;border:1px solid #fed7aa;font-size:12px;font-weight:850;line-height:1.35;cursor:pointer}
.gfd-ped-status.on{display:block}
.gfd-ped-chip{display:inline-block;background:#c2410c;color:#fff;border-radius:999px;padding:3px 7px;margin-right:5px;font-size:10px;letter-spacing:.04em}
.gfd-patient-modal-backdrop{position:fixed;inset:0;z-index:9998;background:#0f172acc;display:flex;align-items:flex-end;justify-content:center;padding:0}
.gfd-patient-modal{width:min(760px,100%);max-height:92vh;overflow:auto;background:#f8fafc;border-radius:18px 18px 0 0;padding:16px;padding-bottom:calc(18px + env(safe-area-inset-bottom));box-shadow:0 -12px 40px #0005}
.gfd-patient-modal h2{margin:0;color:#173a5e}.gfd-patient-modal p{color:#475569;line-height:1.4}
.gfd-grid2{display:grid;grid-template-columns:1fr 1fr;gap:9px}.gfd-field{margin-top:10px}.gfd-field label{display:block;font-weight:900;font-size:12px;color:#334155;margin-bottom:5px}.gfd-field input,.gfd-field select{width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:11px;font-size:16px;background:#fff}
.gfd-broselow-colors{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:7px}.gfd-broselow-colors button{border:1px solid #cbd5e1;border-radius:9px;padding:10px 6px;background:#fff;font-weight:850}.gfd-broselow-colors button.on{outline:3px solid #173a5e}
.gfd-modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px}.gfd-modal-actions button{border:0;border-radius:10px;padding:12px;font-weight:900}.gfd-primary{background:#173a5e;color:white}.gfd-secondary{background:#e2e8f0;color:#0f172a}.gfd-danger{grid-column:1/-1;background:#fff1f2!important;color:#9f1239!important;border:1px solid #fecdd3!important}
.gfd-authority-note{margin:10px 0 12px;padding:10px 11px;border-radius:10px;background:#eef6ff;border:1px solid #bfdbfe;color:#1e3a8a;font-size:12px;line-height:1.4}.gfd-authority-note b{display:block;margin-bottom:2px}
.gfd-ped-context-card{margin:10px 0 12px;padding:11px 12px;border:1px solid #fed7aa;border-left:5px solid #c2410c;background:#fff7ed;border-radius:10px;color:#7c2d12}.gfd-ped-context-card .gfd-row{display:flex;flex-wrap:wrap;gap:7px;align-items:center}.gfd-ped-context-card button{margin-left:auto;border:0;border-radius:8px;background:#c2410c;color:#fff;font-weight:850;padding:7px 9px}
body.gfd-pediatric .section{border-left:3px solid #fb923c;padding-left:8px}
@media(min-width:700px){.gfd-patient-modal-backdrop{align-items:center;padding:20px}.gfd-patient-modal{border-radius:18px}.gfd-broselow-colors{grid-template-columns:repeat(5,1fr)}}
`;
 document.head.appendChild(s);
}

function mount(){
 if(document.getElementById('gfdPatientMode'))return;
 const host=document.querySelector('.top'); if(!host)return;
 const wrap=document.createElement('div');wrap.id='gfdPatientMode';wrap.innerHTML=`
   <div class="gfd-patient-mode" role="group" aria-label="Patient mode">
     <button type="button" data-mode="adult">ADULT</button>
     <button type="button" data-mode="pediatric">PEDIATRIC</button>
   </div>
   <div class="gfd-ped-status" id="gfdPedStatus" role="button" tabindex="0"></div>`;
 host.appendChild(wrap);
 wrap.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
 const stat=wrap.querySelector('#gfdPedStatus');stat.addEventListener('click',openEditor);stat.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openEditor()});
 renderStatus();decorateClinicalView();observeClinicalChanges();
}

function setMode(mode){
 if(mode==='adult'){ctx={...DEFAULT,mode:'adult'};save();return}
 ctx.mode='pediatric';save();openEditor();
}

function summary(){
 const bits=['PEDIATRIC'];
 if(ctx.age)bits.push(`${ctx.age} ${ctx.ageUnit==='months'?'mo':'yr'}`);
 if(ctx.weightKg)bits.push(`${ctx.weightKg} kg`);
 if(ctx.weightSource)bits.push(ctx.weightSource==='broselow'?(ctx.broselowColor?`Broselow ${ctx.broselowColor}`:'Broselow'):(ctx.weightSource[0].toUpperCase()+ctx.weightSource.slice(1)));
 return bits.join(' • ');
}

function renderStatus(){
 const root=document.getElementById('gfdPatientMode');if(!root)return;
 root.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('on',b.dataset.mode===ctx.mode));
 document.body.classList.toggle('gfd-pediatric',ctx.mode==='pediatric');
 const stat=root.querySelector('#gfdPedStatus');
 if(ctx.mode==='pediatric'){
   stat.classList.add('on');stat.innerHTML=`<span class="gfd-ped-chip">PEDIATRIC</span>${esc(summary().replace('PEDIATRIC • ',''))}${ctx.weightKg?'':' • Weight needed'} <span style="float:right">Edit</span>`;
 }else{stat.classList.remove('on');stat.textContent=''}
}

function openEditor(){
 const existing=document.getElementById('gfdPatientModal');if(existing)existing.remove();
 let temp={...ctx};
 const back=document.createElement('div');back.id='gfdPatientModal';back.className='gfd-patient-modal-backdrop';
 back.innerHTML=`<div class="gfd-patient-modal" role="dialog" aria-modal="true" aria-labelledby="gfdPatientTitle">
 <h2 id="gfdPatientTitle">Pediatric Patient Context</h2>
 <p>Enter patient context once. It follows the user throughout the app. <b>Gladstone EMS protocols and Medical Control remain authoritative.</b> AHA/PALS and Broselow support the workflow only where consistent with Gladstone protocol.</p>
 <div class="gfd-grid2"><div class="gfd-field"><label>Age</label><input id="gfdAge" type="number" inputmode="decimal" min="0" step="0.1" value="${esc(temp.age)}"></div><div class="gfd-field"><label>Age unit</label><select id="gfdAgeUnit"><option value="years" ${temp.ageUnit==='years'?'selected':''}>Years</option><option value="months" ${temp.ageUnit==='months'?'selected':''}>Months</option></select></div></div>
 <div class="gfd-field"><label>Weight source</label><select id="gfdWeightSource"><option value="" ${!temp.weightSource?'selected':''}>Select source</option><option value="measured" ${temp.weightSource==='measured'?'selected':''}>Measured</option><option value="reported" ${temp.weightSource==='reported'?'selected':''}>Reported</option><option value="broselow" ${temp.weightSource==='broselow'?'selected':''}>Broselow tape</option></select></div>
 <div class="gfd-grid2"><div class="gfd-field"><label>Weight (kg)</label><input id="gfdKg" type="number" inputmode="decimal" min="0" step="0.1" value="${esc(temp.weightKg)}"></div><div class="gfd-field"><label>Weight (lb)</label><input id="gfdLb" type="number" inputmode="decimal" min="0" step="0.1" value="${esc(kgToLb(temp.weightKg))}"></div></div>
 <div class="gfd-field" id="gfdBroselowWrap" style="${temp.weightSource==='broselow'?'':'display:none'}"><label>Broselow color zone <span style="font-weight:500">(select the zone from the physical tape; the app does not guess the zone)</span></label><div class="gfd-broselow-colors">${COLORS.map(c=>`<button type="button" data-broselow="${c}" class="${temp.broselowColor===c?'on':''}">${c}</button>`).join('')}</div></div>
 <div class="gfd-authority-note"><b>Clinical source hierarchy</b>Gladstone EMS Protocol / Medical Control → AHA/PALS workflow support → Broselow reference. Gladstone protocol controls any conflict, discrepancy, or gap.</div>
 <div class="gfd-modal-actions"><button type="button" class="gfd-secondary" id="gfdCancel">Cancel</button><button type="button" class="gfd-primary" id="gfdSave">Use Pediatric Context</button><button type="button" class="gfd-danger" id="gfdClear">Clear Patient / Return to Adult</button></div>
 </div>`;
 document.body.appendChild(back);
 const age=back.querySelector('#gfdAge'),ageUnit=back.querySelector('#gfdAgeUnit'),src=back.querySelector('#gfdWeightSource'),kg=back.querySelector('#gfdKg'),lb=back.querySelector('#gfdLb'),bw=back.querySelector('#gfdBroselowWrap');
 age.addEventListener('input',()=>temp.age=age.value);ageUnit.addEventListener('change',()=>temp.ageUnit=ageUnit.value);
 src.addEventListener('change',()=>{temp.weightSource=src.value;bw.style.display=src.value==='broselow'?'':'none';if(src.value!=='broselow')temp.broselowColor=''});
 kg.addEventListener('input',()=>{temp.weightKg=kg.value;lb.value=kgToLb(kg.value)});lb.addEventListener('input',()=>{temp.weightKg=poundsToKg(lb.value);kg.value=temp.weightKg});
 back.querySelectorAll('[data-broselow]').forEach(b=>b.addEventListener('click',()=>{temp.broselowColor=b.dataset.broselow;back.querySelectorAll('[data-broselow]').forEach(x=>x.classList.toggle('on',x===b))}));
 back.querySelector('#gfdCancel').onclick=()=>back.remove();
 back.querySelector('#gfdSave').onclick=()=>{ctx={...DEFAULT,...temp,mode:'pediatric'};save();back.remove()};
 back.querySelector('#gfdClear').onclick=()=>{ctx={...DEFAULT};save();back.remove()};
 back.addEventListener('click',e=>{if(e.target===back)back.remove()});
}

function visibleClinicalTarget(){
 const detail=document.querySelector('#detail.on,.detail.on');
 if(!detail||detail.offsetParent===null)return null;
 return detail.querySelector('.protocol-body,.source-med-sheet,.tool-card,.card')||detail;
}
function contextSignature(){return [ctx.mode,ctx.age,ctx.ageUnit,ctx.weightKg,ctx.weightSource,ctx.broselowColor].join('|')}
function decorateClinicalView(){
 const cards=[...document.querySelectorAll('.gfd-ped-context-card')];
 if(ctx.mode!=='pediatric'){cards.forEach(x=>x.remove());return}
 const target=visibleClinicalTarget();if(!target){cards.forEach(x=>x.remove());return}
 const sig=contextSignature();
 let card=cards.find(x=>target.contains(x));
 cards.filter(x=>x!==card).forEach(x=>x.remove());
 if(card&&card.dataset.sig===sig)return;
 const html=`<div class="gfd-row"><strong>${esc(summary())}</strong><button type="button">Edit Patient</button></div><div style="margin-top:5px;font-size:12px;line-height:1.4"><b>Gladstone protocol controls.</b> Pediatric workflow support may use AHA/PALS and Broselow only where consistent with local protocol. No adult dose is automatically converted into a pediatric dose.</div>`;
 if(!card){card=document.createElement('div');card.className='gfd-ped-context-card';target.insertBefore(card,target.firstChild)}
 card.dataset.sig=sig;
 card.innerHTML=html;
 card.querySelector('button').onclick=openEditor;
}
function observeClinicalChanges(){
 let t;
 const detail=document.querySelector('#detail');
 if(!detail)return;
 new MutationObserver(records=>{
   const relevant=records.some(r=>{
     if(r.type==='attributes')return r.target===detail;
     return [...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&!n.classList?.contains('gfd-ped-context-card')&&!n.closest?.('.gfd-ped-context-card'));
   });
   if(!relevant)return;
   clearTimeout(t);t=setTimeout(decorateClinicalView,140);
 }).observe(detail,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
}

window.GFDPatientContext={get:()=>({...ctx}),set:(patch)=>{ctx={...ctx,...patch};save()},clear:()=>{ctx={...DEFAULT};save()},open:openEditor};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{injectStyles();mount()});else{injectStyles();mount()}
})();
