(()=>{'use strict';
const STYLE='gfdReferencePagesV241Style';let source=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const clean=s=>String(s||'').replace(/\uFFFE|\uFFFD|￾/g,'-').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').trim();
async function load(){if(source)return source;source=await fetch('protocols.json',{cache:'no-store'}).then(r=>r.json()).catch(()=>[]);return source}
function identity(root){const card=root.closest('.card'),t=(card?.querySelector('.title,h1,h2,h3')?.textContent||root.textContent||'').toLowerCase();if(t.includes('professionalism'))return'professionalism';if(t.includes('protocol authorization'))return'protocol-authorization';return''}
function join(lines){return clean(lines.join(' '))}\nfunction paragraphs(s,max=4){const parts=clean(s).match(/[^.!?]+[.!?]+(?:[”\"]|$)|[^.!?]+$/g)?.map(clean).filter(Boolean)||[clean(s)];const out=[];for(let i=0;i<parts.length;i+=max)out.push(parts.slice(i,i+max).join(' '));return out}
function professionalism(rec){
 const L=rec.lines, n=L.findIndex(x=>/^The NHTSA/i.test(x)), b=L.findIndex(x=>/^Being a professional/i.test(x)), q=L.findIndex(x=>/^“Professionalism/i.test(x));
 const intro=join(L.slice(1,q)), quote=join(L.slice(q,n)), behaviorLead=clean(L[n]), behaviors=L.slice(n+1,b).map(x=>clean(x.replace(/^[•●▪◦]\s*/,''))), closing=join(L.slice(b));
 return `<div class="gfd-ref-layout source-faithful">
 <div class="gfd-ref-card"><p>${esc(intro)}</p></div>
 <div class="gfd-ref-heading">Professionalism</div>
 <blockquote class="gfd-ref-quote">${paragraphs(quote,3).map(x=>`<p>${esc(x)}</p>`).join("")}</blockquote>
 <div class="gfd-ref-heading">Professional Behaviors</div>
 <p class="gfd-ref-lead">${esc(behaviorLead)}</p>
 <div class="gfd-ref-grid">${behaviors.map(x=>`<div class="gfd-ref-check">${esc(x)}</div>`).join('')}</div>
 <div class="gfd-ref-card closing"><p>${esc(closing)}</p></div>
 </div>`}
}
function authorization(rec){
 const L=rec.lines;const heading=L.findIndex(x=>/Medical Directors Statement/i.test(x));const approval=L.findIndex(x=>/^Approval Date/i.test(x));
 const intro=join(L.slice(1,heading)), body=join(L.slice(heading+1,approval));const dates=L.slice(approval,approval+2).map(clean);const people=L.filter(x=>/Dr\. Jared White|Mike Desautels/i.test(x)).map(clean);
 return `<div class="gfd-ref-layout source-faithful"><div class="gfd-ref-card"><p>${esc(intro)}</p></div><div class="gfd-ref-heading">${esc(clean(L[heading]))}</div><div class="gfd-ref-card"><p>${esc(body)}</p></div><div class="gfd-ref-meta">${dates.map(x=>`<div>${esc(x.replace(/\s*\/\s*/g,'/'))}</div>`).join('')}</div><div class="gfd-ref-signatures">${people.map(x=>`<div class="gfd-ref-signature"><span>On file</span><strong>${esc(x)}</strong></div>`).join('')}</div></div>`}
}
async function enhance(root){if(!root||root.dataset.ref241==='1')return;const id=identity(root);if(!id)return;root.dataset.ref241='loading';const rows=await load(),rec=rows.find(x=>x.id===id);if(!rec){root.dataset.ref241='missing';return}root.innerHTML=id==='professionalism'?professionalism(rec):authorization(rec);root.dataset.ref241='1'}
function scan(root=document){root.querySelectorAll?.('.protocol-body').forEach(enhance)}
function styles(){if(document.getElementById(STYLE))return;['gfdReferencePagesV237Style','gfdReferencePagesV239Style'].forEach(id=>document.getElementById(id)?.remove());const s=document.createElement('style');s.id=STYLE;s.textContent=`
.gfd-ref-layout{display:grid;gap:12px}.gfd-ref-card{background:#f8fafc;border:1px solid #dbe4ee;border-left:5px solid #2f6690;border-radius:12px;padding:13px 14px;font-size:15px;line-height:1.55}.gfd-ref-card p,.gfd-ref-lead{margin:0}.gfd-ref-heading{margin-top:5px;background:#eef6ff;border-left:4px solid #2f6690;border-radius:8px;padding:8px 10px;color:#173a5e;font-size:13px;font-weight:950;text-transform:uppercase;letter-spacing:.035em}.gfd-ref-quote{margin:0;padding:13px 14px;border-left:4px solid #94a3b8;background:#f8fafc;border-radius:0 10px 10px 0;font-size:15px;line-height:1.58}.gfd-ref-quote p{margin:0 0 13px}.gfd-ref-quote p:last-child{margin-bottom:0}.gfd-ref-lead{font-size:14px;line-height:1.45;color:#475569}.gfd-ref-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.gfd-ref-check{position:relative;background:#fff;border:1px solid #dbe4ee;border-radius:9px;padding:9px 10px 9px 31px;font-size:14px;line-height:1.35}.gfd-ref-check:before{content:'✓';position:absolute;left:10px;color:#166534;font-weight:950}.gfd-ref-card.closing{border-left-color:#166534}.gfd-ref-meta,.gfd-ref-signatures{display:grid;grid-template-columns:1fr 1fr;gap:8px}.gfd-ref-meta>div{background:#eef6ff;border:1px solid #bfdbfe;border-radius:9px;padding:10px;font-weight:850;color:#173a5e}.gfd-ref-signature{border:1px solid #cbd5e1;border-radius:10px;padding:12px;background:#fff}.gfd-ref-signature span{display:block;font-size:11px;text-transform:uppercase;color:#64748b;font-weight:900;margin-bottom:5px}.gfd-ref-signature strong{color:#173a5e}
body.dark-mode .gfd-ref-card,body.dark-mode .gfd-ref-quote,body.dark-mode .gfd-ref-check,body.dark-mode .gfd-ref-signature{background:#111827;color:#f1f5f9;border-color:#475569}body.dark-mode .gfd-ref-heading,body.dark-mode .gfd-ref-meta>div{background:#102a43;color:#dbeafe;border-color:#60a5fa}body.dark-mode .gfd-ref-lead,body.dark-mode .gfd-ref-signature span{color:#cbd5e1}body.dark-mode .gfd-ref-signature strong{color:#dbeafe}body.dark-mode .gfd-ref-check:before{color:#86efac}
@media(max-width:560px){.gfd-ref-grid,.gfd-ref-meta,.gfd-ref-signatures{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
function start(){styles();scan();new MutationObserver(()=>scan()).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();