const C='gfd-ems-shell-v226';
const UPDATE_SUMMARY='v226: Stability rollback. Restored the pre-interaction app baseline and reduced the service worker to a minimal core. Removed the medication-interaction layer, share helper, patient launcher, and observer-heavy layout injections from startup. Adult and pediatric patient context remain available.';

const CORE=[
 './','index.html','protocols.json','street-drugs.json','manifest.webmanifest','gfd-logo.svg',
 'pediatric-mode.js','adult-age-context.js'
];

self.addEventListener('install',e=>e.waitUntil((async()=>{
 const cache=await caches.open(C);
 await Promise.allSettled(CORE.map(async path=>{
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
 if(!html.includes('pediatric-mode.js'))tags.push('<script src="pediatric-mode.js?v=226" defer></script>');
 if(!html.includes('adult-age-context.js'))tags.push('<script src="adult-age-context.js?v=226" defer></script>');
 if(tags.length){
  const tag=tags.join('');
  html=html.includes('</body>')?html.replace('</body>',tag+'</body>'):html+tag;
 }
 const headers=new Headers(r.headers);
 headers.delete('content-length');
 return new Response(html,{status:r.status,statusText:r.statusText,headers});
}

async function put(req,r){
 try{
  if(req.method==='GET'&&r&&r.ok&&r.status===200){
   const cache=await caches.open(C);
   await cache.put(req,r.clone());
  }
 }catch(err){}
}

self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET')return;
 const u=new URL(req.url);
 if(u.origin!==location.origin)return;

 if(req.mode==='navigate'){
  e.respondWith((async()=>{
   try{
    const network=await fetch(req,{cache:'no-store'});
    const enhanced=await injectCore(network);
    put(req,enhanced);
    return enhanced;
   }catch(err){
    const hit=await caches.match(req)||await caches.match('index.html')||await caches.match('./');
    return hit?injectCore(hit):new Response('App unavailable offline. Reconnect and reload.',{status:503,headers:{'content-type':'text/plain'}});
   }
  })());
  return;
 }

 if(u.pathname.endsWith('/protocols.json')||u.pathname.endsWith('/street-drugs.json')){
  e.respondWith((async()=>{
   try{
    const r=await fetch(req,{cache:'no-store'});
    put(req,r);
    return r;
   }catch(err){
    const hit=await caches.match(req);
    if(hit)return hit;
    throw err;
   }
  })());
  return;
 }

 e.respondWith((async()=>{
  const hit=await caches.match(req);
  if(hit)return hit;
  const r=await fetch(req);
  put(req,r);
  return r;
 })());
});

self.addEventListener('message',e=>{
 const msg=e.data||{};
 if(msg.type==='GET_UPDATE_SUMMARY'){
  try{e.source?.postMessage({type:'UPDATE_SUMMARY',summary:UPDATE_SUMMARY})}catch(err){}
 }
});
