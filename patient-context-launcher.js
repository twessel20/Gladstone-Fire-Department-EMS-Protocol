(()=>{
'use strict';
let timer=null;
function ctx(){try{return window.GFDPatientContext?.get?.()||{mode:'adult'}}catch(e){return {mode:'adult'}}}
function isHome(){const d=document.getElementById('detail');return !d||!d.classList.contains('on')}
function label(){
 const c=ctx();
 if(c.mode==='pediatric'){
  const bits=['Pediatric Patient'];
  if(c.age)bits.push(`${c.age} ${c.ageUnit==='months'?'mo':'yr'}`);
  if(c.weightKg)bits.push(`${Math.round(Number(c.weightKg)*10)/10} kg`);
  if(!c.age&&!c.weightKg)bits.push('Add age / weight');
  return bits.join(' • ');
 }
 const a=window.GFDAdultAge?.get?.()?.age;
 const w=Number(c.weightKg);
 const bits=['Adult Patient'];
 if(a!=null&&a!=='')bits.push(`Age ${a}`);
 if(Number.isFinite(w)&&w>0)bits.push(`${Math.round(w*10)/10} kg`);
 if((a==null||a==='')&&!(Number.isFinite(w)&&w>0))bits.push('Add age / weight');
 return bits.join(' • ');
}
function open(){
 const c=ctx();
 if(c.mode==='pediatric')window.GFDPatientContext?.open?.();
 else window.GFDAdultAge?.open?.();
}
function render(){
 clearTimeout(timer);timer=setTimeout(()=>{
  const b=document.getElementById('patientContextSummary');if(!b)return;
  if(!isHome())return;
  b.style.display='';
  b.classList.remove('gfd-adult-context-hidden');
  b.textContent=label();
  b.setAttribute('aria-label','Optional patient age and weight');
  b.onclick=e=>{e?.preventDefault?.();e?.stopPropagation?.();open()};
 },0)
}
function bindMode(id){const b=document.getElementById(id);if(!b||b.dataset.gfdContextLauncher)return;b.dataset.gfdContextLauncher='1';b.addEventListener('click',()=>setTimeout(render,20))}
function start(){
 bindMode('adultModeBtn');bindMode('pedsModeBtn');render();
 document.addEventListener('gfd:patient-context',render);
 window.addEventListener('hashchange',render);
 const top=document.querySelector('.top');if(top)new MutationObserver(()=>{bindMode('adultModeBtn');bindMode('pedsModeBtn');render()}).observe(top,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
