(()=>{'use strict';
const PDF='https://www.mffdtraining.org/uploads/1/3/4/8/134809884/zoll-x-seriesreference.pdf#page=10&view=FitH';
const ID='tcp-zoll-page10-v296';
function installStyles(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');s.id=ID;s.textContent=`
.tcp-zoll-page10{margin:10px 0}.tcp-zoll-page10-card{background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:8px;overflow:hidden}.tcp-zoll-page10-frame{display:block;width:100%;height:min(76vh,760px);border:0;background:#fff;border-radius:8px}.tcp-zoll-page10-title{font-size:11px;font-weight:950;letter-spacing:.06em;color:#475569;margin:0 0 6px}.tcp-zoll-page10-note{font-size:11px;line-height:1.4;color:#64748b;margin-top:7px}.tcp-zoll-page10-link{display:block;margin-top:8px;text-align:center;background:#2f6690;color:#fff!important;text-decoration:none;border-radius:9px;padding:9px 10px;font-weight:850;font-size:12px}.tcp-zoll-mini-ref{margin-top:8px;border:1px solid #cbd5e1;background:#f8fafc;border-radius:10px;padding:9px 10px;font-size:12px;line-height:1.42;color:#334155}.tcp-zoll-mini-ref b{color:#173a5e}
body.dark-mode .tcp-zoll-page10-card{background:#111827!important;border-color:#475569!important}body.dark-mode .tcp-zoll-page10-title{color:#dbe5ef!important}body.dark-mode .tcp-zoll-page10-note{color:#aebbd0!important}body.dark-mode .tcp-zoll-mini-ref{background:#101a2a!important;border-color:#475569!important;color:#d7e0ea!important}body.dark-mode .tcp-zoll-mini-ref b{color:#f1f5f9!important}
@media(max-width:620px){.tcp-zoll-page10-frame{height:68vh}.tcp-zoll-page10-card{padding:6px}}
`;
 document.head.appendChild(s);
}
function apply(){
 const root=document.querySelector('[data-tcp-procedure]');if(!root)return;
 const old=root.querySelector('.tcp-real-zoll,.tcp-zoll');
 if(old&&old.dataset.page10Applied!=='1'){
  old.dataset.page10Applied='1';
  old.className='tcp-zoll-page10';
  old.innerHTML=`<div class="tcp-zoll-page10-card"><div class="tcp-zoll-page10-title">ZOLL X SERIES QUICK REFERENCE GUIDE — PAGE 10</div><iframe class="tcp-zoll-page10-frame" src="${PDF}" title="ZOLL X Series Quick Reference Guide page 10 — pacing" loading="eager"></iframe><div class="tcp-zoll-page10-note">This is the actual pacing page from the X Series Quick Reference Guide. No recreated or generated monitor artwork is used.</div><a class="tcp-zoll-page10-link" href="${PDF}" target="_blank" rel="noopener">Open Page 10 Full Screen</a></div>`;
 }
 if(!root.querySelector('[data-zoll-pause-ref]'))root.insertAdjacentHTML('beforeend',`<div class="tcp-zoll-mini-ref" data-zoll-pause-ref><b>Pause Pacer:</b> Press PACER → highlight Pause Pacer → press Select.</div><div class="tcp-zoll-mini-ref"><b>Turn Pacer Off:</b> Press PACER → highlight Turn Pacer Off → press Select.</div>`);
}
function boot(){installStyles();apply();new MutationObserver(apply).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();