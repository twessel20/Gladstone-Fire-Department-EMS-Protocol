(()=>{'use strict';
const ID='transcutaneous-pacing-procedure';
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function register(){
 if(!Array.isArray(window.data))return false;
 if(!data.some(x=>x.id===ID))data.push({id:ID,title:'Transcutaneous Pacing (TCP)',category:'Procedures',lines:['ZOLL X Series','Adult','Cross-referenced from GFD Bradycardia Algorithm'],aliases:['tcp','pacing','transcutaneous pacing','zoll','zoll x series','bradycardia pacing']});
 return true;
}
function jump(label,cls=''){return '<button class="tcp-pill '+cls+'" type="button">'+esc(label)+'</button>'}
function flowHtml(){
 return `<div class="tcp-procedure" data-tcp-procedure>
  <div class="tcp-hero">
   <div><div class="tcp-kicker">PROCEDURE • ADULT</div><h2>Transcutaneous Pacing (TCP)</h2><div class="tcp-sub">ZOLL X Series</div></div>
   <div class="tcp-source">GFD Bradycardia aligned</div>
  </div>
  <div class="tcp-intro">This procedure follows the Gladstone Bradycardia Protocol. Use transcutaneous pacing for bradycardia with poor perfusion when indicated, and <b>do not delay pacing for Mobitz II second-degree or third-degree AV block.</b></div>

  <section class="tcp-flow" aria-label="Transcutaneous pacing decision flow">
   <div class="tcp-node primary"><b>Bradycardia with a pulse</b><span>HR &lt;60 or inadequate for the clinical condition</span></div>
   <div class="tcp-arrow">↓</div>
   <div class="tcp-node decision"><b>Poor perfusion caused by bradycardia?</b><span>Hypotension • altered mental status • signs of shock • ischemic chest discomfort • acute heart failure</span></div>
   <div class="tcp-split"><div><div class="tcp-branch yes">NO</div><div class="tcp-node good"><b>Observe and monitor</b><span>Treat contributing cause and continue reassessment.</span></div></div><div><div class="tcp-branch danger">YES</div><div class="tcp-node primary"><b>Mobitz II second-degree or third-degree AV block?</b></div></div></div>
   <div class="tcp-split"><div></div><div class="tcp-split inner"><div><div class="tcp-branch danger">YES</div><div class="tcp-node danger"><b>Initiate TCP without delay</b><span>Do not wait for atropine response before preparing/initiating pacing.</span></div></div><div><div class="tcp-branch no">NO</div><div class="tcp-node med"><b>Atropine per GFD Bradycardia Protocol</b><span>0.5 mg IV every 3–5 min<br>Maximum 3 mg or 0.04 mg/kg<br>If ineffective → begin TCP</span></div></div></div></div>
   <div class="tcp-arrow">↓</div>
   <div class="tcp-node pace"><b>Prepare for Transcutaneous Pacing</b><span>ZOLL X Series • multifunction pads • ECG / pulse / BP monitoring</span></div>
   <div class="tcp-arrow">↓</div>
   <div class="tcp-node pace"><b>Initiate and titrate pacing</b><span>Demand mode • set rate 60–80 ppm • increase output until electrical capture</span></div>
   <div class="tcp-arrow">↓</div>
   <div class="tcp-node decision"><b>Mechanical capture achieved?</b><span>Confirm paced complexes correspond with a palpable pulse, BP/pulse waveform, and improved perfusion. Do not rely on ECG alone.</span></div>
   <div class="tcp-split"><div><div class="tcp-branch yes">YES</div><div class="tcp-node good"><b>Maintain pacing</b><span>Maintain reliable capture • reassess perfusion/BP • treat cause • transport • consider Medical Control / definitive pacing</span></div></div><div><div class="tcp-branch danger">NO</div><div class="tcp-node danger"><b>Troubleshoot and reassess</b><span>Increase mA as needed • check pad contact/position and cable connection • reassess rhythm/monitor setup • continue GFD Bradycardia pathway • Medical Control</span></div></div></div>
  </section>

  <section class="tcp-steps">
   <div class="tcp-step"><span>1</span><div><h3>Initial Assessment and Support</h3><ul><li>Support ABCs.</li><li>Provide oxygen and assist ventilation as needed.</li><li>Attach cardiac monitor; monitor pulse, BP and SpO₂.</li><li>Establish IV/IO access.</li><li>Obtain 12-lead ECG if it does not delay treatment.</li><li>Identify and treat reversible causes.</li></ul></div></div>
   <div class="tcp-step"><span>2</span><div><h3>Prepare for Pacing</h3><ul><li>Expose chest and apply ZOLL multifunction pacing/defibrillation pads.</li><li>Connect pads to the ZOLL X Series and ensure adequate contact.</li><li>Explain the procedure if the patient is conscious.</li><li>Consider analgesia/anxiolysis per GFD medication protocols when clinically appropriate.</li><li>Continue ECG, pulse, BP and SpO₂ monitoring.</li></ul></div></div>
   <div class="tcp-step"><span>3</span><div><h3>Start Transcutaneous Pacing — ZOLL X Series</h3><div class="tcp-monitor" aria-label="Simplified ZOLL X Series pacing control visual"><div class="tcp-monitor-brand">ZOLL X SERIES</div><div class="tcp-monitor-wave">⌁⌁╱╲⌁╱╲⌁╱╲⌁</div><div class="tcp-monitor-controls"><b>PACER</b><span>RATE<br><strong>70</strong> ppm</span><span>OUTPUT<br><strong>60</strong> mA</span></div></div><ol><li>Press <b>PACER</b>.</li><li>Use <b>Demand</b> mode unless a specific circumstance requires Fixed mode.</li><li>Set rate to <b>60–80 ppm</b>.</li><li>Increase output (mA) until electrical capture occurs.</li></ol></div></div>
   <div class="tcp-step"><span>4</span><div><h3>Confirm Mechanical Capture</h3><ul><li><b>Do not rely on ECG alone.</b></li><li>Confirm each paced complex corresponds with a palpable pulse.</li><li>Confirm improving BP/pulse waveform when available.</li><li>Reassess perfusion, mental status and symptoms.</li></ul></div></div>
   <div class="tcp-step"><span>5</span><div><h3>After Capture</h3><ul><li>Maintain the lowest output that reliably maintains capture.</li><li>Continue ECG, pulse, BP and perfusion monitoring.</li><li>Treat the contributing cause.</li><li>Transport.</li><li>Consider Medical Control and definitive/transvenous pacing.</li></ul></div></div>
   <div class="tcp-step"><span>6</span><div><h3>If No Capture or Poor Response</h3><ul><li>Increase output as needed within device limits.</li><li>Check pad position/contact and cable connection.</li><li>Reassess rhythm and monitor setup.</li><li>Continue supportive care and the GFD Bradycardia treatment pathway.</li><li>Consider push-dose epinephrine when indicated by GFD protocol.</li><li>Contact Medical Control; consider definitive/transvenous pacing.</li></ul></div></div>
  </section>
  <div class="tcp-caution"><b>Important</b><span>TCP may be painful in a conscious patient. Consider analgesia/anxiolysis per GFD medication protocols when the patient's condition allows. TCP is bridge therapy while the cause is treated and definitive pacing is arranged when needed.</span></div>
 </div>`;
}
function renderCustom(){
 const host=document.querySelector('#detail .protocol-body');if(!host)return;
 host.innerHTML=flowHtml();
}
function patchOpen(){
 if(typeof window.openP!=='function'||window.openP.__tcpPatched)return;
 const original=window.openP;
 function wrapped(id,returnProtocolId=null,fromBack=false){
  const r=original.apply(this,arguments);
  if(id===ID)requestAnimationFrame(renderCustom);
  return r;
 }
 wrapped.__tcpPatched=true;wrapped.__tcpOriginal=original;window.openP=wrapped;
}
function addBradyLink(){
 if(window.currentProtocolId!=='bradycardia-algorithm')return;
 const flow=document.querySelector('#detail .flowchart');if(!flow||flow.querySelector('.tcp-crosslink'))return;
 const decision=flow.querySelector('.flow-decision');if(!decision)return;
 const box=document.createElement('div');box.className='tcp-crosslink';box.innerHTML='<button type="button" onclick="openP(\''+ID+'\',\'bradycardia-algorithm\')"><span><b>⚡ Transcutaneous Pacing Procedure</b><small>ZOLL X Series • step-by-step pacing workflow</small></span><span>›</span></button>';
 decision.insertAdjacentElement('afterend',box);
}
function styles(){
 if(document.getElementById('tcp-procedure-style'))return;
 const s=document.createElement('style');s.id='tcp-procedure-style';s.textContent=`
.tcp-crosslink{margin:10px 0 12px}.tcp-crosslink button{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;border:2px solid #7c3aed;background:#f5f3ff;color:#3b0764;border-radius:12px;padding:12px 13px;font:inherit}.tcp-crosslink b,.tcp-crosslink small{display:block}.tcp-crosslink small{margin-top:3px;font-size:11px;color:#6b21a8}.tcp-crosslink button>span:last-child{font-size:25px;font-weight:900}
.tcp-procedure{max-width:780px;margin:0 auto}.tcp-hero{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:10px}.tcp-kicker{font-size:11px;font-weight:950;letter-spacing:.08em;color:#7c3aed}.tcp-hero h2{margin:3px 0 2px!important;font-size:25px}.tcp-sub{font-size:15px;color:#64748b;font-weight:800}.tcp-source{font-size:10px;font-weight:900;border:1px solid #c4b5fd;background:#f5f3ff;color:#6d28d9;border-radius:999px;padding:6px 8px;white-space:nowrap}.tcp-intro{border:1px solid #cbd5e1;background:#f8fafc;border-radius:12px;padding:12px 13px;line-height:1.45;margin:10px 0 14px}.tcp-flow{display:grid;gap:8px}.tcp-node{border:2px solid #3b82f6;background:#eff6ff;border-radius:12px;padding:11px 12px;text-align:center;line-height:1.35}.tcp-node b,.tcp-node span{display:block}.tcp-node span{font-size:12px;margin-top:4px}.tcp-node.good{background:#ecfdf5;border-color:#22c55e;color:#14532d}.tcp-node.danger{background:#fff1f2;border-color:#ef4444;color:#7f1d1d}.tcp-node.med{background:#eff6ff;border-color:#60a5fa;color:#1e3a8a}.tcp-node.pace{background:#f5f3ff;border-color:#8b5cf6;color:#4c1d95}.tcp-node.decision{background:#f8fafc;border-color:#3b82f6}.tcp-arrow{text-align:center;font-size:24px;line-height:1;color:#3b82f6;font-weight:950}.tcp-split{display:grid;grid-template-columns:1fr 1fr;gap:10px}.tcp-split.inner{grid-template-columns:1fr 1fr}.tcp-branch{width:max-content;min-width:74px;margin:0 auto 5px;padding:7px 14px;border-radius:10px;font-weight:950;text-align:center}.tcp-branch.yes{background:#dcfce7;border:2px solid #22c55e;color:#166534}.tcp-branch.no{background:#dbeafe;border:2px solid #3b82f6;color:#1d4ed8}.tcp-branch.danger{background:#fee2e2;border:2px solid #ef4444;color:#991b1b}.tcp-steps{display:grid;gap:9px;margin-top:18px}.tcp-step{display:grid;grid-template-columns:38px 1fr;gap:10px;border:1px solid #dbe4ee;background:#fff;border-radius:12px;padding:11px}.tcp-step>span{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#6d28d9;color:#fff;font-weight:950;font-size:18px}.tcp-step h3{margin:1px 0 5px!important;font-size:16px}.tcp-step ul,.tcp-step ol{margin:5px 0 0 18px;padding:0}.tcp-step li{margin:3px 0;line-height:1.35}.tcp-monitor{margin:9px 0;border:3px solid #334155;background:#08131d;border-radius:12px;padding:9px;color:#d1fae5}.tcp-monitor-brand{font-weight:950;color:#fff;text-align:center;font-size:12px;letter-spacing:.08em}.tcp-monitor-wave{height:42px;display:flex;align-items:center;color:#4ade80;font-family:monospace;font-size:19px;overflow:hidden;white-space:nowrap}.tcp-monitor-controls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px}.tcp-monitor-controls>*{background:#111827;border:1px solid #475569;border-radius:8px;padding:7px;text-align:center}.tcp-monitor-controls>b{display:grid;place-items:center;background:#6d28d9;color:#fff}.tcp-monitor-controls span{font-size:10px;color:#cbd5e1}.tcp-monitor-controls strong{font-size:19px;color:#fff}.tcp-caution{display:grid;grid-template-columns:auto 1fr;gap:9px;margin:12px 0;padding:11px 12px;border-radius:12px;background:#fffbeb;border:1px solid #f59e0b;color:#78350f}.tcp-caution b{color:#92400e}.tcp-caution span{line-height:1.4;font-size:12px}
body.dark-mode .tcp-crosslink button{background:#24153a!important;border-color:#a78bfa!important;color:#f3e8ff!important}body.dark-mode .tcp-crosslink small{color:#c4b5fd!important}body.dark-mode .tcp-sub{color:#9fb0c4!important}body.dark-mode .tcp-source{background:#24153a!important;border-color:#7c3aed!important;color:#ddd6fe!important}body.dark-mode .tcp-intro{background:#172033!important;border-color:#475569!important;color:#e2e8f0!important}body.dark-mode .tcp-node{background:#102a43!important;border-color:#60a5fa!important;color:#dbeafe!important}body.dark-mode .tcp-node.good{background:#102a20!important;border-color:#4ade80!important;color:#dcfce7!important}body.dark-mode .tcp-node.danger{background:#321820!important;border-color:#fb7185!important;color:#ffe4e6!important}body.dark-mode .tcp-node.med{background:#102a43!important;border-color:#60a5fa!important;color:#dbeafe!important}body.dark-mode .tcp-node.pace{background:#24153a!important;border-color:#a78bfa!important;color:#f3e8ff!important}body.dark-mode .tcp-node.decision{background:#111827!important;border-color:#60a5fa!important;color:#f1f5f9!important}body.dark-mode .tcp-step{background:#111827!important;border-color:#475569!important;color:#e2e8f0!important}body.dark-mode .tcp-step h3{color:#f8fafc!important}body.dark-mode .tcp-caution{background:#33250d!important;border-color:#f59e0b!important;color:#fef3c7!important}body.dark-mode .tcp-caution b{color:#fde68a!important}
@media(max-width:620px){.tcp-hero{display:block}.tcp-source{display:inline-block;margin-top:7px}.tcp-split,.tcp-split.inner{grid-template-columns:1fr;gap:8px}.tcp-split>div:empty{display:none}.tcp-flow{gap:7px}.tcp-node{padding:10px}.tcp-step{grid-template-columns:34px 1fr;padding:10px}.tcp-step>span{width:30px;height:30px;font-size:16px}.tcp-monitor-controls{grid-template-columns:1fr 1fr 1fr}.tcp-caution{grid-template-columns:1fr}}
`;
 document.head.appendChild(s);
}
function boot(){
 styles();
 let tries=0;const ready=setInterval(()=>{tries++;if(register()){patchOpen();clearInterval(ready);try{if(typeof render==='function'&&window.cat==='Procedures')render()}catch(e){}}if(tries>40)clearInterval(ready)},100);
 const obs=new MutationObserver(()=>{patchOpen();addBradyLink();if(window.currentProtocolId===ID&&!document.querySelector('[data-tcp-procedure]'))renderCustom()});obs.observe(document.body,{childList:true,subtree:true});
 addBradyLink();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();