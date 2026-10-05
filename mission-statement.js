(()=>{'use strict';
const MISSION='“Our mission is to provide safe, professional, and courteous services that strive to exceed the expectations of the community, its businesses, and our organization. This mission is carried out with honesty and integrity and requires our members to be part of a capable and aggressive department that is focused on \"Protecting, Preventing, and Educating\" those we serve.”';
function apply(){
 document.querySelectorAll('.mission-copy').forEach(el=>{
  if(el.textContent!==MISSION)el.textContent=MISSION;
 });
}
function boot(){
 apply();
 const observer=new MutationObserver(()=>apply());
 observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();