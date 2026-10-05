(()=>{'use strict';
const ID='gfd-patient-med-dark-v293';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v293 — Patient Home-Medication Lookup dark-mode hierarchy */
body.dark-mode .patient-med-search{
 background:#111827!important;
 border-color:#475569!important;
 color:#e5edf7!important;
 box-shadow:none!important;
}
body.dark-mode .patient-med-search h2{
 color:#f8fafc!important;
}
body.dark-mode .patient-med-search>.tool-note{
 background:#0f172a!important;
 border:1px solid #3f4f63!important;
 border-radius:10px!important;
 padding:10px 11px!important;
 color:#d7e0ea!important;
 line-height:1.5!important;
}
body.dark-mode .patient-med-row .tool-input{
 background:#0b1220!important;
 border:1px solid #64748b!important;
 color:#f8fafc!important;
 caret-color:#f8fafc!important;
 color-scheme:dark;
}
body.dark-mode .patient-med-row .tool-input::placeholder{
 color:#94a3b8!important;
 opacity:1!important;
}
body.dark-mode .patient-med-row .tool-input:focus{
 outline:2px solid #60a5fa!important;
 outline-offset:1px!important;
 border-color:#93c5fd!important;
 box-shadow:0 0 0 3px #2563eb33!important;
}
body.dark-mode .patient-med-warning{
 background:#2a1f0d!important;
 border-color:#b7791f!important;
 color:#f7e7bd!important;
}
body.dark-mode .patient-med-warning b{
 color:#fde68a!important;
}
body.dark-mode .patient-med-card{
 background:#111827!important;
 border-color:#475569!important;
 color:#e2e8f0!important;
}
body.dark-mode .patient-med-card h3{
 color:#f8fafc!important;
}
body.dark-mode .patient-med-label{
 color:#93c5fd!important;
}
body.dark-mode .patient-med-copy{
 color:#d7e0ea!important;
}
body.dark-mode .patient-med-link,
body.dark-mode .patient-med-choice{
 background:#172033!important;
 border-color:#475569!important;
 color:#dbeafe!important;
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();