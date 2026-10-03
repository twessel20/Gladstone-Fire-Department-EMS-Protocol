(()=>{
'use strict';
let syncingNative=false;
let bound=false;

function isHome(){
 const detail=document.querySelector('#detail');
 return !detail||!detail.classList.contains('on');
}

function readNativeContext(){
 try{return JSON.parse(sessionStorage.getItem('gfdPatientContext')||'null')||{}}
 catch(e){return {}}
}

function syncNativeMode(mode){
 const native=readNativeContext();
 if(native.mode===mode)return;
 if(typeof window.setPatientMode!=='function')return;
 syncingNative=true;
 try{window.setPatientMode(mode)}finally{syncingNative=false}
}

function syncNativeWeight(ctx){
 if(ctx.mode!=='pediatric'||!ctx.weightKg)return;
 const native=readNativeContext();
 const current=Number(native.weightKg||0),next=Number(ctx.weightKg||0);
 if(!Number.isFinite(next)||next<=0||Math.abs(current-next)<0.05)return;
 const input=document.getElementById('patientWeightInput');
 const unit=document.getElementById('patientWeightUnit');
 if(!input||!unit||typeof window.savePatientWeight!=='function')return;
 input.value=String(next);
 unit.value='kg';
 window.savePatientWeight();
}

function compactHomeStatus(){
 const api=window.GFDPatientContext;
 if(!api)return;
 const ctx=api.get();

 // The original pediatric-mode.js selector is superseded by the compact
 // ADULT / PEDS control already built into the app header.
 const legacyMode=document.querySelector('#gfdPatientMode .gfd-patient-mode');
 if(legacyMode)legacyMode.style.display='none';

 syncNativeMode(ctx.mode==='pediatric'?'pediatric':'adult');
 syncNativeWeight(ctx);

 // Pediatric context is shown once, in the orange editable status row.
 // Hide the older shared-weight summary on Home so weight/context is not duplicated.
 const nativeSummary=document.getElementById('patientContextSummary');
 if(nativeSummary)nativeSummary.style.display=(isHome()&&ctx.mode==='pediatric')?'none':'';

 if(!isHome())return;
 const status=document.getElementById('gfdPedStatus');
 if(!status)return;
 if(ctx.mode!=='pediatric')return;
 const bits=[];
 if(ctx.age)bits.push(`${ctx.age} ${ctx.ageUnit==='months'?'mo':'yr'}`);
 if(ctx.weightSource){
   if(ctx.weightSource==='broselow')bits.push(ctx.broselowColor?`Broselow ${ctx.broselowColor}`:'Broselow');
   else bits.push(ctx.weightSource[0].toUpperCase()+ctx.weightSource.slice(1));
 }
 status.innerHTML=`<span class="gfd-ped-chip">PEDIATRIC</span>${bits.length?bits.join(' • '):'Patient context'}${ctx.weightKg?'':' • Weight needed'} <span style="float:right">Edit</span>`;
}

function bindCompactModeControls(){
 if(bound)return;
 const adult=document.getElementById('adultModeBtn');
 const peds=document.getElementById('pedsModeBtn');
 if(!adult||!peds)return;
 bound=true;
 adult.addEventListener('click',()=>{
   if(syncingNative)return;
   const api=window.GFDPatientContext;
   if(api&&api.get().mode!=='adult')api.clear();
 },true);
 peds.addEventListener('click',()=>{
   if(syncingNative)return;
   const api=window.GFDPatientContext;
   if(!api)return;
   const wasPeds=api.get().mode==='pediatric';
   if(!wasPeds)api.set({mode:'pediatric'});
   if(!wasPeds)setTimeout(()=>api.open(),0);
 },true);
}

function refresh(){
 requestAnimationFrame(()=>{
   bindCompactModeControls();
   compactHomeStatus();
 });
}

document.addEventListener('gfd:patient-context',refresh);
window.addEventListener('hashchange',()=>setTimeout(refresh,50));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(refresh,50));else setTimeout(refresh,50);
const obs=new MutationObserver(()=>setTimeout(refresh,20));
const start=()=>{const d=document.querySelector('#detail');if(d)obs.observe(d,{attributes:true,attributeFilter:['class']})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
