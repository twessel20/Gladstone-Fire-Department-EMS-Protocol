(()=>{
'use strict';
const STYLE_ID='gfd-protocol-flow-enhancement';
let timer=null;
function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
/* v211 — source-order flow presentation */
.protocol-body.gfd-flow-view{position:relative;display:grid;gap:0!important}
.protocol-body.gfd-flow-view>.gfd-protocol-section-card{position:relative;margin:0 0 0!important}
.protocol-body.gfd-flow-view>.gfd-protocol-section-card+.gfd-protocol-section-card{margin-top:34px!important}
.protocol-body.gfd-flow-view>.gfd-protocol-section-card+.gfd-protocol-section-card:before{content:'↓';position:absolute;left:50%;top:-31px;transform:translateX(-50%);width:28px;height:28px;border-radius:999px;display:flex;align-items:center;justify-content:center;background:#eef6fb;border:1px solid #bfdbfe;color:#2f6690;font-weight:950;font-size:18px;z-index:2}
.gfd-protocol-section-card.gfd-kind-indications>.section{border-left-color:#2563eb!important;background:#eff6ff!important;color:#1e3a8a!important}
.gfd-protocol-section-card.gfd-kind-assessment>.section{border-left-color:#2f6690!important;background:#eef6fb!important;color:#173a5e!important}
.gfd-protocol-section-card.gfd-kind-treatment>.section,.gfd-protocol-section-card.gfd-kind-procedure>.section{border-left-color:#15803d!important;background:#f0fdf4!important;color:#166534!important}
.gfd-protocol-section-card.gfd-kind-contra>.section{border-left-color:#dc2626!important;background:#fff1f2!important;color:#991b1b!important}
.gfd-protocol-section-card.gfd-kind-caution>.section{border-left-color:#d97706!important;background:#fffbeb!important;color:#92400e!important}
.gfd-protocol-section-card.gfd-kind-transport>.section,.gfd-protocol-section-card.gfd-kind-disposition>.section{border-left-color:#7c3aed!important;background:#faf5ff!important;color:#6b21a8!important}
.gfd-protocol-section-card.gfd-kind-reassess>.section{border-left-color:#0891b2!important;background:#ecfeff!important;color:#155e75!important}
.gfd-protocol-section-card.gfd-stepwise>.line{position:relative;padding-left:46px!important;min-height:48px;display:flex;align-items:center}
.gfd-protocol-section-card.gfd-stepwise>.line:before{content:attr(data-flow-step);position:absolute;left:12px;top:50%;transform:translateY(-50%);width:23px;height:23px;border-radius:999px;background:#173a5e;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:950;z-index:2}
.gfd-protocol-section-card.gfd-stepwise>.line:not(:last-child):after{content:'';position:absolute;left:23px;bottom:-9px;width:2px;height:18px;background:#bfdbfe;z-index:1}
.gfd-protocol-section-card.gfd-stepwise>.line.subbullet,.gfd-protocol-section-card.gfd-stepwise>.line.subsub{display:block;min-height:0;padding-left:43px!important}
.gfd-protocol-section-card.gfd-stepwise>.line.subbullet:before,.gfd-protocol-section-card.gfd-stepwise>.line.subsub:before,.gfd-protocol-section-card.gfd-stepwise>.line.subbullet:after,.gfd-protocol-section-card.gfd-stepwise>.line.subsub:after{display:none}
.gfd-protocol-section-card .gfd-decision-line{margin:9px 12px!important;padding:12px 14px!important;border:2px solid #93c5fd!important;border-radius:12px!important;background:#eff6ff!important;color:#1e3a8a!important;font-weight:850!important;justify-content:center!important;text-align:center}
.gfd-protocol-section-card .gfd-decision-line:before,.gfd-protocol-section-card .gfd-decision-line:after{display:none!important}
/* Existing hand-built algorithms: same visual language as BiPAP */
.protocol-body .flowchart,.protocol-body .workflow-sheet{display:grid;gap:0!important}
.protocol-body .flow-node,.protocol-body .workflow-node,.protocol-body .flow-decision,.protocol-body .flow-branch{border:1px solid #dbe4ee!important;border-left:5px solid #2f6690!important;border-radius:12px!important;background:#fff!important;box-shadow:0 1px 3px rgba(23,58,94,.05)!important;padding:12px 13px!important}
.protocol-body .flow-decision{border-left-color:#2563eb!important;background:#eff6ff!important}
.protocol-body .flow-arrow{min-height:30px;display:flex;align-items:center;justify-content:center;color:#2f6690!important;font-size:22px!important;font-weight:950!important}
.protocol-body .flow-branch{border-left-color:#15803d!important;background:#f0fdf4!important}
/* Keep medication sheets structured, not forced into algorithm styling */
.source-med-sheet .source-med-row{border-radius:11px}
body.dark-mode .protocol-body.gfd-flow-view>.gfd-protocol-section-card+.gfd-protocol-section-card:before{background:#17263a;border-color:#475569;color:#bfdbfe}
body.dark-mode .gfd-protocol-section-card.gfd-kind-indications>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-assessment>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-treatment>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-procedure>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-contra>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-caution>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-transport>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-disposition>.section,body.dark-mode .gfd-protocol-section-card.gfd-kind-reassess>.section{background:#17263a!important;color:#eef4fb!important;border-color:#475569!important}
body.dark-mode .protocol-body .flow-node,body.dark-mode .protocol-body .workflow-node,body.dark-mode .protocol-body .flow-decision,body.dark-mode .protocol-body .flow-branch{background:#111827!important;border-color:#475569!important;color:#eef4fb!important}
body.dark-mode .gfd-protocol-section-card .gfd-decision-line{background:#17263a!important;border-color:#475569!important;color:#dbeafe!important}
`;(document.head||document.documentElement).appendChild(s);
}
function kindFor(title){
 const t=(title||'').trim().toLowerCase();
 if(/contraindication|do not use|exclusion/.test(t))return 'contra';
 if(/precaution|caution|warning|special consideration/.test(t))return 'caution';
 if(/indication|criteria/.test(t))return 'indications';
 if(/assessment|evaluation|initial/.test(t))return 'assessment';
 if(/treatment|management|intervention|therapy/.test(t))return 'treatment';
 if(/procedure|technique|application|administration/.test(t))return 'procedure';
 if(/reassess|monitor|monitoring/.test(t))return 'reassess';
 if(/transport|destination|routing/.test(t))return 'transport';
 if(/disposition|termination|release/.test(t))return 'disposition';
 return '';
}
function isDecision(text){
 const t=(text||'').trim();
 return /\?$/.test(t)||/^(is|does|do|has|have|can|should|if)\b/i.test(t)&&t.length<180;
}
function enhanceCard(card){
 if(card.dataset.flowEnhanced==='1')return;
 const head=card.querySelector(':scope>.section');
 const title=(head?.textContent||'').trim();const kind=kindFor(title);if(kind)card.classList.add('gfd-kind-'+kind);
 const lines=[...card.querySelectorAll(':scope>.line')];
 const stepwise=['assessment','treatment','procedure','reassess','transport'].includes(kind)&&lines.filter(x=>!x.classList.contains('subbullet')&&!x.classList.contains('subsub')).length>=2;
 if(stepwise){card.classList.add('gfd-stepwise');let n=1;lines.forEach(line=>{if(line.classList.contains('subbullet')||line.classList.contains('subsub'))return;line.dataset.flowStep=String(n++);if(isDecision(line.textContent))line.classList.add('gfd-decision-line')})}
 else lines.forEach(line=>{if(isDecision(line.textContent))line.classList.add('gfd-decision-line')});
 card.dataset.flowEnhanced='1';
}
function shouldFlow(detail,body){
 if(!detail||!body)return false;
 const meta=(detail.querySelector('.meta')?.textContent||'').toLowerCase();
 if(/medications|appendix|guidelines/.test(meta))return false;
 if(body.querySelector('.gfd-bipap-flow'))return false;
 return body.querySelectorAll(':scope>.gfd-protocol-section-card').length>=2||!!body.querySelector('.flowchart,.workflow-sheet');
}
function enhance(){
 injectStyles();const detail=document.querySelector('#detail.on');if(!detail)return;const body=detail.querySelector('.protocol-body');if(!body)return;
 const cards=[...body.querySelectorAll(':scope>.gfd-protocol-section-card')];cards.forEach(enhanceCard);
 if(shouldFlow(detail,body))body.classList.add('gfd-flow-view');else body.classList.remove('gfd-flow-view');
}
function schedule(){clearTimeout(timer);timer=setTimeout(enhance,80)}
function start(){injectStyles();schedule();new MutationObserver(m=>{if(m.some(x=>x.type==='childList'||x.type==='attributes'))schedule()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});window.addEventListener('hashchange',schedule)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
