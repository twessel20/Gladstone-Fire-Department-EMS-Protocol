(()=>{'use strict';
const ID='transcutaneous-pacing-procedure';
function getData(){try{return typeof data!=='undefined'&&Array.isArray(data)?data:null}catch(e){return null}}
function getCurrent(){try{return typeof currentProtocolId!=='undefined'?currentProtocolId:null}catch(e){return null}}
function getCat(){try{return typeof cat!=='undefined'?cat:null}catch(e){return null}}
function ensureRegistered(){
 const d=getData();
 if(!d||!d.length)return false;
 if(!d.some(x=>x.id===ID))d.push({id:ID,title:'Transcutaneous Pacing (TCP)',category:'Procedures',lines:['ZOLL X Series','Adult','Cross-referenced from GFD Bradycardia Algorithm'],aliases:['tcp','pacing','transcutaneous pacing','zoll','zoll x series','bradycardia pacing']});
 return true;
}
function refreshProcedures(){
 try{if(getCat()==='Procedures'&&typeof render==='function')render()}catch(e){}
}
function addBradyLink(){
 if(getCurrent()!=='bradycardia-algorithm')return;
 const flow=document.querySelector('#detail .flowchart');
 if(!flow||flow.querySelector('.tcp-crosslink'))return;
 const decision=flow.querySelector('.flow-decision');
 if(!decision)return;
 const box=document.createElement('div');
 box.className='tcp-crosslink';
 box.innerHTML='<button type="button" onclick="openP(\''+ID+'\',\'bradycardia-algorithm\')"><span><b>⚡ Transcutaneous Pacing Procedure</b><small>ZOLL X Series • step-by-step pacing workflow</small></span><span>›</span></button>';
 decision.insertAdjacentElement('afterend',box);
}
function boot(){
 let tries=0;
 const timer=setInterval(()=>{
  tries++;
  if(ensureRegistered()){
   refreshProcedures();
   addBradyLink();
   clearInterval(timer);
  }
  if(tries>100)clearInterval(timer);
 },100);
 const obs=new MutationObserver(()=>{ensureRegistered();addBradyLink()});
 obs.observe(document.body,{childList:true,subtree:true});
 setTimeout(()=>{ensureRegistered();refreshProcedures();addBradyLink()},0);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();