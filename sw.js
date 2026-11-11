const CACHE='chick-schedule-v3';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./assets/icons/icon-192.png", "./assets/icons/icon-512.png", "./assets/icons/apple-touch-icon.png", "./assets/media/splash-1170x2532.png", "./assets/media/splash-1125x2436.png", "./assets/media/splash-1284x2778.png"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==self.location.origin)return;
  /* 导航请求网络优先：避免升级后一直读旧页面 */
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(res=>{
      if(res&&res.status===200){const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));}
      return res;
    }).catch(()=>caches.match('./index.html').then(hit=>hit||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request)));
});
