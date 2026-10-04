(()=>{'use strict';
const STYLE='gfdProtocolReadabilityV235Style';
const HEADING=/^(indications?|contraindications?|precautions?|side effects?|treatment|assessment|procedure|notes?|medical control|adult|pediatric|special considerations?|transport|destination|documentation|broken seal procedure|purpose|definition|definitions|warning|warnings|caution|considerations?)\s*:?$/i;
const BULLET=/^[•●▪◦]\s*/;
const ENUM=/^(\d+\.|[A-Z]\.|\([a-z0-9]+\))\s+/;
function cleanText(s){return String(s||'').replace(/\uFFFE|\uFFFD|￾/g,'-').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').replace(/\b(on)[ -]?coming\b/gi,'$1-coming').replace(/\b(off)[ -]?going\b/gi,'$1-going').trim()}
function terminal(s){return /[.!?;:”")\]]$/.test(s)}
function startsNew(s){return HEADING.test(s)||BULLET.test(s)||ENUM.test(s)||/^[A-Z][A-Z0-9 /&()-]{4,}:?$/.test(s)}
function mergeLines(lines){
 const out=[];for(let i=0;i<lines.length;i++){let s=cleanText(lines[i]);if(!s)continue;
  if(!out.length||startsNew(s)||terminal(out[out.length-1])||startsNew(out[out.length-1])){out.push(s);continue}
  const prev=out[out.length-1];
  // Join PDF hard wraps only. Preserve explicit short clinical steps.
  if(prev.length>=45||/[,(:-]$/.test(prev)||/^[a-z(]/.test(s)){out[out.length-1]=cleanText(prev+' '+s)}else out.push(s)
 }return out
}
function classify(s){if(HEADING.test(s)||/^[A-Z][A-Z0-9 /&()-]{4,}:?$/.test(s))return 'head';if(BULLET.test(s)||ENUM.test(s))return 'item';return 'para'}
function enhance(root){
 if(!root||root.dataset?.readability235==='1')return;
 const lines=[...root.querySelectorAll(':scope > .line')];if(lines.length<2)return;
 const raw=lines.map(x=>x.textContent||'');const merged=mergeLines(raw);
 // Do not alter source content if structure cannot be reconstructed confidently.
 if(!merged.length||merged.join(' ').length<raw.join(' ').replace(/\s+/g,' ').trim().length*.88)return;
 const frag=document.createDocumentFragment();let list=null;
 for(const text of merged){const kind=classify(text);
  if(kind==='head'){list=null;const h=document.createElement('div');h.className='gfd-proto-heading';h.textContent=text.replace(/:$/,'');frag.appendChild(h);continue}
  if(kind==='item'){if(!list){list=document.createElement('div');list.className='gfd-proto-list';frag.appendChild(list)}const d=document.createElement('div');d.className='gfd-proto-item';d.textContent=text.replace(BULLET,'');list.appendChild(d);continue}
  list=null;const p=document.createElement('p');p.className='gfd-proto-paragraph';p.textContent=text;frag.appendChild(p)
 }
 lines.forEach(x=>x.remove());root.appendChild(frag);root.dataset.readability235='1'
}
function scan(root=document){root.querySelectorAll?.('.protocol-body').forEach(enhance)}
function styles(){if(document.getElementById(STYLE))return;const s=document.createElement('style');s.id=STYLE;s.textContent=`
.gfd-proto-heading{margin:18px 0 8px;padding:8px 10px;border-left:4px solid #2f6690;background:#eef6ff;border-radius:8px;color:#173a5e;font-size:13px;font-weight:950;letter-spacing:.035em;text-transform:uppercase}
.gfd-proto-paragraph{margin:9px 0;font-size:16px;line-height:1.52;max-width:72ch}
.gfd-proto-list{display:grid;gap:7px;margin:8px 0 12px}.gfd-proto-item{position:relative;padding-left:22px;font-size:16px;line-height:1.48}.gfd-proto-item:before{content:'•';position:absolute;left:5px;color:#2f6690;font-weight:950}
body.dark-mode .gfd-proto-heading{background:#102a43;color:#dbeafe;border-color:#60a5fa}body.dark-mode .gfd-proto-paragraph,body.dark-mode .gfd-proto-item{color:#f1f5f9}
@media(max-width:520px){.gfd-proto-paragraph{line-height:1.48}.gfd-proto-heading{margin-top:15px}}
`;document.head.appendChild(s)}
function start(){styles();scan();new MutationObserver(rs=>rs.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('.protocol-body'))enhance(n);scan(n)}}))).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();