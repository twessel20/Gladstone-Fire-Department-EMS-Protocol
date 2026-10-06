const UPDATE_SUMMARY='v317: Added a Versed sedation touch link to the Transcutaneous Pacing procedure and a dedicated Z Vent Guide PDF source viewer that is separate from the GFD EMS protocol source-book view.';

self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  try{const keys=await caches.keys();await Promise.all(keys.map(key=>caches.delete(key)))}catch(err){}
  try{await self.clients.claim()}catch(err){}
 })());
});

async function injectPatientContext(response){
 if(!response||!response.ok)return response;
 const type=response.headers.get('content-type')||'';
 if(!type.includes('text/html'))return response;
 let html=await response.text();
 const tags=[];
 if(!html.includes('clinical-registry.js'))tags.push('<script src="clinical-registry.js?v=282" defer></script>');
 if(!html.includes('patient-context-stable.js'))tags.push('<script src="patient-context-stable.js?v=244" defer></script>');
 if(!html.includes('weight-unit-toggle.js'))tags.push('<script src="weight-unit-toggle.js?v=284" defer></script>');
 if(!html.includes('patient-mode-tabs.js'))tags.push('<script src="patient-mode-tabs.js?v=246" defer></script>');
 if(!html.includes('universal-search.js'))tags.push('<script src="universal-search.js?v=232" defer></script>');
 if(!html.includes('dark-mode-contrast.js'))tags.push('<script src="dark-mode-contrast.js?v=274" defer></script>');
 if(!html.includes('dark-mode-global-audit.js'))tags.push('<script src="dark-mode-global-audit.js?v=279" defer></script>');
 if(!html.includes('dark-mode-secondary-hierarchy.js'))tags.push('<script src="dark-mode-secondary-hierarchy.js?v=287" defer></script>');
 if(!html.includes('streetdrug-dark-tuning.js'))tags.push('<script src="streetdrug-dark-tuning.js?v=280" defer></script>');
 if(!html.includes('patient-med-dark-tuning.js'))tags.push('<script src="patient-med-dark-tuning.js?v=293" defer></script>');
 if(!html.includes('mission-statement.js'))tags.push('<script src="mission-statement.js?v=277" defer></script>');
 if(!html.includes('protocol-readability.js'))tags.push('<script src="protocol-readability.js?v=236" defer></script>');
 if(!html.includes('reference-page-layout.js'))tags.push('<script src="reference-page-layout.js?v=241" defer></script>');
 if(!html.includes('global-consistency-audit.js'))tags.push('<script src="global-consistency-audit.js?v=276" defer></script>');
 if(!html.includes('flowchart-layout-audit.js'))tags.push('<script src="flowchart-layout-audit.js?v=278" defer></script>');
 if(!html.includes('diltiazem-clinical-bridge.js'))tags.push('<script src="diltiazem-clinical-bridge.js?v=283" defer></script>');
 if(!html.includes('diltiazem-dark-tuning.js'))tags.push('<script src="diltiazem-dark-tuning.js?v=286" defer></script>');
 if(!html.includes('transcutaneous-pacing-procedure.js'))tags.push('<script src="transcutaneous-pacing-procedure.js?v=290" defer></script>');
 if(!html.includes('tcp-integration-fix.js'))tags.push('<script src="tcp-integration-fix.js?v=289" defer></script>');
 if(!html.includes('tcp-how-to-fix.js'))tags.push('<script src="tcp-how-to-fix.js?v=317" defer></script>');
 if(!html.includes('bipap-cpap-procedure.js'))tags.push('<script src="bipap-cpap-procedure.js?v=313" defer></script>');
 if(!html.includes('z-vent-procedure.js'))tags.push('<script src="z-vent-procedure.js?v=314" defer></script>');
 if(!html.includes('z-vent-source-viewer.js'))tags.push('<script src="z-vent-source-viewer.js?v=317" defer></script>');
 if(!html.includes('atropine-sequence-card.js'))tags.push('<script src="atropine-sequence-card.js?v=298" defer></script>');
 if(!html.includes('version-history-live.js'))tags.push('<script src="version-history-live.js?v=317" defer></script>');
 if(tags.length){const tag=tags.join('');html=html.includes('</body>')?html.replace('</body>',tag+'</body>'):html+tag;}
 const headers=new Headers(response.headers);headers.delete('content-length');
 return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||req.mode!=='navigate')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
  try{
   const network=await fetch(req,{cache:'no-store'});
   return await injectPatientContext(network);
  }catch(err){
   return new Response('Unable to load the app. Check the connection and reload.',{status:503,headers:{'content-type':'text/plain'}});
  }
 })());
});

self.addEventListener('message',event=>{
 const msg=event.data||{};
 if(msg.type==='GET_UPDATE_SUMMARY'){
  try{event.source?.postMessage({type:'UPDATE_SUMMARY',summary:UPDATE_SUMMARY})}catch(err){}
 }
});