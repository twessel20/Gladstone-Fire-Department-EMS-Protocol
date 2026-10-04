const UPDATE_SUMMARY='v271: Fixed the Poison Control button styling regression at its source. Removed malformed CSS containing embedded literal newline escapes that caused the browser to discard the intended button rules. Call Poison Control now uses one valid, iOS-safe rule with the same Gladstone navy pill treatment as the app call controls and a large glove-friendly tap target.';

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
 if(!html.includes('patient-context-stable.js'))tags.push('<script src="patient-context-stable.js?v=244" defer></script>');
 if(!html.includes('patient-mode-tabs.js'))tags.push('<script src="patient-mode-tabs.js?v=246" defer></script>');
 if(!html.includes('universal-search.js'))tags.push('<script src="universal-search.js?v=232" defer></script>');
 if(!html.includes('dark-mode-contrast.js'))tags.push('<script src="dark-mode-contrast.js?v=234" defer></script>');
 if(!html.includes('protocol-readability.js'))tags.push('<script src="protocol-readability.js?v=236" defer></script>');
 if(!html.includes('reference-page-layout.js'))tags.push('<script src="reference-page-layout.js?v=241" defer></script>');
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
