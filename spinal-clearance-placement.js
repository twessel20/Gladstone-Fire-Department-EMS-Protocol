(()=>{'use strict';
const ASSESS='Assessment & Scoring',TRAUMA='Trauma & Burns';
function inTools(){try{return typeof cat!=='undefined'&&cat==='Tools'}catch(e){return false}}
function findSection(label){return [...document.querySelectorAll('.tool-section')].find(sec=>{const h=sec.querySelector('.tool-section-heading b');return h&&h.textContent.trim().includes(label)})||null}
function bodyOf(label){return findSection(label)?.querySelector('.tool-section-body')||null}
function makeTraumaCard(){const b=document.createElement('button');b.type='button';b.className='sc-tool-menu-card';b.dataset.scTraumaCard='1';b.innerHTML='<span class="ico">🦴</span><span><b>Spinal Clearance — Yes / No</b><small>GFD field clearance workflow • any Yes stops clearance</small></span><span class="go">›</span>';b.addEventListener('click',()=>{if(typeof window.openSpinalClearanceTool==='function')window.openSpinalClearanceTool()});return b}
function place(){if(!inTools())return;const menu=document.querySelector('.tool-menu');if(!menu)return;const assess=bodyOf(ASSESS),trauma=bodyOf(TRAUMA);if(!assess||!trauma)return;
 let primary=menu.querySelector('[data-sc-tool-card]');
 if(primary&&primary.parentElement!==assess){primary.dataset.scPlacement='assessment';assess.insertBefore(primary,assess.firstChild)}
 if(!assess.querySelector('[data-sc-tool-card]')&&primary){assess.insertBefore(primary,assess.firstChild)}
 if(!trauma.querySelector('[data-sc-trauma-card]'))trauma.insertBefore(makeTraumaCard(),trauma.firstChild);
 [...menu.children].filter(el=>el.matches?.('.sc-tool-menu-card')).forEach(el=>{if(el.parentElement===menu)el.remove()});
}
function boot(){let tries=0;const run=()=>{place();if(tries++<80)setTimeout(run,100)};run();const list=document.getElementById('list');if(list)new MutationObserver(()=>requestAnimationFrame(place)).observe(list,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();