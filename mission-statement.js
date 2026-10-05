(()=>{'use strict';
const MISSION='“Our mission is to provide safe, professional, and courteous services that strive to exceed the expectations of the community, its businesses, and our organization. This mission is carried out with honesty and integrity and requires our members to be part of a capable and aggressive department that is focused on \"Protecting, Preventing, and Educating\" those we serve.”';
const VISION='“The vision of the Gladstone Fire/EMS Department is to be a professional organization that leads the community in both Emergency Medical Services and Fire Protection. The services we provide will be of the highest quality and recognized as \"The Gladstone Way\".”';
function apply(){
 document.querySelectorAll('.mission-copy').forEach(el=>{
  if(el.textContent!==MISSION)el.textContent=MISSION;
  let block=el.parentElement?.querySelector('.mission-vision-block');
  if(!block){
   block=document.createElement('div');
   block.className='mission-vision-block';
   const label=document.createElement('div');label.className='mission-vision-label';label.textContent='Vision Statement:';
   const copy=document.createElement('p');copy.className='mission-vision-copy';copy.textContent=VISION;
   block.append(label,copy);
   el.insertAdjacentElement('afterend',block);
  }else{
   const label=block.querySelector('.mission-vision-label');
   const copy=block.querySelector('.mission-vision-copy');
   if(label&&label.textContent!=='Vision Statement:')label.textContent='Vision Statement:';
   if(copy&&copy.textContent!==VISION)copy.textContent=VISION;
  }
 });
 if(!document.getElementById('missionVisionV277Style')){
  const s=document.createElement('style');s.id='missionVisionV277Style';s.textContent=`
.mission-vision-block{margin-top:16px;padding-top:14px;border-top:1px solid #e5e7eb}
.mission-vision-label{font-weight:900;color:#173a5e;margin-bottom:6px}
.mission-vision-copy{margin:0;color:#334155;font-family:Georgia,"Times New Roman",serif;font-size:14.5px;line-height:1.6;font-style:italic}
body.dark-mode .mission-vision-block{border-top-color:#475569}
body.dark-mode .mission-vision-label{color:#f0d98e}
body.dark-mode .mission-vision-copy{color:#f1f5f9}
@media(min-width:900px){.mission-vision-copy{font-size:16px;line-height:1.7}}
`;document.head.appendChild(s);
 }
}
function boot(){
 apply();
 const observer=new MutationObserver(()=>apply());
 observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();