(()=>{'use strict';
const ID='gfd-streetdrug-dark-tuning-v280';
function install(){
 if(document.getElementById(ID))return;
 const s=document.createElement('style');
 s.id=ID;
 s.textContent=`
/* v280 Street Drug dark-mode text hierarchy */
body.dark-mode .streetdrug-shell .tool-note,
body.dark-mode .streetdrug-shell .streetdrug-source{
 color:#9aa9bd!important;
}
body.dark-mode .streetdrug-shell .tool-note b,
body.dark-mode .streetdrug-shell .streetdrug-source b,
body.dark-mode .streetdrug-shell .tool-note strong,
body.dark-mode .streetdrug-shell .streetdrug-source strong{
 color:#c7d2e0!important;
}
body.dark-mode .streetdrug-shell .tool-note{
 background:#141d2b!important;
 border-color:#334155!important;
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
