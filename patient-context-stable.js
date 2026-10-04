(()=>{
'use strict';
const KEY='gfdPatientProfileV228';
const STYLE_ID='gfdPatientProfileV233Style';
const BROSELOW_ZONES=['Gray','Pink','Red','Purple','Yellow','White','Blue','Orange','Green'];
const nativeSetMode=window.setPatientMode?.bind(window);
const nativeSaveWeight=window.savePatientWeight?.bind(window);
const nativeClear=window.clearPatientContext?.bind(window);
const nativeRender=window.render?.bind(window);
let applying=false;

function blank(){return {mode:'adult',age:'',ageUnit:'years',weightKg:null,broselowColor:''}}
function load(){
 try{
  const v=JSON.parse(sessionStorage.getItem(KEY)||'null');
  if(!v)return blank();
  return {
   mode:v.mode==='pediatric'?'pediatric':'adult',
   age:v.age==null?'':String(v.age),
   ageUnit:v.ageUnit==='months'?'months':'years',
   weightKg:Number.isFinite(Number(v.weightKg))&&Number(v.weightKg)>0?Number(v.weightKg):null,
   broselowColor:BROSELOW_ZONES.includes(v.broselowColor)?v.broselowColor:''
  };
 }catch(e){return blank()}
}
let profile=load();

function save(){try{sessionStorage.setItem(KEY,JSON.stringify(profile))}catch(e){}}
function fmtWeight(){return profile.weightKg?`${Math.round(profile.weightKg*10)/10} kg`:''}
function fmtAge(){
 if(profile.age==='')return '';
 const n=Number(profile.age);if(!Number.isFinite(n)||n<0)return '';
 if(profile.mode==='pediatric')return `${n} ${profile.ageUnit==='months'?'mo':'yr'}`;
 return `Age ${n}`;
}
function fmtBroselow(){return profile.mode==='pediatric'&&profile.broselowColor?`Broselow ${profile.broselowColor}`:''}
function poundsToKg(lb){const n=Number(lb);return Number.isFinite(n)&&n>0?n/2.2046226218:null}
function kgToLb(kg){const n=Number(kg);return Number.isFinite(n)&&n>0?Math.round(n*2.2046226218*10)/10:''}

function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
/* v231 persistent field patient context */
.patient-context{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto;align-items:stretch!important;gap:7px!important;margin-top:8px!important;min-height:40px}
.patient-mode-toggle{display:flex!important;gap:3px!important;padding:3px!important;background:#ffffff18!important;border:1px solid #ffffff33!important;border-radius:10px!important;flex:0 0 auto}
.patient-mode-btn{border:0!important;border-radius:7px!important;padding:7px 9px!important;background:transparent!important;color:#fff!important;font-weight:950!important;font-size:11px!important;letter-spacing:.035em;line-height:1!important;min-height:32px!important}
.patient-mode-btn.on{background:#fff!important;color:#173a5e!important;box-shadow:0 1px 3px #0002!important}
.patient-context-summary{min-width:0!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;border:1px solid #ffffff55!important;background:#ffffff18!important;color:#fff!important;border-radius:10px!important;padding:7px 10px!important;font-weight:900!important;text-align:left!important;min-height:40px!important;white-space:normal!important;overflow:hidden!important}
.patient-context-summary.peds{background:#dbeafe!important;color:#173a5e!important;border-color:#bfdbfe!important}
.gfd-context-main{min-width:0;display:flex;align-items:center;gap:6px;overflow:hidden}
.gfd-context-mode{flex:0 0 auto;font-size:11px;font-weight:950;letter-spacing:.04em}
.gfd-context-data{min-width:0;font-size:12px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gfd-context-edit{flex:0 0 auto;font-size:10px;font-weight:900;opacity:.82;text-transform:uppercase;letter-spacing:.04em}
.patient-context-reset{border:1px solid #ffffff55!important;background:#ffffff18!important;color:#fff!important;border-radius:10px!important;padding:7px 9px!important;font-weight:900!important;font-size:11px!important;min-height:40px!important}
.patient-context-reset:disabled{opacity:.38!important}
body.dark-mode .patient-context-summary.peds{background:#173a5e!important;color:#fff!important;border-color:#5b8db4!important}
#gfdProfileBackdrop{position:fixed;inset:0;z-index:10050;background:#0f172acc;display:flex;align-items:flex-end;justify-content:center}
#gfdProfileSheet{width:min(720px,100%);max-height:92vh;overflow:auto;background:#f8fafc;border-radius:18px 18px 0 0;padding:16px 16px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -14px 40px #0005;color:#0f172a}
#gfdProfileSheet h2{margin:0;color:#173a5e;font-size:21px}#gfdProfileSheet p{margin:6px 0 12px;color:#475569;line-height:1.4;font-size:13px}
.gfd-prof-mode{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;margin-bottom:8px;background:#e2e8f0;color:#334155;font-size:11px;font-weight:950;letter-spacing:.05em}.gfd-prof-mode.peds{background:#dbeafe;color:#173a5e}
.gfd-prof-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.gfd-prof-field{margin-top:8px}.gfd-prof-field label{display:block;font-size:12px;font-weight:900;color:#334155;margin-bottom:5px}.gfd-prof-field input,.gfd-prof-field select{width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:11px;font-size:16px;background:#fff;color:#111827}
.gfd-prof-summary{margin-top:12px;border:1px solid #bfdbfe;background:#eff6ff;color:#173a5e;border-radius:10px;padding:10px 11px;font-weight:850;font-size:13px;line-height:1.4}
.gfd-prof-help{margin-top:6px;color:#64748b;font-size:11px;line-height:1.35}
.gfd-prof-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}.gfd-prof-actions button{border:0;border-radius:10px;padding:12px;font-weight:900;font-size:14px;min-height:46px}.gfd-prof-save{background:#173a5e;color:#fff}.gfd-prof-cancel{background:#e2e8f0;color:#0f172a}.gfd-prof-clear{grid-column:1/-1;background:#fff1f2!important;color:#9f1239!important;border:1px solid #fecdd3!important}
body.dark-mode #gfdProfileSheet{background:#111827;color:#f8fafc}body.dark-mode #gfdProfileSheet h2{color:#dbeafe}body.dark-mode #gfdProfileSheet p,body.dark-mode #gfdProfileSheet label{color:#cbd5e1}body.dark-mode #gfdProfileSheet input,body.dark-mode #gfdProfileSheet select{background:#0f172a;color:#f8fafc;border-color:#475569}body.dark-mode .gfd-prof-summary{background:#13263b;color:#dbeafe;border-color:#4f83b6}body.dark-mode .gfd-prof-help{color:#94a3b8}body.dark-mode .gfd-prof-mode{background:#1f2937;color:#e5e7eb}body.dark-mode .gfd-prof-mode.peds{background:#173a5e;color:#dbeafe}
@media(min-width:700px){#gfdProfileBackdrop{align-items:center;padding:20px}#gfdProfileSheet{border-radius:18px}}
@media(max-width:520px){.patient-context{grid-template-columns:auto minmax(0,1fr) auto!important;gap:5px!important}.patient-mode-btn{padding:7px 7px!important;font-size:10px!important}.patient-context-summary{padding:7px 8px!important}.gfd-context-mode{font-size:10px}.gfd-context-data{font-size:11px}.gfd-context-edit{display:none}.patient-context-reset{padding:7px 8px!important;font-size:10px!important}.gfd-prof-grid{grid-template-columns:1fr}}
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
 const isPeds=profile.mode==='pediatric';
 adult?.classList.toggle('on',!isPeds);peds?.classList.toggle('on',isPeds);
 adult?.setAttribute('aria-pressed',String(!isPeds));peds?.setAttribute('aria-pressed',String(isPeds));
 if(summary){
  const details=[];const a=fmtAge(),w=fmtWeight(),b=fmtBroselow();
  if(a)details.push(a);if(w)details.push(w);if(b)details.push(b);
  const emptyText='Add age / weight';
  summary.innerHTML=`<span class="gfd-context-main"><span class="gfd-context-mode">${isPeds?'PEDS':'ADULT'}</span><span aria-hidden="true">•</span><span class="gfd-context-data">${details.length?details.join(' • '):emptyText}</span></span><span class="gfd-context-edit">Edit</span>`;
  summary.setAttribute('aria-label',`${isPeds?'Pediatric':'Adult'} patient context. ${details.length?details.join(', '):'Age and weight not entered'}. Tap to edit.`);
  summary.classList.toggle('peds',isPeds);
 }
 if(reset)reset.disabled=profile.mode==='adult'&&profile.age===''&&!profile.weightKg&&!profile.broselowColor;
}

function fieldText(input){
 const id=(input.id||'').toLowerCase(),name=(input.name||'').toLowerCase(),ph=(input.placeholder||'').toLowerCase(),aria=(input.getAttribute?.('aria-label')||'').toLowerCase();
 let label='';try{if(input.id)label=document.querySelector('label[for="'+CSS.escape(input.id)+'"]')?.textContent||'';if(!label)label=input.closest?.('label')?.textContent||''}catch(e){}
 return [id,name,ph,aria,label,input.dataset?.patientField||'',input.dataset?.ageUnit||'',input.dataset?.weightUnit||''].join(' ').toLowerCase()
}
function isEditableClinicalNumber(input){
 if(!input||input.disabled||input.readOnly)return false;
 const t=(input.type||'text').toLowerCase();return ['number','text','tel'].includes(t)
}
function applyAge(root=document){
 if(profile.age==='')return;
 const age=Number(profile.age);if(!Number.isFinite(age)||age<0)return;
 const years=profile.ageUnit==='months'?age/12:age;
 root.querySelectorAll?.('input').forEach(input=>{
  if(!isEditableClinicalNumber(input)||input.type==='date'||input.closest('#gfdProfileBackdrop'))return;
  const txt=fieldText(input),explicit=input.dataset?.patientAge!==undefined||input.dataset?.patientField==='age';
  const ageField=explicit||/(^|[^a-z])(patient[ _-]?)?age([^a-z]|$)/.test(txt);
  if(!ageField||/(dosage|dose|stage|percentage|voltage)/.test(txt))return;
  const months=/month|\bmo\b/.test(txt)||input.dataset?.ageUnit==='months';
  const value=months?(profile.ageUnit==='months'?age:age*12):years;
  if(input.value==='')input.value=String(Math.round(value*10)/10);
 });
}
function applyWeight(root=document){
 if(!profile.weightKg)return;
 const kg=Number(profile.weightKg);if(!Number.isFinite(kg)||kg<=0)return;
 root.querySelectorAll?.('input').forEach(input=>{
  if(!isEditableClinicalNumber(input)||input.closest('#gfdProfileBackdrop'))return;
  const txt=fieldText(input),explicit=input.dataset?.patientWeight!==undefined||input.dataset?.patientField==='weight';
  const weightField=explicit||/(patient[ _-]?)?(weight|wt)\b/.test(txt);
  if(!weightField||/(ideal|ibw|dose|dosage|volume|fluid|result)/.test(txt))return;
  const pounds=/\blb\b|lbs|pound/.test(txt)||input.dataset?.weightUnit==='lb';
  const value=pounds?kgToLb(kg):Math.round(kg*10)/10;
  if(input.value==='')input.value=String(value);
 });
}
function broadcastContext(){
 try{document.dispatchEvent(new CustomEvent('gfd:patient-context',{detail:{...profile}}))}catch(e){}
}
