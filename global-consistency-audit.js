(()=>{'use strict';
const VERSION='276';
const STYLE_ID='gfdGlobalConsistencyV276Style';
const ROOT_SELECTOR='.protocol-body,.source-med-sheet,.tool-card,.flowchart,.workflow-sheet,.mission-values-body,.card';
const SKIP='script,style,pre,code,textarea,input,select,option,svg';
const CANON=new Map([
 ['indication','Indications'],['indications','Indications'],['contraindication','Contraindications'],['contraindications','Contraindications'],
 ['precaution','Precautions'],['precautions','Precautions'],['side effect','Side Effects'],['side effects','Side Effects'],
 ['assessment','Assessment'],['treatment','Treatment'],['procedure','Procedure'],['medical control','Medical Control'],
 ['adult','Adult'],['pediatric','Pediatric'],['special consideration','Special Considerations'],['special considerations','Special Considerations'],
 ['transport','Transport'],['destination','Destination'],['documentation','Documentation'],['purpose','Purpose'],
 ['definition','Definition'],['definitions','Definitions'],['warning','Warning'],['warnings','Warnings'],['caution','Caution'],
 ['notes','Notes'],['note','Note'],['considerations','Considerations'],['dose','Dose'],['dosage','Dosage'],['route','Route'],
 ['onset','Onset'],['duration','Duration'],['mechanism of action','Mechanism of Action']
]);
const HEADING_SELECTOR='.section,.med-label,.med-subhead,.source-med-label,.gfd-proto-heading,.gfd-flow-heading,.workflow-node h4,.flow-node h4,.protocol-body h2,.protocol-body h3,.protocol-body h4';
function clean(s){return String(s||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\s+([,.;:!?])/g,'$1').replace(/([,.;:!?])([^\s\d])/g,'$1 $2').trim()}
function canonicalHeading(el){if(!el||el.matches(SKIP))return;const raw=clean(el.textContent).replace(/:$/,'');const key=raw.toLowerCase();if(CANON.has(key)&&el.childElementCount===0)el.textContent=CANON.get(key);}
function normalizeTextNode(n){if(!n?.nodeValue||!n.parentElement||n.parentElement.closest(SKIP))return;let s=n.nodeValue;if(!s.trim())return;const next=s.replace(/\u00a0/g,' ').replace(/[ \t]{2,}/g,' ').replace(/\s+([,.;:!?])/g,'$1');if(next!==s)n.nodeValue=next;}
function normalizeBullets(root){root.querySelectorAll('.bullet,.subbullet,.subsub,.gfd-proto-item,.med-item,li').forEach(el=>{
  if(el.dataset.consistency276==='1')return;
  if(el.childElementCount===0){let t=clean(el.textContent).replace(/^[•●▪◦–—-]\s*/,'');if(t!==el.textContent.trim())el.textContent=t;}
  el.dataset.consistency276='1';
 });
}
function normalizeHeadings(root){root.querySelectorAll(HEADING_SELECTOR).forEach(canonicalHeading)}
function normalizeFlow(root){
 root.querySelectorAll('.flowchart,.workflow-sheet').forEach(flow=>flow.classList.add('gfd-consistent-flow'));
 root.querySelectorAll('.flow-node,.workflow-node,.flow-decision,.workflow-inline-alert,.workflow-inline-caution,.gfd-flow-step').forEach(n=>n.classList.add('gfd-consistent-node'));
}
function markSections(root){
 root.querySelectorAll('.protocol-body').forEach(body=>{
  const purposeBuilt=body.querySelector('.flowchart,.workflow-sheet,.flow-node,.workflow-node,.flow-decision');
  body.classList.toggle('gfd-purpose-flow',!!purposeBuilt);
 });
}
function normalize(root=document){
 if(!root.querySelectorAll)return;
 const scopes=[];if(root.matches?.(ROOT_SELECTOR))scopes.push(root);root.querySelectorAll(ROOT_SELECTOR).forEach(x=>scopes.push(x));
 scopes.forEach(scope=>{normalizeHeadings(scope);normalizeBullets(scope);normalizeFlow(scope);markSections(scope);const w=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())normalizeTextNode(n);scope.dataset.consistencyAudit=VERSION;});
}
function styles(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
/* GFD global content consistency — v276 */
.protocol-body,.source-med-sheet,.tool-card{font-size:16px;line-height:1.5}
.protocol-body>*,.source-med-sheet>*,.tool-card>*{max-width:100%}
.protocol-body p,.gfd-proto-paragraph,.gfd-flow-note,.med-text{margin-top:9px;margin-bottom:9px}
.protocol-body .section,.protocol-body .gfd-proto-heading,.protocol-body .gfd-flow-heading,.med-label{margin-top:20px;margin-bottom:8px}
.protocol-body .section:first-child,.protocol-body .gfd-proto-heading:first-child,.protocol-body .gfd-flow-heading:first-child{margin-top:4px}
.bullet,.subbullet,.subsub,.gfd-proto-item,.med-item,li{line-height:1.48}
.bullet,.med-item,.gfd-proto-item{margin-top:7px;margin-bottom:7px}
.subbullet{margin-top:5px;margin-bottom:5px}.subsub{margin-top:4px;margin-bottom:4px}
ul,ol{margin-top:8px;margin-bottom:12px;padding-left:1.35rem}li+li{margin-top:5px}
.section,.med-label,.med-subhead,.source-med-label,.gfd-proto-heading,.gfd-flow-heading{font-weight:900;letter-spacing:.025em}
.protocol-body h2,.protocol-body h3,.protocol-body h4{line-height:1.25;margin-top:18px;margin-bottom:8px}
.gfd-consistent-flow{display:grid;gap:10px;margin:12px 0 16px}
.gfd-consistent-flow .gfd-consistent-node{margin:0}
.flow-node,.workflow-node,.flow-decision,.gfd-flow-step{line-height:1.48}
.flowchart .flow-arrow,.workflow-sheet .flow-arrow,.gfd-flow-arrow{margin:0;padding:2px 0;line-height:1}
.workflow-inline-alert,.workflow-inline-caution{margin:8px 0;line-height:1.48}
.source-med-row{line-height:1.48}.source-med-row+.source-med-row{margin-top:2px}
.card .title{line-height:1.25}.card .meta{line-height:1.4}
button,.tab,.rolebtn,.homebtn,.clearsearch{line-height:1.2}
@media(max-width:620px){.protocol-body,.source-med-sheet,.tool-card{font-size:15.5px}.protocol-body .section,.protocol-body .gfd-proto-heading,.protocol-body .gfd-flow-heading{margin-top:17px}}
body.dark-mode .gfd-consistent-node{color:#f1f5f9}
`;document.head.appendChild(s)}
function start(){styles();normalize();let queued=false;const obs=new MutationObserver(records=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)normalize(n);});});obs.observe(document.body,{subtree:true,childList:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
