const $=id=>document.getElementById(id);
const sample={version:1,week:[{day:'Monday',activity:'Total Body',minutes:60,intensity:'moderate'},{day:'Wednesday',activity:'Cycle',minutes:60,intensity:'moderate'},{day:'Saturday',activity:'Cycle',minutes:180,intensity:'high'}]};
function db(){return new Promise((resolve,reject)=>{const r=indexedDB.open('A1SC-Phase3A-test',1);r.onupgradeneeded=()=>r.result.createObjectStore('plans');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
async function access(write){const d=await db();try{return await new Promise((resolve,reject)=>{const t=d.transaction('plans',write?'readwrite':'readonly');const s=t.objectStore('plans');const r=write?s.put({...sample,savedAt:new Date().toISOString()},'weekly'):s.get('weekly');t.oncomplete=()=>resolve(r.result);t.onabort=()=>reject(t.error);t.onerror=()=>reject(t.error);});}finally{d.close();}}
async function run(write){try{const result=await access(write);$('status').textContent=write?'Saved successfully. Open Fuel simulator.':result?JSON.stringify(result,null,2):'No saved plan found in this storage context.';}catch(e){$('status').textContent='Error: '+e.message;}}
$('action')?.addEventListener('click',()=>run(document.body.dataset.mode==='train'));
if(document.body.dataset.mode==='fuel')run(false);
