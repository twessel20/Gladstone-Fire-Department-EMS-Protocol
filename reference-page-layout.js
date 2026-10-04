(()=>{'use strict';
const STYLE='gfdReferencePagesV237Style';
function text(el){return (el?.textContent||'').replace(/\s+/g,' ').trim()}
function page(root){const all=text(root).toLowerCase();if(all.includes('professionalism'))return'professionalism';if(all.includes('protocol authorization'))return'authorization';return''}
function splitSentences(s){return String(s).match(/[^.!?]+[.!?]+(?:[”"']|$)|[^.!?]+$/g)?.map(x=>x.trim()).filter(Boolean)||[s]}
function rebuildProfessionalism(root){
 const existing=[...root.querySelectorAll('.gfd-proto-heading,.gfd-proto-paragraph,.gfd-proto-list,.gfd-proto-item,.line')];if(!existing.length)return;
 const raw=existing.map(text).filter(Boolean);const joined=raw.join(' ');
 const marker='The NHTSA';const mi=joined.indexOf(marker);const before=mi>=0?joined.slice(0,mi):joined;const after=mi>=0?joined.slice(mi):'';
 const bullets=[...after.matchAll(/(?:•|\u2022)\s*([^•]+)/g)].map(m=>m[1].trim());
 const intro=before.replace(/^PROFESSIONALISM\s*/i,'').trim();
 const sentences=splitSentences(intro);
 const lead=sentences.slice(0,5).join(' '),quote=sentences.slice(5).join(' ');
 const wrap=document.createElement('div');wrap.className='gfd-ref-layout';
 wrap.innerHTML='<div class="gfd-ref-callout"><strong>Professional Standard</strong><div class="gfd-ref-lead"></div></div><div class="gfd-ref-heading">Professionalism in Practice</div><div class="gfd-ref-quote"></div>';
 wrap.querySelector('.gfd-ref-lead').textContent=lead;wrap.querySelector('.gfd-ref-quote').textContent=quote;
 if(bullets.length){const h=document.createElement('div');h.className='gfd-ref-heading';h.textContent='Professional Behaviors';wrap.appendChild(h);const grid=document.createElement('div');grid.className='gfd-ref-grid';bullets.forEach(b=>{const d=document.createElement('div');d.className='gfd-ref-check';d.textContent=b.replace(/Being a professional[\s\S]*/,'').trim();if(d.textContent)grid.appendChild(d)});wrap.appendChild(grid)}
 const closing=after.match(/Being a professional[\s\S]*/i)?.[0];if(closing){const d=document.createElement('div');d.className='gfd-ref-callout closing';d.textContent=closing;wrap.appendChild(d)}
 existing.forEach(x=>x.remove());root.appendChild(wrap)
}
function rebuildAuthorization(root){
 const existing=[...root.querySelectorAll('.gfd-proto-heading,.gfd-proto-paragraph,.gfd-proto-list,.gfd-proto-item,.line')];if(!existing.length)return;const raw=existing.map(text).filter(Boolean);
 const wrap=document.createElement('div');wrap.className='gfd-ref-layout';const intro=document.createElement('div');intro.className='gfd-ref-callout';intro.innerHTML='<strong>Authorization</strong>';const ib=document.createElement('div');ib.textContent=raw.slice(1,4).join(' ');intro.appendChild(ib);wrap.appendChild(intro);
 const approval=document.createElement('div');approval.className='gfd-ref-heading';approval.textContent='Medical Director Statement of Approval and Compliance';wrap.appendChild(approval);
 const body=document.createElement('div');body.className='gfd-ref-card';body.textContent=raw.slice(4).filter(x=>!/approval date|revision date|on file|_{3,}|dr\. jared white|mike desautels/i.test(x)).join(' ');wrap.appendChild(body);
 const dates=document.createElement('div');dates.className='gfd-ref-meta';raw.filter(x=>/approval date|revision date/i.test(x)).forEach(x=>{const d=document.createElement('div');d.textContent=x.replace(/\s+\/\s+/g,'/');dates.appendChild(d)});if(dates.children.length)wrap.appendChild(dates);
 const sign=document.createElement('div');sign.className='gfd-ref-signatures';raw.filter(x=>/dr\. jared white|mike desautels/i.test(x)).forEach(x=>{const d=document.createElement('div');d.className='gfd-ref-signature';d.innerHTML='<span>On file</span><strong></strong>';d.querySelector('strong').textContent=x;sign.appendChild(d)});if(sign.children.length)wrap.appendChild(sign);
 existing.forEach(x=>x.remove());root.appendChild(wrap)
}
function enhance(root){if(!root||root.dataset.ref237==='1')return;const p=page(root);if(!p)return;root.dataset.ref237='1';if(p==='professionalism')rebuildProfessionalism(root);else rebuildAuthorization(root)}
function scan(root=document){root.querySelectorAll?.('.protocol-body').forEach(enhance)}
function styles(){if(document.getElementById(STYLE))return;const s=document.createElement('style');s.id=STYLE;s.textContent=`
.gfd-ref-layout{display:grid;gap:12px}.gfd-ref-callout,.gfd-ref-card{background:#f8fafc;border:1px solid #dbe4ee;border-left:5px solid #2f6690;border-radius:12px;padding:13px 14px;font-size:15px;line-height:1.52}.gfd-ref-callout strong{display:block;color:#173a5e;font-size:13px;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}.gfd-ref-heading{margin-top:5px;background:#eef6ff;border-left:4px solid #2f6690;border-radius:8px;padding:8px 10px;color:#173a5e;font-size:13px;font-weight:950;text-transform:uppercase;letter-spacing:.035em}.gfd-ref-quote{padding:13px 14px;border-left:4px solid #94a3b8;background:#f8fafc;border-radius:0 10px 10px 0;font-size:15px;line-height:1.55}.gfd-ref-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.gfd-ref-check{position:relative;background:#fff;border:1px solid #dbe4ee;border-radius:9px;padding:9px 10px 9px 31px;font-size:14px;line-height:1.35}.gfd-ref-check:before{content:'✓';position:absolute;left:10px;color:#166534;font-weight:950}.gfd-ref-callout.closing{border-left-color:#166534}.gfd-ref-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px}.gfd-ref-meta>div{background:#eef6ff;border:1px solid #bfdbfe;border-radius:9px;padding:10px;font-weight:850;color:#173a5e}.gfd-ref-signatures{display:grid;grid-template-columns:1fr 1fr;gap:9px}.gfd-ref-signature{border:1px solid #cbd5e1;border-radius:10px;padding:12px;background:#fff}.gfd-ref-signature span{display:block;font-size:11px;text-transform:uppercase;color:#64748b;font-weight:900;margin-bottom:5px}.gfd-ref-signature strong{color:#173a5e}
body.dark-mode .gfd-ref-callout,body.dark-mode .gfd-ref-card,body.dark-mode .gfd-ref-quote,body.dark-mode .gfd-ref-check,body.dark-mode .gfd-ref-signature{background:#111827;color:#f1f5f9;border-color:#475569}body.dark-mode .gfd-ref-heading,body.dark-mode .gfd-ref-meta>div{background:#102a43;color:#dbeafe;border-color:#60a5fa}body.dark-mode .gfd-ref-callout strong,body.dark-mode .gfd-ref-signature strong{color:#dbeafe}body.dark-mode .gfd-ref-signature span{color:#cbd5e1}body.dark-mode .gfd-ref-check:before{color:#86efac}
@media(max-width:560px){.gfd-ref-grid,.gfd-ref-meta,.gfd-ref-signatures{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
function start(){styles();scan();new MutationObserver(()=>scan()).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();