(()=>{'use strict';
const ZV_ID='zoll-ventilator-procedure';
const PDF_URL='https://opencriticalcare.org/wp-content/uploads/2020/12/QRG-731-l5g4zq.pdf';
function currentId(){try{return typeof currentProtocolId!=='undefined'?currentProtocolId:null}catch(e){return null}}
function styles(){if(document.getElementById('zv-source-view-style'))return;const s=document.createElement('style');s.id='zv-source-view-style';s.textContent=`
.zv-source-btn{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;border:2px solid #0f6f9f;background:#eef8fc;color:#0c4a6e;border-radius:12px;padding:12px 13px;margin:10px 0;font:inherit;cursor:pointer}.zv-source-btn b,.zv-source-btn small{display:block}.zv-source-btn small{font-size:11px;color:#0369a1;margin-top:2px}.zv-source-btn strong{font-size:22px}.dark-mode .zv-source-btn{background:#102333!important;border-color:#38bdf8!important;color:#e0f2fe!important}.dark-mode .zv-source-btn small{color:#7dd3fc!important}
`;document.head.appendChild(s)}
function openFullPage(){
 const a=document.createElement('a');
 a.href=PDF_URL;
 a.target='_blank';
 a.rel='noopener';
 a.style.display='none';
 document.body.appendChild(a);
 a.click();
 setTimeout(()=>a.remove(),0);
}
function addButton(){if(currentId()!==ZV_ID)return;const root=document.querySelector('[data-zv-procedure]');if(!root||root.querySelector('[data-zv-source-button]'))return;const btn=document.createElement('button');btn.type='button';btn.className='zv-source-btn';btn.dataset.zvSourceButton='1';btn.innerHTML='<span><b>View Z Vent Guide PDF</b><small>Opens the ZOLL device guide directly in full-page PDF view</small></span><strong>›</strong>';btn.addEventListener('click',openFullPage);const related=root.querySelector('[data-zv-open-niv]');if(related)related.insertAdjacentElement('beforebegin',btn);else root.appendChild(btn)}
function patchOpen(){if(typeof window.openP!=='function')return false;if(window.openP.__zvSourcePatched319)return true;const original=window.openP;function wrapped(id){const r=original.apply(this,arguments);if(id===ZV_ID)requestAnimationFrame(()=>requestAnimationFrame(addButton));return r}wrapped.__zvSourcePatched319=true;wrapped.__zvSourceOriginal=original;window.openP=wrapped;return true}
function boot(){styles();let tries=0;const run=()=>{const p=patchOpen();addButton();if(!p&&tries++<50)setTimeout(run,100)};run()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();