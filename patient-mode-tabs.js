(()=>{
'use strict';
function setMode(mode){
 const next=mode==='pediatric'?'pediatric':'adult';
 try{
  const api=window.GFDPatientContext;
  if(api?.get&&api?.set){
   const current=api.get()||{};
   api.set({...current,mode:next,ageUnit:next==='adult'?'years':(current.ageUnit||'years')});
   return;
  }
 }catch(e){}
}
window.setPatientMode=setMode;
})();
