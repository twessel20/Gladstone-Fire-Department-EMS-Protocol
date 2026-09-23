const C='gfd-ems-shell-v106';
const SHELL=['./','index.html','admin.html','protocol-viewer.html','protocols.json','manifest.webmanifest','gfd-logo.svg','updates/current-protocol-book.pdf'];
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

self.addEventListener('fetch',e=>{
 const req=e.request;
 const u=new URL(req.url);
 const isPdfJs=PDFJS.includes(req.url);
 const isProtocolPdf=u.origin===location.origin&&u.pathname.endsWith('/updates/current-protocol-book.pdf');

 // Never satisfy or store byte-range requests from Cache Storage.
 // Range responses can corrupt PDF.js parsing when replayed as full files.
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
   e.respondWith(
     fetch(req,{cache:'no-store'}).then(r=>{
       const copy=r.clone();caches.open(C).then(cache=>cache.put(req,copy));return r;
     }).catch(()=>caches.match(req))
   );
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

 e.respondWith(
   caches.match(req).then(hit=>hit||fetch(req).then(r=>{
     if(req.method==='GET'&&r.ok&&r.status===200){
       const copy=r.clone();caches.open(C).then(cache=>cache.put(req,copy));
     }
     return r;
   }))
 );
});