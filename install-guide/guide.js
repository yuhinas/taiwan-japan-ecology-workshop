(()=>{
 const guide=document.getElementById('install-app');if(!guide)return;
 const tabs=[...guide.querySelectorAll('[data-install-tab]')],panels=[...guide.querySelectorAll('[data-install-panel]')],dialog=document.getElementById('install-image-dialog');
 let zoomTrigger=null;
 function selectTab(id,focus=false){for(const tab of tabs){const active=tab.dataset.installTab===id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();}for(const panel of panels)panel.hidden=panel.dataset.installPanel!==id;}
 const ua=navigator.userAgent;selectTab(/Android/i.test(ua)?'android':/iPhone|iPad|iPod/i.test(ua)&&!/CriOS/i.test(ua)?'iphone':'iphone-chrome');
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab.dataset.installTab));tab.addEventListener('keydown',event=>{const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:null;if(next!==null){event.preventDefault();selectTab(tabs[next].dataset.installTab,true);}});});
 guide.addEventListener('click',event=>{const button=event.target.closest('[data-install-image]');if(!button)return;zoomTrigger=button;const image=button.querySelector('img');dialog.querySelector('img').src=image.src;dialog.querySelector('img').alt=image.alt;dialog.querySelector('h3').textContent=button.dataset.installImage;document.documentElement.classList.add('ig-modal-open');dialog.showModal();});
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.documentElement.classList.remove('ig-modal-open');zoomTrigger?.focus({preventScroll:true});});
})();
