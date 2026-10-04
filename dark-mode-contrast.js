(()=>{'use strict';
const ID='gfd-dark-contrast-v234';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');s.id=ID;s.textContent=`
/* v234 final dark-mode contrast layer */
body.dark-mode{background:#0b1220!important;color:#f1f5f9!important;color-scheme:dark}
body.dark-mode .wrap,body.dark-mode .detail,body.dark-mode .list,body.dark-mode .protocol-body{color:#f1f5f9}
body.dark-mode .tabs{background:#0f172a!important;border-color:#334155!important}
body.dark-mode .tab{background:#1e293b!important;color:#e2e8f0!important}
body.dark-mode .tab.on{background:#2f6690!important;color:#fff!important}
body.dark-mode .card,body.dark-mode .source-med-sheet,body.dark-mode .tool-card,body.dark-mode .guideline-card,body.dark-mode .workflow-node,body.dark-mode .flow-node,body.dark-mode .erlab-row,body.dark-mode .cbc-row{background:#111827!important;color:#f1f5f9!important;border-color:#475569!important}
body.dark-mode .title,body.dark-mode h1,body.dark-mode h2,body.dark-mode h3,body.dark-mode h4,body.dark-mode .source-med-label,body.dark-mode .erlab-name,body.dark-mode .cbc-name{color:#eaf2fb!important}
body.dark-mode .meta,body.dark-mode .dose-note,body.dark-mode .flow-small,body.dark-mode .flow-kicker,body.dark-mode .reorder-hint,body.dark-mode .erlab-section,body.dark-mode .cbc-section-title,body.dark-mode .cbc-note,body.dark-mode small{color:#cbd5e1!important}
body.dark-mode .source-med-value,body.dark-mode .med-text,body.dark-mode .med-item,body.dark-mode .med-subhead,body.dark-mode .workflow-line,body.dark-mode .line,body.dark-mode .flow-node p,body.dark-mode .flow-node li,body.dark-mode .cbc-sex-grid div,body.dark-mode .erlab-range,body.dark-mode .cbc-range{color:#f1f5f9!important}
body.dark-mode .source-med-row{border-color:#334155!important}
body.dark-mode .section,body.dark-mode .med-label{color:#bfdbfe!important}
body.dark-mode .back{background:#1e293b!important;color:#f8fafc!important;border:1px solid #475569!important}
body.dark-mode input,body.dark-mode select,body.dark-mode textarea{background:#0f172a!important;color:#f8fafc!important;border-color:#64748b!important}
body.dark-mode input::placeholder,body.dark-mode textarea::placeholder{color:#94a3b8!important;opacity:1}
body.dark-mode input:disabled,body.dark-mode select:disabled,body.dark-mode textarea:disabled,body.dark-mode button:disabled{opacity:.58}
body.dark-mode .lab-search-hit,body.dark-mode .erlab-single,body.dark-mode .guideline-contact,body.dark-mode .dose-tools,body.dark-mode .med-clean-dose div{background:#172033!important;color:#f1f5f9!important;border-color:#475569!important}
body.dark-mode .lab-search-hit,body.dark-mode .lab-search-hit b,body.dark-mode .guideline-contact{color:#dbeafe!important}
body.dark-mode .lab-search-hit small,body.dark-mode .lab-search-empty{color:#cbd5e1!important}
/* Semantic clinical cards: dark surface + meaningful accent */
body.dark-mode .protocol-callout,body.dark-mode .flow-warning,body.dark-mode .flow-node.danger,body.dark-mode .workflow-node.danger,body.dark-mode .source-med-row.med-contra{background:#321820!important;color:#ffe4e6!important;border-color:#fb7185!important}
body.dark-mode .protocol-callout strong,body.dark-mode .flow-warning h4,body.dark-mode .flow-node.danger h4,body.dark-mode .workflow-node.danger h4,body.dark-mode .source-med-row.med-contra .source-med-label,body.dark-mode .source-med-row.med-contra .source-med-value{color:#fecdd3!important}
body.dark-mode .flow-warning.caution,body.dark-mode .flow-node.caution,body.dark-mode .workflow-node.caution,body.dark-mode .source-med-row.med-precaution,body.dark-mode .erlab-high{background:#33250d!important;color:#fef3c7!important;border-color:#f59e0b!important}
body.dark-mode .flow-warning.caution h4,body.dark-mode .flow-node.caution h4,body.dark-mode .workflow-node.caution h4,body.dark-mode .source-med-row.med-precaution .source-med-label,body.dark-mode .source-med-row.med-precaution .source-med-value,body.dark-mode .erlab-high{color:#fde68a!important}
body.dark-mode .protocol-callout.info,body.dark-mode .erlab-low,body.dark-mode .guideline-card .section,body.dark-mode .flow-branch.no{background:#102a43!important;color:#dbeafe!important;border-color:#60a5fa!important}
body.dark-mode .protocol-callout.info strong,body.dark-mode .erlab-low,body.dark-mode .guideline-card .section{color:#dbeafe!important}
body.dark-mode .protocol-callout.action,body.dark-mode .flow-node.action,body.dark-mode .workflow-node.action,body.dark-mode .flow-branch.yes{background:#102a20!important;color:#dcfce7!important;border-color:#4ade80!important}
body.dark-mode .protocol-callout.action strong{color:#bbf7d0!important}
body.dark-mode .flow-node.med,body.dark-mode .oral-glucose-card{background:#24153a!important;color:#f3e8ff!important;border-color:#a78bfa!important}
body.dark-mode .oral-glucose-dose,body.dark-mode .oral-glucose-route,body.dark-mode .flow-dose{color:#ddd6fe!important}
body.dark-mode .oral-glucose-criteria{color:#f1f5f9!important}
body.dark-mode .oral-glucose-criteria div:before{color:#86efac!important}
body.dark-mode .flow-decision{background:#33250d!important;color:#fef3c7!important;border-color:#f59e0b!important}
body.dark-mode .workflow-node.monitor,body.dark-mode .flow-node.monitor{background:#172033!important;color:#f1f5f9!important;border-color:#64748b!important}
body.dark-mode .workflow-line.sub{color:#d1d5db!important}
body.dark-mode .dose-out strong{color:#bfdbfe!important}
body.dark-mode .dose-btn,body.dark-mode .protocol-jump,body.dark-mode .source{color:#fff!important}
body.dark-mode a:not(.source):not(.protocol-jump),body.dark-mode .related-link{color:#93c5fd}
body.dark-mode .notice{color:#f1f5f9}
/* Tables and generic generated clinical content */
body.dark-mode table{color:#f1f5f9!important;border-color:#475569!important}
body.dark-mode th{background:#172033!important;color:#eaf2fb!important;border-color:#475569!important}
body.dark-mode td{background:#111827!important;color:#f1f5f9!important;border-color:#334155!important}
body.dark-mode hr{border-color:#475569!important}
/* Focus must remain visible in a moving ambulance / keyboard use */
body.dark-mode button:focus-visible,body.dark-mode a:focus-visible,body.dark-mode input:focus-visible,body.dark-mode select:focus-visible,body.dark-mode textarea:focus-visible{outline:3px solid #93c5fd!important;outline-offset:2px!important}
`;document.head.appendChild(s)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();