(()=>{'use strict';
const SETTINGS='https://www.rugd.net.au/pocit/ZollXPace1.png';
const PACING='https://www.rugd.net.au/pocit/ZollPacing.png';
function installStyles(){
 if(document.getElementById('tcp-zoll-real-art-style'))return;
 const s=document.createElement('style');s.id='tcp-zoll-real-art-style';s.textContent=`
.tcp-real-zoll{display:grid;gap:10px;margin:10px 0}.tcp-real-zoll figure{margin:0;border:1px solid #cbd5e1;background:#f8fafc;border-radius:12px;padding:8px;overflow:hidden}.tcp-real-zoll img{display:block;width:100%;height:auto;max-height:360px;object-fit:contain;background:#111827;border-radius:8px}.tcp-real-zoll figcaption{font-size:11px;line-height:1.35;color:#64748b;margin-top:6px}.tcp-real-zoll-label{font-size:10px;font-weight:950;letter-spacing:.07em;color:#475569;margin-bottom:5px}.tcp-zoll-art-note{font-size:11px;line-height:1.35;color:#64748b;margin:5px 1px 0}.tcp-zoll-art-fallback{display:none;border:1px solid #f59e0b;background:#fffbeb;color:#78350f;border-radius:10px;padding:9px 10px;font-size:12px}.tcp-real-zoll img[data-failed="1"]{display:none}.tcp-real-zoll img[data-failed="1"]+figcaption+.tcp-zoll-art-fallback{display:block}
body.dark-mode .tcp-real-zoll figure{background:#111827!important;border-color:#475569!important}body.dark-mode .tcp-real-zoll figcaption,body.dark-mode .tcp-zoll-art-note{color:#9fb0c4!important}body.dark-mode .tcp-real-zoll-label{color:#cbd5e1!important}body.dark-mode .tcp-zoll-art-fallback{background:#33250d!important;border-color:#f59e0b!important;color:#fef3c7!important}
@media(max-width:620px){.tcp-real-zoll img{max-height:none}.tcp-real-zoll figure{padding:7px}.tcp-real-zoll figcaption{font-size:10.5px}}
`;
 document.head.appendChild(s);
}
function figure(src,label,caption){
 return `<figure><div class="tcp-real-zoll-label">${label}</div><img src="${src}" alt="${caption}" loading="eager" referrerpolicy="no-referrer" onerror="this.dataset.failed='1'"><figcaption>${caption}</figcaption><div class="tcp-zoll-art-fallback">Image unavailable. Follow the written ZOLL X Series pacing steps below.</div></figure>`;
}
function replaceMock(){
 const root=document.querySelector('[data-tcp-procedure]');if(!root)return;
 const mock=root.querySelector('.tcp-zoll');
 if(!mock||mock.dataset.realArtApplied==='1')return;
 mock.dataset.realArtApplied='1';
 mock.className='tcp-real-zoll';
 mock.innerHTML=figure(SETTINGS,'ACTUAL X SERIES PACER SETTINGS','Actual ZOLL X Series Pacer Settings screen reference: Demand mode, rate, output, Start Pacer / Turn Pacer Off.')+
                 figure(PACING,'ACTUAL X SERIES ACTIVE PACING','Actual ZOLL X Series active pacing screen reference showing pacing status and capture markers.')+
                 '<div class="tcp-zoll-art-note">Device screen appearance can vary by software/configuration. Use your department X Series and GFD protocol as authoritative.</div>';
}
function boot(){installStyles();replaceMock();const obs=new MutationObserver(replaceMock);obs.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();