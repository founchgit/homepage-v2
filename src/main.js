import './style.css';
import {profile,entries,categories} from './cv.js';
import {covers} from './covers.js';
import {photographs} from './photos.js';
import {workVideos} from './work-media.js';

const escape = (value) => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const external = (url,label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
const safeUrl = (value) => {try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}};
const places=['All','Iceland','Australia','Bangkok','New York','India'];
const menus=[['home','Home'],['music','Music'],['works','Works'],['photography','Photography'],['biography','Biography']];
let currentPlace='All';
const page=document.querySelector('#app');
page.innerHTML=`<button class="mobile-menu" aria-expanded="false" aria-controls="navigation">Menu</button><aside class="sidebar"><a class="identity" href="#home">DAWN<span>정다운 · 새벽소리</span></a><nav id="navigation" aria-label="주 메뉴">${menus.map(([id,label])=>`<a href="#${id}" data-page="${id}">${label}</a>`).join('')}<a href="https://www.instagram.com/jeongdawn/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav><p class="sidebar-footer">© ${new Date().getFullYear()} DAWN</p></aside><main id="main" tabindex="-1"></main><dialog class="lightbox" aria-labelledby="photo-caption"><button class="lightbox-close" aria-label="사진 닫기">Close ×</button><div class="lightbox-image"></div><div class="lightbox-controls"><button data-photo-step="-1" aria-label="이전 사진">←</button><p id="photo-caption"></p><button data-photo-step="1" aria-label="다음 사진">→</button></div></dialog>`;
page.insertAdjacentHTML('beforeend',`<dialog class="exhibition-dialog" aria-labelledby="exhibition-title"><button class="exhibition-close" aria-label="전시 소개 닫기">Close ×</button><div class="exhibition-body"><h2 id="exhibition-title">이미 당신도 전시의 일부</h2><p class="exhibition-meta">정금형 작업실 겸 수장고, Bucheon<br>Jul 4 – Jul 6, 2025</p><p>〈이미 당신도 전시의 일부〉는 &quot;(현시원) in 정금형 작업실 겸 수장고&quot;의 일부다. 작가 정금형에게 제안을 받은 현시원은 연세대학교 커뮤니케이션대학원의 25-1학기 수업인 '전시 매체'의 참여자들을 정금형 작업실 및 수장고로 초대하기로 한다. 벡오, 손샛별, 신수찬, 임민지, 정다운이 정금형의 공간에서 전시한다.</p><h3>참여 작가</h3><p>벡오, 손샛별, 신수찬, 임민지, 정다운</p></div></dialog>`);
const exhibitionDialog=document.querySelector('.exhibition-dialog');
const exhibitionIntroductions={
 'yonsei-sound-art-research':`<h2 id="exhibition-title">2025 가을 성암 페차쿠차</h2><p class="exhibition-meta">AI 시대 창작과 커뮤니케이션의 재구성<br>2025. 10. 30(목) 17:30–19:00<br>연세대학교 성암관 307호</p><h3>딥러닝 기반 사운드 아트 사례 연구</h3><p>발표: 정다운 (미디어아트 석사과정)</p><p>성암 페차쿠차는 대학원 내 연구·창작 활동의 공유와 확산을 도모하고 과거와 현재의 지식을 잇는 대화의 장을 마련합니다.</p><p>각 전공의 졸업생, 재학생, 교수 등이 참여하여 학술 연구, 창작 경험, 전문적 통찰 등을 자유로운 형식으로 발표하게 됩니다!</p><p>《페차쿠차》에서는 재학생과 졸업생의 5분 발표가 이어집니다. 각자의 연구와 창작이 교차하며, ‘AI 시대의 창작과 커뮤니케이션’이라는 큰 주제 아래에서 다양한 실험과 사유가 펼쳐집니다.</p><p>짧지만 밀도 있는 발표 속에서 서로의 시선과 질문이 만나 새로운 영감을 나누는 시간이 될 것입니다.</p><div class="event-posters"><img src="./works/pechakucha-2025-1.jpg" width="1587" height="2245" alt="2025 가을 성암 페차쿠차 행사 포스터"><img src="./works/pechakucha-2025-2.jpg" width="1587" height="2245" alt="성암 페차쿠차 주제 및 발표자: 정다운, 딥러닝 기반 사운드 아트 사례 연구" loading="lazy"></div>`,
 'already-part-of-exhibition':document.querySelector('.exhibition-body').innerHTML,
 'lee-sujin-solo':`<h2 id="exhibition-title">이수진 개인전 〈텔릭 Telic〉</h2><p class="exhibition-meta">2023 서울문화재단 유망예술지원 선정전시<br>서울문화재단 청년예술청 SAPY 그레이룸<br>Oct 17 – Oct 29, 2023</p><p>소리와 빛으로 요동치는 울림의 공간 속 매개들만의 퍼포먼스는 언어가 없는 자들인 사물이나 동물, 식물, 박테리아, 혹은 땅속 미생물까지 정치적 주체가 되는 세계에 대한 상상을 펼쳐지게 한다. ‘환청과 소환’, ‘마찰과 중첩’, ‘파괴와 섞임’, 관객들의 소리를 자발적으로 발생시키며 어디론가에서 불려들여진 초월적 경험은 마치 대지 아래 지하세계에 도사리고 있는 거대한 심장박동과 같이 신비한 이야기들을 생성되는 비문의 우주론이 이루어질 것이다.</p><h3>전시 안내</h3><p>오프닝: 2023.10.20(금) 오후 5:00<br>관람시간: 14:00–19:00, 월요일 휴관<br>주최·주관: 서울문화재단</p><h3>도움을 주신 분들</h3><p>조명: 우기성<br>음향디자인: 김용현<br>인터랙션 사운드 디자인: 정다운<br>구조제작: 김동현<br>내레이터: 두이<br>퍼포먼스: 선은지<br>그래픽디자인: 마빈킴(스파인프레스)<br>코디네이터: 박수현<br>제작/진행도움: 박정선, 임현정, 장찬희, 문제욱</p>`,
 'hexnut-fragments':`<h2 id="exhibition-title">디지털아트 컬처랩 쇼케이스 : 빛의 궤도</h2><p class="exhibition-meta">광주미디어아트플랫폼 (G.MAP), Gwangju<br>Dec 9 – Dec 21, 2025</p><h3>참여 작가 (팀 헥스넛 / 사운드 담당)</h3><p>팀 헥스넛(Hex Nut)의 멤버로서 사운드 작업을 총괄하였다. 전시에 사용될 소리를 수집하기 위해 필드 레코딩 워크샵을 기획하고, 사운드 설치 작품을 제작하였다.</p><h3>hexnut '파편의 숨'</h3><p>기획: 손샛별, 신수찬, 임민지 / 프로듀서: 비고<br>3D 영상: 강기현(WERK MEDIA), 벡오<br>사운드 총괄: 정다운</p>`
};
let exhibitionReturn;
function closeExhibition(){exhibitionDialog.close();if(exhibitionReturn?.isConnected)exhibitionReturn.focus({preventScroll:true});}
exhibitionDialog.querySelector('.exhibition-close').addEventListener('click',closeExhibition);
exhibitionDialog.addEventListener('cancel',event=>{event.preventDefault();closeExhibition();});
const main=document.querySelector('#main');
const dialog=document.querySelector('.lightbox');
let photoIndex=0;
let lightboxPhotos=photographs;
let photoReturn;
function renderHome(){
 main.innerHTML=`<section class="home" aria-label="필름 사진"><div class="home-photo"><img src="./photographs/home-film.jpg" width="638" height="636" alt="DAWN의 필름 사진"></div></section>`;
}
function renderMusic(){
 const albums=covers.filter(cover=>!['yunaone-tidal-mind','yunaone-green-heart'].includes(cover.id)).map(cover=>({...entries.find(entry=>entry.id===cover.id),...cover}));
 main.innerHTML=`<section class="content"><h1>Music</h1><p class="page-intro">Records & collaborations<span>음반 작업</span></p><div class="albums">${albums.map(album=>`<article><a class="album-art" href="${escape(album.url)}" target="_blank" rel="noopener noreferrer"><img src="${album.image}" width="1200" height="1200" alt="${escape(album.title)} 앨범 커버" loading="lazy"></a><div class="album-copy"><h2>${escape(album.title)}</h2><p>${escape(album.year)}</p><p>${escape(album.description)}</p><div class="album-links">${external(album.url,'YouTube')}${external(album.source,'Bugs')}</div></div></article>`).join('')}</div><p class="music-note">전체 참여 이력은 <a href="#works">Works</a>에서 볼 수 있습니다.</p></section>`;
}
function renderPhotography(){
 const photos=currentPlace==='All'?photographs:photographs.filter(photo=>photo.place===currentPlace);
 main.innerHTML=`<section class="content"><h1>Photography</h1><p class="page-intro">여행에서 만난 장면들.<span>Film photographs</span></p><div class="place-filters" role="group" aria-label="촬영 지역">${places.map(place=>`<button data-place="${place}" aria-pressed="${place===currentPlace}">${place}</button>`).join('')}</div><div class="photographs">${photos.map(photo=>`<figure><button class="photo-button" data-photo="${photo.id}" aria-label="${photo.place} 필름 사진 크게 보기"><img src="${photo.src}" alt="${photo.place}에서 촬영한 필름 사진" width="${photo.width}" height="${photo.height}" loading="lazy"></button><figcaption>${photo.place}</figcaption></figure>`).join('')}</div></section>`;
 main.querySelectorAll('[data-place]').forEach(button=>button.addEventListener('click',()=>{currentPlace=button.dataset.place;renderPhotography();main.querySelector(`[data-place="${currentPlace}"]`).focus({preventScroll:true});}));
 main.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{photoReturn=button;lightboxPhotos=photographs;photoIndex=photographs.findIndex(photo=>photo.id===button.dataset.photo);renderLightbox();dialog.showModal();}));
}
function workMedia(entry){
 if(entry.description.includes('공간소리 소속'))return '';
 if(entry.id==='yonsei-sound-art-research')return '<div class="work-media"><button class="exhibition-open" data-exhibition="yonsei-sound-art-research">행사 소개 보기 ↗</button></div>';
 if(entry.id==='already-part-of-exhibition')return '<div class="work-media"><button class="exhibition-open" data-exhibition="already-part-of-exhibition">전시 소개 보기 ↗</button></div>';
 const video=workVideos[entry.id];
 const items=[];
 if(entry.id==='hexnut-fragments')items.push(`<button class="work-thumbnail-button" aria-label="HEXNUT — 파편의 숨 사진 크게 보기"><img class="work-thumbnail" src="./works/hexnut-fragments.jpg" width="720" height="480" alt="HEXNUT — 파편의 숨 전시 현장" loading="lazy"></button>`);
 if(video)for(const [index,clip] of [video,...(video.additionalVideos||[])].entries())items.push(`<a class="work-video-thumbnail" href="${escape(clip.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} YouTube 영상 ${index+1} 보기"><img class="work-thumbnail" style="transform:scale(${Number(clip.thumbnailZoom)||1})" src="https://i.ytimg.com/vi/${clip.videoId}/hqdefault.jpg" width="480" height="360" alt="${escape(entry.title)} 영상 썸네일" loading="lazy"><span>▶ YouTube ↗</span></a>`);
 else if(safeUrl(entry.url))items.push(`<a class="work-related-link" href="${escape(entry.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} 관련 작업">관련 작업 ↗</a>`);
 if(entry.id==='lee-sujin-solo')items.push('<button class="exhibition-open" data-exhibition="lee-sujin-solo">전시 소개 보기 ↗</button>');
 if(entry.id==='hexnut-fragments')items.push('<button class="exhibition-open" data-exhibition="hexnut-fragments">전시 소개 보기 ↗</button>');
 return items.length?`<div class="work-media${items.length>1?' is-multiple':''}">${items.join('')}</div>`:'';
}
function renderWorks(){
 main.innerHTML=`<section class="content text-content"><h1>Works</h1><nav class="work-categories" aria-label="작업 분야">${categories.map(category=>`<a href="#works/${category.id}">${escape(category.label)}</a>`).join('')}</nav>${categories.map(category=>`<section class="work-group" id="group-${category.id}"><h2>${escape(category.label)}</h2><div>${entries.filter(entry=>entry.categories.includes(category.id)).map(entry=>{const media=workMedia(entry);return `<article class="work-row${media?' has-thumbnail':''}${entry.id==='hexnut-fragments'?' has-multiple-media':''}"><span>${escape(entry.year)}</span><div class="work-copy"><h3>${escape(entry.title)}</h3><p>${escape(entry.description)}</p></div>${media}</article>`;}).join('')}</div></section>`).join('')}</section>`;
 main.querySelectorAll('.exhibition-open').forEach(button=>button.addEventListener('click',event=>{exhibitionReturn=event.currentTarget;exhibitionDialog.querySelector('.exhibition-body').innerHTML=exhibitionIntroductions[button.dataset.exhibition];exhibitionDialog.querySelector('.exhibition-close').setAttribute('aria-label',button.dataset.exhibition==='yonsei-sound-art-research'?'행사 소개 닫기':'전시 소개 닫기');exhibitionDialog.showModal();exhibitionDialog.scrollTop=0;}));
 main.querySelector('.work-thumbnail-button')?.addEventListener('click',event=>{photoReturn=event.currentTarget;lightboxPhotos=[{src:'./works/hexnut-fragments-full.jpg',place:'HEXNUT — 파편의 숨',alt:'HEXNUT — 파편의 숨 전시 현장'}];photoIndex=0;renderLightbox();dialog.showModal();});
 main.querySelectorAll('.work-video-thumbnail img').forEach(image=>image.addEventListener('error',()=>{image.hidden=true;image.closest('a').classList.add('image-unavailable');}));
}
function renderBiography(){
 main.innerHTML=`<section class="content text-content biography"><h1>Biography</h1><section><h2>DAWN / 정다운</h2><p>사운드 아티스트 · 작곡가 · 프로듀서 · 사운드 엔지니어</p><p>음반과 무대, 영상과 전시를 위한 소리를 만듭니다.<br>여행하며 필름 사진을 찍고, 일상의 장면을 기록합니다.</p></section><section><h2>Education</h2>${profile.education.map(item=>`<p>${escape(item.school)}<br>${escape(item.detail)}</p>`).join('')}</section><section><h2>Links</h2>${external('https://www.instagram.com/jeongdawn/','Instagram @jeongdawn')}</section><footer>새벽소리 · 사업자등록번호 102-17-67120</footer></section>`;
}
function renderLightbox(){
 const photo=lightboxPhotos[photoIndex];
 dialog.querySelector('.lightbox-image').innerHTML=`<img src="${photo.src}" alt="${escape(photo.alt||photo.place+'에서 촬영한 필름 사진')}">`;
 dialog.querySelector('#photo-caption').textContent=`${photo.place}${lightboxPhotos.length>1?` / ${photoIndex+1} — ${lightboxPhotos.length}`:''}`;
 dialog.querySelectorAll('[data-photo-step]').forEach(button=>button.hidden=lightboxPhotos.length<2);
}
function closePhoto(){dialog.close();if(photoReturn?.isConnected)photoReturn.focus({preventScroll:true});}
dialog.querySelector('.lightbox-close').addEventListener('click',closePhoto);
dialog.addEventListener('cancel',event=>{event.preventDefault();closePhoto();});
dialog.querySelectorAll('[data-photo-step]').forEach(button=>button.addEventListener('click',()=>{photoIndex=(photoIndex+Number(button.dataset.photoStep)+lightboxPhotos.length)%lightboxPhotos.length;renderLightbox();}));
dialog.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();photoIndex=(photoIndex+(event.key==='ArrowRight'?1:-1)+lightboxPhotos.length)%lightboxPhotos.length;renderLightbox();}});
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
