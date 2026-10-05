(()=>{'use strict';
const ID='gfd-dark-ui-primitives-v295';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v295 — global dark-mode UI primitive / descriptor / search audit */
body.dark-mode{
 --dm-input-bg:#0f172a;
 --dm-input-border:#64748b;
 --dm-input-text:#f8fafc;
 --dm-placeholder:#94a3b8;
 --dm-secondary:#b6c4d4;
 --dm-secondary-strong:#d7e0ea;
 --dm-surface:#111827;
 --dm-soft:#172033;
 --dm-border:#475569;
 --dm-focus:#60a5fa;
}

/* All common editable/search/select controls — remove remaining light islands. */
body.dark-mode input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='button']):not([type='submit']),
body.dark-mode textarea,
body.dark-mode select,
body.dark-mode .tool-input,
body.dark-mode .search,
body.dark-mode .lab-search-wrap input,
body.dark-mode .patient-med-row .tool-input,
body.dark-mode .streetdrug-search-row .tool-input,
body.dark-mode .pc-scroll-select{
 background:var(--dm-input-bg)!important;
 color:var(--dm-input-text)!important;
 border-color:var(--dm-input-border)!important;
 caret-color:var(--dm-input-text)!important;
 color-scheme:dark;
 box-shadow:inset 0 1px 2px #0005!important;
}
body.dark-mode select option{background:#0f172a!important;color:#f8fafc!important}
body.dark-mode input::placeholder,
body.dark-mode textarea::placeholder,
body.dark-mode .search::placeholder,
body.dark-mode .tool-input::placeholder{
 color:var(--dm-placeholder)!important;
 opacity:1!important;
}
body.dark-mode input:not([type='checkbox']):not([type='radio']):not([type='range']):focus,
body.dark-mode textarea:focus,
body.dark-mode select:focus,
body.dark-mode .tool-input:focus,
body.dark-mode .search:focus{
 border-color:#93c5fd!important;
 outline:2px solid var(--dm-focus)!important;
 outline-offset:1px!important;
 box-shadow:0 0 0 3px #2563eb33!important;
}
body.dark-mode input:disabled,
body.dark-mode textarea:disabled,
body.dark-mode select:disabled{
 background:#172033!important;
 color:#8fa0b5!important;
 border-color:#334155!important;
 opacity:1!important;
}

/* Search shells/results across main, tools, labs, medications and universal search. */
body.dark-mode .lab-search-wrap,
body.dark-mode .streetdrug-search-card,
body.dark-mode .patient-med-search,
body.dark-mode .search-card,
body.dark-mode [class*='search-wrap'],
body.dark-mode [class*='search-shell']{
 color:#f1f5f9!important;
}
body.dark-mode .lab-search-hit,
body.dark-mode .patient-med-choice,
body.dark-mode .patient-med-link{
 background:var(--dm-soft)!important;
 border-color:var(--dm-border)!important;
 color:#e5edf7!important;
}
body.dark-mode .lab-search-hit:hover,
body.dark-mode .patient-med-choice:hover,
body.dark-mode .patient-med-link:hover{background:#1e2b40!important;border-color:#64748b!important}
body.dark-mode .lab-search-empty,
body.dark-mode .gfd-us-empty{color:var(--dm-secondary)!important}

/* Descriptors, subtitles, captions, helper labels and secondary summaries. */
body.dark-mode .sub,
body.dark-mode .meta,
body.dark-mode .reorder-hint,
body.dark-mode .source-med-subtitle,
body.dark-mode .hospital-address,
body.dark-mode .hospital-note,
body.dark-mode .entrance-view-descriptor,
body.dark-mode .entrance-view-fallback,
body.dark-mode .entrance-view-placeholder,
body.dark-mode .tool-section-heading span,
body.dark-mode .tool-launch small,
body.dark-mode .quick-card span,
body.dark-mode .dose-note,
body.dark-mode .tool-note,
body.dark-mode .flow-small,
body.dark-mode .flow-kicker,
body.dark-mode .appendix-head span,
body.dark-mode .patient-med-copy,
body.dark-mode .patient-med-card small,
body.dark-mode .streetdrug-pattern small,
body.dark-mode .streetdrug-search-card small,
body.dark-mode figcaption,
body.dark-mode [class*='descriptor'],
body.dark-mode [class*='subtitle'],
body.dark-mode [class*='caption']{
 color:var(--dm-secondary)!important;
}

/* Strong text embedded in secondary copy needs an obvious hierarchy. */
body.dark-mode .tool-note b,
body.dark-mode .tool-note strong,
body.dark-mode .dose-note b,
body.dark-mode .dose-note strong,
body.dark-mode .hospital-note b,
body.dark-mode .entrance-view-descriptor b,
body.dark-mode figcaption b,
body.dark-mode [class*='descriptor'] b,
body.dark-mode [class*='subtitle'] b{
 color:var(--dm-secondary-strong)!important;
}

/* Field labels and tiny labels stay distinct from placeholders/help text. */
body.dark-mode label,
body.dark-mode .calc-field label,
body.dark-mode .patient-med-label,
body.dark-mode .erlab-section,
body.dark-mode .tcp-section-label,
body.dark-mode .tcp-real-zoll-label{
 color:#dbe5ef!important;
}

/* Generic informational surfaces — not semantic warning/error/success panels. */
body.dark-mode .notice:not(.warning):not(.danger):not(.error),
body.dark-mode .info-box,
body.dark-mode .helper-box,
body.dark-mode .reference-note{
 background:#101a2a!important;
 border-color:#3f5268!important;
 color:#d7e0ea!important;
}

/* Keep browser-native date/search icons visible. */
body.dark-mode input[type='date']::-webkit-calendar-picker-indicator,
body.dark-mode input[type='time']::-webkit-calendar-picker-indicator{
 filter:invert(1) brightness(1.5);
 opacity:.9;
}
body.dark-mode input[type='search']::-webkit-search-cancel-button{
 filter:invert(1) brightness(1.8);
 opacity:.9;
}

/* Do not flatten intentional clinical semantic palettes. */
body.dark-mode .flow-warning,
body.dark-mode .med-contra,
body.dark-mode .med-precaution,
body.dark-mode .patient-med-warning,
body.dark-mode .tcp-alert,
body.dark-mode .tcp-warning,
body.dark-mode .tool-disabled,
body.dark-mode .offline.on{
 color:inherit;
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();