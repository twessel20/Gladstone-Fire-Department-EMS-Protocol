(()=>{'use strict';
const ID='gfd-diltiazem-dark-v285';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v285 — Diltiazem standalone + embedded calculator dark-mode audit */
body.dark-mode #toolDiltResult,
body.dark-mode .dose-out .dilt-reg-summary{
 background:#111827!important;
 border-color:#475569!important;
 color:#e2e8f0!important;
}
body.dark-mode .dilt-reg-summary{
 color:#e2e8f0!important;
}
body.dark-mode .dilt-reg-summary>div:first-child,
body.dark-mode .dilt-reg-summary>div:nth-child(2){
 color:#e2e8f0!important;
}
body.dark-mode .dilt-reg-summary b{
 color:#f8fafc!important;
}
body.dark-mode .dilt-reg-prep{
 background:#132238!important;
 border-color:#3b5f82!important;
 color:#dbeafe!important;
}
body.dark-mode .dilt-reg-prep .dose-note{
 color:#aebbd0!important;
}
body.dark-mode .dilt-reg-dose{
 background:#111827!important;
 border:1px solid #475569!important;
 box-shadow:none!important;
}
body.dark-mode .dilt-reg-dose:hover,
body.dark-mode .dilt-reg-dose:focus{
 background:#172033!important;
 border-color:#64748b!important;
}
body.dark-mode .dilt-reg-dose .dose-note{
 color:#b9c6d6!important;
}
body.dark-mode .dilt-reg-dose .dose-note b{
 color:#e5edf7!important;
}
body.dark-mode .dilt-dose-primary{
 color:#bfdbfe!important;
}
body.dark-mode .dilt-tap-hint{
 color:#94a3b8!important;
}
body.dark-mode .dilt-reg-grid span{
 background:#172033!important;
 border-color:#475569!important;
 color:#e2e8f0!important;
}
body.dark-mode .dilt-reg-grid b{
 color:#f1f5f9!important;
}
body.dark-mode .dilt-reg-grid small{
 color:#aebbd0!important;
}
body.dark-mode .dilt-drop-field label,
body.dark-mode .tool-card:has(#toolDiltWeight) .calc-field label,
body.dark-mode .dose-calc:has([id$='-dilt-o']) .calc-field label{
 color:#e5edf7!important;
}
body.dark-mode .tool-card:has(#toolDiltWeight) .calc-field small,
body.dark-mode .dose-calc:has([id$='-dilt-o']) .calc-field small{
 color:#aebbd0!important;
}
body.dark-mode #toolDiltDob,
body.dark-mode #toolDiltAge,
body.dark-mode #toolDiltWeight,
body.dark-mode #toolDiltUnit,
body.dark-mode #toolDiltDrop,
body.dark-mode .dose-calc:has([id$='-dilt-o']) input,
body.dark-mode .dose-calc:has([id$='-dilt-o']) select{
 background:#0f172a!important;
 border-color:#64748b!important;
 color:#f8fafc!important;
 color-scheme:dark;
}
body.dark-mode #toolDiltDob:focus,
body.dark-mode #toolDiltAge:focus,
body.dark-mode #toolDiltWeight:focus,
body.dark-mode #toolDiltUnit:focus,
body.dark-mode #toolDiltDrop:focus,
body.dark-mode .dose-calc:has([id$='-dilt-o']) input:focus,
body.dark-mode .dose-calc:has([id$='-dilt-o']) select:focus{
 outline:2px solid #60a5fa!important;
 outline-offset:1px!important;
 border-color:#93c5fd!important;
 box-shadow:0 0 0 3px #2563eb33!important;
}
body.dark-mode #toolDiltDob::-webkit-calendar-picker-indicator,
body.dark-mode .dose-calc:has([id$='-dilt-o']) input[type='date']::-webkit-calendar-picker-indicator{
 filter:invert(1) brightness(1.5);
 opacity:.9;
}
body.dark-mode .tool-card:has(#toolDiltWeight)>.tool-note{
 color:#b8c5d4!important;
}
body.dark-mode .tool-card:has(#toolDiltWeight)>.tool-note b{
 color:#e5edf7!important;
}
body.dark-mode .tool-card:has(#toolDiltWeight)>h3{
 color:#f8fafc!important;
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();