const C='gfd-ems-shell-v225';
const UPDATE_SUMMARY='v225: Added a reliable in-app Share App button. On supported phones it opens the native share sheet; otherwise it copies or presents the public app link. The v223 stability protections and v224 Home Screen icon support remain in place.';

const CORE_SHELL=[
 './','index.html','protocols.json','street-drugs.json','manifest.webmanifest','gfd-logo.svg',
 'pediatric-mode.js','pediatric-workflows.js','pediatric-home-cleanup.js',
 'adult-age-context.js','patient-context-launcher.js','patient-med-interactions.js','app-share.js'
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

async function gladstoneTouchIcon(){
 try{
  const r=await fetch(new Request('gfd-logo.svg',{cache:'no-store'}));
  if(!r.ok)throw new Error('logo unavailable');
  const svg=await r.text();
  const m=svg.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
  if(!m)throw new Error('embedded png unavailable');
  const bin=atob(m[1]);
  const bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  return new Response(bytes,{status:200,headers:{
   'content-type':'image/png',
   'cache-control':'public, max-age=31536000, immutable'
  }});
 }catch(err){
  return new Response('',{status:404});
 }
}

async function injectCore(r){
 if(!r||!r.ok)return r;
 const type=r.headers.get('content-type')||'';
 if(!type.includes('text/html'))return r;
 let html=await r.text();
 html=html.replace(/<link rel="apple-touch-icon" href="gfd-logo\.svg">/i,'<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png?v=225"><link rel="apple-touch-icon-precomposed" sizes="180x180" href="apple-touch-icon.png?v=225"><meta name="apple-mobile-web-app-title" content="GFD EMS"><meta name="apple-mobile-web-app-capable" content="yes">');
 const tags=[];
 if(!html.includes('pediatric-mode.js'))tags.push('<script src="pediatric-mode.js?v=225" defer></script>');
 if(!html.includes('pediatric-workflows.js'))tags.push('<script src="pediatric-workflows.js?v=225" defer></script>');
 if(!html.includes('pediatric-home-cleanup.js'))tags.push('<script src="pediatric-home-cleanup.js?v=225" defer></script>');
 if(!html.includes('adult-age-context.js'))tags.push('<script src="adult-age-context.js?v=225" defer></script>');
 if(!html.includes('patient-context-launcher.js'))tags.push('<script src="patient-context-launcher.js?v=225" defer></script>');
 if(!html.includes('patient-med-interactions.js'))tags.push('<script src="patient-med-interactions.js?v=225" defer></script>');
 if(!html.includes('app-share.js'))tags.push('<script src="app-share.js?v=225" defer></script>');
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
 const isTouchIcon=u.origin===location.origin&&u.pathname.endsWith('/apple-touch-icon.png');

 if(req.headers.has('range')){e.respondWith(fetch(req,{cache:'no-store'}));return}
 if(u.origin!==location.origin&&!isPdfJs)return;

 if(isTouchIcon){e.respondWith(gladstoneTouchIcon());return}

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