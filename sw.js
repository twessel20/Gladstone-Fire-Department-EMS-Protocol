const C='gfd-ems-shell-v223';
const UPDATE_SUMMARY='v223: Recovery/stability build. Service-worker install no longer blocks on large PDFs, image assets, or any single failed cache request. Optional observer-heavy layout helpers are temporarily not injected so the app can load reliably while the patient mode and age/weight controls remain available.';

const CORE_SHELL=[
 './','index.html','protocols.json','street-drugs.json','manifest.webmanifest','gfd-logo.svg',
 'pediatric-mode.js','pediatric-workflows.js','pediatric-home-cleanup.js',
 'adult-age-context.js','patient-context-launcher.js','patient-med-interactions.js'
];

const PDFJS=[
 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

self.addEventListener('install',e=>e.waitUntil((async()=>{
 const cache=await caches.open(C);
 await Promise.allSettled(CORE_SHELL.map(async path=>{
  try{
   const req=new Request(path,{cache:'reload'});
   const r=await fetch(req);
   if(r&&r.ok)await cache.put(req,r.clone());
  }catch(err){}
 }));
 await self.skipWaiting();
})()));

self.addEventListener('activate',e=>e.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));

async function injectCore(r){
 if(!r||!r.ok)return r;
 const type=r.headers.get('content-type')||'';
 if(!type.includes('text/html'))return r;
 let html=await r.text();
 const tags=[];
 if(!html.includes('pediatric-mode.js'))tags.push('<script src="pediatric-mode.js?v=223" defer></script>');
 if(!html.includes('pediatric-workflows.js'))tags.push('<script src="pediatric-workflows.js?v=223" defer></script>');
 if(!html.includes('pediatric-home-cleanup.js'))tags.push('<script src="pediatric-home-cleanup.js?v=223" defer></script>');
 if(!html.includes('adult-age-context.js'))tags.push('<script src="adult-age-context.js?v=223" defer></script>');
 if(!html.includes('patient-context-launcher.js'))tags.push('<script src="patient-context-launcher.js?v=223" defer></script>');
 if(!html.includes('patient-med-interactions.js'))tags.push('<script src="patient-med-interactions.js?v=223" defer></script>');
 if(tags.length){const tag=tags.join('');html=html.includes('</body>')?html.replace('</body>',tag+'</body>'):html+tag}
 const headers=new Headers(r.headers);headers.delete('content-length');
 return new Response(html,{status:r.status,statusText:r.statusText,headers});
}

async function cachePut(req,r){
 try{if(req.method==='GET'&&r&&r.ok&&r.status===200){const copy=r.clone();const cache=await caches.open(C);await cache.put(req,copy)}}catch(err){}
}

self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET')return;
 const u=new URL(req.url);
 const isPdfJs=PDFJS.includes(req.url);
 const isProtocolPdf=u.origin===location.origin&&u.pathname.endsWith('/updates/current-protocol-book.pdf');

 if(req.headers.has('range')){e.respondWith(fetch(req,{cache:'no-store'}));return}
 if(u.origin!==location.origin&&!isPdfJs)return;

 if(req.mode==='navigate'){
  e.respondWith((async()=>{
   try{
    const network=await fetch(req,{cache:'no-store'});
    const enhanced=await injectCore(network);
    cachePut(req,enhanced.clone());
    return enhanced;
   }catch(err){
    const hit=await caches.match(req)||await caches.match('index.html')||await caches.match('./');
    return hit?injectCore(hit):new Response('App unavailable offline. Reconnect and reload.',{status:503,headers:{'content-type':'text/plain'}});
   }
  })());
  return;
 }

 if(isProtocolPdf||isPdfJs||u.pathname.endsWith('/protocols.json')||u.pathname.endsWith('/street-drugs.json')){
  e.respondWith((async()=>{
   try{const r=await fetch(req,{cache:'no-store'});cachePut(req,r.clone());return r}catch(err){const hit=await caches.match(req);if(hit)return hit;throw err}
  })());
  return;
 }

 e.respondWith((async()=>{
  const hit=await caches.match(req);
  if(hit)return hit;
  const r=await fetch(req);
  cachePut(req,r.clone());
  return r;
 })());
});

self.addEventListener('message',e=>{
 const msg=e.data||{};
 if(msg.type==='GET_UPDATE_SUMMARY'){
  try{e.source?.postMessage({type:'UPDATE_SUMMARY',summary:UPDATE_SUMMARY})}catch(err){}
 }
});