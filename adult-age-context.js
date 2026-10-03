(()=>{
'use strict';
const KEY='gfdAdultAgeContextV1';
const STYLE_ID='gfd-adult-age-styles';
let state=load();
let timer=null;

function load(){try{return {...{dob:'',ageYears:''},...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return {dob:'',ageYears:''}}}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function ageFromDob(v){if(!v)return null;const d=new Date(v+'T12:00:00');if(Number.isNaN(d.getTime()))return null;const t=new Date();let a=t.getFullYear()-d.getFullYear();const m=t.getMonth()-d.getMonth();if(m<0||(m===0&&t.getDate()<d.getDate()))a--;return a>=0&&a<130?a:null}
function age(){const d=ageFromDob(state.dob);if(d!=null)return d;if(state.ageYears===''||state.ageYears==null)return null;const n=Number(state.ageYears);return Number.isFinite(n)&&n>=0&&n<130?Math.floor(n):null}
function api(){return window.GFDPatientContext||null}
function context(){try{return api()?.get?.()||{}}catch(e){return {}}}
function adultMode(){return context().mode!=='pediatric'}
function isHome(){const d=document.querySelector('#detail');return !d||!d.classList.contains('on')}
function currentWeightKg(){const n=Number(context().weightKg);return Number.isFinite(n)&&n>0?n:null}
function saveAge(){localStorage.setItem(KEY,JSON.stringify(state))}
function syncPatientContext(weightKg){const a=age(),p=api();if(!p?.set)return;const patch={mode:'adult',age:a==null?'':String(a),ageUnit:'years'};if(weightKg!==undefined)patch.weightKg=weightKg;p.set(patch)}
function syncNativeWeightKg(kg){
 const n=Number(kg);if(!Number.isFinite(n)||n<=0)return;
 const input=document.getElementById('patientWeightInput'),unit=document.getElementById('patientWeightUnit');
 if(input&&unit&&typeof window.savePatientWeight==='function'){
  input.value=String(Math.round(n*10)/10);unit.value='kg';
  try{window.savePatientWeight()}catch(e){}
 }
}

function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#gfdAdultAgeStatus,.gfd-adult-age-status{display:none!important}
#patientContextSummary.gfd-adult-context-hidden{display:none!important}
.gfd-age-modal-backdrop{position:fixed;inset:0;z-index:9999;background:#0f172acc;display:flex;align-items:flex-end;justify-content:center}.gfd-age-modal{width:min(720px,100%);max-height:92vh;overflow:auto;background:#f8fafc;border-radius:18px 18px 0 0;padding:16px 16px calc(18px + env(safe-area-inset-bottom))}.gfd-age-modal h2{margin:0;color:#173a5e}.gfd-age-modal p{color:#475569;line-height:1.4}.gfd-age-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.gfd-age-field{margin-top:10px}.gfd-age-field label{display:block;font-size:12px;font-weight:900;color:#334155;margin-bottom:5px}.gfd-age-field input,.gfd-age-field select{width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:11px;font-size:16px;background:#fff}.gfd-context-preview{margin-top:12px;border:1px solid #bfdbfe;background:#eff6ff;color:#173a5e;border-radius:11px;padding:11px 12px;font-weight:850;line-height:1.45}.gfd-age-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:15px}.gfd-age-actions button{border:0;border-radius:10px;padding:12px;font-weight:900}.gfd-age-save{background:#173a5e;color:white}.gfd-age-clear{background:#e2e8f0;color:#0f172a}
.gfd-age-rule{margin:10px 0 12px;border:1px solid #bfdbfe;border-left:5px solid #2f6690;background:#eff6ff;color:#173a5e;border-radius:10px;padding:10px 11px;line-height:1.4}.gfd-age-rule b{display:block;margin-bottom:3px}.gfd-age-rule.warn{background:#fff7ed;border-color:#fdba74;border-left-color:#d97706;color:#7c2d12}.gfd-age-rule.danger{background:#fff1f2;border-color:#fecaca;border-left-color:#dc2626;color:#991b1b}
body.dark-mode .gfd-age-rule{background:#13263b!important;border-color:#4f83b6!important;color:#dbeafe!important}body.dark-mode .gfd-age-rule.warn{background:#33260f!important;border-color:#a86a12!important;color:#fff3c4!important}body.dark-mode .gfd-age-rule.danger{background:#35181d!important;border-color:#9d4653!important;color:#ffe4e6!important}
@media(min-width:700px){.gfd-age-modal-backdrop{align-items:center;padding:20px}.gfd-age-modal{border-radius:18px}}@media(max-width:520px){.gfd-age-grid{grid-template-columns:1fr}}
`;(document.head||document.documentElement).appendChild(s)
}

function updateHomeSummary(){
 document.querySelectorAll('#gfdAdultAgeStatus,.gfd-adult-age-status').forEach(x=>x.remove());
 const b=document.getElementById('patientContextSummary');if(!b)return;
 if(adultMode()&&isHome())b.classList.add('gfd-adult-context-hidden');else b.classList.remove('gfd-adult-context-hidden');
}

function openEditor(){
 if(!adultMode())return;
 document.getElementById('gfdAdultAgeModal')?.remove();
 let temp={...state};const existingKg=currentWeightKg();
 const back=document.createElement('div');back.id='gfdAdultAgeModal';back.className='gfd-age-modal-backdrop';
 back.innerHTML=`<div class="gfd-age-modal" role="dialog" aria-modal="true"><h2>Adult Patient Calculator</h2><p>Enter the adult patient age and weight here. These values follow the patient throughout the app and populate supported age- and weight-based medication tools.</p><div class="gfd-age-grid"><div class="gfd-age-field"><label>Date of birth</label><input id="gfdAdultDob" type="date" value="${esc(temp.dob)}"></div><div class="gfd-age-field"><label>Age in years</label><input id="gfdAdultAgeYears" type="number" inputmode="numeric" min="0" max="129" step="1" value="${esc(temp.ageYears)}" placeholder="Example: 72"></div><div class="gfd-age-field"><label>Patient weight</label><input id="gfdAdultWeight" type="number" inputmode="decimal" min="0" step="0.1" value="${existingKg?Math.round(existingKg*10)/10:''}" placeholder="Weight"></div><div class="gfd-age-field"><label>Weight unit</label><select id="gfdAdultWeightUnit"><option value="kg">kg</option><option value="lb">lb</option></select></div></div><div class="gfd-context-preview" id="gfdAdultContextPreview"></div><div class="gfd-age-actions"><button class="gfd-age-clear" id="gfdAgeClear">Clear patient data</button><button class="gfd-age-save" id="gfdAgeSave">Use Patient Data</button></div></div>`;
 document.body.appendChild(back);
 const dob=back.querySelector('#gfdAdultDob'),yrs=back.querySelector('#gfdAdultAgeYears'),wt=back.querySelector('#gfdAdultWeight'),unit=back.querySelector('#gfdAdultWeightUnit'),preview=back.querySelector('#gfdAdultContextPreview');
 const refresh=()=>{const a=dob.value?ageFromDob(dob.value):(yrs.value===''?null:Number(yrs.value));const w=Number(wt.value);preview.textContent=`Adult • ${Number.isFinite(a)&&a>=0?`Age ${Math.floor(a)}`:'Age not set'} • ${Number.isFinite(w)&&w>0?`${w} ${unit.value}`:'Weight not set'}`};
 dob.addEventListener('input',()=>{temp.dob=dob.value;if(dob.value){const a=ageFromDob(dob.value);temp.ageYears=a==null?'':String(a);yrs.value=temp.ageYears}refresh()});
 yrs.addEventListener('input',()=>{temp.ageYears=yrs.value;if(yrs.value)temp.dob='';refresh()});wt.addEventListener('input',refresh);unit.addEventListener('change',refresh);refresh();
 back.querySelector('#gfdAgeClear').onclick=()=>{state={dob:'',ageYears:''};saveAge();syncPatientContext('');updateHomeSummary();scheduleClinical();back.remove()};
 back.querySelector('#gfdAgeSave').onclick=()=>{state=temp;saveAge();const raw=Number(wt.value);let kg='';if(Number.isFinite(raw)&&raw>0)kg=unit.value==='lb'?raw/2.2046226218:raw;syncPatientContext(kg);syncNativeWeightKg(kg);updateHomeSummary();scheduleClinical();back.remove()};
 back.addEventListener('click',e=>{if(e.target===back)back.remove()})
}

function ruleForView(){
 if(!adultMode())return null;const a=age();if(a==null)return null;const detail=document.querySelector('#detail.on,.detail.on');if(!detail||detail.offsetParent===null)return null;const title=(detail.querySelector('h2')?.textContent||'').toLowerCase();const text=(detail.textContent||'').toLowerCase();
 if((title.includes('diltiazem')||title.includes('cardizem')||text.includes('diltiazem'))&&a>70)return {className:'danger',html:`<b>AGE-SPECIFIC GFD DOSE RULE • Age ${a}</b>Gladstone protocol: for patients over age 70, decrease the diltiazem dose by 5 mg. Apply this reduction to the protocol dose shown on this screen.`};
 if((title.includes('allergic')||title.includes('anaphyl')||text.includes('anaphyl'))&&a>40)return {className:'warn',html:`<b>AGE-SPECIFIC GFD CAUTION • Age ${a}</b>If this patient has a history of CAD, Gladstone protocol requires Medical Control orders for epinephrine in the anaphylaxis pathway.`};
 if((title.includes('general trauma')||text.includes('general trauma protocol'))&&a>65)return {className:'warn',html:`<b>OLDER-ADULT TRAUMA CAUTION • Age ${a}</b>Gladstone protocol advises increased suspicion for occult fracture in patients over 65, even with lower-energy mechanisms.`};return null
}
function renderClinical(){const old=document.querySelector('.gfd-age-rule'),rule=ruleForView();if(!rule){old?.remove();return}const detail=document.querySelector('#detail.on,.detail.on');if(!detail)return;const target=detail.querySelector('.protocol-body,.source-med-sheet,.card')||detail;if(old){old.className='gfd-age-rule '+rule.className;old.innerHTML=rule.html;return}const el=document.createElement('div');el.className='gfd-age-rule '+rule.className;el.innerHTML=rule.html;const ped=target.querySelector('.gfd-ped-context-card,.gfd-ped-workflow');if(ped)ped.after(el);else target.insertBefore(el,target.firstChild)}
function scheduleClinical(){clearTimeout(timer);timer=setTimeout(renderClinical,100)}
function bind(){
 const adult=document.getElementById('adultModeBtn');if(adult&&!adult.dataset.gfdUnifiedBound){adult.dataset.gfdUnifiedBound='1';adult.addEventListener('click',()=>setTimeout(()=>{syncPatientContext();updateHomeSummary();openEditor()},0))}
}
function start(){injectStyles();syncPatientContext();bind();updateHomeSummary();const w=currentWeightKg();if(w)syncNativeWeightKg(w);scheduleClinical();document.addEventListener('gfd:patient-context',()=>{bind();updateHomeSummary();const kg=currentWeightKg();if(kg)syncNativeWeightKg(kg);scheduleClinical()});new MutationObserver(()=>{bind();updateHomeSummary()}).observe(document.body,{childList:true,subtree:true});window.addEventListener('hashchange',()=>{updateHomeSummary();scheduleClinical()})}
window.GFDAdultAge={get:()=>({age:age(),dob:state.dob,ageYears:state.ageYears}),open:openEditor,set:(v={})=>{state={dob:v.dob||'',ageYears:v.ageYears??''};saveAge();syncPatientContext(v.weightKg);syncNativeWeightKg(v.weightKg);updateHomeSummary();scheduleClinical()}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();