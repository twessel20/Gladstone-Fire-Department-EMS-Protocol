const UPDATE_SUMMARY='v227: Emergency recovery build. Rolled the app back to the known-stable v208 application baseline and disabled service-worker caching/interception so Safari loads the app directly from GitHub Pages. Existing GFD EMS caches are cleared during activation.';

self.addEventListener('install',event=>{
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    try{
      const keys=await caches.keys();
      await Promise.all(keys.map(key=>caches.delete(key)));
    }catch(err){}
    try{await self.clients.claim();}catch(err){}
    try{await self.registration.unregister();}catch(err){}
  })());
});

self.addEventListener('message',event=>{
  const msg=event.data||{};
  if(msg.type==='GET_UPDATE_SUMMARY'){
    try{event.source?.postMessage({type:'UPDATE_SUMMARY',summary:UPDATE_SUMMARY});}catch(err){}
  }
});
