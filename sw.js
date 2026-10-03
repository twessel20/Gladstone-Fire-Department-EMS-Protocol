const C='gfd-ems-shell-v212';
const UPDATE_SUMMARY='v212: Cleaned up the Hypoglycemia protocol dose presentation. Adult and pediatric D10 dosing now appears in a single source-faithful quick-reference card to reduce visual clutter while preserving the Gladstone protocol language and workflow.';
const SHELL=['./','index.html','admin.html','protocol-viewer.html','protocols.json','street-drugs.json','pediatric-mode.js','pediatric-workflows.js','pediatric-home-cleanup.js','adult-age-context.js','reorder-fluid.js','medication-layout-cleanup.js','global-view-uniformity.js','protocol-flow-enhancement.js','hypoglycemia-layout.js','manifest.webmanifest','gfd-logo.svg','assets/ku-entrance-image.b64','assets/st-lukes-plaza-entrance.b64','assets/truman-er-entrance.b64','assets/nkch-er-entrance.b64','assets/liberty-er-entrance-1.b64','assets/liberty-er-entrance-2.b64','assets/liberty-er-entrance-3.b64','assets/liberty-er-entrance-4.b64','assets/liberty-er-entrance-5.b64','assets/st-lukes-northland-er-fixed-1.b64','assets/st-lukes-northland-er-fixed-1b.b64','assets/st-lukes-northland-er-fixed-2.b64','assets/st-lukes-northland-er-fixed-3.b64','assets/childrens-mercy-er-1.b64','assets/childrens-mercy-er-2.b64','assets/childrens-mercy-er-3.b64','assets/childrens-mercy-er-4.b64','assets/childrens-mercy-er-5.b64','assets/childrens-mercy-er-6.b64','assets/childrens-mercy-er-7.b64','assets/childrens-mercy-er-8.b64','assets/childrens-mercy-er-9.b64','assets/research-photo-2026-10-01-1.b64','assets/research-photo-2026-10-01-2.b64','assets/research-photo-2026-10-01-3.b64','assets/research-photo-2026-10-01-4a.b64','assets/research-photo-2026-10-01-4b.b64','assets/research-photo-2026-10-01-5.b64','assets/research-photo-2026-10-01-6.b64','assets/research-photo-2026-10-01-7.b64','assets/research-photo-2026-10-01-8.b64','updates/current-protocol-book.pdf'];
const PDFJS=[
 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

self.addEventListener('install',e=>e.waitUntil((async()=>{
 const cache=await caches.open(C);
 await cache.addAll(SHELL);
 await Promise.allSettled(PDFJS.map(async url=>{
   const r=await fetch(url,{mode:'cors',cache:'no-store'});
   if(r.ok&&r.status===200)await cache.put(url,r.clone());
 }));
 await self.skipWaiting();
})()));

self.addEventListener('activate',e=>e.waitUntil(
 caches.keys()
   .then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))
   .then(()=>self.clients.claim())
));

async function injectPatientContext(r){
 if(!r||!r.ok)return r;
 const type=r.headers.get('content-type')||'';
 if(!type.includes('text/html'))return r;
 let html=await r.text();
 const tags=[];
 if(!html.includes('pediatric-mode.js'))tags.push('<script src="pediatric-mode.js?v=212" defer></script>');
 if(!html.includes('pediatric-workflows.js'))tags.push('<script src="pediatric-workflows.js?v=212" defer></script>');
 if(!html.includes('pediatric-home-cleanup.js'))tags.push('<script src="pediatric-home-cleanup.js?v=212" defer></script>');
 if(!html.includes('adult-age-context.js'))tags.push('<script src="adult-age-context.js?v=212" defer></script>');
 if(!html.includes('reorder-fluid.js'))tags.push('<script src="reorder-fluid.js?v=212" defer></script>');
 if(!html.includes('medication-layout-cleanup.js'))tags.push('<script src="medication-layout-cleanup.js?v=212" defer></script>');
 if(!html.includes('global-view-uniformity.js'))tags.push('<script src="global-view-uniformity.js?v=212" defer></script>');
 if(!html.includes('protocol-flow-enhancement.js'))tags.push('<script src="protocol-flow-enhancement.js?v=212" defer></script>');
 if(!html.includes('hypoglycemia-layout.js'))tags.push('<script src="hypoglycemia-layout.js?v=212" defer></script>');
 if(tags.length){const tag=tags.join('');html=html.includes('</body>')?html.replace('</body>',tag+'</body>'):html+tag}
 const headers=new Headers(r.headers);
 headers.delete('content-length');
 return new Response(html,{status:r.status,statusText:r.statusText,headers});
}

self.addEventListener('fetch',e=>{
 const req=e.request;
 const u=new URL(req.url);
 const isPdfJs=PDFJS.includes(req.url);
 const isProtocolPdf=u.origin===location.origin&&u.pathname.endsWith('/updates/current-protocol-book.pdf');

 if(req.headers.has('range')){
   e.respondWith(fetch(req,{cache:'no-store'}));
   return;
 }

 if(u.origin!==location.origin&&!isPdfJs)return;

 if(isPdfJs){
   e.respondWith(
     caches.match(req).then(hit=>hit||fetch(req,{cache:'no-store'}).then(r=>{
       if(r.ok&&r.status===200){const copy=r.clone();caches.open(C).then(cache=>cache.put(req,copy))}
       return r;
     }))
   );
   return;
 }

 if(isProtocolPdf){
   e.respondWith(
     fetch(req,{cache:'no-store'}).then(r=>{
       if(r.ok&&r.status===200){const copy=r.clone();caches.open(C).then(cache=>cache.put(req,copy))}
       return r;
     }).catch(()=>caches.match(req))
   );
   return;
 }

 if(req.mode==='navigate'){
   e.respondWith((async()=>{
     try{
       const network=await fetch(req,{cache:'no-store'});
       const enhanced=await injectPatientContext(network);
       const copy=enhanced.clone();caches.open(C).then(cache=>cache.put(req,copy));
       return enhanced;
     }catch(err){
       const hit=await caches.match(req);
       return hit?injectPatientContext(hit):hit;
     }
   })());
   return;
 }

 if(u.pathname.endsWith('/protocols.json')){
   e.respondWith(
     fetch(req,{cache:'no-store'}).then(r=>{
       const copy=r.clone();caches.open(C).then(cache=>cache.put(req,copy));return r;
     }).catch(()=>caches.match(req))
   );
   return;
 }

 if(u.pathname.endsWith('/street-drugs.json')){
   const cacheKey=new Request(new URL('street-drugs.json',location.href).href);
   e.respondWith(
     fetch(cacheKey,{cache:'no-store'}).then(r=>{
       if(r.ok&&r.status===200){const copy=r.clone();caches.open(C).then(cache=>cache.put(cacheKey,copy))}
       return r;
     }).catch(()=>caches.match(cacheKey))
   );
   return;
 }

 e.respondWith(
   caches.match(req).then(hit=>hit||fetch(req).then(r=>{
     if(req.method==='GET'&&r.ok&&r.status===200){
       const copy=r.clone();caches.open(C).then(cache=>cache.put(req,copy));
     }
     return r;
   }))
 );
});

self.addEventListener('message',e=>{
 const msg=e.data||{};
 if(msg.type==='GET_UPDATE_SUMMARY'){
   try{e.source?.postMessage({type:'UPDATE_SUMMARY',summary:UPDATE_SUMMARY})}catch(err){}
 }
});
