(()=>{'use strict';
const BOX='gfdUniversalSearchResults';
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function findDataByTitle(title){try{if(typeof data==='undefined'||!Array.isArray(data))return null;const n=norm(title);return data.find(x=>x&&x.id&&norm(x.title)===n)||null}catch(e){return null}}
function clearSearch(){const box=document.getElementById(BOX);if(box)box.hidden=true;const input=[...document.querySelectorAll('input[type="search"],input[placeholder*="search" i],input[id*="search" i]')].find(x=>x.offsetParent!==null);if(input){input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));try{input.blur()}catch(e){}}}
function openDestination(item){if(!item||!item.id)return false;const opener=typeof window.openP==='function'?window.openP:null;if(!opener)return false;try{clearSearch();opener(item.id);requestAnimationFrame(()=>{try{window.scrollTo(0,0)}catch(e){}});return true}catch(e){return false}}
function activateRow(row,e){if(!row)return false;const title=row.querySelector('.gfd-us-title')?.textContent?.trim();if(!title)return false;const item=findDataByTitle(title);if(!item)return false;if(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.()}return openDestination(item)}
function onPointer(e){const row=e.target.closest?.('#'+BOX+' .gfd-us-row');if(!row)return;activateRow(row,e)}
function onClick(e){const row=e.target.closest?.('#'+BOX+' .gfd-us-row');if(!row)return;activateRow(row,e)}
function onKey(e){if(e.key!=='Enter')return;const row=document.querySelector('#'+BOX+' .gfd-us-row.active');if(row)activateRow(row,e)}
document.addEventListener('pointerdown',onPointer,true);
document.addEventListener('click',onClick,true);
document.addEventListener('keydown',onKey,true);
})();