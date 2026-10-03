(()=>{
'use strict';
const KEY='gfdAdultAgeContextV1';
const STYLE_ID='gfd-adult-age-styles';
let state=load();
let bound=false;
let timer=null;

function load(){
 try{return {...{dob:'',ageYears:''},...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return {dob:'',ageYears:''}}
}
function save(){
 localStorage.setItem(KEY,JSON.stringify(state));
 syncPatientContext();
 renderStatus();
 scheduleClinical();
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function ageFromDob(v){
 if(!v)return null;
 const d=new Date(v+'T12:00:00');if(Number.isNaN(d.getTime()))return null;
 const t=new Date();let a=t.getFullYear()-d.getFullYear();
 const m=t.getMonth()-d.getMonth();if(m<0||(m===0&&t.getDate()<d.getDate()))a--;
 return a>=0&&a<130?a:null;
}
function age(){
 const fromDob=ageFromDob(state.dob);if(fromDob!=null)return fromDob;
 if(state.ageYears===''||state.ageYears==null)return null;
 const n=Number(state.ageYears);return Number.isFinite(n)&&n>=0&&n<130?Math.floor(n):null;
}
function adultMode(){return window.GFDPatientContext?.get?.().mode!=='pediatric'}
function syncPatientContext(){
 const api=window.GFDPatientContext;if(!api||!adultMode())return;
 const a=age();
 const c=api.get();
 if(c.mode!=='adult'||String(c.age||'')!==String(a??''))api.set({mode:'adult',age:a==null?'':String(a),ageUnit:'years'});
}
function injectStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
.gfd-adult-age-status{display:none;margin-top:7px;border:1px solid #bfdbfe;background:#eff6ff;color:#173a5e;border-radius:10px;padding:8px 10px;font-size:12px;font-weight:850;line-height:1.3;cursor:pointer}.gfd-adult-age-status.on{display:block}.gfd-adult-age-chip{display:inline-block;background:#2f6690;color:white;border-radius:999px;padding:3px 7px;margin-right:6px;font-size:10px;letter-spacing:.04em}
.gfd-age-modal-backdrop{position:fixed;inset:0;z-index:9999;background:#0f172acc;display:flex;align-items:flex-end;justify-content:center}.gfd-age-modal{width:min(720px,100%);max-height:90vh;overflow:auto;background:#f8fafc;border-radius:18px 18px 0 0;padding:16px 16px calc(18px + env(safe-area-inset-bottom))}.gfd-age-modal h2{margin:0;color:#173a5e}.gfd-age-modal p{color:#475569;line-height:1.4}.gfd-age-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.gfd-age-field{margin-top:10px}.gfd-age-field label{display:block;font-size:12px;font-weight:900;color:#334155;margin-bottom:5px}.gfd-age-field input{width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:11px;font-size:16px;background:#fff}.gfd-age-result{margin-top:12px;border:1px solid #bfdbfe;background:#eff6ff;color:#173a5e;border-radius:10px;padding:10px 11px;font-weight:850}.gfd-age-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:15px}.gfd-age-actions button{border:0;border-radius:10px;padding:12px;font-weight:900}.gfd-age-save{background:#173a5e;color:white}.gfd-age-clear{background:#e2e8f0;color:#0f172a}
.gfd-age-rule{margin:10px 0 12px;border:1px solid #bfdbfe;border-left:5px solid #2f6690;background:#eff6ff;color:#173a5e;border-radius:10px;padding:10px 11px;line-height:1.4}.gfd-age-rule b{display:block;margin-bottom:3px}.gfd-age-rule.warn{background:#fff7ed;border-color:#fdba74;border-left-color:#d97706;color:#7c2d12}.gfd-age-rule.danger{background:#fff1f2;border-color:#fecaca;border-left-color:#dc2626;color:#991b1b}
body.dark-mode .gfd-adult-age-status,body.dark-mode .gfd-age-rule{background:#13263b!important;border-color:#4f83b6!important;color:#dbeafe!important}body.dark-mode .gfd-age-rule.warn{background:#33260f!important;border-color:#a86a12!important;color:#fff3c4!important}body.dark-mode .gfd-age-rule.danger{background:#35181d!important;border-color:#9d4653!important;color:#ffe4e6!important}
@media(min-width:700px){.gfd-age-modal-backdrop{align-items:center;padding:20px}.gfd-age-modal{border-radius:18px}}
@media(max-width:520px){.gfd-age-grid{grid-template-columns:1fr}}
`;(document.head||document.documentElement).appendChild(s);
}
function ensureStatus(){
 let el=document.getElementById('gfdAdultAgeStatus');if(el)return el;
 const root=document.getElementById('gfdPatientMode')||document.querySelector('.top');if(!root)return null;
 el=document.createElement('div');el.id='gfdAdultAgeStatus';el.className='gfd-adult-age-status';el.setAttribute('role','button');el.tabIndex=0;el.onclick=openEditor;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openEditor()};root.appendChild(el);return el;
}
function renderStatus(){
 const el=ensureStatus();if(!el)return;
 const a=age();
 if(!adultMode()){el.classList.remove('on');el.textContent='';return}
 el.classList.add('on');el.innerHTML=`<span class="gfd-adult-age-chip">ADULT</span>${a==null?'Age not set':`Age ${a}`} <span style="float:right">Edit</span>`;
}
function openEditor(){
 const existing=document.getElementById('gfdAdultAgeModal');if(existing)existing.remove();
 let temp={...state};
 const back=document.createElement('div');back.id='gfdAdultAgeModal';back.className='gfd-age-modal-backdrop';
 back.innerHTML=`<div class="gfd-age-modal" role="dialog" aria-modal="true"><h2>Adult Age Calculator</h2><p>Enter date of birth for an exact age calculation, or enter age directly when DOB is unavailable. The age follows the patient throughout the app and activates Gladstone age-specific cautions and dose rules.</p><div class="gfd-age-grid"><div class="gfd-age-field"><label>Date of birth</label><input id="gfdAdultDob" type="date" value="${esc(temp.dob)}"></div><div class="gfd-age-field"><label>Age in years</label><input id="gfdAdultAgeYears" type="number" inputmode="numeric" min="0" max="129" step="1" value="${esc(temp.ageYears)}" placeholder="Example: 72"></div></div><div class="gfd-age-result" id="gfdAdultAgeResult">${(()=>{const a=temp.dob?ageFromDob(temp.dob):(temp.ageYears===''?null:Number(temp.ageYears));return Number.isFinite(a)&&a>=0?`Calculated age: ${Math.floor(a)} years`:'Age not yet entered'})()}</div><div class="gfd-age-actions"><button class="gfd-age-clear" id="gfdAgeClear">Clear age</button><button class="gfd-age-save" id="gfdAgeSave">Use Adult Age</button></div></div>`;
 document.body.appendChild(back);
 const dob=back.querySelector('#gfdAdultDob'),yrs=back.querySelector('#gfdAdultAgeYears'),out=back.querySelector('#gfdAdultAgeResult');
 const refresh=()=>{const a=dob.value?ageFromDob(dob.value):(yrs.value===''?null:Number(yrs.value));out.textContent=Number.isFinite(a)&&a>=0?`Calculated age: ${Math.floor(a)} years`:'Age not yet entered'};
 dob.addEventListener('input',()=>{temp.dob=dob.value;if(dob.value){const a=ageFromDob(dob.value);temp.ageYears=a==null?'':String(a);yrs.value=temp.ageYears}refresh()});
 yrs.addEventListener('input',()=>{temp.ageYears=yrs.value;if(yrs.value)temp.dob='';refresh()});
 back.querySelector('#gfdAgeClear').onclick=()=>{state={dob:'',ageYears:''};save();back.remove()};
 back.querySelector('#gfdAgeSave').onclick=()=>{state=temp;save();back.remove()};
 back.addEventListener('click',e=>{if(e.target===back)back.remove()});
}
function ruleForView(){
 if(!adultMode())return null;const a=age();if(a==null)return null;
 const detail=document.querySelector('#detail.on,.detail.on');if(!detail||detail.offsetParent===null)return null;
 const title=(detail.querySelector('h2')?.textContent||'').toLowerCase();const text=(detail.textContent||'').toLowerCase();
 if((title.includes('diltiazem')||title.includes('cardizem')||text.includes('diltiazem'))&&a>70){
   return {className:'danger',html:`<b>AGE-SPECIFIC GFD DOSE RULE • Age ${a}</b>Gladstone protocol: for patients over age 70, decrease the diltiazem dose by 5 mg. Apply this reduction to the protocol dose shown on this screen.`};
 }
 if((title.includes('allergic')||title.includes('anaphyl')||text.includes('anaphyl'))&&a>40){
   return {className:'warn',html:`<b>AGE-SPECIFIC GFD CAUTION • Age ${a}</b>If this patient has a history of CAD, Gladstone protocol requires Medical Control orders for epinephrine in the anaphylaxis pathway.`};
 }
 if((title.includes('general trauma')||text.includes('general trauma protocol'))&&a>65){
   return {className:'warn',html:`<b>OLDER-ADULT TRAUMA CAUTION • Age ${a}</b>Gladstone protocol advises increased suspicion for occult fracture in patients over 65, even with lower-energy mechanisms.`};
 }
 return null;
}
function renderClinical(){
 const old=document.querySelector('.gfd-age-rule');const rule=ruleForView();if(!rule){old?.remove();return}
 const detail=document.querySelector('#detail.on,.detail.on');if(!detail)return;const target=detail.querySelector('.protocol-body,.source-med-sheet,.card')||detail;
 if(old){old.className='gfd-age-rule '+rule.className;old.innerHTML=rule.html;return}
 const el=document.createElement('div');el.className='gfd-age-rule '+rule.className;el.innerHTML=rule.html;
 const ped=target.querySelector('.gfd-ped-context-card,.gfd-ped-workflow');if(ped)ped.after(el);else target.insertBefore(el,target.firstChild);
}
function scheduleClinical(){clearTimeout(timer);timer=setTimeout(renderClinical,100)}
function bindAdultButton(){
 if(bound)return;const btn=document.getElementById('adultModeBtn');if(!btn)return;bound=true;
 btn.addEventListener('click',()=>setTimeout(()=>{syncPatientContext();renderStatus();openEditor()},0));
}
function start(){
 injectStyles();bindAdultButton();renderStatus();syncPatientContext();scheduleClinical();
 document.addEventListener('gfd:patient-context',()=>{renderStatus();scheduleClinical()});
 const detail=document.getElementById('detail');if(detail)new MutationObserver(scheduleClinical).observe(detail,{attributes:true,attributeFilter:['class'],childList:true,subtree:false});
 window.addEventListener('hashchange',scheduleClinical);
}
window.GFDAdultAge={get:()=>({age:age(),dob:state.dob,ageYears:state.ageYears}),open:openEditor};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
