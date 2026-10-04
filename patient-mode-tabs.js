(()=>{'use strict';
function switchMode(mode){
 const next=mode==='pediatric'?'pediatric':'adult';
 try{
  const legacy=window.setPatientMode;
  if(typeof legacy==='function'&&legacy!==switchMode){legacy(next);return}
 }catch(e){}
 try{window.GFDPatientContext?.setMode?.(next)}catch(e){}
}
function bind(){
 const adult=document.getElementById('adultModeBtn'),peds=document.getElementById('pedsModeBtn');
 if(adult){adult.onclick=null;adult.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();switchMode('adult')},{capture:true})}
 if(peds){peds.onclick=null;peds.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();switchMode('pediatric')},{capture:true})}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();