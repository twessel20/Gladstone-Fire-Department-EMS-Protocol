const C='gfd-ems-shell-v45';
const SHELL=['./','index.html','admin.html','protocol-viewer.html','protocols.json','manifest.webmanifest','gfd-logo.svg','updates/current-protocol-book.pdf'];
const PDFJS=[
 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];
self.addEventListener('install',e=>e.waitUntil((async()=>{
 const cache=await caches.open(C);
 await cache.addAll(SHELL);
 await Promise.allSettled(PDFJS.map(async url=>{
   const r=await fetch(url,{mode:'cors'});
   if(r.ok)await cache.put(url,r);
 }));
 await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 const isPdfJs=PDFJS.includes(e.request.url);
 if(u.origin!==location.origin&&!isPdfJs)return;
 if(isPdfJs){
   e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r})));
   return;
 }
 if(e.request.mode==='navigate'){
   e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
   return;
 }
 if(u.pathname.endsWith('/protocols.json')){
   e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
   return;
 }
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(e.request.method==='GET'&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r})));
});