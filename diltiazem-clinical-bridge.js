(()=>{'use strict';
const REG=()=>window.GFD_CLINICAL_REGISTRY?.medications?.diltiazem||null;
const num=(v)=>{const n=Number(v);return Number.isFinite(n)?n:null};
const ageFromDob=(s)=>{if(!s)return null;const d=new Date(s+'T00:00:00');if(Number.isNaN(d.getTime()))return null;const n=new Date();let y=n.getFullYear()-d.getFullYear();const m=n.getMonth()-d.getMonth();if(m<0||(m===0&&n.getDate()<d.getDate()))y--;return y>=0?y:null};
const fmt=(n)=>n.toFixed(n<10?2:1).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1');
function solve(weight,unit,age){
 const d=REG();if(!d)return null;
 const kg=unit==='lb'?weight/2.2046226218:weight;
 const older=age>d.rules.ageAdjustment.appliesWhenAgeYearsGreaterThan;
 const adjust=older?-d.rules.ageAdjustment.subtractMgPerDose:0;
 const dose=(rule)=>Math.max(0,Math.min(kg*rule.perKgMg,rule.maxMg)+adjust);
 const concentration=d.formulary.concentrationMgPerMl;
 const build=(rule)=>{const mg=dose(rule),ml=mg/concentration,min=rule.administrationMinutes;return {mg,ml,minutes:min,mlPerMin:ml/min,rule}};
 return {kg,older,initial:build(d.rules.initialDose),second:build(d.rules.secondDose),d};
}
function doseBlock(label,x,older){
 const r=x.rule;
 return '<div class="dilt-reg-dose"><div class="dose-note"><b>'+label+'</b> — '+r.perKgMg+' mg/kg • max '+r.maxMg+' mg'+(older?' • age adjustment −5 mg':'')+'</div><strong>'+fmt(x.mg)+' mg</strong><div class="dilt-reg-grid"><span><b>'+fmt(x.ml)+' mL</b><small>volume at 1 mg/mL</small></span><span><b>'+fmt(x.mlPerMin)+' mL/min</b><small>over '+x.minutes+' minutes</small></span></div></div>';
}
function resultHtml(s,age,ageSource){
 const p=s.d.formulary.preparation;
 return '<div class="dilt-reg-summary"><div><b>AGE:</b> '+age+' years <span class="dose-note">('+ageSource+')</span>'+(s.older?' • <b>GFD AGE ADJUSTMENT APPLIED: −5 mg</b>':'')+'</div><div style="margin-top:6px"><b>WEIGHT:</b> '+s.kg.toFixed(1)+' kg</div><div class="dilt-reg-prep"><b>FORMULARY:</b> '+p.drugMg+' mg in '+p.bagVolumeMl+' mL = <b>'+s.d.formulary.concentrationMgPerMl+' mg/mL</b></div>'+doseBlock('INITIAL',s.initial,s.older)+doseBlock('IF NO RESPONSE AFTER '+s.d.rules.secondDose.minimumDelayMinutes+' MIN',s.second,s.older)+'</div>';
}
function getAge(dobId,ageId){const dob=document.getElementById(dobId)?.value||'';const fromDob=ageFromDob(dob);if(fromDob!==null)return {age:fromDob,source:'DOB'};const a=num(document.getElementById(ageId)?.value);return a!==null&&a>=0?{age:a,source:'entered age'}:null;}
function standalone(){
 const out=document.getElementById('toolDiltResult');if(!out)return;
 const w=num(document.getElementById('toolDiltWeight')?.value),unit=document.getElementById('toolDiltUnit')?.value||'kg',a=getAge('toolDiltDob','toolDiltAge');
 out.style.display='block';
 if(w===null||w<=0){out.innerHTML='<b>Enter a valid patient weight.</b>';return}
 if(!a){out.innerHTML='<b>Enter patient DOB or age.</b>';return}
 const d=REG();if(a.age<d.rules.contraindicationAgeYearsUnder){out.innerHTML='<div class="dose-alert-stop"><strong>CONTRAINDICATED — PATIENT UNDER AGE '+d.rules.contraindicationAgeYearsUnder+'</strong></div>';return}
 out.innerHTML=resultHtml(solve(w,unit,a.age),a.age,a.source);
}
function embedded(pid,key){
 const id='dc-'+pid+'-'+key,out=document.getElementById(id+'-o');if(!out)return false;
 const w=num(document.getElementById(id+'-w')?.value),unit=document.getElementById(id+'-u')?.value||'kg',a=getAge(id+'-dob',id+'-age');
 if(w===null||w<=0){out.innerHTML='<b>Enter a valid patient weight.</b>';return true}
 if(!a){out.innerHTML='<b>Enter patient DOB or age.</b>';return true}
 const d=REG();if(a.age<d.rules.contraindicationAgeYearsUnder){out.innerHTML='<div class="dose-alert-stop"><strong>CONTRAINDICATED — PATIENT UNDER AGE '+d.rules.contraindicationAgeYearsUnder+'</strong></div>';return true}
 out.innerHTML=resultHtml(solve(w,unit,a.age),a.age,a.source);return true;
}
function syncStatic(){
 const d=REG();if(!d)return;
 document.querySelectorAll('.flow-node.med').forEach(node=>{const h=node.querySelector('h4');if(!h||h.textContent.trim()!=='Diltiazem Criteria / Dose')return;const ps=node.querySelectorAll('p');if(ps.length<2)return;const a=d.rules.initialDose,b=d.rules.secondDose,p=d.formulary.preparation;ps[1].textContent='Over age '+d.rules.ageAdjustment.appliesWhenAgeYearsGreaterThan+': decrease each dose by '+d.rules.ageAdjustment.subtractMgPerDose+' mg. Initial '+a.perKgMg+' mg/kg, max '+a.maxMg+' mg '+a.administration+' over '+a.administrationMinutes+' min. If no response after '+b.minimumDelayMinutes+' min, consider '+b.perKgMg+' mg/kg, max '+b.maxMg+' mg '+b.administration+' over '+b.administrationMinutes+' min. GFD formulary: '+p.drugMg+' mg in '+p.bagVolumeMl+' mL ('+d.formulary.concentrationMgPerMl+' mg/mL).';});
 document.querySelectorAll('.source-med-sheet').forEach(sheet=>{const title=sheet.querySelector('.source-med-title,.source-med-header .source-med-title');if(!title||!/diltiazem|cardizem/i.test(title.textContent))return;if(sheet.querySelector('.dilt-registry-source'))return;const p=d.formulary.preparation,box=document.createElement('div');box.className='source-med-row dilt-registry-source';box.innerHTML='<div class="source-med-label">GFD Formulary</div><div class="source-med-value"><div><b>'+p.drugMg+' mg in '+p.bagVolumeMl+' mL = '+d.formulary.concentrationMgPerMl+' mg/mL</b></div><div>Calculator dose, volume, and administration rate are generated from the GFD Clinical Registry.</div></div>';sheet.appendChild(box);});
}
function styles(){if(document.getElementById('dilt-registry-style'))return;const s=document.createElement('style');s.id='dilt-registry-style';s.textContent='.dilt-reg-prep{margin-top:10px;padding:9px 10px;border-radius:9px;background:#eef6ff;border:1px solid #bfdbfe}.dilt-reg-dose{margin-top:12px;padding-top:10px;border-top:1px solid #dbe4ee}.dilt-reg-dose>strong{display:block;font-size:22px;color:#173a5e;margin-top:3px}.dilt-reg-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:7px}.dilt-reg-grid span{display:block;padding:8px 9px;border:1px solid #dbe4ee;border-radius:9px;background:#f8fafc}.dilt-reg-grid b,.dilt-reg-grid small{display:block}.dilt-reg-grid small{margin-top:2px;color:#64748b}@media(max-width:520px){.dilt-reg-grid{grid-template-columns:1fr}}body.dark-mode .dilt-reg-prep,body.dark-mode .dilt-reg-grid span{background:#172033!important;border-color:#475569!important;color:#e2e8f0!important}body.dark-mode .dilt-reg-dose>strong{color:#bfdbfe!important}body.dark-mode .dilt-reg-grid small{color:#aebbd0!important}';document.head.appendChild(s)}
function boot(){styles();window.calcToolDiltiazem=standalone;const original=window.calcProtocolDose;if(typeof original==='function')window.calcProtocolDose=function(pid,key){if(key==='dilt'&&(pid==='narrow-complex-tachydysrhythmias'||pid==='diltiazem-hcl-cardizem')){if(embedded(pid,key))return}return original.apply(this,arguments)};syncStatic();let q=false;new MutationObserver(()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;syncStatic()})}).observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();