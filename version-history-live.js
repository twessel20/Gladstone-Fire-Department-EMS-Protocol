(()=>{'use strict';
const RELEASES=[
 {date:'2026-10-05',version:'v318',title:'Decimal Version History',copy:'Changed the Version History display to standard decimal-style release numbers while preserving the existing internal build numbers for code and cache management. Example: build v318 displays as v3.18.',tags:['Version History','UI','Release Data']},
 {date:'2026-10-05',version:'v317',title:'Z Vent Source PDF Viewer',copy:'Made the ZOLL Ventilator Quick Reference Guide the source reference for the Z Vent procedure and added a dedicated View Z Vent Guide PDF viewer that is separate from the GFD EMS protocol source-book view.',tags:['Z Vent','ZOLL','PDF','Source','Procedures']},
 {date:'2026-10-05',version:'v316',title:'TCP Versed Sedation Link',copy:'Added a one-tap Versed (Midazolam) sedation button to the Transcutaneous Pacing How to Pace workflow, linking directly to the GFD medication reference.',tags:['TCP','Pacing','Versed','Midazolam','Sedation']},
 {date:'2026-10-05',version:'v315',title:'TCP How to Pace Repair',copy:'Fixed the Transcutaneous Pacing How to Pace view by removing the legacy image-cleanup module from the live build and adding direct, stable tab handling for the written step-by-step pacing workflow.',tags:['TCP','Pacing','Fix','Procedures','Navigation']},
 {date:'2026-10-05',version:'v314',title:'Dedicated ZOLL Ventilator Procedure',copy:'Added a field-focused ZOLL Ventilator (Z Vent) procedure with Quick Start setup, parameter-setting workflow, alarm-status guidance, low-flow oxygen setup, MRI and unattended-patient warnings, and touch cross-links to the BiPAP/CPAP procedure.',tags:['Z Vent','ZOLL','Ventilator','Procedures','Respiratory']},
 {date:'2026-10-05',version:'v313',title:'BiPAP / CPAP Freeze Fix',copy:'Removed the self-triggering DOM observer render loop that could continuously rebuild the BiPAP/CPAP procedure and make the app stick. The procedure now renders once when opened, while cross-links are added only when other protocols are opened.',tags:['BiPAP','CPAP','Fix','Performance','Procedures']},
 {date:'2026-10-05',version:'v312',title:'Dedicated BiPAP / CPAP Procedure',copy:'Added a field-focused BiPAP/CPAP procedure with separate tabs, patient-selection criteria, contraindications, precautions, GFD BiLevel settings, application steps, nausea/aspiration warnings, and one-tap cross-links from any protocol that references CPAP or BiPAP.',tags:['BiPAP','CPAP','Respiratory','Procedures','Cross Links']},
 {date:'2026-10-05',version:'v311',title:'Exact ZOLL Pacing Page 10 JPEG',copy:'Rendered the department-provided X Series Quick Reference Guide page 10 to a standard JPEG and added that exact image directly under TCP Step 2. The written GFD pacing workflow remains primary, and the visual is used only as a device-operation reference.',tags:['TCP','Pacing','ZOLL','JPEG','Reference']},
 {date:'2026-10-05',version:'v310',title:'Removed ZOLL Page 10 Reference',copy:'Removed the expandable ZOLL page 10 reference from the TCP pacing procedure. The How to Pace view is step-by-step only while JPEG screenshots are prepared for a future visual reference.',tags:['TCP','Pacing','ZOLL','Workflow','Fix']},
 {date:'2026-10-05',version:'v309',title:'Expandable ZOLL Page 10 Reference',copy:'Returned the department-provided ZOLL page 10 as an optional collapsed reference under TCP Step 2. The written pacing workflow remains primary, the image loads only when requested, and a failed image does not leave blank space or interrupt the procedure.',tags:['TCP','Pacing','ZOLL','Reference','Workflow']},
 {date:'2026-10-05',version:'v308',title:'Version History Data Sync',copy:'Changed Version History from a post-render text patch to real changelog data. Current version, latest release, version range, release count, and release cards now derive from the same gfdChangeLog array used by the app.',tags:['Version History','Release Data','App UI','Fix']},
 {date:'2026-10-05',version:'v307',title:'TCP Visual Area Fully Removed',copy:'Collapsed and removed all remaining legacy ZOLL visual-aid containers so the pacing procedure no longer reserves blank image space.',tags:['TCP','Pacing','ZOLL','Workflow','Fix']},
 {date:'2026-10-05',version:'v306',title:'TCP Step-by-Step Only',copy:'Removed the ZOLL pacing visual aid and kept the Transcutaneous Pacing procedure as a compact written step-by-step workflow.',tags:['TCP','Pacing','ZOLL','Workflow']},
 {date:'2026-10-05',version:'v305',title:'ZOLL Asset and Version-History Repair',copy:'Reworked the page-10 asset path and version-history synchronization while troubleshooting the pacing visual and stale release display.',tags:['TCP','ZOLL','Version History','Fix']},
 {date:'2026-10-05',version:'v304',title:'Binary ZOLL Page-10 Asset',copy:'Replaced the corrupted page-10 wrapper with a binary JPEG asset and pointed the TCP visual directly to that file.',tags:['TCP','ZOLL','Asset','Fix']},
 {date:'2026-10-05',version:'v303',title:'Static ZOLL Page-10 Asset',copy:'Moved the pacing reference away from script extraction toward a static local page-10 asset and cache-busted the version-history helper.',tags:['TCP','ZOLL','Asset']},
 {date:'2026-10-05',version:'v302',title:'Version History Live Sync',copy:'Added a live Version History synchronization helper after the built-in changelog stopped at v200.',tags:['Version History','Fix']},
 {date:'2026-10-05',version:'v301',title:'ZOLL Page-10 Force Render',copy:'Added an independent page-10 render path so the pacing reference did not depend on the older visual container being present.',tags:['TCP','ZOLL','Pacing','Fix']},
 {date:'2026-10-05',version:'v299',title:'Embedded ZOLL Page-10 Reference',copy:'Changed the TCP pacing guide to use the department-provided ZOLL X Series Quick Reference Guide page 10 instead of recreated monitor artwork.',tags:['TCP','ZOLL','Pacing','Reference']},
 {date:'2026-10-05',version:'v298',title:'Compact Atropine Dose Sequence',copy:'Added a compact Atropine dose-reference card showing the GFD 0.5 mg IV repeat dose, 3–5 minute interval, weight-based total reference, and number of full 0.5 mg doses.',tags:['Atropine','Medication','Calculator','Bradycardia']},
 {date:'2026-10-05',version:'v293',title:'Patient Medication Dark-Mode Tuning',copy:'Improved dark-mode contrast and readability in the Patient Home-Medication Lookup search field, helper text, warnings, and result cards.',tags:['Dark Mode','Patient Meds','Search','Accessibility']},
 {date:'2026-10-05',version:'v290',title:'Mobile-First TCP Procedure',copy:'Redesigned Transcutaneous Pacing as a mobile-first procedure with Decision Path and How to Pace views, capture confirmation, troubleshooting, and GFD Bradycardia cross-linking.',tags:['TCP','Pacing','Bradycardia','Mobile']},
 {date:'2026-10-05',version:'v289',title:'TCP Integration Fix',copy:'Fixed Transcutaneous Pacing registration and protocol integration so it works with the app’s lexical data and current-protocol state.',tags:['TCP','Integration','Procedures','Fix']},
 {date:'2026-10-05',version:'v287',title:'Dark-Mode Secondary Text Hierarchy',copy:'Improved global dark-mode secondary-text hierarchy and supporting text contrast while preserving semantic warning colors.',tags:['Dark Mode','Accessibility','Contrast']},
 {date:'2026-10-05',version:'v286',title:'Diltiazem Dark-Mode Note Contrast',copy:'Improved dark-mode readability for Diltiazem supporting notes and calculator guidance.',tags:['Diltiazem','Dark Mode','Contrast']}
];
function canonicalVersion(v){
 const raw=String(v||'').trim().replace(/^v/i,'');
 if(!raw)return 0;
 if(raw.includes('.')){const parts=raw.split('.');const major=Number(parts[0])||0;const minor=Number(parts[1])||0;return major*100+minor;}
 const n=Number(raw.replace(/[^0-9]/g,''));return Number.isFinite(n)?n:0;
}
function displayVersion(v){const n=canonicalVersion(v);if(!n)return String(v||'');const major=Math.floor(n/100);const minor=String(n%100).padStart(2,'0');return `v${major}.${minor}`}
function ensureHistory(){
 try{
  if(typeof gfdChangeLog==='undefined'||!Array.isArray(gfdChangeLog))return false;
  for(const item of gfdChangeLog){if(item&&item.version)item.version=displayVersion(item.version)}
  const seen=new Set(gfdChangeLog.map(x=>canonicalVersion(x&&x.version)).filter(Boolean));
  for(const release of RELEASES){const key=canonicalVersion(release.version);if(!seen.has(key)){gfdChangeLog.push({...release,version:displayVersion(release.version)});seen.add(key)}}
  gfdChangeLog.sort((a,b)=>canonicalVersion(b.version)-canonicalVersion(a.version));
  return true;
 }catch(e){return false}
}
function wrapOpenChangeLog(){if(typeof window.openChangeLog!=='function'||window.openChangeLog.__gfdHistory318)return false;const original=window.openChangeLog;function wrapped(){ensureHistory();return original.apply(this,arguments)}wrapped.__gfdHistory318=true;wrapped.__original=original;window.openChangeLog=wrapped;return true}
function boot(){let tries=0;const run=()=>{const dataReady=ensureHistory();const openReady=wrapOpenChangeLog();if((!dataReady||(!openReady&&!(window.openChangeLog&&window.openChangeLog.__gfdHistory318)))&&tries++<30)setTimeout(run,100)};run()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();