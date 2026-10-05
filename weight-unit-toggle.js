(()=>{'use strict';
const LB_PER_KG=2.2046226218;
const INPUT_SELECTOR='input[data-patient-weight],input[id^="dc-"][id$="-w"]';
function unitSelectFor(input){
 if(!input)return null;
 const explicit=input.getAttribute('data-weight-unit');
 if(explicit){const s=document.getElementById(explicit);if(s)return s;}
 if(input.id&&/-w$/.test(input.id)){const s=document.getElementById(input.id.replace(/-w$/,'-u'));if(s)return s;}
 const parent=input.closest('.dose-row,.calc-pair,.calc-field,.tool-card,.dose-calc');
 if(parent){const selects=[...parent.querySelectorAll('select')];const s=selects.find(x=>['lb','kg'].includes(x.value)&&[...x.options].some(o=>o.value==='lb')&&[...x.options].some(o=>o.value==='kg'));if(s)return s;}
 return null;
}
function fmtWeight(n){const rounded=Math.round(n*10)/10;return Number.isInteger(rounded)?String(rounded):rounded.toFixed(1)}
function bind(input){
 if(!input||input.dataset.weightToggleBound==='1')return;
 const select=unitSelectFor(input);if(!select)return;
 input.dataset.weightToggleBound='1';
 select.dataset.weightToggleBound='1';
 select.dataset.weightUnitCurrent=select.value||'lb';
 select.addEventListener('change',()=>{
   const oldUnit=select.dataset.weightUnitCurrent||select.value;
   const newUnit=select.value;
   select.dataset.weightUnitCurrent=newUnit;
   if(oldUnit===newUnit)return;
   const raw=Number(input.value);
   if(!Number.isFinite(raw)||raw<=0)return;
   const converted=oldUnit==='lb'&&newUnit==='kg'?raw/LB_PER_KG:oldUnit==='kg'&&newUnit==='lb'?raw*LB_PER_KG:raw;
   input.value=fmtWeight(converted);
   input.dispatchEvent(new Event('input',{bubbles:true}));
   input.dispatchEvent(new Event('change',{bubbles:true}));
 });
}
function scan(root=document){
 if(root.matches?.(INPUT_SELECTOR))bind(root);
 root.querySelectorAll?.(INPUT_SELECTOR).forEach(bind);
}
function boot(){
 scan();
 let queued=false;
 new MutationObserver(records=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)scan(n)}))})}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();