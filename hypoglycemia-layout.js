(()=>{
'use strict';
const STYLE_ID='gfd-hypoglycemia-layout';
let timer=null;
function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
.gfd-hypo-dose-panel{margin:10px 0 14px;border:1px solid #bfdbfe;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 4px rgba(23,58,94,.05)}
.gfd-hypo-dose-head{padding:10px 12px;background:#eef6ff;border-left:5px solid #2563eb;color:#173a5e;font-size:13px;font-weight:950;letter-spacing:.035em;text-transform:uppercase}
.gfd-hypo-dose-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;padding:11px;background:#f8fbff}
.gfd-hypo-dose-card{background:#fff;border:1px solid #dbeafe;border-radius:12px;padding:11px;min-width:0}
.gfd-hypo-dose-card b{display:block;color:#173a5e;font-size:13px;margin-bottom:5px}
.gfd-hypo-dose-main{font-size:19px;line-height:1.15;font-weight:950;color:#1d4ed8}
.gfd-hypo-dose-sub{font-size:11px;line-height:1.35;color:#64748b;margin-top:5px}
.gfd-hypo-dose-note{padding:9px 12px;border-top:1px solid #dbeafe;background:#fff;color:#475569;font-size:11.5px;line-height:1.4}
.gfd-hypo-dose-arrow{text-align:center;color:#2f6690;font-weight:950;font-size:20px;line-height:1;padding:1px 0 5px}
.gfd-hypo-source-dose-hidden{display:none!important}
@media(max-width:650px){.gfd-hypo-dose-grid{grid-template-columns:1fr}.gfd-hypo-dose-card{padding:10px 11px}.gfd-hypo-dose-main{font-size:18px}}
body.dark-mode .gfd-hypo-dose-panel,body.dark-mode .gfd-hypo-dose-card{background:#111827;border-color:#475569}
body.dark-mode .gfd-hypo-dose-head{background:#17263a;color:#dbeafe;border-left-color:#60a5fa}
body.dark-mode .gfd-hypo-dose-grid{background:#0b1220}
body.dark-mode .gfd-hypo-dose-card b{color:#dbeafe}
body.dark-mode .gfd-hypo-dose-main{color:#93c5fd}
body.dark-mode .gfd-hypo-dose-sub,body.dark-mode .gfd-hypo-dose-note{color:#cbd5e1}
body.dark-mode .gfd-hypo-dose-note{background:#111827;border-color:#475569}
`;(document.head||document.documentElement).appendChild(s);
}
function isHypoglycemia(detail){
 const id=location.hash.replace('#','').toLowerCase();
 const title=(detail?.querySelector('h2')?.textContent||'').trim().toLowerCase();
 return id==='hypoglycemia'||title==='hypoglycemia';
}
function dosePanel(){
 const wrap=document.createElement('div');wrap.className='gfd-hypo-dose-panel';wrap.innerHTML=`
  <div class="gfd-hypo-dose-head">Dextrose dosing • quick reference</div>
  <div class="gfd-hypo-dose-grid">
   <div class="gfd-hypo-dose-card"><b>Adult</b><div class="gfd-hypo-dose-main">D10 • 250 mL IV</div><div class="gfd-hypo-dose-sub">25 g total per Gladstone source protocol.</div></div>
   <div class="gfd-hypo-dose-card"><b>Older than 8 years</b><div class="gfd-hypo-dose-main">D10 • 2 mL/kg IV</div><div class="gfd-hypo-dose-sub">Weight-based pediatric volume from the source protocol.</div></div>
   <div class="gfd-hypo-dose-card"><b>Younger than 8 years</b><div class="gfd-hypo-dose-main">D10 • 1 mL/kg IV</div><div class="gfd-hypo-dose-sub">Weight-based pediatric volume from the source protocol.</div></div>
  </div>
  <div class="gfd-hypo-dose-note"><b>Source wording preserved.</b> This card only reorganizes the existing Gladstone dose language for faster field scanning. Patient age/weight context can still drive the app's pediatric calculations where already supported.</div>`;
 return wrap;
}
function clean(){
 injectStyles();
 const detail=document.querySelector('#detail.on');if(!detail||!isHypoglycemia(detail))return;
 const body=detail.querySelector('.protocol-body');if(!body||body.dataset.hypoClean==='1')return;
 const nodes=[...body.querySelectorAll('.line,.gfd-protocol-section-card,.flow-node,.workflow-node,.protocol-callout')];
 let firstDose=null;
 const doseMatchers=[/d10\s*250\s*ml/i,/25\s*g/i,/greater than\s*8\s*years/i,/>\s*8\s*years/i,/older than\s*8\s*years/i,/2\s*ml\s*\/\s*kg\s*d10/i,/younger than\s*8\s*years/i,/less than\s*8\s*years/i,/<\s*8\s*years/i,/1\s*ml\s*\/\s*kg\s*d10/i];
 nodes.forEach(n=>{
  const text=(n.textContent||'').replace(/\s+/g,' ').trim();
  if(!text)return;
  if(doseMatchers.some(rx=>rx.test(text))){
   if(!firstDose)firstDose=n;
   if(n.classList.contains('line')||n.matches('.flow-node,.workflow-node,.protocol-callout'))n.classList.add('gfd-hypo-source-dose-hidden');
  }
 });
 const panel=dosePanel();
 if(firstDose){
  const section=firstDose.closest('.gfd-protocol-section-card');
  if(section&&section.parentNode)section.parentNode.insertBefore(panel,section);
  else firstDose.parentNode.insertBefore(panel,firstDose);
 }else{
  const treatment=[...body.querySelectorAll('.gfd-protocol-section-card')].find(x=>/treatment|dextrose|glucose/i.test(x.querySelector('.section')?.textContent||''));
  if(treatment)treatment.parentNode.insertBefore(panel,treatment);
  else body.insertBefore(panel,body.firstChild);
 }
 body.dataset.hypoClean='1';
}
function schedule(){clearTimeout(timer);timer=setTimeout(clean,80)}
function start(){injectStyles();schedule();new MutationObserver(m=>{if(m.some(x=>x.type==='childList'||x.type==='attributes'))schedule()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});window.addEventListener('hashchange',schedule)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
