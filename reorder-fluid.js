(()=>{
'use strict';
const FLIP_MS=190;
function addStyles(){
 if(document.getElementById('gfd-reorder-fluid-style'))return;
 const s=document.createElement('style');
 s.id='gfd-reorder-fluid-style';
 s.textContent=`
.home-shortcut-card.home-dragging{opacity:.97!important;transform:translate3d(var(--gfd-dx,0px),var(--gfd-dy,0px),0) scale(1.035)!important;box-shadow:0 16px 36px #173a5e38!important;border:2px solid #2f6690!important;z-index:40!important;transition:box-shadow .15s ease,opacity .15s ease!important;will-change:transform}
.tab.nav-dragging{transform:translate3d(var(--gfd-dx,0px),0,0) scale(1.035)!important;transition:box-shadow .15s ease,opacity .15s ease!important;will-change:transform}
.gfd-reorder-slide{transition:transform ${FLIP_MS}ms cubic-bezier(.22,.78,.22,1)!important;will-change:transform}
.home-shortcut-card.home-drop-target{outline:2px solid #93c5fd!important;outline-offset:3px;transition:outline-color .12s ease}
`;
 document.head.appendChild(s);
}
function rectMap(nodes,held){
 const m=new Map();nodes.forEach(n=>{if(n!==held)m.set(n,n.getBoundingClientRect())});return m;
}
function flip(nodes,before,held){
 nodes.forEach(n=>{
  if(n===held)return;
  const a=before.get(n),b=n.getBoundingClientRect();if(!a)return;
  const dx=a.left-b.left,dy=a.top-b.top;
  if(Math.abs(dx)<.5&&Math.abs(dy)<.5)return;
  n.classList.remove('gfd-reorder-slide');n.style.transition='none';n.style.transform=`translate3d(${dx}px,${dy}px,0)`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   n.classList.add('gfd-reorder-slide');n.style.transition='';n.style.transform='translate3d(0,0,0)';
   setTimeout(()=>{n.classList.remove('gfd-reorder-slide');n.style.transform='';n.style.transition=''},FLIP_MS+35);
  }));
 });
}
const originalDragMove=window.dragMoveAt;
window.dragMoveAt=function(kind,host,x,y){
 const el=window.dragState?.el;
 if(!el||window.dragState?.kind!==kind){if(typeof originalDragMove==='function')return originalDragMove(kind,host,x,y);return}
 const selector=kind==='nav'?'.tab[data-navkey]':'.home-shortcut-card[data-homekey]';
 const nodes=[...host.querySelectorAll(selector)];
 const r=el.getBoundingClientRect();
 el.style.setProperty('--gfd-dx',`${x-(r.left+r.width/2)}px`);
 el.style.setProperty('--gfd-dy',`${y-(r.top+r.height/2)}px`);
 if(kind==='nav'){
  let hit=document.elementFromPoint(x,y)?.closest?.(selector);
  if(hit&&hit!==el&&host.contains(hit)){
   const hr=hit.getBoundingClientRect();const before=x<hr.left+hr.width/2;const old=rectMap(nodes,el);
   host.insertBefore(el,before?hit:hit.nextSibling);flip(nodes,old,el);
  }
  const box=host.getBoundingClientRect(),edge=44;if(x<box.left+edge)host.scrollLeft-=20;else if(x>box.right-edge)host.scrollLeft+=20;
  return;
 }
 host.querySelectorAll('.home-drop-target').forEach(v=>v.classList.remove('home-drop-target'));
 const hit=document.elementFromPoint(x,y)?.closest?.(selector);
 if(hit&&hit!==el&&host.contains(hit)){
  hit.classList.add('home-drop-target');
  const cards=[...host.querySelectorAll(selector)],from=cards.indexOf(el),to=cards.indexOf(hit);
  if(from>=0&&to>=0&&hit.dataset.homekey!==window.dragState.lastHomeTarget){
   const old=rectMap(cards,el);
   host.insertBefore(el,to<from?hit:hit.nextSibling);
   flip(cards,old,el);
   window.dragState.lastHomeTarget=hit.dataset.homekey;
  }
 }
 const edge=88,step=10;if(y<edge)window.scrollBy(0,-step);else if(y>innerHeight-edge)window.scrollBy(0,step);
 window.dragState.lastX=x;window.dragState.lastY=y;
};
const originalEnd=window.endHeldItem;
window.endHeldItem=function(kind,host){
 const el=window.dragState?.el;
 if(typeof originalEnd==='function')originalEnd(kind,host);
 if(el){el.style.removeProperty('--gfd-dx');el.style.removeProperty('--gfd-dy')}
};
addStyles();
})();
