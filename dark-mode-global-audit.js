(()=>{'use strict';
const ID='gfd-dark-global-audit-v274';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v274 global dark-mode contrast + desktop viewability audit */
body.dark-mode{
 --gfd-dm-bg:#0b1220;
 --gfd-dm-card:#111827;
 --gfd-dm-soft:#172033;
 --gfd-dm-border:#475569;
 --gfd-dm-text:#f1f5f9;
 --gfd-dm-muted:#cbd5e1;
 --gfd-dm-blue:#93c5fd;
}

/* Remaining general surfaces that were still rendering as light-mode islands. */
body.dark-mode .cpss-item,
body.dark-mode .neuro-score-item,
body.dark-mode .body-map,
body.dark-mode .burn-side{
 background:var(--gfd-dm-card)!important;
 border-color:var(--gfd-dm-border)!important;
 color:var(--gfd-dm-text)!important;
 box-shadow:none!important;
}
body.dark-mode .cpss-item h4,
body.dark-mode .neuro-score-item h4,
body.dark-mode .body-map h4,
body.dark-mode .burn-side h4{
 color:#fff!important;
}

/* Cincinnati / stroke-screen controls. */
body.dark-mode .cpss-actions button{
 background:var(--gfd-dm-soft)!important;
 border-color:#64748b!important;
 color:#f8fafc!important;
}
body.dark-mode .cpss-actions button.normal.on{
 background:#102a20!important;
 border-color:#4ade80!important;
 color:#dcfce7!important;
}
body.dark-mode .cpss-actions button.abnormal.on{
 background:#321820!important;
 border-color:#fb7185!important;
 color:#ffe4e6!important;
}
body.dark-mode .cpss-result.pos{
 background:#321820!important;
 border-color:#fb7185!important;
 color:#ffe4e6!important;
}
body.dark-mode .cpss-result.neg{
 background:#102a20!important;
 border-color:#4ade80!important;
 color:#dcfce7!important;
}

/* Burn map and Parkland calculator. */
body.dark-mode .burn-age button,
body.dark-mode .burn-region{
 background:var(--gfd-dm-soft)!important;
 border-color:#64748b!important;
 color:#e2e8f0!important;
}
body.dark-mode .burn-age button.on{
 background:#2f6690!important;
 border-color:#60a5fa!important;
 color:#fff!important;
}
body.dark-mode .burn-region.on{
 background:#321820!important;
 border-color:#fb7185!important;
 color:#ffe4e6!important;
}
body.dark-mode .body-part{
 fill:#334155!important;
 stroke:#94a3b8!important;
}
body.dark-mode .body-part.on{
 fill:#7f1d1d!important;
 stroke:#f87171!important;
}
body.dark-mode .body-label{
 fill:#f1f5f9!important;
 stroke:#0b1220!important;
}
body.dark-mode .body-pct{fill:#cbd5e1!important}
body.dark-mode .burn-total,
body.dark-mode .parkland-stat b{color:#bfdbfe!important}
body.dark-mode .parkland-stat span,
body.dark-mode .parkland-volume small{color:#cbd5e1!important}
body.dark-mode .protocol-body .burn-extent-active{
 background:#33250d!important;
 border-color:#f59e0b!important;
 border-left-color:#f59e0b!important;
 color:#fef3c7!important;
}
body.dark-mode .protocol-body .burn-extent-active:before{color:#fde68a!important}

/* Destination tags and large destination callouts. */
body.dark-mode .route-tag.primary,
body.dark-mode .route-tag.medcontrol{
 background:#102a20!important;
 color:#bbf7d0!important;
 border:1px solid #4ade80!important;
}
body.dark-mode .route-tag.trauma{
 background:#321820!important;
 color:#fecdd3!important;
 border:1px solid #fb7185!important;
}
body.dark-mode .route-tag.burn{
 background:#33250d!important;
 color:#fde68a!important;
 border:1px solid #f59e0b!important;
}
body.dark-mode .route-tag.stroke{
 background:#102a43!important;
 color:#dbeafe!important;
 border:1px solid #60a5fa!important;
}
body.dark-mode .van-route{
 background:#321820!important;
 border-color:#fb7185!important;
 color:#ffe4e6!important;
}
body.dark-mode .van-route .route-hospital,
body.dark-mode .van-route .route-label{color:#ffe4e6!important}

/* Hospital entrance fallback content must remain readable when an image cannot load. */
body.dark-mode .entrance-view-fallback,
body.dark-mode .entrance-view-placeholder{color:#cbd5e1!important}
body.dark-mode .entrance-view-fallback b,
body.dark-mode .entrance-view-placeholder b{color:#f8fafc!important}
body.dark-mode .entrance-view-fallback a{color:#fff!important}

/* Source / appendix chrome stays dark; embedded authored documents remain light. */
body.dark-mode .appendix-head b{color:#f8fafc!important}
body.dark-mode .appendix-head span{color:#cbd5e1!important}
body.dark-mode .appendix-head a{color:#93c5fd!important}

/* Tool-state and secondary UI cleanup. */
body.dark-mode .tool-launch-icon{
 background:var(--gfd-dm-soft)!important;
 color:#bfdbfe!important;
 border:1px solid var(--gfd-dm-border)!important;
}
body.dark-mode .tool-disabled{
 background:#33250d!important;
 border-color:#f59e0b!important;
 color:#fef3c7!important;
}
body.dark-mode .flag.bls{
 background:#334155!important;
 color:#f1f5f9!important;
}
body.dark-mode .flag.als{
 background:#102a20!important;
 color:#bbf7d0!important;
}
body.dark-mode .flag.mc{
 background:#321820!important;
 color:#fecdd3!important;
}
body.dark-mode .footer{color:#aebbd0!important}
body.dark-mode .offline.on{
 background:#33250d!important;
 color:#fef3c7!important;
 border-bottom:1px solid #f59e0b!important;
}

/* Desktop: keep pointer/hover states dark and preserve clear card boundaries. */
@media(min-width:900px){
 body.dark-mode .quick-card:hover,
 body.dark-mode .tool-launch:hover,
 body.dark-mode .hospital-card:hover,
 body.dark-mode .contact-card:hover{
   background:#172033!important;
   border-color:#64748b!important;
   box-shadow:0 6px 18px #0006!important;
 }
 body.dark-mode .tool-section.open{
   border-color:#64748b!important;
   box-shadow:0 5px 16px #0005!important;
 }
 body.dark-mode .tabs{
   box-shadow:0 4px 14px #0004!important;
 }
 body.dark-mode .detail .card{
   box-shadow:0 5px 18px #0005!important;
 }
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();