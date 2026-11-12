import './style.css';
import {profile,entries,categories} from './cv.js';
import {covers} from './covers.js';
import {photographs} from './photos.js';

const escape = (value) => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const external = (url,label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
const safeUrl = (value) => {try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}};
const places=['All','Iceland','Australia','Bangkok','New York','India'];
const menus=[['home','Home'],['music','Music'],['photography','Photography'],['works','Works'],['biography','Biography']];
let currentPlace='All';
const page=document.querySelector('#app');
page.innerHTML=`<button class="mobile-menu" aria-expanded="false" aria-controls="navigation">Menu</button><aside class="sidebar"><a class="identity" href="#home">DAWN<span>정다운 · 새벽소리</span></a><nav id="navigation" aria-label="주 메뉴">${menus.map(([id,label])=>`<a href="#${id}" data-page="${id}">${label}</a>`).join('')}<a href="https://www.instagram.com/jeongdawn/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav><p class="sidebar-footer">Sound & photographs<br>© ${new Date().getFullYear()} DAWN</p></aside><main id="main" tabindex="-1"></main><dialog class="lightbox" aria-labelledby="photo-caption"><button class="lightbox-close" aria-label="사진 닫기">Close ×</button><div class="lightbox-image"></div><div class="lightbox-controls"><button data-photo-step="-1" aria-label="이전 사진">←</button><p id="photo-caption"></p><button data-photo-step="1" aria-label="다음 사진">→</button></div></dialog>`;
const main=document.querySelector('#main');
const dialog=document.querySelector('.lightbox');
let photoIndex=0;
let photoReturn;
function renderHome(){
 main.innerHTML=`<section class="home" aria-label="필름 사진"><div class="home-photo"><img src="./photographs/home-film.jpg" width="638" height="636" alt="DAWN의 필름 사진"></div><div class="home-caption"><span class="home-location">Film photographs</span></div></section>`;
}
function renderMusic(){
 const albums=covers.map(cover=>({...entries.find(entry=>entry.id===cover.id),...cover}));
 main.innerHTML=`<section class="content"><h1>Music</h1><p class="page-intro">Records & collaborations<span>음반 작업</span></p><div class="albums">${albums.map(album=>`<article><a class="album-art" href="${escape(album.url)}" target="_blank" rel="noopener noreferrer"><img src="${album.image}" width="1200" height="1200" alt="${escape(album.title)} 앨범 커버" loading="lazy"></a><div class="album-copy"><h2>${escape(album.title)}</h2><p>${escape(album.year)}</p><p>${escape(album.description)}</p><div class="album-links">${external(album.url,'YouTube')}${external(album.source,'Bugs')}</div></div></article>`).join('')}</div><p class="music-note">전체 참여 이력은 <a href="#works">Works</a>에서 볼 수 있습니다.</p></section>`;
}
function renderPhotography(){
 const photos=currentPlace==='All'?photographs:photographs.filter(photo=>photo.place===currentPlace);
 main.innerHTML=`<section class="content"><h1>Photography</h1><p class="page-intro">여행에서 만난 장면들.<span>Film photographs</span></p><div class="place-filters" role="group" aria-label="촬영 지역">${places.map(place=>`<button data-place="${place}" aria-pressed="${place===currentPlace}">${place}</button>`).join('')}</div><div class="photographs">${photos.map(photo=>`<figure><button class="photo-button" data-photo="${photo.id}" aria-label="${photo.place} 필름 사진 크게 보기"><img src="${photo.src}" alt="${photo.place}에서 촬영한 필름 사진" width="${photo.width}" height="${photo.height}" loading="lazy"></button><figcaption>${photo.place}</figcaption></figure>`).join('')}</div></section>`;
 main.querySelectorAll('[data-place]').forEach(button=>button.addEventListener('click',()=>{currentPlace=button.dataset.place;renderPhotography();main.querySelector(`[data-place="${currentPlace}"]`).focus({preventScroll:true});}));
 main.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{photoReturn=button;photoIndex=photographs.findIndex(photo=>photo.id===button.dataset.photo);renderLightbox();dialog.showModal();}));
}
function renderWorks(){
 main.innerHTML=`<section class="content text-content"><h1>Works</h1><nav class="work-categories" aria-label="작업 분야">${categories.map(category=>`<a href="#works/${category.id}">${escape(category.label)}</a>`).join('')}</nav>${categories.map(category=>`<section class="work-group" id="group-${category.id}"><h2>${escape(category.label)}</h2><div>${entries.filter(entry=>entry.categories.includes(category.id)).map(entry=>`<article class="work-row"><span>${escape(entry.year)}</span><div><h3>${escape(entry.title)}</h3><p>${escape(entry.description)}</p>${safeUrl(entry.url)?external(entry.url,'관련 작업'):''}</div></article>`).join('')}</div></section>`).join('')}</section>`;
}
function renderBiography(){
 main.innerHTML=`<section class="content text-content biography"><h1>Biography</h1><section><h2>DAWN / 정다운</h2><p>사운드 아티스트 · 작곡가 · 프로듀서 · 사운드 엔지니어</p><p>음반과 무대, 영상과 전시를 위한 소리를 만듭니다.<br>여행하며 필름 사진을 찍고, 일상의 장면을 기록합니다.</p></section><section><h2>Education</h2>${profile.education.map(item=>`<p>${escape(item.school)}<br>${escape(item.detail)}</p>`).join('')}</section><section><h2>Links</h2>${external('https://www.instagram.com/jeongdawn/','Instagram @jeongdawn')}</section><footer>새벽소리 · 사업자등록번호 102-17-67120</footer></section>`;
}
function renderLightbox(){
 const photo=photographs[photoIndex];
 dialog.querySelector('.lightbox-image').innerHTML=`<img src="${photo.src}" alt="${photo.place}에서 촬영한 필름 사진">`;
 dialog.querySelector('#photo-caption').textContent=`${photo.place} / ${photoIndex+1} — ${photographs.length}`;
}
function closePhoto(){dialog.close();if(photoReturn?.isConnected)photoReturn.focus({preventScroll:true});}
dialog.querySelector('.lightbox-close').addEventListener('click',closePhoto);
dialog.addEventListener('cancel',event=>{event.preventDefault();closePhoto();});
dialog.querySelectorAll('[data-photo-step]').forEach(button=>button.addEventListener('click',()=>{photoIndex=(photoIndex+Number(button.dataset.photoStep)+photographs.length)%photographs.length;renderLightbox();}));
dialog.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();photoIndex=(photoIndex+(event.key==='ArrowRight'?1:-1)+photographs.length)%photographs.length;renderLightbox();}});
function route(){
 const [section,category]=location.hash.slice(1).split('/');
 const active=menus.some(([id])=>id===section)?section:'home';
 document.body.dataset.page=active;
 document.querySelectorAll('[data-page]').forEach(link=>{if(link.dataset.page===active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 document.body.classList.remove('menu-open');
 document.querySelector('.mobile-menu').setAttribute('aria-expanded','false');
 if(active==='home'){renderHome();}
 if(active==='music')renderMusic();
 if(active==='photography')renderPhotography();
 if(active==='works')renderWorks();
 if(active==='biography')renderBiography();
 window.scrollTo({top:0,behavior:'auto'});
 if(active==='works'&&categories.some(item=>item.id===category))document.querySelector(`#group-${category}`).scrollIntoView({block:'start'});
}
document.querySelector('.mobile-menu').addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');document.querySelector('.mobile-menu').setAttribute('aria-expanded',String(open));});
window.addEventListener('hashchange',route);
route();
