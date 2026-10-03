(()=>{
'use strict';
function isHome(){
 const detail=document.querySelector('#detail');
 return !detail||!detail.classList.contains('on');
}
function compactHomeStatus(){
 if(!isHome())return;
 const status=document.getElementById('gfdPedStatus');
 const api=window.GFDPatientContext;
 if(!status||!api)return;
 const ctx=api.get();
 if(ctx.mode!=='pediatric')return;
 const bits=[];
 if(ctx.age)bits.push(`${ctx.age} ${ctx.ageUnit==='months'?'mo':'yr'}`);
 if(ctx.weightSource){
   if(ctx.weightSource==='broselow')bits.push(ctx.broselowColor?`Broselow ${ctx.broselowColor}`:'Broselow');
   else bits.push(ctx.weightSource[0].toUpperCase()+ctx.weightSource.slice(1));
 }
 status.innerHTML=`<span class="gfd-ped-chip">PEDIATRIC</span>${bits.length?bits.join(' • '):'Patient context'}${ctx.weightKg?'':' • Weight needed'} <span style="float:right">Edit</span>`;
}
function refresh(){requestAnimationFrame(compactHomeStatus)}
document.addEventListener('gfd:patient-context',refresh);
window.addEventListener('hashchange',()=>setTimeout(refresh,50));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(refresh,50));else setTimeout(refresh,50);
const obs=new MutationObserver(()=>setTimeout(refresh,20));
const start=()=>{const d=document.querySelector('#detail');if(d)obs.observe(d,{attributes:true,attributeFilter:['class']})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
