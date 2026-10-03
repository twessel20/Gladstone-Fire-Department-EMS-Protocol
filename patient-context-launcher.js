(()=>{
'use strict';
const STYLE_ID='gfd-patient-context-launcher-style';
let timer=null;
function ctx(){try{return window.GFDPatientContext?.get?.()||{mode:'adult'}}catch(e){return {mode:'adult'}}}
function isHome(){const d=document.getElementById('detail');return !d||!d.classList.contains('on')}
function injectStyles(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#gfdPatientContextLauncher{display:none;width:100%;margin-top:8px;border:2px solid #d7c79a;background:#fff;color:#173a5e;border-radius:11px;padding:10px 12px;font-weight:950;font-size:14px;text-align:left;box-shadow:0 1px 3px #0002;cursor:pointer}
#gfdPatientContextLauncher.on{display:block}
#gfdPatientContextLauncher .gfd-pcl-main{display:flex;align-items:center;justify-content:space-between;gap:10px}
#gfdPatientContextLauncher .gfd-pcl-edit{font-size:12px;color:#2f6690;white-space:nowrap}
#gfdPatientContextLauncher .gfd-pcl-sub{display:block;margin-top:3px;font-size:11px;font-weight:750;color:#64748b}
body.dark-mode #gfdPatientContextLauncher{background:#111827;color:#eef4fb;border-color:#d7c79a}body.dark-mode #gfdPatientContextLauncher .gfd-pcl-edit,body.dark-mode #gfdPatientContextLauncher .gfd-pcl-sub{color:#bfdbfe}
`;(document.head||document.documentElement).appendChild(s)}
function values(){const c=ctx();if(c.mode==='pediatric')return {mode:'Pediatric',age:c.age?`${c.age} ${c.ageUnit==='months'?'mo':'yr'}`:'',weight:c.weightKg?`${Math.round(Number(c.weightKg)*10)/10} kg`:''};const a=window.GFDAdultAge?.get?.()?.age;const w=Number(c.weightKg);return {mode:'Adult',age:a!=null&&a!==''?`Age ${a}`:'',weight:Number.isFinite(w)&&w>0?`${Math.round(w*10)/10} kg`:''}}
function labelHtml(){const v=values();const bits=[v.age,v.weight].filter(Boolean);return `<span class="gfd-pcl-main"><span>${v.mode} Patient${bits.length?' • '+bits.join(' • '):''}</span><span class="gfd-pcl-edit">Edit</span></span><span class="gfd-pcl-sub">Age and weight optional — tap to add or change</span>`}
function open(){const c=ctx();if(c.mode==='pediatric')window.GFDPatientContext?.open?.();else window.GFDAdultAge?.open?.()}
function ensure(){
 let b=document.getElementById('gfdPatientContextLauncher');if(b)return b;
 const adult=document.getElementById('adultModeBtn'),peds=document.getElementById('pedsModeBtn');
 const group=adult?.parentElement&&peds?.parentElement===adult.parentElement?adult.parentElement:null;
 const host=group?.parentElement||document.querySelector('.top');if(!host)return null;
 b=document.createElement('button');b.id='gfdPatientContextLauncher';b.type='button';b.setAttribute('aria-label','Add or edit optional patient age and weight');b.onclick=e=>{e.preventDefault();e.stopPropagation();open()};
 if(group&&group.nextSibling)host.insertBefore(b,group.nextSibling);else host.appendChild(b);
 return b;
}
function render(){clearTimeout(timer);timer=setTimeout(()=>{injectStyles();const b=ensure();if(!b)return;const home=isHome();b.classList.toggle('on',home);if(home){const next=labelHtml();if(b.innerHTML!==next)b.innerHTML=next}},20)}
function bindMode(id){const b=document.getElementById(id);if(!b||b.dataset.gfdPatientLauncherBound)return;b.dataset.gfdPatientLauncherBound='1';b.addEventListener('click',()=>setTimeout(render,40))}
function bind(){bindMode('adultModeBtn');bindMode('pedsModeBtn')}
function start(){bind();render();document.addEventListener('gfd:patient-context',render);window.addEventListener('hashchange',()=>{bind();render()});document.addEventListener('visibilitychange',()=>{if(!document.hidden){bind();render()}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();