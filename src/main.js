import './style.css';
import {recordDetails} from './record-details.js';
import {profile,entries,categories} from './cv.js';
import {photographs} from './photos.js';
import {workVideos} from './work-media.js';

const escape = (value) => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const external = (url,label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
const safeUrl = (value) => {try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}};
const places=['All','Iceland','Australia','Bangkok','New York','India'];
const menus=[['home','Home'],['scenes','Scenes'],['works','Works'],['photography','Photography'],['biography','Biography']];
let currentPlace='All';
const page=document.querySelector('#app');
page.innerHTML=`<button class="mobile-menu" aria-expanded="false" aria-controls="navigation">Menu</button><aside class="sidebar"><a class="identity" href="#home">DAWN<span>정다운 · 새벽소리</span></a><nav id="navigation" aria-label="주 메뉴">${menus.map(([id,label])=>`<a href="#${id}" data-page="${id}">${label}</a>`).join('')}<a href="https://www.instagram.com/jeongdawn/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav><p class="sidebar-footer">© ${new Date().getFullYear()} DAWN</p></aside><main id="main" tabindex="-1"></main><dialog class="lightbox" aria-labelledby="photo-caption"><button class="lightbox-close" aria-label="사진 닫기">Close ×</button><div class="lightbox-image"></div><div class="lightbox-controls"><button data-photo-step="-1" aria-label="이전 사진">←</button><p id="photo-caption"></p><button data-photo-step="1" aria-label="다음 사진">→</button></div></dialog>`;
page.insertAdjacentHTML('beforeend',`<dialog class="exhibition-dialog" aria-labelledby="exhibition-title"><button class="exhibition-close" aria-label="전시 소개 닫기">Close ×</button><div class="exhibition-body"><h2 id="exhibition-title">이미 당신도 전시의 일부</h2><p class="exhibition-meta">정금형 작업실 겸 수장고, Bucheon<br>Jul 4 – Jul 6, 2025</p><p>〈이미 당신도 전시의 일부〉는 &quot;(현시원) in 정금형 작업실 겸 수장고&quot;의 일부다. 작가 정금형에게 제안을 받은 현시원은 연세대학교 커뮤니케이션대학원의 25-1학기 수업인 '전시 매체'의 참여자들을 정금형 작업실 및 수장고로 초대하기로 한다. 벡오, 손샛별, 신수찬, 임민지, 정다운이 정금형의 공간에서 전시한다.</p><h3>참여 작가</h3><p>벡오, 손샛별, 신수찬, 임민지, 정다운</p></div></dialog>`);
const exhibitionDialog=document.querySelector('.exhibition-dialog');
const exhibitionIntroductions={
 'hanwha-pompidou-ceiling':`<h2 id="exhibition-title">PRELUDE 01: Omyo Cho «Phasic»</h2><p class="exhibition-meta">2026.11.17 (Tue) – 12.13 (Sun)<br>Daily 10:00–20:00<br>한화생명 본사 63빌딩 G층<br>서울 영등포구 63로 50</p><h3>EXHIBITION CREDITS</h3><p>Organized by — PLUS, Hanwha Finance<br>Curator — 김정연 (Charlotte JungYeon Kim) ${external('https://www.instagram.com/fuite_du_temps/','@fuite_du_temps')}<br>Coordinators — 김정민, 기정현<br>Artwork Production — Studio Omyo Cho<br>Exhibition Design — OUR LABOUR ${external('https://www.instagram.com/our_labour/','@our_labour')}<br>Graphic Design — y! ${external('https://www.instagram.com/yfactorial/','@yfactorial')}<br>Website Development — 박서현 (Seohyun Park)<br>Translation — Maya West<br>Photography &amp; Filming — 조혁수, 소농지 ${external('https://www.instagram.com/sonongji_studio/','@sonongji_studio')}</p><h3>VIDEO CREDITS</h3><p>Produced by — Studio Omyo Cho<br>Video Production — 벡오 (Behgoh) ${external('https://www.instagram.com/behgoh/','@behgoh')}, 강기현 (Kang Keehyun) ${external('https://www.instagram.com/werk.media/','@werk.media')}<br>Sound — 정다운 (DAWN) ${external('https://www.instagram.com/jeongdawn/','@jeongdawn')}</p><p>Single-channel video, 2′30″</p><p>Hanwha Life Building (63 Building), G Floor<br>50, 63-ro, Yeongdeungpo-gu, Seoul</p><p>${external('https://plusprelude.art/?tab=works&work=led','Plus Prelude — 작업 보기')}</p>`,
 'yonsei-sound-art-research':`<h2 id="exhibition-title">2025 가을 성암 페차쿠차</h2><p class="exhibition-meta">AI 시대 창작과 커뮤니케이션의 재구성<br>2025. 10. 30(목) 17:30–19:00<br>연세대학교 성암관 307호</p><h3>딥러닝 기반 사운드 아트 사례 연구</h3><p>발표: 정다운 (미디어아트 석사과정)</p><p>성암 페차쿠차는 대학원 내 연구·창작 활동의 공유와 확산을 도모하고 과거와 현재의 지식을 잇는 대화의 장을 마련합니다.</p><p>각 전공의 졸업생, 재학생, 교수 등이 참여하여 학술 연구, 창작 경험, 전문적 통찰 등을 자유로운 형식으로 발표하게 됩니다!</p><p>《페차쿠차》에서는 재학생과 졸업생의 5분 발표가 이어집니다. 각자의 연구와 창작이 교차하며, ‘AI 시대의 창작과 커뮤니케이션’이라는 큰 주제 아래에서 다양한 실험과 사유가 펼쳐집니다.</p><p>짧지만 밀도 있는 발표 속에서 서로의 시선과 질문이 만나 새로운 영감을 나누는 시간이 될 것입니다.</p><div class="event-posters"><img src="./works/pechakucha-2025-1.jpg" width="1587" height="2245" alt="2025 가을 성암 페차쿠차 행사 포스터"><img src="./works/pechakucha-2025-2.jpg" width="1587" height="2245" alt="성암 페차쿠차 주제 및 발표자: 정다운, 딥러닝 기반 사운드 아트 사례 연구" loading="lazy"></div>`,
 'already-part-of-exhibition':`<h2 id="exhibition-title">Audible Body</h2><img class="artwork-detail-image" src="./works/audible-body.jpg" alt="Audible Body 전시 현장 — 발판 위의 관람객과 벽에 투사된 영상"><h3>작품 구성</h3><ol class="artwork-materials"><li>240 × 40 × 3 cm, 나무, 오디오 시스템(컨택트 마이크, 컴퓨터, 스피커), 2025</li><li>가변 크기, 카메라, 프로젝터, 컴퓨터, 2025</li><li>15 × 12 × 5 cm, 전자 스위치, 2025</li></ol><h3>크레딧</h3><p>AI Vision Developer · 김준현 ${external('https://www.instagram.com/anvry_jh/','@anvry_jh')}<br>Video Archive · 손샛별 ${external('https://www.instagram.com/bee_ver_son/','@bee_ver_son')}</p><h3>《이미 당신도 전시의 일부》</h3><p class="exhibition-meta">정금형 작업실 겸 수장고, 부천<br>2025.07.04–07.06</p><p>〈이미 당신도 전시의 일부〉는 &quot;(현시원) in 정금형 작업실 겸 수장고&quot;의 일부다. 작가 정금형에게 제안을 받은 현시원은 연세대학교 커뮤니케이션대학원의 25-1학기 수업인 '전시 매체'의 참여자들을 정금형 작업실 및 수장고로 초대하기로 한다. 벡오, 손샛별, 신수찬, 임민지, 정다운이 정금형의 공간에서 전시한다.</p><h3>참여 작가</h3><p>벡오, 손샛별, 신수찬, 임민지, 정다운</p><img class="artwork-detail-poster" src="./works/audible-body-exhibition.jpeg" alt="(현시원) in 정금형 작업실 겸 수장고 전시 포스터" loading="lazy">`,
 'lee-sujin-solo':`<h2 id="exhibition-title">이수진 Jade Sujin LEE 《텔릭 Telic》</h2><p class="exhibition-meta">2023 서울문화재단 유망예술지원 선정전시<br>2023.10.17.(화)–10.29(일)<br>서울문화재단 청년예술청 SAPY 그레이룸</p><p>소리와 빛으로 요동치는 울림의 공간 속 매개들만의 퍼포먼스는 언어가 없는 자들인 사물이나 동물, 식물, 박테리아, 혹은 땅속 미생물까지 정치적 주체가 되는 세계에 대한 상상을 펼쳐지게 한다. ‘환청과 소환’, ‘마찰과 중첩’, ‘파괴와 섞임’, 관객들이 소리를 자발적으로 발생시키며 어디론가에서 불러들여진 초월적 경험은 마치 대지 아래 지하세계에 도사리고 있는 거대한 심장박동과 같이 신비한 이야기들이 생성되는 비문의 우주론이 이루어질 것이다.</p><h3>전시 안내</h3><p>일시: 2023.10.17.(화)–10.29(일)<br>오프닝: 2023.10.20(금) 오후 5:00<br>관람시간: 14:00–19:00, 월요일 휴관<br>장소: 서울문화재단 청년예술청 SAPY 그레이룸<br>주최·주관: 서울문화재단<br>관람예약: ${external('https://www.instagram.com/jadesujinlee_studio/','작가 Instagram 프로필 링크 참조')}<br>문의: 박수현 코디네이터 <a href="mailto:suhyun_p@naver.com">suhyun_p@naver.com</a></p><h3>도움을 주신 분들</h3><p>조명: 우기성<br>음향디자인: 김용현<br>인터렉션 사운드 디자인: 정다운<br>구조제작: 김동현<br>나레이터: 두이<br>퍼포먼스: 선은지<br>그래픽디자인: 마빈킴(스파인프레스)<br>코디네이터: 박수현<br>제작/진행도움: 박정선, 임현정, 장찬희, 문제욱</p><img class="artwork-detail-image" src="./works/telic-installation.jpg" alt="텔릭 Telic 전시 현장" loading="lazy"><img class="artwork-detail-poster" src="./works/telic-poster.jpg" alt="이수진 Jade Sujin LEE 텔릭 Telic 전시 포스터" loading="lazy">`,
 'hexnut-fragments':`<h2 id="exhibition-title">HEXNUT — 파편의 숨</h2><p class="exhibition-meta">8-Channel Spatial Audio Installation · 사운드 총괄<br>2025 · 광주미디어아트플랫폼 G.MAP</p><p>팀 HEXNUT의 사운드 총괄로 참여해 필드 레코딩 워크숍을 기획하고, 수집한 소리를 바탕으로 8채널 공간음향 설치를 제작했다.</p><h3>전시 스케치 — 8채널 공간음향 설치</h3><video class="artwork-video" controls playsinline preload="metadata" aria-label="8채널 공간음향 설치 전시 스케치"><source src="./works/hexnut-spatial-sketch.mp4#t=0.1" type="video/mp4"></video><h3>설치 전경</h3><img class="artwork-detail-image" src="./works/hexnut-fragments-full.jpg" alt="파편의 숨 설치 전경" loading="lazy"><h3>작품 영상 · 전시 기록</h3><p>${external('https://youtu.be/NHQVm3LUUVc','전시 영상 1')}&nbsp; ${external('https://youtu.be/OOTew75xRYU','전시 영상 2')}</p><h3>합주 기록</h3><img class="artwork-detail-image" src="./works/hexnut-rehearsal.jpg" alt="HEXNUT 합주 현장" loading="lazy"><p>${external('https://youtu.be/S72bNOe3V0c','라이브 퍼포먼스')}</p><h3>타임스퀘어 상영 기록</h3><img class="artwork-detail-image" src="./works/hexnut-times-square.jpg" alt="뉴욕 타임스퀘어 전광판 파편의 숨 상영 기록" loading="lazy"><h3>전시 정보</h3><p>디지털아트 컬처랩 쇼케이스 : 빛의 궤도<br>2025.12.09–12.21 · 광주미디어아트플랫폼 G.MAP</p><h3>hexnut '파편의 숨'</h3><p>기획: 손샛별, 신수찬, 임민지 / 프로듀서: 비고<br>3D 영상: 강기현(WERK MEDIA), 벡오<br>사운드 총괄: 정다운</p><img class="artwork-detail-poster" src="./works/gmap-orbit-of-light-poster.jpg" alt="빛의 궤도 전시 포스터" loading="lazy">`
};
let exhibitionReturn;
function closeExhibition(){exhibitionDialog.close();if(exhibitionReturn?.isConnected)exhibitionReturn.focus({preventScroll:true});}
exhibitionDialog.querySelector('.exhibition-close').addEventListener('click',closeExhibition);
exhibitionDialog.addEventListener('close',()=>{exhibitionDialog.querySelectorAll('video').forEach(video=>video.pause());});
exhibitionDialog.addEventListener('cancel',event=>{event.preventDefault();closeExhibition();});
const main=document.querySelector('#main');
const dialog=document.querySelector('.lightbox');
dialog.insertAdjacentHTML('beforeend',`<div class="lightbox-sound" hidden><audio preload="metadata" src="./audio/hanwha-pompidou.m4a"></audio><div class="sound-player-row"><button class="sound-toggle" type="button" aria-label="사운드 재생" aria-pressed="false">Play</button><input class="sound-seek" type="range" min="0" max="100" step="0.1" value="0" aria-label="사운드 재생 위치"><span class="sound-time">00:00 / --:--</span></div><p class="sound-credit">Sound design · 정다운</p><p class="sound-error" role="status" hidden>음원을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p></div>`);
const lightboxSound=dialog.querySelector('.lightbox-sound');
const artworkAudio=lightboxSound.querySelector('audio');
const audioToggle=lightboxSound.querySelector('.sound-toggle');
const audioSeek=lightboxSound.querySelector('.sound-seek');
const audioTime=value=>{if(!Number.isFinite(value))return '--:--';return `${String(Math.floor(value/60)).padStart(2,'0')}:${String(Math.floor(value%60)).padStart(2,'0')}`;};
function updateArtworkAudio(){const playing=!artworkAudio.paused;audioToggle.textContent=playing?'Pause':'Play';audioToggle.setAttribute('aria-label',playing?'사운드 일시정지':'사운드 재생');audioToggle.setAttribute('aria-pressed',String(playing));audioSeek.value=artworkAudio.duration?artworkAudio.currentTime/artworkAudio.duration*100:0;audioSeek.disabled=!Number.isFinite(artworkAudio.duration);audioSeek.setAttribute('aria-valuetext',audioTime(artworkAudio.currentTime));lightboxSound.querySelector('.sound-time').textContent=`${audioTime(artworkAudio.currentTime)} / ${audioTime(artworkAudio.duration)}`;}
function stopArtworkAudio(){artworkAudio.pause();artworkAudio.currentTime=0;updateArtworkAudio();}
audioToggle.addEventListener('click',async()=>{if(artworkAudio.paused){try{await artworkAudio.play();lightboxSound.querySelector('.sound-error').hidden=true;}catch{lightboxSound.querySelector('.sound-error').hidden=false;}}else artworkAudio.pause();});
audioSeek.addEventListener('input',()=>{if(Number.isFinite(artworkAudio.duration))artworkAudio.currentTime=Number(audioSeek.value)/100*artworkAudio.duration;});
['loadedmetadata','timeupdate','play','pause','ended'].forEach(event=>artworkAudio.addEventListener(event,updateArtworkAudio));
artworkAudio.addEventListener('error',()=>{lightboxSound.querySelector('.sound-error').hidden=false;});
dialog.addEventListener('close',stopArtworkAudio);

let photoIndex=0;
let lightboxPhotos=photographs;
let photoReturn;
function renderHome(){
 main.innerHTML=`<section class="home" aria-label="필름 사진"><div class="home-photo"><img src="./photographs/home-film.jpg" width="638" height="636" alt="DAWN의 필름 사진"></div></section>`;
}
const scenePhotos=[
 {image:'film-camera',title:'Photography',href:'#photography'},
 {image:'myvatn-shake',title:'Myvatn — 흔들기',href:'#works/composition/myvatn-shake'},
 {image:'john-cameron',title:'존 카메론 미첼 내한 공연',href:'#works/live/john-cameron-mitchell'},
 {image:'hedwig',title:'Musical - Hedwig and Angry inch',href:'#works/live/hedwig'},
 {image:'sound-artist-2',title:'Sound Art',href:'#works/sound-art'},
 {image:'hexnut',title:'전시 — 파편의 숨',href:'#works/sound-art/hexnut-fragments'},
 {image:'myvatn-like-you-lady-v2',title:'Myvatn — Like you lady',href:'#works/composition/myvatn-like-you-lady'},
 {image:'sound-artist',title:'Sound Art',href:'#works/sound-art'}
];
function shuffledScenes(){const result=[...scenePhotos];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
let sceneOrder=shuffledScenes();
let sceneActive=0;
function renderScenes(){
 main.innerHTML=`<section class="scenes-page" aria-label="Scenes 사진 슬라이드"><header class="scenes-header"><h1>Scenes</h1><button class="scenes-shuffle" aria-label="사진 순서 무작위로 섞기">Shuffle ↗</button></header><div class="scenes-board" aria-label="전체 사진">${sceneOrder.map((photo,index)=>`<a class="scene-slide${index===sceneActive?' is-active':''}" href="${photo.href}" aria-label="${escape(photo.title)} 보기" style="--scene-angle:${(Math.random()*6-3).toFixed(2)}deg"><img src="./scenes/${photo.image}.jpg" alt="${escape(photo.title)}"><span>${escape(photo.title)} ↗</span></a>`).join('')}</div><footer class="scenes-controls"><button data-scene-step="-1" aria-label="이전 사진 강조">←</button><p class="scene-caption" aria-live="polite"></p><button data-scene-step="1" aria-label="다음 사진 강조">→</button></footer></section>`;
 const update=()=>{main.querySelectorAll('.scene-slide').forEach((tile,index)=>tile.classList.toggle('is-active',index===sceneActive));main.querySelector('.scene-caption').textContent=`${String(sceneActive+1).padStart(2,'0')} / ${String(sceneOrder.length).padStart(2,'0')} — ${sceneOrder[sceneActive].title}`;};
 const step=direction=>{sceneActive=(sceneActive+direction+sceneOrder.length)%sceneOrder.length;update();};
 main.querySelectorAll('[data-scene-step]').forEach(button=>button.addEventListener('click',()=>step(Number(button.dataset.sceneStep))));
 main.querySelector('.scenes-shuffle').addEventListener('click',()=>{sceneOrder=shuffledScenes();sceneActive=0;renderScenes();main.querySelector('.scenes-shuffle').focus({preventScroll:true});});
 main.querySelectorAll('.scene-slide').forEach((tile,index)=>tile.addEventListener('focus',()=>{sceneActive=index;update();}));
 const board=main.querySelector('.scenes-board');let touchStart;
 board.addEventListener('touchstart',event=>{touchStart=event.touches[0].clientX;},{passive:true});
 board.addEventListener('touchend',event=>{if(touchStart===undefined)return;const dx=event.changedTouches[0].clientX-touchStart;if(Math.abs(dx)>45)step(dx<0?1:-1);touchStart=undefined;},{passive:true});
 main.querySelector('.scenes-page').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();step(event.key==='ArrowRight'?1:-1);}});update();
}
function renderPhotography(){
 const photos=currentPlace==='All'?photographs:photographs.filter(photo=>photo.place===currentPlace);
 main.innerHTML=`<section class="content"><h1>Photography</h1><p class="page-intro">여행에서 만난 장면들.<span>Film photographs</span></p><div class="place-filters" role="group" aria-label="촬영 지역">${places.map(place=>`<button data-place="${place}" aria-pressed="${place===currentPlace}">${place}</button>`).join('')}</div><div class="photographs">${photos.map(photo=>`<figure><button class="photo-button" data-photo="${photo.id}" aria-label="${photo.place} 필름 사진 크게 보기"><img src="${photo.src}" alt="${photo.place}에서 촬영한 필름 사진" width="${photo.width}" height="${photo.height}" loading="lazy"></button><figcaption>${photo.place}</figcaption></figure>`).join('')}</div></section>`;
 main.querySelectorAll('[data-place]').forEach(button=>button.addEventListener('click',()=>{currentPlace=button.dataset.place;renderPhotography();main.querySelector(`[data-place="${currentPlace}"]`).focus({preventScroll:true});}));
 main.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{photoReturn=button;lightboxPhotos=photographs;photoIndex=photographs.findIndex(photo=>photo.id===button.dataset.photo);renderLightbox();dialog.showModal();}));
}
const workPhotoSets={
 'yoon-soho':[{src:'https://doublekent.co.kr/wp-content/uploads/2021/09/soho-poster-001.jpg',place:'윤소호 단독콘서트 〈SOHO〉 · 2019',alt:'윤소호 첫 단독 콘서트 Soho 포스터'}],
 'john-cameron-mitchell':[{src:'./works/john-cameron-mitchell-poster.png',place:'존 카메론 미첼 내한 공연 · 2024',alt:'존 카메론 미첼 내한 공연 포스터'}],
 'inner-communication-2025':['setup','stage','detail','poster'].map((name,index)=>({src:`./works/inner-communication-${name}-v2.jpg`,place:'김주환 — 내면소통 명상 콘서트 · 2025',alt:index===3?'내면소통 명상 콘서트 포스터':'내면소통 명상 콘서트 현장 사진'})),
 'hedwig':[2019,2021,2024].map(year=>({src:`./works/hedwig-${year}.jpg`,place:`헤드윅 · ${year}`,alt:`${year}년 헤드윅 공연 포스터`})),
 'lee-sujin-solo':[{src:'./works/telic-poster.jpg',place:'이수진 — 텔릭 Telic',alt:'텔릭 Telic 전시 포스터'},{src:'./works/telic-installation.jpg',place:'이수진 — 텔릭 Telic',alt:'텔릭 Telic 전시 현장'}],
 'burning-up':[{src:'./works/burning-up-poster.jpg',place:'버닝업',alt:'버닝업 공연 포스터'}],
 'yeonjeok':[{src:'./works/yeonjeok-poster.jpg',place:'연적',alt:'연적 공연 포스터'}],
 'fantastic-laundry':[{src:'./works/fantastic-laundry-poster.jpg',place:'판타스틱 런드리',alt:'판타스틱 런드리 공연 포스터'}],

 'already-part-of-exhibition':[{src:'./works/audible-body.jpg',place:'Audible Body · 2025',alt:'Audible Body 전시 현장'}],
 'hanwha-pompidou-ceiling':[{src:'./works/hanwha-pompidou-ceiling-v2.jpg',place:'PRELUDE 01: Omyo Cho «Phasic»',alt:'오묘초 Phasic 전시 영상'}],
 'hexnut-fragments':[{src:'./works/hexnut-fragments-full.jpg',place:'HEXNUT — 파편의 숨',alt:'HEXNUT — 파편의 숨 전시 현장'},{src:'./works/gmap-orbit-of-light-poster.jpg',place:'G.MAP — 빛의 궤도 · 2025',alt:'2025 디지털아트 컬처랩 쇼케이스 빛의 궤도 포스터'}],
 'tomorrows-apple':[1,2].map(n=>({src:`./works/tomorrows-apple-${n}.jpg`,place:'내일 건네줄, 사과',alt:n===1?'광주비엔날레 다성의 기록 상영 프로그램 포스터':'내일 건네줄 사과가 포함된 스크리닝 상영 일정'}))
};
function workMedia(entry){
 if(entry.id==='yoon-soho')return '<div class="work-media"><button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="yoon-soho" data-work-photo-index="0" aria-label="윤소호 단독콘서트 SOHO 포스터 크게 보기"><img class="work-thumbnail" src="https://doublekent.co.kr/wp-content/uploads/2021/09/soho-poster-001.jpg" width="1440" height="2038" alt="윤소호 첫 단독 콘서트 Soho 포스터" loading="lazy"></button></div>';
 if(entry.id==='inner-communication-2025')return `<div class="work-media is-multiple">${workPhotoSets[entry.id].map((photo,index)=>`<button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="${entry.id}" data-work-photo-index="${index}" aria-label="${escape(photo.alt)} ${index+1} 크게 보기"><img class="work-thumbnail" src="${photo.src}" alt="${escape(photo.alt)}" loading="lazy"></button>`).join('')}</div>`;
 if(entry.id==='lee-sujin-solo')return `<div class="work-media is-multiple">${workPhotoSets[entry.id].map((photo,index)=>`<button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="lee-sujin-solo" data-work-photo-index="${index}" aria-label="${escape(photo.alt)} 크게 보기"><img class="work-thumbnail" src="${photo.src}" alt="${escape(photo.alt)}" loading="lazy"></button>`).join('')}<button class="exhibition-open" data-exhibition="lee-sujin-solo">전시 소개 보기 ↗</button></div>`;
 if(['burning-up','yeonjeok','fantastic-laundry'].includes(entry.id))return `<div class="work-media"><button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="${entry.id}" data-work-photo-index="0" aria-label="${escape(entry.title)} 포스터 크게 보기"><img class="work-thumbnail" src="${workPhotoSets[entry.id][0].src}" alt="${escape(entry.title)} 공연 포스터" loading="lazy"></button></div>`;
 if(entry.id==='hanwha-pompidou-ceiling')return '<div class="work-media"><button class="work-thumbnail-button" data-work-photo-set="hanwha-pompidou-ceiling" data-work-photo-index="0" aria-label="오묘초 Phasic 사진 크게 보기"><img class="work-thumbnail" src="./works/hanwha-pompidou-ceiling-v2.jpg" width="1672" height="941" alt="PRELUDE 01: Omyo Cho Phasic 영상 작업" loading="lazy"></button><button class="exhibition-open" data-exhibition="hanwha-pompidou-ceiling">작업 소개 보기 ↗</button><a class="work-related-link" href="https://plusprelude.art/?tab=works&amp;work=led" target="_blank" rel="noopener noreferrer">Plus Prelude ↗</a></div>';
 if(entry.id==='tomorrows-apple')return `<div class="work-media is-multiple">${workPhotoSets[entry.id].map((photo,index)=>`<button class="work-thumbnail-button work-poster-thumbnail" data-work-photo-set="${entry.id}" data-work-photo-index="${index}" aria-label="내일 건네줄, 사과 자료 ${index+1} 크게 보기"><img class="work-thumbnail" src="${photo.src}" width="1080" height="1440" alt="${photo.alt}" loading="lazy"></button>`).join('')}</div>`;
 if(entry.description.includes('공간소리 소속'))return '';
 if(entry.id==='yonsei-sound-art-research')return '<div class="work-media"><button class="exhibition-open" data-exhibition="yonsei-sound-art-research">행사 소개 보기 ↗</button></div>';
 if(entry.id==='already-part-of-exhibition')return '<div class="work-media"><button class="work-thumbnail-button" data-work-photo-set="already-part-of-exhibition" data-work-photo-index="0" aria-label="Audible Body 사진 크게 보기"><img class="work-thumbnail" src="./works/audible-body.jpg" alt="Audible Body 전시 현장" loading="lazy"></button><button class="exhibition-open" data-exhibition="already-part-of-exhibition">작품·전시 소개 보기 ↗</button></div>';
 if(entry.id==='hexnut-fragments')return '<div class="work-media"><button class="work-thumbnail-button" data-work-photo-set="hexnut-fragments" data-work-photo-index="0" aria-label="파편의 숨 설치 전경 크게 보기"><img class="work-thumbnail" src="./works/hexnut-fragments.jpg" alt="파편의 숨 설치 전경" loading="lazy"></button><button class="exhibition-open" data-exhibition="hexnut-fragments">작업 소개 보기 ↗</button></div>';
 const video=workVideos[entry.id];
 const items=[];
 if(entry.id==='john-cameron-mitchell')items.push('<button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="john-cameron-mitchell" data-work-photo-index="0" aria-label="존 카메론 미첼 공연 포스터 크게 보기"><img class="work-thumbnail" src="./works/john-cameron-mitchell-poster.png" width="300" height="400" alt="존 카메론 미첼 내한 공연 포스터" loading="lazy"></button>');
 if(entry.id==='jeongsuk')items.push('<a class="work-related-link" href="https://www.kmdb.or.kr/db/kor/detail/movie/K/25460/own/image#dataHashStillDetail1" target="_blank" rel="noopener noreferrer">KMDb 영화 이미지 ↗</a>');
 if(entry.id==='hedwig')items.push(...workPhotoSets.hedwig.map((photo,index)=>`<div class="work-poster-item"><button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="hedwig" data-work-photo-index="${index}" aria-label="${escape(photo.alt)} 크게 보기"><img class="work-thumbnail" src="${photo.src}" alt="${escape(photo.alt)}" loading="lazy"></button><span class="work-poster-year">${[2019,2021,2024][index]}</span></div>`));
 if(entry.id==='omyung')items.push('<a class="work-related-link" href="https://www.kmdb.or.kr/db/kor/detail/movie/K/15258/own/image" target="_blank" rel="noopener noreferrer">KMDb 영화 이미지 ↗</a>');
 if(entry.id==='hexnut-fragments')items.push(`<button class="work-thumbnail-button" data-work-photo-set="hexnut-fragments" data-work-photo-index="0" aria-label="HEXNUT — 파편의 숨 사진 크게 보기"><img class="work-thumbnail" src="./works/hexnut-fragments.jpg" width="720" height="480" alt="HEXNUT — 파편의 숨 전시 현장" loading="lazy"></button>`);
 if(video)for(const [index,clip] of [video,...(video.additionalVideos||[])].entries())items.push(`<a class="work-video-thumbnail" href="${escape(clip.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} YouTube 영상 ${index+1} 보기"><img class="work-thumbnail" style="transform:scale(${Number(clip.thumbnailZoom)||1})" src="https://i.ytimg.com/vi/${clip.videoId}/hqdefault.jpg" width="480" height="360" alt="${escape(entry.title)} 영상 썸네일" loading="lazy"><span>▶ YouTube ↗</span></a>`);
 else if(safeUrl(entry.url))items.push(`<a class="work-related-link" href="${escape(entry.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} 관련 작업">관련 작업 ↗</a>`);
 if(entry.id==='lee-sujin-solo')items.push('<button class="exhibition-open" data-exhibition="lee-sujin-solo">전시 소개 보기 ↗</button>');
 if(entry.id==='hexnut-fragments')items.push('<button class="exhibition-open" data-exhibition="hexnut-fragments">전시 소개 보기 ↗</button>');
 return items.length?`<div class="work-media${items.length>1?' is-multiple':''}">${items.join('')}</div>`:'';
}
function workDescription(entry){
 const record=recordDetails[entry.id];
 if(!record)return `<p>${escape(entry.description).replaceAll("\n","<br>")}</p>`;
 const date=record.date?`<time datetime="${record.date}">${record.date.replaceAll('-','.')} 발매</time>`:escape(entry.year);
 return `<p>${escape(record.type)} · ${escape(record.roles)}</p><p class="record-release">${date}</p>`;
}

function workTitle(entry,media){
 if(exhibitionIntroductions[entry.id])return `<button class="work-title-link exhibition-open" data-exhibition="${escape(entry.id)}">${escape(entry.title)}</button>`;
 const preview=document.createElement('template');
 preview.innerHTML=media;
 const url=safeUrl(preview.content.querySelector('a[href]')?.getAttribute('href'))||safeUrl(entry.url)||safeUrl(recordDetails[entry.id]?.source);
 if(url)return `<a class="work-title-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(entry.title)}</a>`;
 const photo=preview.content.querySelector('[data-work-photo-set]');
 if(photo)return `<button class="work-title-link" data-work-photo-set="${escape(photo.dataset.workPhotoSet)}" data-work-photo-index="0">${escape(entry.title)}</button>`;
 return escape(entry.title);
}

function renderWorks(selectedCategory){
 const category=categories.find(item=>item.id===selectedCategory);
 const group=category||{id:'all',label:'전체 작업'};
 const works=category?entries.filter(entry=>entry.categories.includes(category.id)):entries;
 const filters=[{id:'all',label:`전체 작업 (${entries.length})`},...categories];
 main.innerHTML=`<section class="content text-content"><h1>Works</h1><nav class="work-categories" aria-label="작업 분야">${filters.map(filter=>`<a href="#works/${filter.id}" ${filter.id===group.id?'aria-current="page"':''}>${escape(filter.label)}</a>`).join('')}</nav><section class="work-group" id="group-${group.id}"><h2>${escape(group.label)}<span class="work-sort-label">최신순 · ${works.length}개</span></h2><div>${works.map(entry=>{const media=workMedia(entry);return `<article id="work-${group.id}-${entry.id}" class="work-row${media?' has-thumbnail':''}${['hexnut-fragments','tomorrows-apple','lee-sujin-solo','omyung','hedwig','inner-communication-2025','john-cameron-mitchell'].includes(entry.id)?' has-multiple-media':''}"><span>${escape(entry.year)}</span><div class="work-copy"><h3>${workTitle(entry,media)}</h3>${workDescription(entry)}${!category?`<p class="work-field">${entry.categories.map(id=>escape(categories.find(item=>item.id===id).label)).join(' / ')}</p>`:''}</div>${media}</article>`;}).join('')}</div></section></section>`;
 main.querySelectorAll('.exhibition-open').forEach(button=>button.addEventListener('click',event=>{exhibitionReturn=event.currentTarget;exhibitionDialog.querySelector('.exhibition-body').innerHTML=exhibitionIntroductions[button.dataset.exhibition];exhibitionDialog.querySelector('.exhibition-close').setAttribute('aria-label',button.dataset.exhibition==='yonsei-sound-art-research'?'행사 소개 닫기':button.dataset.exhibition==='hanwha-pompidou-ceiling'?'작업 소개 닫기':'전시 소개 닫기');exhibitionDialog.showModal();exhibitionDialog.scrollTop=0;}));
 main.querySelectorAll('[data-work-photo-set]').forEach(button=>button.addEventListener('click',()=>{photoReturn=button;lightboxPhotos=workPhotoSets[button.dataset.workPhotoSet];photoIndex=Number(button.dataset.workPhotoIndex);renderLightbox();dialog.showModal();}));
 main.querySelectorAll('.work-video-thumbnail img').forEach(image=>image.addEventListener('error',()=>{image.hidden=true;image.closest('a').classList.add('image-unavailable');}));
}
function renderBiography(){
 main.innerHTML=`<section class="content text-content biography"><h1>Biography</h1><section><h2>DAWN / 정다운</h2><p>사운드 아티스트 · 작곡가 · 프로듀서 · 사운드 엔지니어</p><p>음반과 무대, 영상과 전시를 위한 소리를 만듭니다.<br>여행하며 필름 사진을 찍고, 일상의 장면을 기록합니다.</p></section><section><h2>Education</h2>${profile.education.map(item=>`<p>${escape(item.school)}<br>${escape(item.detail)}</p>`).join('')}</section><section><h2>Links</h2>${external('https://www.instagram.com/jeongdawn/','Instagram @jeongdawn')}</section><footer>새벽소리 · 사업자등록번호 102-17-67120</footer></section>`;
}
function renderLightbox(){
 const photo=lightboxPhotos[photoIndex];
 const hasAudio=photoReturn?.dataset.workPhotoSet==='hanwha-pompidou-ceiling';lightboxSound.hidden=!hasAudio;dialog.classList.toggle('has-audio',hasAudio);if(!hasAudio)stopArtworkAudio();updateArtworkAudio();
 dialog.dataset.clickToClose=String(Boolean(photoReturn?.hasAttribute('data-work-photo-set')));
 dialog.querySelector('.lightbox-image').innerHTML=`<img src="${photo.src}" alt="${escape(photo.alt||photo.place+'에서 촬영한 필름 사진')}">`;
 dialog.querySelector('#photo-caption').textContent=`${photo.place}${lightboxPhotos.length>1?` / ${photoIndex+1} — ${lightboxPhotos.length}`:''}`;
 dialog.querySelectorAll('[data-photo-step]').forEach(button=>button.hidden=lightboxPhotos.length<2);
}
function closePhoto(){stopArtworkAudio();dialog.close();if(photoReturn?.isConnected)photoReturn.focus({preventScroll:true});}
dialog.querySelector('.lightbox-close').addEventListener('click',closePhoto);
dialog.querySelector('.lightbox-image').addEventListener('click',()=>{if(dialog.dataset.clickToClose==='true')closePhoto();});
dialog.addEventListener('cancel',event=>{event.preventDefault();closePhoto();});
dialog.querySelectorAll('[data-photo-step]').forEach(button=>button.addEventListener('click',()=>{photoIndex=(photoIndex+Number(button.dataset.photoStep)+lightboxPhotos.length)%lightboxPhotos.length;renderLightbox();}));
dialog.addEventListener('keydown',event=>{if(event.target.closest('.lightbox-sound'))return;if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();photoIndex=(photoIndex+(event.key==='ArrowRight'?1:-1)+lightboxPhotos.length)%lightboxPhotos.length;renderLightbox();}});
function route(){
 const [requestedSection,category,workId]=location.hash.slice(1).split('/');
 const section=['music','selected'].includes(requestedSection)?'scenes':requestedSection;
 const active=menus.some(([id])=>id===section)?section:'home';
 document.body.dataset.page=active;
 document.querySelectorAll('[data-page]').forEach(link=>{if(link.dataset.page===active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 document.body.classList.remove('menu-open');
 document.querySelector('.mobile-menu').setAttribute('aria-expanded','false');
 if(active==='home'){renderHome();}
 if(active==='scenes')renderScenes();
 if(active==='photography')renderPhotography();
 if(active==='works')renderWorks(category);
 if(active==='biography')renderBiography();
 window.scrollTo({top:0,behavior:'auto'});
 if(active==='works'&&categories.some(item=>item.id===category)){const target=workId?document.getElementById(`work-${category}-${workId}`):null;(target||document.getElementById(`group-${category}`)).scrollIntoView({block:'start'});}
}
document.querySelector('.mobile-menu').addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');document.querySelector('.mobile-menu').setAttribute('aria-expanded',String(open));});
window.addEventListener('hashchange',route);
route();
