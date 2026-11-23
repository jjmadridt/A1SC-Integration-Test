self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
// Network-only experiment: no cache or offline behavior is claimed.
self.addEventListener('fetch',event=>{if(event.request.method==='GET')event.respondWith(fetch(event.request));});
