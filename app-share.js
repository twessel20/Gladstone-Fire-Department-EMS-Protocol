(()=>{
'use strict';
const SHARE_URL='https://twessel20.github.io/Gladstone-Fire-Department-EMS-Protocol/';
const STYLE_ID='gfd-app-share-style';
function styles(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#gfdShareAppBtn{width:100%;margin-top:8px;min-height:42px;border:1px solid #ffffff66;background:#ffffff18;color:#fff;border-radius:10px;font-weight:900;font-size:13px;padding:9px 12px}
#gfdShareToast{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:12000;background:#173a5e;color:#fff;padding:10px 13px;border-radius:10px;font-weight:800;font-size:12px;box-shadow:0 6px 20px #0005}
`;document.head.appendChild(s)}
function toast(msg){document.getElementById('gfdShareToast')?.remove();const el=document.createElement('div');el.id='gfdShareToast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2200)}
async function shareApp(){
 const data={title:'Gladstone Fire Department EMS Protocols',text:'Gladstone Fire Department EMS Protocol App',url:SHARE_URL};
 try{
  if(navigator.share){await navigator.share(data);return}
  if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(SHARE_URL);toast('App link copied');return}
 }catch(err){if(err?.name==='AbortError')return}
 window.prompt('Copy this app link:',SHARE_URL)
}
function mount(){styles();if(document.getElementById('gfdShareAppBtn'))return;const host=document.getElementById('gfdPatientMode')||document.querySelector('.top');if(!host)return;const b=document.createElement('button');b.id='gfdShareAppBtn';b.type='button';b.textContent='Share App';b.setAttribute('aria-label','Share Gladstone EMS Protocol App');b.addEventListener('click',shareApp);host.appendChild(b)}
window.GFDShareApp=shareApp;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();