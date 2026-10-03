(()=>{
'use strict';
const KEY='gfdPatientProfileV228';
const STYLE_ID='gfdPatientProfileV228Style';
const nativeSetMode=window.setPatientMode?.bind(window);
const nativeSaveWeight=window.savePatientWeight?.bind(window);
const nativeClear=window.clearPatientContext?.bind(window);
const nativeRender=window.render?.bind(window);
let applying=false;

function blank(){return {mode:'adult',age:'',ageUnit:'years',weightKg:null}}
function load(){
 try{
  const v=JSON.parse(sessionStorage.getItem(KEY)||'null');
  if(!v)return blank();
  return {
   mode:v.mode==='pediatric'?'pediatric':'adult',
   age:v.age==null?'':String(v.age),
   ageUnit:v.ageUnit==='months'?'months':'years',
   weightKg:Number.isFinite(Number(v.weightKg))&&Number(v.weightKg)>0?Number(v.weightKg):null
  };
 }catch(e){return blank()}
}
let profile=load();

function save(){try{sessionStorage.setItem(KEY,JSON.stringify(profile))}catch(e){}}
function fmtWeight(){return profile.weightKg?`${Math.round(profile.weightKg*10)/10} kg`:''}
function fmtAge(){
 if(profile.age==='')return '';
 const n=Number(profile.age);if(!Number.isFinite(n)||n<0)return '';
 if(profile.mode==='pediatric'&&profile.ageUnit==='months')return `${n} mo`;
 return `Age ${n}`;
}
function poundsToKg(lb){const n=Number(lb);return Number.isFinite(n)&&n>0?n/2.2046226218:null}
function kgToLb(kg){const n=Number(kg);return Number.isFinite(n)&&n>0?Math.round(n*2.2046226218*10)/10:''}

function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#gfdProfileBackdrop{position:fixed;inset:0;z-index:10050;background:#0f172acc;display:flex;align-items:flex-end;justify-content:center}
#gfdProfileSheet{width:min(720px,100%);max-height:92vh;overflow:auto;background:#f8fafc;border-radius:18px 18px 0 0;padding:16px 16px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -14px 40px #0005;color:#0f172a}
#gfdProfileSheet h2{margin:0;color:#173a5e;font-size:21px}#gfdProfileSheet p{margin:6px 0 12px;color:#475569;line-height:1.4;font-size:13px}
.gfd-prof-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.gfd-prof-field{margin-top:8px}.gfd-prof-field label{display:block;font-size:12px;font-weight:900;color:#334155;margin-bottom:5px}.gfd-prof-field input,.gfd-prof-field select{width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:11px;font-size:16px;background:#fff;color:#111827}
.gfd-prof-summary{margin-top:12px;border:1px solid #bfdbfe;background:#eff6ff;color:#173a5e;border-radius:10px;padding:10px 11px;font-weight:850;font-size:13px;line-height:1.4}
.gfd-prof-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}.gfd-prof-actions button{border:0;border-radius:10px;padding:12px;font-weight:900;font-size:14px}.gfd-prof-save{background:#173a5e;color:#fff}.gfd-prof-cancel{background:#e2e8f0;color:#0f172a}.gfd-prof-clear{grid-column:1/-1;background:#fff1f2!important;color:#9f1239!important;border:1px solid #fecdd3!important}
body.dark-mode #gfdProfileSheet{background:#111827;color:#f8fafc}body.dark-mode #gfdProfileSheet h2{color:#dbeafe}body.dark-mode #gfdProfileSheet p,body.dark-mode #gfdProfileSheet label{color:#cbd5e1}body.dark-mode #gfdProfileSheet input,body.dark-mode #gfdProfileSheet select{background:#0f172a;color:#f8fafc;border-color:#475569}body.dark-mode .gfd-prof-summary{background:#13263b;color:#dbeafe;border-color:#4f83b6}
@media(min-width:700px){#gfdProfileBackdrop{align-items:center;padding:20px}#gfdProfileSheet{border-radius:18px}}@media(max-width:520px){.gfd-prof-grid{grid-template-columns:1fr}}
`;
 document.head.appendChild(s);
}

function syncNative(){
 if(applying)return;
 applying=true;
 try{
  nativeSetMode?.(profile.mode);
  if(profile.weightKg){
   const input=document.getElementById('patientWeightInput'),unit=document.getElementById('patientWeightUnit');
   if(input&&unit&&nativeSaveWeight){
    input.value=String(Math.round(profile.weightKg*10)/10);unit.value='kg';nativeSaveWeight();
   }
  }
 }catch(e){}
 applying=false;
}

function renderHeader(){
 const adult=document.getElementById('adultModeBtn'),peds=document.getElementById('pedsModeBtn'),summary=document.getElementById('patientContextSummary'),reset=document.getElementById('patientContextReset');
 adult?.classList.toggle('on',profile.mode==='adult');
 peds?.classList.toggle('on',profile.mode==='pediatric');
 if(summary){
  const bits=[profile.mode==='pediatric'?'PEDS':'ADULT'];
  const a=fmtAge(),w=fmtWeight();if(a)bits.push(a);if(w)bits.push(w);if(!a&&!w)bits.push('Add age / weight');
  summary.textContent=bits.join(' • ');summary.setAttribute('aria-label','Add or edit patient age and weight');summary.classList.toggle('peds',profile.mode==='pediatric');
 }
 if(reset)reset.disabled=profile.mode==='adult'&&profile.age===''&&!profile.weightKg;
}

function applyAge(root=document){
 if(profile.age==='')return;
 const age=Number(profile.age);if(!Number.isFinite(age)||age<0)return;
 const yearValue=profile.ageUnit==='months'?age/12:age;
 const selectors=['input[data-patient-age]','#toolDiltAge','input[id$="-age"]'];
 const seen=new Set();
 selectors.forEach(sel=>root.querySelectorAll?.(sel).forEach(input=>{
  if(seen.has(input)||input.type==='date'||input.disabled)return;seen.add(input);
  const id=(input.id||'').toLowerCase(),name=(input.name||'').toLowerCase(),ph=(input.placeholder||'').toLowerCase();
  const wantsMonths=id.includes('month')||name.includes('month')||ph.includes('month')||input.dataset?.ageUnit==='months';
  const value=wantsMonths?(profile.ageUnit==='months'?age:age*12):yearValue;
  if(input.value==='')input.value=String(Math.round(value*10)/10);
 }));
}
function applyAll(){
 try{window.applySharedPatientContextToDOM?.(document)}catch(e){}
 applyAge(document);renderHeader();
}

function openEditor(mode){
 if(mode){profile.mode=mode==='pediatric'?'pediatric':'adult';save();syncNative();renderHeader()}
 document.getElementById('gfdProfileBackdrop')?.remove();injectStyles();
 const temp={...profile};
 const back=document.createElement('div');back.id='gfdProfileBackdrop';
 back.innerHTML=`<div id="gfdProfileSheet" role="dialog" aria-modal="true" aria-labelledby="gfdProfileTitle">
  <h2 id="gfdProfileTitle">${temp.mode==='pediatric'?'Pediatric':'Adult'} Patient</h2>
  <p>Age and weight are optional. Enter either one, both, or neither. Saved values follow this patient through the app and populate supported calculators.</p>
  <div class="gfd-prof-grid">
   <div class="gfd-prof-field"><label>Age</label><input id="gfdProfAge" type="number" inputmode="decimal" min="0" step="0.1" value="${temp.age}"></div>
   <div class="gfd-prof-field" id="gfdProfAgeUnitWrap"><label>Age unit</label><select id="gfdProfAgeUnit"><option value="years">Years</option><option value="months">Months</option></select></div>
   <div class="gfd-prof-field"><label>Weight</label><input id="gfdProfWeight" type="number" inputmode="decimal" min="0" step="0.1" value="${temp.weightKg?Math.round(temp.weightKg*10)/10:''}"></div>
   <div class="gfd-prof-field"><label>Weight unit</label><select id="gfdProfWeightUnit"><option value="kg">kg</option><option value="lb">lb</option></select></div>
  </div>
  <div class="gfd-prof-summary" id="gfdProfPreview"></div>
  <div class="gfd-prof-actions"><button class="gfd-prof-cancel" id="gfdProfCancel">Cancel</button><button class="gfd-prof-save" id="gfdProfSave">Use Patient Data</button><button class="gfd-prof-clear" id="gfdProfClear">Clear age and weight</button></div>
 </div>`;
 document.body.appendChild(back);
 const age=back.querySelector('#gfdProfAge'),ageUnit=back.querySelector('#gfdProfAgeUnit'),weight=back.querySelector('#gfdProfWeight'),weightUnit=back.querySelector('#gfdProfWeightUnit'),preview=back.querySelector('#gfdProfPreview'),ageUnitWrap=back.querySelector('#gfdProfAgeUnitWrap');
 ageUnit.value=temp.ageUnit||'years';if(temp.mode==='adult'){ageUnit.value='years';ageUnitWrap.style.display='none'}
 const refresh=()=>{const av=age.value?`${age.value} ${ageUnit.value==='months'?'mo':'yr'}`:'Age not entered';const wv=weight.value?`${weight.value} ${weightUnit.value}`:'Weight not entered';preview.textContent=`${temp.mode==='pediatric'?'PEDS':'ADULT'} • ${av} • ${wv}`};
 age.addEventListener('input',refresh);ageUnit.addEventListener('change',refresh);weight.addEventListener('input',refresh);weightUnit.addEventListener('change',refresh);refresh();
 back.querySelector('#gfdProfCancel').onclick=()=>back.remove();
 back.querySelector('#gfdProfSave').onclick=()=>{
  const rawWeight=Number(weight.value);const kg=Number.isFinite(rawWeight)&&rawWeight>0?(weightUnit.value==='lb'?poundsToKg(rawWeight):rawWeight):null;
  profile={mode:temp.mode,age:age.value||'',ageUnit:temp.mode==='adult'?'years':ageUnit.value,weightKg:kg};save();syncNative();applyAll();back.remove();
 };
 back.querySelector('#gfdProfClear').onclick=()=>{profile={...profile,age:'',ageUnit:profile.mode==='adult'?'years':profile.ageUnit,weightKg:null};save();try{nativeClear?.()}catch(e){};syncNative();applyAll();back.remove()};
 back.addEventListener('click',e=>{if(e.target===back)back.remove()});
}

function setMode(mode){profile.mode=mode==='pediatric'?'pediatric':'adult';profile.ageUnit=profile.mode==='adult'?'years':profile.ageUnit;save();syncNative();applyAll();openEditor(profile.mode)}
function reset(){profile=blank();save();try{nativeClear?.()}catch(e){};syncNative();applyAll()}

function start(){
 injectStyles();syncNative();applyAll();
 window.setPatientMode=setMode;
 window.openPatientWeight=()=>openEditor(profile.mode);
 window.clearPatientContext=reset;
 window.GFDPatientContext={get:()=>({...profile}),set:v=>{profile={...profile,...v};save();syncNative();applyAll()},clear:reset,open:()=>openEditor(profile.mode)};
 if(nativeRender){window.render=function(...args){const r=nativeRender(...args);setTimeout(applyAll,0);return r}}
 document.addEventListener('click',()=>setTimeout(applyAll,0),{passive:true});
 window.addEventListener('hashchange',()=>setTimeout(applyAll,0));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
