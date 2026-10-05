(()=>{'use strict';
const ID='gfd-atropine-sequence-v298';
function installStyle(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');s.id=ID;s.textContent=`
.atropine-sequence{margin:12px 0 14px;border:1px solid #cbd5e1;border-left:5px solid #2f6690;border-radius:12px;background:#f8fafc;padding:11px}.atropine-sequence h3{margin:0 0 9px;color:#173a5e;font-size:16px}.atropine-dose-line{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;background:#fff;border:1px solid #dbe4ee;border-radius:10px;padding:10px}.atropine-dose-main{font-size:20px;font-weight:950;color:#0f172a}.atropine-dose-repeat{font-size:12px;font-weight:800;color:#475569}.atropine-calc-row{display:grid;grid-template-columns:minmax(0,1fr) 76px auto;gap:7px;margin-top:9px}.atropine-calc-row input,.atropine-calc-row select{width:100%;border:1px solid #cbd5e1;border-radius:9px;padding:9px;font-size:15px;background:#fff}.atropine-calc-row .dose-btn{margin:0;padding:9px 12px;white-space:nowrap}.atropine-ref-result{margin-top:8px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px}.atropine-stat{border-radius:9px;padding:9px 10px;background:#eff6ff;border:1px solid #bfdbfe}.atropine-stat span{display:block;font-size:10px;font-weight:900;letter-spacing:.05em;text-transform:uppercase;color:#475569}.atropine-stat b{display:block;margin-top:2px;font-size:17px;color:#173a5e}.atropine-stat.primary{background:#eefcf3;border-color:#86efac}.atropine-stat.primary b{color:#166534}.atropine-max-note{margin-top:7px;font-size:11px;line-height:1.35;color:#64748b}.atropine-max-note b{color:#334155}
body.dark-mode .atropine-sequence{background:#101a2a!important;border-color:#475569!important;border-left-color:#60a5fa!important}body.dark-mode .atropine-sequence h3{color:#f8fafc!important}body.dark-mode .atropine-dose-line{background:#111827!important;border-color:#334155!important}body.dark-mode .atropine-dose-main{color:#fff!important}body.dark-mode .atropine-dose-repeat{color:#cbd5e1!important}body.dark-mode .atropine-calc-row input,body.dark-mode .atropine-calc-row select{background:#0f172a!important;border-color:#64748b!important;color:#f8fafc!important}body.dark-mode .atropine-ref-result .atropine-stat{background:#102a43!important;border-color:#3b82f6!important}body.dark-mode .atropine-ref-result .atropine-stat span{color:#b8c7d9!important}body.dark-mode .atropine-ref-result .atropine-stat b{color:#f8fafc!important}body.dark-mode .atropine-ref-result .atropine-stat.primary{background:#102a20!important;border-color:#4ade80!important}body.dark-mode .atropine-ref-result .atropine-stat.primary b{color:#dcfce7!important}body.dark-mode .atropine-max-note{color:#aebbd0!important}body.dark-mode .atropine-max-note b{color:#e5edf7!important}
@media(max-width:620px){.atropine-calc-row{grid-template-columns:1fr 72px}.atropine-calc-row .dose-btn{grid-column:1/-1;width:100%}.atropine-ref-result{grid-template-columns:1fr}.atropine-stat{display:grid;grid-template-columns:1fr auto;align-items:center}.atropine-stat b{margin-top:0}}
`;
 document.head.appendChild(s);
}
function calcRef(btn){
 const card=btn.closest('.atropine-sequence');if(!card)return;
 const w=parseFloat(card.querySelector('.atropine-ref-weight')?.value);const u=card.querySelector('.atropine-ref-unit')?.value||'lb';const out=card.querySelector('.atropine-ref-result');
 if(!out)return;
 if(!Number.isFinite(w)||w<=0){out.innerHTML='<div class="atropine-stat"><span>Enter weight</span><b>—</b></div>';return}
 const kg=u==='lb'?w/2.2046226218:w;
 const ref=kg*.04;
 const max=Math.min(3,ref);
 const fullDoses=Math.floor((max+1e-9)/.5);
 out.innerHTML='<div class="atropine-stat"><span>0.04 mg/kg reference</span><b>'+ref.toFixed(2)+' mg</b></div><div class="atropine-stat primary"><span>Total maximum</span><b>'+max.toFixed(2)+' mg</b></div><div class="atropine-stat primary"><span>Full 0.5 mg doses</span><b>'+fullDoses+'</b></div>';
 const note=card.querySelector('.atropine-max-note');if(note)note.innerHTML='<b>'+fullDoses+' full 0.5 mg dose'+(fullDoses===1?'':'s')+'</b> can be given without exceeding the calculated total maximum. Maximum is the lower of 3 mg and the 0.04 mg/kg reference.';
}
function cardHtml(){return `<div class="atropine-sequence" data-atropine-sequence="1"><h3>Atropine — GFD Bradycardia Dose</h3><div class="atropine-dose-line"><span class="atropine-dose-main">0.5 mg IV</span><span class="atropine-dose-repeat">repeat every 3–5 min as needed</span></div><div class="atropine-calc-row"><input class="atropine-ref-weight" inputmode="decimal" type="number" min="0" step="0.1" placeholder="Patient weight"><select class="atropine-ref-unit"><option value="lb">lb</option><option value="kg">kg</option></select><button type="button" class="dose-btn atropine-ref-btn">Calculate max</button></div><div class="atropine-ref-result" aria-live="polite"><div class="atropine-stat"><span>0.04 mg/kg reference</span><b>—</b></div><div class="atropine-stat primary"><span>Total maximum</span><b>—</b></div><div class="atropine-stat primary"><span>Full 0.5 mg doses</span><b>—</b></div></div><div class="atropine-max-note">Enter weight to show the weight-based reference, total maximum, and number of full 0.5 mg doses.</div></div>`}
function apply(){
 document.querySelectorAll('.source-med-sheet').forEach(sheet=>{
  const title=sheet.querySelector('.source-med-title')?.textContent||'';
  if(!/\batropine\b/i.test(title)||sheet.querySelector('[data-atropine-sequence]'))return;
  const hdr=sheet.querySelector('.source-med-header');
  if(hdr)hdr.insertAdjacentHTML('afterend',cardHtml());else sheet.insertAdjacentHTML('afterbegin',cardHtml());
  const btn=sheet.querySelector('.atropine-ref-btn');if(btn)btn.addEventListener('click',()=>calcRef(btn));
 });
}
function boot(){installStyle();apply();new MutationObserver(apply).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();