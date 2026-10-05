(()=>{'use strict';
const ID='gfd-atropine-sequence-v297';
function installStyle(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');s.id=ID;s.textContent=`
.atropine-sequence{margin:14px 0 16px;border:1px solid #cbd5e1;border-left:5px solid #2f6690;border-radius:12px;background:#f8fafc;padding:12px}.atropine-sequence h3{margin:0 0 10px;color:#173a5e;font-size:17px}.atropine-seq-grid{display:grid;gap:8px}.atropine-seq-step{display:grid;grid-template-columns:82px 1fr;gap:10px;align-items:start;background:#fff;border:1px solid #dbe4ee;border-radius:10px;padding:10px}.atropine-seq-label{font-size:11px;font-weight:950;letter-spacing:.05em;text-transform:uppercase;color:#2f6690}.atropine-seq-copy{font-size:14px;line-height:1.4;color:#1f2937}.atropine-seq-copy b{color:#0f172a}.atropine-total-ref{margin-top:10px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:10px;color:#7c2d12;font-size:12px;line-height:1.45}.atropine-total-ref b{color:#9a3412}.atropine-total-ref strong{display:block;margin-top:4px;font-size:13px}.atropine-sequence .dose-btn{margin-top:10px}.atropine-ref-result{margin-top:8px;border-radius:9px;padding:9px 10px;background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;font-size:13px;line-height:1.4}.atropine-ref-result b{display:block;color:#1e3a8a}
body.dark-mode .atropine-sequence{background:#101a2a!important;border-color:#475569!important;border-left-color:#60a5fa!important}body.dark-mode .atropine-sequence h3{color:#f8fafc!important}body.dark-mode .atropine-seq-step{background:#111827!important;border-color:#334155!important}body.dark-mode .atropine-seq-label{color:#93c5fd!important}body.dark-mode .atropine-seq-copy{color:#dbe4ee!important}body.dark-mode .atropine-seq-copy b{color:#fff!important}body.dark-mode .atropine-total-ref{background:#2a2113!important;border-color:#d97706!important;color:#fde68a!important}body.dark-mode .atropine-total-ref b,body.dark-mode .atropine-total-ref strong{color:#fef3c7!important}body.dark-mode .atropine-ref-result{background:#102a43!important;border-color:#60a5fa!important;color:#dbeafe!important}body.dark-mode .atropine-ref-result b{color:#fff!important}
@media(max-width:520px){.atropine-seq-step{grid-template-columns:1fr;gap:3px}}
`;
 document.head.appendChild(s);
}
function calcRef(btn){
 const card=btn.closest('.atropine-sequence');if(!card)return;
 const w=parseFloat(card.querySelector('.atropine-ref-weight')?.value);const u=card.querySelector('.atropine-ref-unit')?.value||'lb';const out=card.querySelector('.atropine-ref-result');
 if(!out)return;
 if(!Number.isFinite(w)||w<=0){out.innerHTML='<b>Enter a valid patient weight.</b>';return}
 const kg=u==='lb'?w/2.2046226218:w;const ref=kg*.04;
 out.innerHTML='<b>TOTAL-DOSE REFERENCE: '+ref.toFixed(2)+' mg</b><span>This is the 0.04 mg/kg total-dose reference only — not a single administered dose.</span>';
}
function cardHtml(){return `<div class="atropine-sequence" data-atropine-sequence="1"><h3>Atropine — GFD Dose Sequence</h3><div class="atropine-seq-grid"><div class="atropine-seq-step"><div class="atropine-seq-label">Dose 1</div><div class="atropine-seq-copy"><b>0.5 mg IV</b></div></div><div class="atropine-seq-step"><div class="atropine-seq-label">Repeat</div><div class="atropine-seq-copy"><b>0.5 mg IV every 3–5 minutes</b> as needed per protocol.</div></div><div class="atropine-seq-step"><div class="atropine-seq-label">If ineffective</div><div class="atropine-seq-copy">Proceed to the Bradycardia pathway and <b>begin pacing</b> when indicated.</div></div></div><div class="atropine-total-ref"><b>TOTAL-DOSE LIMIT / REFERENCE</b><strong>GFD wording: total 3 mg or 0.04 mg/kg.</strong>The 0.04 mg/kg value is a total-dose reference — not the amount to give as one dose.</div><div class="dose-row" style="margin-top:10px"><input class="atropine-ref-weight" inputmode="decimal" type="number" min="0" step="0.1" placeholder="Patient weight"><select class="atropine-ref-unit"><option value="lb">lb</option><option value="kg">kg</option></select></div><button type="button" class="dose-btn atropine-ref-btn">Calculate 0.04 mg/kg total-dose reference</button><div class="atropine-ref-result" aria-live="polite"><b>Reference calculator</b><span>Enter weight to calculate the protocol's 0.04 mg/kg total-dose reference.</span></div></div>`}
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