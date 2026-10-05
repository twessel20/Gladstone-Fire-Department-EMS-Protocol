(()=>{'use strict';
const ID='gfd-tcp-no-visual-v310';
const SELECTORS='.tcp-zoll,.tcp-real-zoll,.tcp-zoll-page10,.tcp-zoll-force,[data-zoll-page10-force],[data-zoll-page10-static],iframe.tcp-zoll-page10-frame,.tcp-page10-ref,[data-tcp-page10-ref]';
function installStyle(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');s.id=ID;s.textContent=`
${SELECTORS}{display:none!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;visibility:hidden!important}
.tcp-step-card img[alt*="ZOLL" i],.tcp-step-card img[alt*="page 10" i],.tcp-step-card img[src*="zoll" i]{display:none!important;height:0!important;margin:0!important;padding:0!important}
`;
 document.head.appendChild(s);
}
function isVisualWrapper(el){
 const txt=(el.textContent||'').trim();
 const cls=typeof el.className==='string'?el.className:'';
 return /zoll x series quick reference guide|actual page 10|page 10 from the department-provided|open original guide|view zoll page 10 reference|optional quick-reference image/i.test(txt)||/tcp-zoll-page10|tcp-zoll-force|tcp-real-zoll|tcp-page10-ref/.test(cls);
}
function clean(){
 installStyle();
 const root=document.querySelector('[data-tcp-procedure]');
 if(!root)return;
 root.querySelectorAll(SELECTORS).forEach(el=>el.remove());
 root.querySelectorAll('img').forEach(img=>{
  const a=(img.alt||'')+' '+(img.getAttribute('src')||'');
  if(/zoll|page-?10|pacing guide/i.test(a)){
   const wrap=img.closest('figure,.tcp-zoll-page10-card,.tcp-zoll-force-card,.tcp-page10-panel,.tcp-page10-ref');
   if(wrap)wrap.remove(); else img.remove();
  }
 });
 root.querySelectorAll('a').forEach(a=>{
  const t=(a.textContent||'')+' '+(a.getAttribute('href')||'');
  if(/page 10|zoll.*guide|zoll-page10/i.test(t))a.remove();
 });
 [...root.querySelectorAll('div,section,figure')].reverse().forEach(el=>{
  if(isVisualWrapper(el)&&!el.matches('.tcp-step-card'))el.remove();
 });
 root.querySelectorAll('.tcp-step-card').forEach(card=>{
  [...card.children].forEach(child=>{if(isVisualWrapper(child))child.remove()});
 });
}
function boot(){
 clean();
 let timer=0;
 new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(clean,20)}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();