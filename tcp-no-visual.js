(()=>{'use strict';
const ID='gfd-tcp-no-visual-v306';
function clean(){
 const root=document.querySelector('[data-tcp-procedure]');
 if(!root)return;
 root.querySelectorAll('.tcp-zoll,.tcp-real-zoll,.tcp-zoll-page10,.tcp-zoll-force,[data-zoll-page10-force],[data-zoll-page10-static],iframe.tcp-zoll-page10-frame').forEach(el=>el.remove());
 root.querySelectorAll('img').forEach(img=>{
  const a=(img.alt||'')+' '+(img.src||'');
  if(/zoll|page-?10|pacing guide/i.test(a))img.remove();
 });
 root.querySelectorAll('a').forEach(a=>{
  const t=(a.textContent||'')+' '+(a.href||'');
  if(/page 10|zoll.*guide|zoll-page10/i.test(t))a.remove();
 });
}
function boot(){
 clean();
 let timer=0;
 new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(clean,50)}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();