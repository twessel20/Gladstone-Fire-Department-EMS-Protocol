(()=>{'use strict';
const RELEASE={date:'2026-10-05',version:'v3.20',title:'Dedicated Full-Screen Z Vent Source',copy:'Restored the Z Vent guide to its own in-app source viewer and forced the mobile PDF pane to fit the phone width. The guide remains separate from the GFD EMS protocol source-book reference.',tags:['Z Vent','ZOLL','PDF','Mobile','Source','Fix']};
function key(v){const s=String(v||'').replace(/^v/i,'');if(s.includes('.')){const [a,b='0']=s.split('.');return (Number(a)||0)*100+(Number(b)||0)}return Number(s.replace(/\D/g,''))||0}
function ensure(){try{if(typeof gfdChangeLog==='undefined'||!Array.isArray(gfdChangeLog))return false;if(!gfdChangeLog.some(x=>key(x&&x.version)===320))gfdChangeLog.push({...RELEASE});gfdChangeLog.sort((a,b)=>key(b.version)-key(a.version));return true}catch(e){return false}}
function wrap(){if(typeof window.openChangeLog!=='function')return false;if(window.openChangeLog.__gfdHistory320)return true;const original=window.openChangeLog;function wrapped(){ensure();return original.apply(this,arguments)}wrapped.__gfdHistory320=true;wrapped.__original=original;window.openChangeLog=wrapped;return true}
function boot(){let tries=0;const run=()=>{const a=ensure(),b=wrap();if((!a||!b)&&tries++<30)setTimeout(run,100)};run()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();