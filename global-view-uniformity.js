(()=>{
'use strict';
const STYLE_ID='gfd-global-view-uniformity';
let timer=null;
function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
/* Global protocol presentation */
#detail.on>.card{max-width:860px;margin:0 auto 18px;border:1px solid #dbe4ee;box-shadow:0 2px 10px rgba(23,58,94,.06)}
#detail.on>.card>h2{margin-bottom:4px;color:#173a5e}
#detail.on>.card>.meta{margin-bottom:10px}
.protocol-body.gfd-uniform-protocol{display:grid;gap:12px;margin-top:8px}
.gfd-protocol-section-card{background:#fff;border:1px solid #dbe4ee;border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(23,58,94,.04)}
.gfd-protocol-section-card>.section{margin:0!important;padding:10px 12px!important;border:0!important;border-left:5px solid #2f6690!important;border-radius:0!important;background:#eef6fb!important;color:#173a5e!important;font-size:13px!important;letter-spacing:.035em;text-transform:uppercase}
.gfd-protocol-section-card>.line{margin:0!important;padding:9px 12px!important;line-height:1.5;border-top:1px solid #eef2f7}
.gfd-protocol-section-card>.line:first-of-type{border-top:0}
.gfd-protocol-section-card>.line.bullet{padding-left:31px!important}
.gfd-protocol-section-card>.line.subbullet{padding-left:43px!important;background:#fbfcfd}
.gfd-protocol-section-card>.line.subsub{padding-left:55px!important;background:#fbfcfd;color:#475569}
.gfd-protocol-section-card .protocol-jump-wrap,.gfd-protocol-section-card .protocol-callout{margin:10px 12px 12px}
.protocol-body .flowchart,.protocol-body .workflow-sheet{margin:4px 0 10px}
.protocol-body .flow-node,.protocol-body .workflow-node,.protocol-body .flow-decision{box-shadow:none;border-radius:12px}
.protocol-body .flow-arrow,.gfd-source-flow-arrow{color:#2f6690;font-size:21px;line-height:1;text-align:center;padding:2px 0;font-weight:900}
.protocol-body .dose-tools,.protocol-body .related-box{border-radius:12px;box-shadow:none}
.source-med-sheet{box-shadow:none!important}
.notice{border-radius:10px}
/* Tools become visible cards instead of nested accordions */
.tools-grid.tool-menu{display:grid!important;grid-template-columns:1fr!important;gap:14px!important;max-width:980px;margin:0 auto}
.tool-menu .tool-section{border:1px solid #dbe4ee!important;border-radius:15px!important;overflow:hidden;box-shadow:0 2px 8px rgba(23,58,94,.05)!important}
.tool-menu .tool-section-toggle{pointer-events:none;padding:13px 15px!important;border-bottom:1px solid #dbe4ee!important;background:#eef6fb!important}
.tool-menu .tool-section-heading b{font-size:16px!important;color:#173a5e!important}
.tool-menu .tool-section-heading span{font-size:11.5px!important}
.tool-menu .tool-section-chevron{display:none!important}
.tool-menu .tool-section-body{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px!important;padding:12px!important;background:#f8fafc!important}
.tool-menu .tool-launch{height:100%;min-height:86px;border-radius:13px!important;background:#fff!important;border:1px solid #dbe4ee!important;box-shadow:0 1px 3px rgba(23,58,94,.05)!important;padding:13px!important}
.tool-menu .tool-launch:active{transform:scale(.99)}
.tool-menu .lab-search-wrap{grid-column:1/-1;background:#fff;border:1px solid #dbe4ee;border-radius:12px;padding:10px;margin:0!important}
@media(max-width:680px){.tool-menu .tool-section-body{grid-template-columns:1fr}.tool-menu .tool-launch{min-height:76px}}
/* Source-matched BiPAP/CPAP flow */
.gfd-bipap-flow{display:grid;gap:10px}
.gfd-bipap-intro{font-size:12px;line-height:1.45;color:#475569;background:#f8fafc;border:1px solid #dbe4ee;border-radius:10px;padding:10px 11px}
.gfd-bipap-card{background:#fff;border:1px solid #dbe4ee;border-left:5px solid #2f6690;border-radius:12px;padding:12px 13px}
.gfd-bipap-card h3{margin:0 0 7px;color:#173a5e;font-size:15px}
.gfd-bipap-card ul{margin:0;padding-left:20px}.gfd-bipap-card li{margin:5px 0;line-height:1.45}
.gfd-bipap-card.stop{border-left-color:#dc2626;background:#fff7f7}.gfd-bipap-card.stop h3{color:#991b1b}
.gfd-bipap-card.caution{border-left-color:#d97706;background:#fffbeb}.gfd-bipap-card.caution h3{color:#92400e}
.gfd-bipap-branches{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.gfd-bipap-mode{background:#f8fbff;border:1px solid #bfdbfe;border-radius:12px;padding:12px}.gfd-bipap-mode h3{margin:0 0 7px;color:#173a5e;font-size:16px}.gfd-bipap-setting{display:grid;grid-template-columns:1fr auto;gap:10px;padding:7px 0;border-top:1px solid #dbeafe}.gfd-bipap-setting:first-of-type{border-top:0}.gfd-bipap-setting b{color:#173a5e}
.gfd-bipap-apply{border-left-color:#166534;background:#f0fdf4}.gfd-bipap-apply h3{color:#166534}
@media(max-width:620px){.gfd-bipap-branches{grid-template-columns:1fr}}
body.dark-mode .gfd-protocol-section-card,body.dark-mode .gfd-bipap-card,body.dark-mode .gfd-bipap-mode,body.dark-mode .tool-menu .tool-launch,body.dark-mode .tool-menu .lab-search-wrap{background:#111827!important;border-color:#475569!important;color:#eef4fb!important}
body.dark-mode .gfd-protocol-section-card>.section,body.dark-mode .tool-menu .tool-section-toggle{background:#17263a!important;color:#fff!important;border-color:#475569!important}
body.dark-mode .gfd-protocol-section-card>.line{border-top-color:#334155!important;color:#eef4fb!important}
body.dark-mode .gfd-protocol-section-card>.line.subbullet,body.dark-mode .gfd-protocol-section-card>.line.subsub{background:#0f172a!important}
body.dark-mode .tool-menu .tool-section-body{background:#0b1220!important}
body.dark-mode .gfd-bipap-intro{background:#172033!important;border-color:#475569!important;color:#dbe5ef!important}
body.dark-mode .gfd-bipap-card h3,body.dark-mode .gfd-bipap-mode h3,body.dark-mode .gfd-bipap-setting b{color:#dbeafe!important}
`;(document.head||document.documentElement).appendChild(s);
}
function wrapSections(body){
 if(!body||body.classList.contains('gfd-sections-wrapped'))return;
 body.classList.add('gfd-uniform-protocol');
 const children=[...body.children];let current=null;
 children.forEach(ch=>{
   if(ch.classList.contains('section')){
     current=document.createElement('div');current.className='gfd-protocol-section-card';body.insertBefore(current,ch);current.appendChild(ch);return;
   }
   if(current&&ch.matches('.line,.protocol-jump-wrap,.protocol-callout,.workflow-inline-alert,.workflow-inline-caution')){current.appendChild(ch);return}
   if(!ch.matches('.gfd-ped-context-card,.gfd-ped-workflow,.gfd-adult-age-note'))current=null;
 });
 body.classList.add('gfd-sections-wrapped');
}
function bipapFlow(){return `
<div class="gfd-bipap-flow">
 <div class="gfd-bipap-intro"><b>BiPAP / CPAP • source pages 77–78</b><br>This quick-reference preserves the Gladstone protocol order while presenting it as a field workflow.</div>
 <div class="gfd-bipap-card"><h3>1 • Indications</h3><ul><li>Short-term management of acute respiratory distress or failure in an awake, cooperative patient.</li><li>Near-drowning patient who is awake and cooperative.</li></ul></div>
 <div class="gfd-source-flow-arrow">↓</div>
 <div class="gfd-bipap-card stop"><h3>2 • Do not use / stop and choose another airway approach if</h3><ul><li>Immediate intubation is needed.</li><li>Respiratory drive is unstable or the patient cannot maintain their own airway.</li><li>Ventilatory failure is present.</li><li>Gastric distention is present.</li><li>Claustrophobia prevents tolerance.</li></ul></div>
 <div class="gfd-source-flow-arrow">↓</div>
 <div class="gfd-bipap-card caution"><h3>3 • Precautions before application</h3><ul><li>Patient cooperation is required. If the mask cannot be tolerated, remove it and use an alternate airway approach.</li><li>If nausea develops, remove/unstrap the mask. The patient may hold it manually with coaching. Vomiting with the mask secured risks aspiration.</li><li>Confirm an adequate oxygen supply.</li></ul></div>
 <div class="gfd-source-flow-arrow">↓</div>
 <div class="gfd-bipap-card"><h3>4 • Explain the procedure to the patient</h3><div>Coach slow, deep breaths and tell the patient to relax and allow the machine to assist breathing.</div></div>
 <div class="gfd-source-flow-arrow">↓</div>
 <div class="gfd-bipap-branches">
  <div class="gfd-bipap-mode"><h3>BiPAP / BiLevel settings</h3><div class="gfd-bipap-setting"><span>FiO₂</span><b>100%</b></div><div class="gfd-bipap-setting"><span>IPAP</span><b>12 cm/Hg</b></div><div class="gfd-bipap-setting"><span>EPAP</span><b>6 cm/Hg</b></div><div class="gfd-bipap-setting"><span>LC compensation</span><b>ON</b></div></div>
  <div class="gfd-bipap-mode"><h3>CPAP</h3><div style="line-height:1.45">Use the Gladstone CPAP procedure as written. The source page lists the same indication, contraindication, precaution, coaching, mask-tolerance, and monitoring sequence; it does not list a separate CPAP pressure setting in this protocol entry.</div></div>
 </div>
 <div class="gfd-source-flow-arrow">↓</div>
 <div class="gfd-bipap-card gfd-bipap-apply"><h3>5 • Apply and monitor</h3><ul><li>Turn on oxygen and hold the mask firmly against the patient initially.</li><li>After the patient tolerates the mask, attach the straps.</li><li>Continuously monitor comfort, anxiety, and nausea.</li><li>If nausea develops, unstrap/remove the mask; it may be held manually by the patient with coaching.</li></ul></div>
</div>`}
function rebuildBipap(){
 const detail=document.querySelector('#detail.on');if(!detail)return;
 const title=(detail.querySelector('h2')?.textContent||'').trim().toLowerCase();
 const isBipap=location.hash.replace('#','')==='bipap-cpap'||/bipap\s*\/\s*cpap/.test(title);if(!isBipap)return;
 const body=detail.querySelector('.protocol-body');if(!body||body.querySelector('.gfd-bipap-flow'))return;
 [...body.children].forEach(ch=>{if(!ch.matches('.gfd-ped-context-card,.gfd-ped-workflow,.gfd-adult-age-note'))ch.style.display='none'});
 const flow=document.createElement('div');flow.innerHTML=bipapFlow();body.appendChild(flow.firstElementChild);
 body.classList.add('gfd-uniform-protocol');
}
function openToolCards(){
 document.querySelectorAll('.tools-grid.tool-menu .tool-section').forEach(sec=>{sec.classList.add('open');const b=sec.querySelector('.tool-section-toggle');if(b)b.setAttribute('aria-expanded','true')});
}
function polish(){
 injectStyles();
 openToolCards();
 const body=document.querySelector('#detail.on .protocol-body');
 if(body){rebuildBipap();if(!body.querySelector('.gfd-bipap-flow'))wrapSections(body)}
}
function schedule(){clearTimeout(timer);timer=setTimeout(polish,60)}
function start(){injectStyles();schedule();new MutationObserver(m=>{if(m.some(x=>x.type==='childList'||x.type==='attributes'))schedule()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});window.addEventListener('hashchange',schedule)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
