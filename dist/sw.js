if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>n(e,o),l={module:{uri:o},exports:c,require:d};i[o]=Promise.all(s.map((e=>l[e]||d(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3ea082d2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.3adb3ba9.js",revision:null},{url:"assets/index.c1bd0be9.css",revision:null},{url:"assets/index.c84b9889.js",revision:null},{url:"firebase-messaging-sw.js",revision:"3674869747638f33879229469d701b91"},{url:"index.html",revision:"d10b3716ec7dc3ccc4b21b5a9dfb1ce7"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"22cb10552720321ebe73a62633de0c8b"},{url:"apple-touch-icon.png",revision:"3130af18ac95d7c508d74308b370e462"},{url:"android-chrome-192x192.png",revision:"71b9ba9699b34fdd70151d014a67913f"},{url:"favicon-16x16.png",revision:"d366288e904a8fb307a84849bb40fd05"},{url:"favicon-32x32.png",revision:"06154bc9e321d56b4c08cec5c6e90dd1"},{url:"android-chrome-512x512.png",revision:"c1241a3abed45838d886f1f68b0a1e62"},{url:"manifest.webmanifest",revision:"e4853d770a002281888ca5a9c0a2b2df"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map