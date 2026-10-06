(()=>{'use strict';
const RELEASE={date:'2026-10-05',version:'v3.21',title:'Z Vent Source Routing Fix',copy:'Removed the generic GFD protocol-book source control from the Z Vent procedure and forced all Z Vent source actions to open the dedicated ZOLL Ventilator Quick Reference Guide instead.',tags:['Z Vent','ZOLL','PDF','Source','Fix']};
function key(v){const s=String(v||'').replace(/^v/i,'');if(s.includes('.')){const [a,b='0']=s.split('.');return (Number(a)||0)*100+(Number(b)||0)}return Number(s.replace(/\D/g,''))||0}
function ensure(){try{if(typeof gfdChangeLog==='undefined'||!Array.isArray(gfdChangeLog))return false;if(!gfdChangeLog.some(x=>key(x&&x.version)===321))gfdChangeLog.push({...RELEASE});gfdChangeLog.sort((a,b)=>key(b.version)-key(a.version));return true}catch(e){return false}}
function wrap(){if(typeof window.openChangeLog!=='function')return false;if(window.openChangeLog.__gfdHistory321)return true;const original=window.openChangeLog;function wrapped(){ensure();return original.apply(this,arguments)}wrapped.__gfdHistory321=true;wrapped.__original=original;window.openChangeLog=wrapped;return true}
function boot(){let tries=0;const run=()=>{const a=ensure(),b=wrap();if((!a||!b)&&tries++<30)setTimeout(run,100)};run()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();