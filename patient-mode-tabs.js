(()=>{
'use strict';
function setMode(mode){
 const next=mode==='pediatric'?'pediatric':'adult';
 try{
  const api=window.GFDPatientContext;
  if(api?.setMode){api.setMode(next);return}
  if(api?.get&&api?.set){
   const current=api.get()||{};
   api.set({...current,mode:next,ageUnit:next==='adult'?'years':(current.ageUnit||'years'),broselowColor:next==='adult'?'':(current.broselowColor||'')});
   return;
  }
 }catch(e){}
}
window.setPatientMode=setMode;
})();
