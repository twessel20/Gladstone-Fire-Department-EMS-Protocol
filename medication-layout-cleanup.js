(()=>{
'use strict';
let sourceRecord=null;

function styles(){
 if(document.getElementById('med-layout-cleanup-style'))return;
 const s=document.createElement('style');
 s.id='med-layout-cleanup-style';
 s.textContent=`
 .med-clean-view{display:grid;gap:12px;margin:4px 0 10px}
 .med-clean-section{border:1px solid #dbe4ee;border-radius:12px;background:#fff;overflow:hidden}
 .med-clean-title{padding:9px 12px;background:#eef4f8;color:#173a5e;font-size:12px;font-weight:950;letter-spacing:.055em;text-transform:uppercase;border-bottom:1px solid #dbe4ee}
 .med-clean-body{padding:11px 13px;color:#26384a;font-size:15px;line-height:1.48}
 .med-clean-body ul{margin:0;padding-left:20px}.med-clean-body li{margin:5px 0}
 .med-clean-dose{display:grid;gap:8px}.med-clean-dose div{border:1px solid #dbe4ee;border-radius:10px;padding:10px 11px;background:#f8fafc}
 .med-clean-route{display:flex;gap:8px;flex-wrap:wrap}.med-clean-route span{background:#173a5e;color:#fff;border-radius:999px;padding:5px 9px;font-size:12px;font-weight:900}
 .source-med-sheet[data-clean-med='1'] .source-med-row{display:none!important}
 body.dark-mode .med-clean-section{background:#111827;border-color:#475569}
 body.dark-mode .med-clean-title{background:#172033;border-color:#475569;color:#dbeafe}
 body.dark-mode .med-clean-body{color:#eef4fb}
 body.dark-mode .med-clean-dose div{background:#172033;border-color:#475569;color:#eef4fb}
 `;
 document.head.appendChild(s);
}

function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function list(items){return `<ul>${items.filter(Boolean).map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`}
function section(title,body,cls=''){return `<section class="med-clean-section"><div class="med-clean-title">${esc(title)}</div><div class="med-clean-body ${cls}">${body}</div></section>`}

async function loadSource(){
 if(sourceRecord)return sourceRecord;
 try{
  const rows=await fetch('protocols.json',{cache:'no-store'}).then(r=>r.json());
  sourceRecord=rows.find(x=>String(x.id||'').toLowerCase()==='fentanyl')||null;
 }catch(e){}
 return sourceRecord;
}

async function clean(sheet){
 if(!sheet||sheet.dataset.cleanMed==='1')return;
 const title=(sheet.querySelector('.source-med-title,.source-med-header h1,.source-med-header h2,.source-med-header h3,h1,h2,h3')?.textContent||'').trim().toUpperCase();
 if(title!=='FENTANYL')return;
 const rec=await loadSource();
 const a=rec?.lines||[];
 if(a.length<22)return;
 const first=sheet.querySelector('.source-med-row');
 if(!first)return;

 const view=document.createElement('div');
 view.className='med-clean-view';
 view.innerHTML=
  section('Indications',list(a.slice(2,6)))+
  section('Contraindications',esc(String(a[6]||'').replace(/^Contraindications:\s*/i,'')))+
  section('Precautions',list(a.slice(12,14)))+
  section('Side Effects',list(a.slice(14,18)))+
  section('Adult Dose',a.slice(18,21).filter(Boolean).map(v=>`<div>${esc(v)}</div>`).join(''),'med-clean-dose')+
  section('Pediatric Dose',esc(a[21]||''))+
  section('Routes',String(a[22]||'').split(',').map(v=>`<span>${esc(v.trim())}</span>`).join(''),'med-clean-route');
 first.parentNode.insertBefore(view,first);
 sheet.dataset.cleanMed='1';
}

function scan(root=document){root.querySelectorAll?.('.source-med-sheet').forEach(clean)}
styles();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan());else scan();
new MutationObserver(rs=>rs.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('.source-med-sheet'))clean(n);scan(n)}}))).observe(document.documentElement,{childList:true,subtree:true});
})();
