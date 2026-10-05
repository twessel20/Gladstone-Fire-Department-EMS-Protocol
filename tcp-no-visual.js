(()=>{'use strict';
const ID='gfd-tcp-page10-reference-v309';
const ASSET='assets/zoll-page10.jpg?v=309';
const LEGACY='.tcp-zoll,.tcp-real-zoll,.tcp-zoll-page10,.tcp-zoll-force,[data-zoll-page10-force],[data-zoll-page10-static],iframe.tcp-zoll-page10-frame';
function installStyle(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
${LEGACY}{display:none!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;visibility:hidden!important}
.tcp-page10-ref{margin-top:10px;border-top:1px solid #dbe4ee;padding-top:10px}.tcp-page10-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid #94a3b8;background:#f8fafc;color:#173a5e;border-radius:10px;padding:11px 12px;font:inherit;font-weight:900;text-align:left;cursor:pointer}.tcp-page10-toggle small{display:block;margin-top:2px;color:#64748b;font-size:11px;font-weight:700}.tcp-page10-toggle .chev{font-size:18px;transition:transform .15s ease}.tcp-page10-toggle[aria-expanded="true"] .chev{transform:rotate(180deg)}.tcp-page10-panel{margin-top:8px;border:1px solid #dbe4ee;background:#fff;border-radius:10px;padding:8px}.tcp-page10-panel[hidden]{display:none!important}.tcp-page10-status{font-size:12px;line-height:1.4;color:#64748b;padding:8px}.tcp-page10-img{display:block;width:100%;height:auto;border-radius:7px;background:#fff}.tcp-page10-actions{display:flex;justify-content:flex-end;margin-top:7px}.tcp-page10-full{display:inline-block;text-decoration:none;background:#2f6690;color:#fff;border-radius:8px;padding:8px 10px;font-size:12px;font-weight:850}body.dark-mode .tcp-page10-toggle{background:#172033!important;border-color:#64748b!important;color:#f1f5f9!important}body.dark-mode .tcp-page10-toggle small,body.dark-mode .tcp-page10-status{color:#aebbd0!important}body.dark-mode .tcp-page10-panel{background:#111827!important;border-color:#475569!important}
`;
 document.head.appendChild(s);
}
function inReference(el){return !!el.closest?.('[data-tcp-page10-ref]')}
function isLegacyWrapper(el){
 if(inReference(el))return false;
 const txt=(el.textContent||'').trim();
 const cls=typeof el.className==='string'?el.className:'';
 return /zoll x series quick reference guide|actual page 10|page 10 from the department-provided|open original guide/i.test(txt)||/tcp-zoll-page10|tcp-zoll-force|tcp-real-zoll/.test(cls);
}
function removeLegacy(root){
 root.querySelectorAll(LEGACY).forEach(el=>el.remove());
 root.querySelectorAll('img').forEach(img=>{
  if(inReference(img))return;
  const a=(img.alt||'')+' '+(img.getAttribute('src')||'');
  if(/zoll|page-?10|pacing guide/i.test(a)){
   const wrap=img.closest('figure,.tcp-zoll-page10-card,.tcp-zoll-force-card');
   if(wrap&&!inReference(wrap))wrap.remove();else img.remove();
  }
 });
 root.querySelectorAll('a').forEach(a=>{
  if(inReference(a))return;
  const t=(a.textContent||'')+' '+(a.getAttribute('href')||'');
  if(/page 10|zoll.*guide|zoll-page10/i.test(t))a.remove();
 });
 [...root.querySelectorAll('div,section,figure')].reverse().forEach(el=>{if(isLegacyWrapper(el)&&!el.matches('.tcp-step-card'))el.remove()});
 root.querySelectorAll('.tcp-step-card').forEach(card=>{[...card.children].forEach(child=>{if(isLegacyWrapper(child))child.remove()})});
}
function stepTwo(root){return [...root.querySelectorAll('.tcp-step-card')].find(card=>/turn pacing on/i.test(card.textContent||''))||root.querySelectorAll('.tcp-step-card')[1]||null}
function ensureReference(root){
 const card=stepTwo(root);if(!card||card.querySelector('[data-tcp-page10-ref]'))return;
 const ref=document.createElement('div');ref.className='tcp-page10-ref';ref.dataset.tcpPage10Ref='1';
 ref.innerHTML=`<button type="button" class="tcp-page10-toggle" aria-expanded="false" onclick="toggleTcpPage10Ref(this)"><span>View ZOLL Page 10 Reference<small>Optional quick-reference image</small></span><span class="chev">⌄</span></button><div class="tcp-page10-panel" hidden><div class="tcp-page10-status">Tap above to load the reference.</div><img class="tcp-page10-img" alt="ZOLL X Series Quick Reference Guide page 10" hidden><div class="tcp-page10-actions" hidden><a class="tcp-page10-full" href="${ASSET}" target="_blank" rel="noopener">Open full size</a></div></div>`;
 card.appendChild(ref);
}
window.toggleTcpPage10Ref=function(btn){
 const ref=btn.closest('[data-tcp-page10-ref]');if(!ref)return;
 const panel=ref.querySelector('.tcp-page10-panel');const img=ref.querySelector('.tcp-page10-img');const status=ref.querySelector('.tcp-page10-status');const actions=ref.querySelector('.tcp-page10-actions');
 const opening=panel.hidden;panel.hidden=!opening;btn.setAttribute('aria-expanded',opening?'true':'false');
 if(!opening)return;
 if(img.dataset.loaded==='1'){status.hidden=true;img.hidden=false;actions.hidden=false;return}
 status.hidden=false;status.textContent='Loading ZOLL page 10…';img.hidden=true;actions.hidden=true;
 img.onload=()=>{img.dataset.loaded='1';status.hidden=true;img.hidden=false;actions.hidden=false};
 img.onerror=()=>{status.hidden=false;status.textContent='Reference image unavailable. Continue with the written pacing steps above.';img.hidden=true;actions.hidden=true;img.removeAttribute('src')};
 img.src=ASSET;
};
function clean(){
 installStyle();
 const root=document.querySelector('[data-tcp-procedure]');if(!root)return;
 removeLegacy(root);ensureReference(root);
}
function boot(){
 clean();let timer=0;
 new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(clean,35)}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();