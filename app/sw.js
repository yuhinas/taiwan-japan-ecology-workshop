/* Each release is cached atomically. A waiting release is activated only on request. */
const CACHE = 'tjew-pocket-fe4623b6e324';
const SHELL = ["./", "index.html", "app.css", "typography.css", "app.js", "install-first.js", "install-first.css", "data.json", "manifest.webmanifest", "assets/EBGaramond-OFL.txt", "assets/NotoSans-OFL.txt", "assets/NotoSansJP-OFL.txt", "assets/NotoSansTC-OFL.txt", "assets/app-qr.png", "assets/campus.jpg", "assets/chien-hsiang-lin.webp", "assets/chih-hao-hsieh.webp", "assets/first-android.svg", "assets/first-chrome-ios.svg", "assets/first-safari-menu.svg", "assets/first-safari-share.svg", "assets/font-ebgaramond-italic.woff2", "assets/font-ebgaramond.woff2", "assets/font-notosans-italic.woff2", "assets/font-notosans.woff2", "assets/font-notosansjp.woff2", "assets/font-notosanstc.woff2", "assets/hero.webp", "assets/hiroko-kurokawa.webp", "assets/icon-192.png", "assets/icon-512.png", "assets/icon-maskable.png", "assets/icon.svg", "assets/kazuki-tsuji.webp", "assets/share.jpg"];
const ROOT = new URL('./', self.location.href);
const PDF_CACHE = 'tjew-pocket-booklet';
self.addEventListener('install', event => event.waitUntil((async()=>{
  const cache = await caches.open(CACHE);
  try { await cache.addAll(SHELL.map(path=>new Request(new URL(path,ROOT),{cache:'reload'}))); }
  catch(error) { await caches.delete(CACHE); throw error; }
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys()) if(key.startsWith('tjew-pocket-') && key!==CACHE && key!==PDF_CACHE) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING') self.skipWaiting();
  if(event.data?.type==='OFFLINE_STATUS') event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);const complete=(await Promise.all(SHELL.map(p=>cache.match(new URL(p,ROOT))))).every(Boolean);
    event.ports[0]?.postMessage({ready:complete,version:CACHE});
  })());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==ROOT.origin)return;
  if(url.pathname.startsWith(ROOT.pathname)){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      if(event.request.mode==='navigate') return (await cache.match(new URL('index.html',ROOT)))||fetch(event.request);
      const canonical=new URL(url);canonical.search='';
      return (await cache.match(canonical))||fetch(event.request);
    })());
  }else if(url.pathname.endsWith('/TJEW2026_Programme_20261021.pdf')){
    event.respondWith((async()=>{
      const saved=await(await caches.open(PDF_CACHE)).match(event.request);
      return saved||fetch(event.request);
    })());
  }
});
