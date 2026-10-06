(()=>{'use strict';
const ID='gfd-tcp-page10-jpeg-v311';
const ASSET='assets/zoll-pacing-page10.jpg?v=311';
const LEGACY='.tcp-zoll,.tcp-real-zoll,.tcp-zoll-page10,.tcp-zoll-force,[data-zoll-page10-force],[data-zoll-page10-static],iframe.tcp-zoll-page10-frame,.tcp-page10-ref,[data-tcp-page10-ref]';
function installStyle(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');s.id=ID;s.textContent=`
${LEGACY}{display:none!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;visibility:hidden!important}
.tcp-page10-jpeg{margin-top:12px;border:1px solid #cbd5e1;border-radius:12px;background:#fff;overflow:hidden}.tcp-page10-jpeg-head{padding:10px 12px;background:#f8fafc;border-bottom:1px solid #dbe4ee}.tcp-page10-jpeg-head b{display:block;color:#173a5e;font-size:13px}.tcp-page10-jpeg-head small{display:block;color:#64748b;font-size:11px;margin-top:2px;line-height:1.35}.tcp-page10-jpeg a{display:block;background:#fff}.tcp-page10-jpeg img{display:block!important;width:100%!important;height:auto!important;max-height:none!important;margin:0!important;padding:0!important;visibility:visible!important;border:0!important;background:#fff}.tcp-page10-jpeg-note{padding:8px 12px;font-size:11px;line-height:1.4;color:#64748b;border-top:1px solid #e2e8f0}body.dark-mode .tcp-page10-jpeg{background:#111827!important;border-color:#475569!important}body.dark-mode .tcp-page10-jpeg-head{background:#172033!important;border-color:#475569!important}body.dark-mode .tcp-page10-jpeg-head b{color:#f1f5f9!important}body.dark-mode .tcp-page10-jpeg-head small,body.dark-mode .tcp-page10-jpeg-note{color:#aebbd0!important}body.dark-mode .tcp-page10-jpeg-note{border-color:#475569!important}
`;
 document.head.appendChild(s);
}
function inExactRef(el){return !!el.closest?.('[data-tcp-page10-jpeg]')}
function isLegacyWrapper(el){
 if(inExactRef(el))return false;
 const txt=(el.textContent||'').trim();
 const cls=typeof el.className==='string'?el.className:'';
 return /actual page 10|page 10 from the department-provided|open original guide|view zoll page 10 reference|optional quick-reference image/i.test(txt)||/tcp-zoll-page10|tcp-zoll-force|tcp-real-zoll|tcp-page10-ref/.test(cls);
}
function removeLegacy(root){
 root.querySelectorAll(LEGACY).forEach(el=>el.remove());
 root.querySelectorAll('img').forEach(img=>{
  if(inExactRef(img))return;
  const a=(img.alt||'')+' '+(img.getAttribute('src')||'');
  if(/zoll|page-?10|pacing guide/i.test(a)){
   const wrap=img.closest('figure,.tcp-zoll-page10-card,.tcp-zoll-force-card,.tcp-page10-panel,.tcp-page10-ref');
   if(wrap&&!inExactRef(wrap))wrap.remove();else img.remove();
  }
 });
 root.querySelectorAll('a').forEach(a=>{
  if(inExactRef(a))return;
  const t=(a.textContent||'')+' '+(a.getAttribute('href')||'');
  if(/page 10|zoll.*guide|zoll-page10/i.test(t))a.remove();
 });
 [...root.querySelectorAll('div,section,figure')].reverse().forEach(el=>{if(isLegacyWrapper(el)&&!el.matches('.tcp-step-card'))el.remove()});
 root.querySelectorAll('.tcp-step-card').forEach(card=>{[...card.children].forEach(child=>{if(isLegacyWrapper(child))child.remove()})});
}
function stepTwo(root){return [...root.querySelectorAll('.tcp-step-card')].find(card=>/turn pacing on/i.test(card.textContent||''))||root.querySelectorAll('.tcp-step-card')[1]||null}
function ensureImage(root){
 const card=stepTwo(root);if(!card||card.querySelector('[data-tcp-page10-jpeg]'))return;
 const ref=document.createElement('div');ref.className='tcp-page10-jpeg';ref.dataset.tcpPage10Jpeg='1';
 ref.innerHTML=`<div class="tcp-page10-jpeg-head"><b>ZOLL X Series — Pacing Quick Reference</b><small>Exact page 10 from the department-provided X Series Quick Reference Guide. Tap the image to open it full size.</small></div><a href="${ASSET}" target="_blank" rel="noopener"><img src="${ASSET}" alt="Exact ZOLL X Series Quick Reference Guide page 10 — pacing"></a><div class="tcp-page10-jpeg-note">Device-operation reference only. Follow the GFD Bradycardia protocol and the clinical decision path above.</div>`;
 const img=ref.querySelector('img');img.onerror=()=>ref.remove();
 card.appendChild(ref);
}
function apply(){
 installStyle();
 const root=document.querySelector('[data-tcp-procedure]');if(!root)return;
 removeLegacy(root);ensureImage(root);
}
function boot(){
 apply();let timer=0;
 new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(apply,35)}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();