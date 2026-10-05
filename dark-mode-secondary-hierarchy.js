(()=>{'use strict';
const ID='gfd-dark-secondary-hierarchy-v287';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v287 — global dark-mode secondary-text hierarchy audit */
body.dark-mode{
 --gfd-dm-secondary:#aebbd0;
 --gfd-dm-secondary-strong:#c6d2df;
 --gfd-dm-secondary-label:#e5edf7;
 --gfd-dm-secondary-surface:#101a2a;
 --gfd-dm-secondary-border:#334a63;
}

/* Helper / instructional copy: readable, but clearly secondary to clinical text. */
body.dark-mode .tool-note,
body.dark-mode .dose-note,
body.dark-mode .flow-small,
body.dark-mode .flow-kicker,
body.dark-mode .meta,
body.dark-mode .hospital-note,
body.dark-mode .hospital-address,
body.dark-mode .burn-mini,
body.dark-mode .reorder-hint,
body.dark-mode .source-med-subtitle,
body.dark-mode .tool-section-heading span,
body.dark-mode .quick-card span,
body.dark-mode .lab-search-empty,
body.dark-mode .lab-search-hit small,
body.dark-mode .parkland-volume small,
body.dark-mode .appendix-head span,
body.dark-mode .footer{
 color:var(--gfd-dm-secondary)!important;
}

/* Small explanatory copy tied to calculator fields and tools. */
body.dark-mode .calc-field>small,
body.dark-mode .tool-card .calc-field small,
body.dark-mode .dose-calc .calc-field small,
body.dark-mode .source-med-sheet small,
body.dark-mode .tool-launch small{
 color:var(--gfd-dm-secondary)!important;
}

/* Keep lead labels easy to scan without making the whole note white. */
body.dark-mode .tool-note b,
body.dark-mode .tool-note strong,
body.dark-mode .dose-note b,
body.dark-mode .dose-note strong,
body.dark-mode .calc-field label,
body.dark-mode .tool-section-heading b,
body.dark-mode .quick-card b{
 color:var(--gfd-dm-secondary-label)!important;
}

/* Generic informational note panels that otherwise look washed on the card surface. */
body.dark-mode .tool-card>.tool-note:not(:empty),
body.dark-mode .dose-tools>.dose-note:not(:empty){
 border-color:var(--gfd-dm-secondary-border)!important;
}

/* Preserve intentionally semantic warning/action palettes. */
body.dark-mode .flow-warning .dose-note,
body.dark-mode .protocol-callout .dose-note,
body.dark-mode .source-med-row.med-contra small,
body.dark-mode .source-med-row.med-precaution small,
body.dark-mode .tool-disabled,
body.dark-mode .offline.on{
 color:inherit!important;
}

/* Placeholder text should stay one tier below helper copy. */
body.dark-mode input::placeholder,
body.dark-mode textarea::placeholder{
 color:#8797ad!important;
 opacity:1!important;
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();