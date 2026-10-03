(()=>{
'use strict';
const STYLE_ID='gfd-dosage-layout-cleanup';
let timer=null;
function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
.gfd-dose-language-card{margin:10px 12px 12px;border:1px solid #bfdbfe;border-left:5px solid #2563eb;border-radius:12px;background:#f8fbff;overflow:hidden;box-shadow:0 1px 3px rgba(23,58,94,.05)}
.gfd-dose-language-head{padding:9px 11px;background:#eff6ff;color:#1e3a8a;font-size:12px;font-weight:950;letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid #dbeafe}
.gfd-dose-language-row{display:grid;grid-template-columns:minmax(110px,.8fr) minmax(0,1.4fr);gap:10px;align-items:start;padding:10px 11px;border-top:1px solid #e5edf7;line-height:1.4}
.gfd-dose-language-row:first-of-type{border-top:0}
.gfd-dose-language-label{font-size:12px;font-weight:900;color:#475569}
.gfd-dose-language-value{font-size:16px;font-weight:850;color:#173a5e;overflow-wrap:anywhere}
.gfd-source-reference{margin:8px 12px;padding:8px 10px;border-radius:9px;background:#f8fafc;border:1px dashed #cbd5e1;color:#64748b;font-size:11px;line-height:1.35;overflow-wrap:anywhere}
.gfd-source-reference b{color:#475569}
@media(max-width:560px){.gfd-dose-language-row{grid-template-columns:1fr;gap:3px}.gfd-dose-language-value{font-size:17px}}
body.dark-mode .gfd-dose-language-card{background:#111827;border-color:#475569}body.dark-mode .gfd-dose-language-head{background:#17263a;color:#dbeafe;border-color:#475569}body.dark-mode .gfd-dose-language-row{border-color:#334155}body.dark-mode .gfd-dose-language-label{color:#94a3b8}body.dark-mode .gfd-dose-language-value{color:#eef4fb}body.dark-mode .gfd-source-reference{background:#111827;border-color:#475569;color:#94a3b8}
`;(document.head||document.documentElement).appendChild(s);
}
function clean(s){return String(s||'').replace(/\s+/g,' ').trim()}
function doseParts(text){
 const t=clean(text);
 const rules=[
  [/^Adults?:\s*/i,'Adult'],[/^Pediatrics?:\s*/i,'Pediatric'],[/^Peds?:\s*/i,'Pediatric'],[/^Child(?:ren)?:\s*/i,'Child'],[/^Infants?:\s*/i,'Infant'],
  [/^Greater than 8 years of age:\s*/i,'> 8 years'],[/^(?:Less|Younger) than 8 years of age:\s*/i,'< 8 years'],[/^Older than ([\d.]+) years(?: of age)?:\s*/i,m=>`> ${m[1]} years`],[/^Less than ([\d.]+) years(?: of age)?:\s*/i,m=>`< ${m[1]} years`]
 ];
 for(const [re,label] of rules){const m=t.match(re);if(m){const l=typeof label==='function'?label(m):label;return {label:l,value:t.replace(re,'')}}}
 return null;
}
function makeCard(rows,title='Dosing'){const card=document.createElement('div');card.className='gfd-dose-language-card';card.innerHTML=`<div class="gfd-dose-language-head">${title}</div>`+rows.map(r=>`<div class="gfd-dose-language-row"><div class="gfd-dose-language-label">${r.label}</div><div class="gfd-dose-language-value">${r.value}</div></div>`).join('');return card}
function exactD10(body){
 if(body.querySelector('.gfd-d10-dose-card'))return;
 const lines=[...body.querySelectorAll('.line')];
 const adult=lines.find(x=>/^Adults?:\s*Give Dextrose\s*-?\s*D10 250\s*m[lL]\s*\(25g\) IV/i.test(clean(x.textContent)));
 const older=lines.find(x=>/^Greater than 8 years of age:\s*2\s*mL\/kg D10 IV/i.test(clean(x.textContent)));
 const younger=lines.find(x=>/^(?:Less|Younger) than 8 years of age:\s*1\s*mL\/kg D10 IV/i.test(clean(x.textContent)));
 if(!adult||!older||!younger)return;
 const card=makeCard([
  {label:'Adult',value:'D10 250 mL (25 g) IV'},
  {label:'> 8 years',value:'D10 2 mL/kg IV'},
  {label:'< 8 years',value:'D10 1 mL/kg IV'}
 ],'Dextrose dosing');card.classList.add('gfd-d10-dose-card');
 adult.parentNode.insertBefore(card,adult);
 [adult,older,younger].forEach(x=>x.remove());
}
function groupAgeDoseLines(card){
 if(card.dataset.doseGrouped==='1')return;
 const children=[...card.children];let i=0;
 while(i<children.length){
  const first=children[i];if(!first.classList?.contains('line')){i++;continue}
  const rows=[];const nodes=[];let j=i;
  while(j<children.length&&children[j].classList?.contains('line')){
    const p=doseParts(children[j].textContent);if(!p)break;rows.push(p);nodes.push(children[j]);j++;
  }
  if(rows.length>=2){const d=makeCard(rows);first.parentNode.insertBefore(d,first);nodes.forEach(n=>n.remove());i=j}else i++;
 }
 card.dataset.doseGrouped='1';
}
function collapseReferences(body){
 if(body.dataset.refsCleaned==='1')return;
 const lines=[...body.querySelectorAll('.line')];
 for(let i=0;i<lines.length;i++){
  const t=clean(lines[i].textContent);
  if(!/^https?:\/\//i.test(t))continue;
  const nodes=[lines[i]];const parts=[t];let n=lines[i].nextElementSibling;
  while(n&&n.classList.contains('line')&&(/^\//.test(clean(n.textContent))||/relation|reference|source/i.test(clean(n.textContent)))){parts.push(clean(n.textContent));nodes.push(n);n=n.nextElementSibling}
  const ref=document.createElement('div');ref.className='gfd-source-reference';ref.innerHTML='<b>Source reference:</b> '+parts.join(' ');nodes[0].parentNode.insertBefore(ref,nodes[0]);nodes.forEach(x=>x.remove());
 }
 body.dataset.refsCleaned='1';
}
function polish(){
 injectStyles();const body=document.querySelector('#detail.on .protocol-body');if(!body)return;
 exactD10(body);collapseReferences(body);body.querySelectorAll('.gfd-protocol-section-card').forEach(groupAgeDoseLines);
}
function schedule(){clearTimeout(timer);timer=setTimeout(polish,90)}
function start(){injectStyles();schedule();new MutationObserver(m=>{if(m.some(x=>x.type==='childList'||x.type==='attributes'))schedule()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});window.addEventListener('hashchange',schedule)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
