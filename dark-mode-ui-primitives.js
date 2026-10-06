(()=>{'use strict';
const ID='gfd-dark-ui-primitives-v329';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v329 — global dark-mode UI primitive / descriptor / search / field-use audit */
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
 --dm-accent:#38bdf8;
}

/* Editable/search/select controls — remove remaining light islands. */
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

/* Global search — strong field contrast and obvious tappable rows. */
body.dark-mode #gfdUniversalSearchResults{background:#0f172a!important;border-color:#64748b!important;box-shadow:0 14px 34px #0009!important}
body.dark-mode #gfdUniversalSearchResults .gfd-us-head{background:#111827!important;color:#cbd5e1!important;border-bottom:1px solid #334155!important}
body.dark-mode #gfdUniversalSearchResults .gfd-us-row{background:#111827!important;color:#f8fafc!important;border-color:#334155!important;min-height:52px}
body.dark-mode #gfdUniversalSearchResults .gfd-us-row.active,
body.dark-mode #gfdUniversalSearchResults .gfd-us-row:active,
body.dark-mode #gfdUniversalSearchResults .gfd-us-row:hover{background:#173a5e!important;outline:1px solid #38bdf8!important;outline-offset:-1px}
body.dark-mode #gfdUniversalSearchResults .gfd-us-kind{background:#334155!important;color:#f1f5f9!important;border:1px solid #64748b!important}
body.dark-mode #gfdUniversalSearchResults .gfd-us-title{color:#f8fafc!important}
body.dark-mode #gfdUniversalSearchResults .gfd-us-sub,
body.dark-mode #gfdUniversalSearchResults .gfd-us-arrow,
body.dark-mode .gfd-us-empty{color:var(--dm-secondary)!important}

/* Search shells/results across tools, labs and medications. */
body.dark-mode .lab-search-wrap,
body.dark-mode .streetdrug-search-card,
body.dark-mode .patient-med-search,
body.dark-mode .search-card,
body.dark-mode [class*='search-wrap'],
body.dark-mode [class*='search-shell']{color:#f1f5f9!important}
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
body.dark-mode .lab-search-empty{color:var(--dm-secondary)!important}

/* Quick Procedures / procedure tabs — obvious selected vs unselected state. */
body.dark-mode .gfd-proc-hub{background:#111827!important;border-color:#475569!important}
body.dark-mode .gfd-proc-hub-head b{color:#f8fafc!important}
body.dark-mode .gfd-proc-hub-head span,
body.dark-mode .gfd-proc-copy small,
body.dark-mode .gfd-proc-go,
body.dark-mode .gfd-proc-all{color:#b6c4d4!important}
body.dark-mode .gfd-proc-quick{background:#172033!important;border-color:#475569!important;border-left-color:#38bdf8!important;color:#f8fafc!important;min-height:66px}
body.dark-mode .gfd-proc-quick:active,
body.dark-mode .gfd-proc-quick:focus{background:#173a5e!important;border-color:#7dd3fc!important;outline:2px solid #38bdf8!important;outline-offset:1px!important}
body.dark-mode .tcp-mobile-tab,
body.dark-mode .niv-tab,
body.dark-mode .zv-tab{background:#172033!important;border-color:#64748b!important;color:#f1f5f9!important}
body.dark-mode .tcp-mobile-tab.on,
body.dark-mode .niv-tab.on,
body.dark-mode .zv-tab.on{background:#0f6f9f!important;border-color:#7dd3fc!important;color:#fff!important;box-shadow:inset 0 -2px 0 #d7c79a!important}

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
body.dark-mode .tcp-hero p,
body.dark-mode .niv-hero p,
body.dark-mode .zv-hero p,
body.dark-mode .tcp-step-card small,
body.dark-mode .niv-step small,
body.dark-mode .zv-step small,
body.dark-mode figcaption,
body.dark-mode [class*='descriptor'],
body.dark-mode [class*='subtitle'],
body.dark-mode [class*='caption']{color:var(--dm-secondary)!important}

/* Strong text embedded in secondary copy needs a clear hierarchy. */
body.dark-mode .tool-note b,
body.dark-mode .tool-note strong,
body.dark-mode .dose-note b,
body.dark-mode .dose-note strong,
body.dark-mode .hospital-note b,
body.dark-mode .entrance-view-descriptor b,
body.dark-mode figcaption b,
body.dark-mode [class*='descriptor'] b,
body.dark-mode [class*='subtitle'] b{color:var(--dm-secondary-strong)!important}

/* Field labels and tiny labels stay distinct from placeholders/help text. */
body.dark-mode label,
body.dark-mode .calc-field label,
body.dark-mode .patient-med-label,
body.dark-mode .erlab-section,
body.dark-mode .tcp-section-label,
body.dark-mode .niv-section-label,
body.dark-mode .zv-section-label,
body.dark-mode .tcp-real-zoll-label{color:#dbe5ef!important}

/* Generic informational surfaces — not semantic warning/error/success panels. */
body.dark-mode .notice:not(.warning):not(.danger):not(.error),
body.dark-mode .info-box,
body.dark-mode .helper-box,
body.dark-mode .reference-note{background:#101a2a!important;border-color:#3f5268!important;color:#d7e0ea!important}

/* Maintain clinical semantic warning colors while improving text legibility. */
body.dark-mode .tcp-warning,
body.dark-mode .tcp-alert,
body.dark-mode .niv-alert,
body.dark-mode .niv-stop,
body.dark-mode .zv-danger,
body.dark-mode .zv-warning,
body.dark-mode .zv-caution{font-weight:500}
body.dark-mode .tcp-warning b,
body.dark-mode .tcp-alert b,
body.dark-mode .niv-alert b,
body.dark-mode .niv-stop b,
body.dark-mode .zv-danger b,
body.dark-mode .zv-warning b,
body.dark-mode .zv-caution b{font-weight:950}

/* Touch targets used repeatedly in the field. */
.gfd-us-row,.gfd-proc-quick,.tcp-mobile-tab,.niv-tab,.zv-tab,.tool-section-toggle,.tool-launch{min-height:44px}

/* Keep browser-native date/search icons visible. */
body.dark-mode input[type='date']::-webkit-calendar-picker-indicator,
body.dark-mode input[type='time']::-webkit-calendar-picker-indicator{filter:invert(1) brightness(1.5);opacity:.9}
body.dark-mode input[type='search']::-webkit-search-cancel-button{filter:invert(1) brightness(1.8);opacity:.9}

/* Do not flatten intentional clinical semantic palettes. */
body.dark-mode .flow-warning,
body.dark-mode .med-contra,
body.dark-mode .med-precaution,
body.dark-mode .patient-med-warning,
body.dark-mode .tool-disabled,
body.dark-mode .offline.on{color:inherit}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();