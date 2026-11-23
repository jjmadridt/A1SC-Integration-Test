const display = document.getElementById('display-mode');
const mq = matchMedia('(display-mode: standalone)');
function showMode(){display.textContent='Mode: '+((mq.matches || navigator.standalone === true)?'Standalone':'Browser');}
showMode(); mq.addEventListener?.('change',showMode);
const workerStatus=document.getElementById('worker-status');
if ('serviceWorker' in navigator) {navigator.serviceWorker.register('./sw.js').then(()=>{workerStatus.textContent='Service worker registered';}).catch(e=>{workerStatus.textContent='Service worker error: '+e.message;});} else {workerStatus.textContent='Service worker unavailable';}
