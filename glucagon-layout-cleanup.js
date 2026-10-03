(()=>{
'use strict';
const STYLE_ID='gfd-glucagon-layout-cleanup';
let sourceRecord=null;
function styles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
.gfd-glucagon-sidefx ul{margin:0;padding-left:20px}.gfd-glucagon-sidefx li{margin:5px 0;line-height:1.45}
.gfd-glucagon-sidefx{padding-top:2px}
`;(document.head||document.documentElement).appendChild(s);
}
function cleanText(v){return String(v||'').replace(/\s+/g,' ').trim()}
function titleOf(sheet){return cleanText(sheet.querySelector('.source-med-title,.source-med-header h1,.source-med-header h2,.source-med-header h3,h1,h2,h3')?.textContent).toUpperCase()}
async function source(){
 if(sourceRecord)return sourceRecord;
 try{const rows=await fetch('protocols.json',{cache:'no-store'}).then(r=>r.json());sourceRecord=rows.find(x=>String(x.id||'').toLowerCase()==='glucagon')||null}catch(e){}
 return sourceRecord;
}
function collectBetween(lines,startRe,endRe){
 const start=lines.findIndex(x=>startRe.test(cleanText(x)));if(start<0)return [];
 const out=[];
 for(let i=start+1;i<lines.length;i++){const t=cleanText(lines[i]);if(endRe.test(t))break;if(t)out.push(t.replace(/^[-•]\s*/,''))}
 return out;
}
async function polish(sheet){
 if(!sheet||sheet.dataset.glucagonClean==='1'||titleOf(sheet)!=='GLUCAGON')return;
 const rec=await source();
 const sidefx=collectBetween(rec?.lines||[],/^Side Effects:?$/i,/^(Adult Dose|Pediatric Dose|Dose|Route):?/i);
 const rows=[...sheet.querySelectorAll('.source-med-row')];
 const row=rows.find(r=>/^Side Effects:?$/i.test(cleanText(r.querySelector('.source-med-label')?.textContent||r.firstElementChild?.textContent)));
 if(!row)return;
 const value=row.querySelector('.source-med-value')||row.lastElementChild;if(!value)return;
 const items=sidefx.length?sidefx:['Nausea','Vomiting','Hypotension','Hyperglycemia'];
 value.classList.add('gfd-glucagon-sidefx');
 value.innerHTML='<ul>'+items.map(x=>'<li>'+x.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))+'</li>').join('')+'</ul>';
 sheet.dataset.glucagonClean='1';
}
function scan(root=document){root.querySelectorAll?.('.source-med-sheet').forEach(polish)}
styles();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan());else scan();
new MutationObserver(rs=>rs.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('.source-med-sheet'))polish(n);scan(n)}}))).observe(document.documentElement,{childList:true,subtree:true});
})();
