(()=>{'use strict';
const BUILD='v305';
const BUILD_DATE='2026-10-05';
function patchText(root){
 if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 let n;
 while((n=walker.nextNode())){
  const t=n.nodeValue||'';
  if(/Current\s*[·•-]?\s*v\d+/i.test(t))n.nodeValue=t.replace(/Current\s*[·•-]?\s*v\d+/ig,'Current · '+BUILD);
  if(/v111\s*[→-]\s*v\d+/i.test(t))n.nodeValue=t.replace(/v111\s*[→-]\s*v\d+/ig,'v111 → '+BUILD);
  if(/^\s*2026-10-01\s*$/.test(t)&&n.parentElement?.closest?.('.version-history-hero,.changelog-hero,.version-hero'))n.nodeValue=BUILD_DATE;
 }
}
function patchVersionHistory(){
 if(!/Version History/i.test(document.body.textContent||''))return;
 const page=[...document.querySelectorAll('h1,h2')].find(x=>/Version History/i.test(x.textContent||''))?.closest('section,main,div')||document.body;
 patchText(page);
 const all=[...document.querySelectorAll('div,span,b,strong')];
 for(const el of all){
  const tx=(el.textContent||'').trim();
  if(/^v\d+$/.test(tx)&&/Current|current/i.test(el.parentElement?.textContent||''))el.textContent=BUILD;
  if(tx==='2026-10-01'&&/LATEST RELEASE/i.test(el.parentElement?.textContent||''))el.textContent=BUILD_DATE;
  if(/^v111\s*[→-]\s*v\d+$/.test(tx))el.textContent='v111 → '+BUILD;
 }
}
function boot(){patchVersionHistory();new MutationObserver(()=>patchVersionHistory()).observe(document.body,{subtree:true,childList:true,characterData:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();