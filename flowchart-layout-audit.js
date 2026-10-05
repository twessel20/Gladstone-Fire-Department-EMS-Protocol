(()=>{'use strict';
const ID='gfdFlowchartLayoutV278';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v278 global flowchart alignment audit */
.flowchart,
.workflow-sheet,
.gfd-consistent-flow{
  width:100%;
  max-width:100%;
  margin-left:auto;
  margin-right:auto;
  box-sizing:border-box;
}

/* All primary flow elements share the same horizontal track. */
.flowchart>.flow-node,
.flowchart>.flow-decision,
.flowchart>.flow-warning,
.flowchart>.workflow-node,
.workflow-sheet>.workflow-node,
.workflow-sheet>.flow-node,
.workflow-sheet>.flow-decision,
.workflow-sheet>.flow-warning{
  width:100%;
  max-width:100%;
  min-width:0;
  margin-left:auto;
  margin-right:auto;
  box-sizing:border-box;
}

/* Decision containers were previously capped at 430px, which compressed 3-way branches. */
.flow-decision{
  max-width:none!important;
  width:100%!important;
  text-align:center;
}
.flow-decision>.flow-branches{
  width:100%;
  min-width:0;
  margin-left:auto;
  margin-right:auto;
  align-items:stretch;
}
.flow-branches{
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:10px;
}
.flow-branches.three{
  grid-template-columns:repeat(3,minmax(0,1fr));
}
.flow-branch{
  min-width:0;
  width:100%;
  height:100%;
  box-sizing:border-box;
  text-align:left;
  overflow-wrap:anywhere;
}
.flow-branch b{
  text-align:center;
  line-height:1.25;
  margin-bottom:6px;
}

/* Keep arrows exactly centered between full-width nodes. */
.flow-arrow,
.gfd-flow-arrow{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  margin:0 auto;
  padding:5px 0;
  box-sizing:border-box;
  clear:both;
}

/* Consistent internal text alignment. */
.flow-node,
.workflow-node,
.flow-warning{
  text-align:left;
}
.flow-node h4,
.workflow-node h4,
.flow-warning h4{
  text-align:left;
}
.flow-node p:last-child,
.workflow-node p:last-child,
.flow-warning p:last-child,
.flow-node ul:last-child,
.workflow-node ul:last-child{
  margin-bottom:0;
}

/* Protocol jump controls should not distort branch width. */
.flow-branch .protocol-jump,
.flow-branch .protocol-jump-wrap{
  width:100%;
  max-width:100%;
  box-sizing:border-box;
}

/* Desktop/tablet: readable centered column, equal branch geometry. */
@media(min-width:700px){
 .flowchart,
 .workflow-sheet{
   max-width:900px;
 }
 .flowchart>.flow-node,
 .flowchart>.flow-warning,
 .flowchart>.flow-decision,
 .workflow-sheet>.workflow-node,
 .workflow-sheet>.flow-node,
 .workflow-sheet>.flow-warning,
 .workflow-sheet>.flow-decision{
   max-width:900px;
 }
 .flow-branch{
   padding:11px 12px;
 }
}

/* Mobile: branch decisions become a clean single vertical path. */
@media(max-width:699px){
 .flowchart,
 .workflow-sheet,
 .gfd-consistent-flow{
   width:100%;
   max-width:100%;
   overflow:visible;
 }
 .flowchart>.flow-node,
 .flowchart>.flow-warning,
 .flowchart>.flow-decision,
 .workflow-sheet>.workflow-node,
 .workflow-sheet>.flow-node,
 .workflow-sheet>.flow-warning,
 .workflow-sheet>.flow-decision{
   width:100%;
   max-width:100%;
 }
 .flow-branches,
 .flow-branches.three{
   grid-template-columns:minmax(0,1fr)!important;
   gap:8px;
 }
 .flow-decision{
   padding:11px 10px;
 }
 .flow-branch{
   padding:10px 11px;
 }
 .flow-arrow,
 .gfd-flow-arrow{
   padding:4px 0;
 }
}

/* Very narrow devices: avoid accidental side overflow from long clinical strings. */
@media(max-width:420px){
 .flow-node,
 .workflow-node,
 .flow-warning,
 .flow-decision,
 .flow-branch{
   overflow-wrap:anywhere;
   word-break:normal;
 }
}
`;
 document.head.appendChild(s);
}
function mark(){
 document.querySelectorAll('.flowchart,.workflow-sheet').forEach(f=>f.classList.add('gfd-flow-layout-278'));
}
function boot(){install();mark();new MutationObserver(rs=>{for(const r of rs)for(const n of r.addedNodes)if(n.nodeType===1){if(n.matches?.('.flowchart,.workflow-sheet'))n.classList.add('gfd-flow-layout-278');n.querySelectorAll?.('.flowchart,.workflow-sheet').forEach(f=>f.classList.add('gfd-flow-layout-278'));}}).observe(document.body,{subtree:true,childList:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();