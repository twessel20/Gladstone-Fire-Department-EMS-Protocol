(()=>{'use strict';
const RELEASE={date:'2026-10-06',version:'v3.25',title:'Z Vent Direct PDF Source',copy:'Removed the unreliable embedded Z Vent preview and made View Z Vent Guide PDF open the complete five-page ZOLL Ventilator Quick Reference Guide directly, matching the Original link that works reliably on iPhone.',tags:['Z Vent','ZOLL','PDF','Source','Mobile']};
function key(v){const s=String(v||'').replace(/^v/i,'');if(s.includes('.')){const [a,b='0']=s.split('.');return (Number(a)||0)*100+(Number(b)||0)}return Number(s.replace(/\D/g,''))||0}
function ensure(){try{if(typeof gfdChangeLog==='undefined'||!Array.isArray(gfdChangeLog))return false;if(!gfdChangeLog.some(x=>key(x&&x.version)===325))gfdChangeLog.push({...RELEASE});gfdChangeLog.sort((a,b)=>key(b.version)-key(a.version));return true}catch(e){return false}}
function wrap(){if(typeof window.openChangeLog!=='function')return false;if(window.openChangeLog.__gfdHistory325)return true;const original=window.openChangeLog;function wrapped(){ensure();return original.apply(this,arguments)}wrapped.__gfdHistory325=true;wrapped.__original=original;window.openChangeLog=wrapped;return true}
function boot(){let tries=0;const run=()=>{const a=ensure(),b=wrap();if((!a||!b)&&tries++<30)setTimeout(run,100)};run()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();