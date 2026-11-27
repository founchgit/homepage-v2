import {initializeAnalytics} from './analytics.js';
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
 'humanoid-billy':`<h2 id="exhibition-title">뉴빌리티 — 휴머노이드형 서비스 로봇 ‘빌리’</h2><p class="exhibition-meta">[PROJECT REVIEW] Teaser · Billi</p><h3>Credits</h3><p>Client — NEUBILITY<br>Production — 베크 미디어 (WERK) ${external('https://www.instagram.com/werk.media/','@werk.media')}<br>Director — 강기현 (WERK)<br>3D Motion &amp; Visual Effect — 강기현 (WERK)<br>Sound Design — 정다운 ${external('https://www.instagram.com/jeongdawn/','@jeongdawn')}</p>`,
 'tomorrows-apple':`<h2 id="exhibition-title">내일 건네줄 사과</h2><p class="exhibition-meta">Tomorrow, you hand me an apple<br>김윤서 (Kim Yunseo) · 2024 · 19′26″</p><h3>참여</h3><p>Sound Mixing — 정다운 (DAWN)</p><h3>상영 프로그램</h3><p>2026 광주비엔날레 아카이브 프로그램: 스크리닝<br>《다성의 기록: (카운터) 아카이빙 실천》<br>3부. 변사와 스크린 (Byeonsa and Screen)</p><h3>상영 안내</h3><p>프로그램 기간: 2026.11.27–11.29<br>세션 3: 2026.11.28 (토) 16:50–18:10<br>※ 위 시간은 작품이 포함된 세션 전체의 상영 시간입니다.<br>광주독립영화관 · 광주 동구 제봉로 96<br>무료 관람</p><p>${external('https://www.instagram.com/p/DgEfzBjGLuH/','광주비엔날레 공식 상영 안내')}</p>`,
 'hanwha-pompidou-ceiling':`<h2 id="exhibition-title">PRELUDE 01: Omyo Cho «Phasic»</h2><p class="exhibition-meta">2026.11.17 (Tue) – 12.13 (Sun)<br>Daily 10:00–20:00<br>한화생명 본사 63빌딩 G층<br>서울 영등포구 63로 50</p><h3>EXHIBITION CREDITS</h3><p>Organized by — PLUS, Hanwha Finance<br>Curator — 김정연 (Charlotte JungYeon Kim) ${external('https://www.instagram.com/fuite_du_temps/','@fuite_du_temps')}<br>Coordinators — 김정민, 기정현<br>Artwork Production — Studio Omyo Cho<br>Exhibition Design — OUR LABOUR ${external('https://www.instagram.com/our_labour/','@our_labour')}<br>Graphic Design — y! ${external('https://www.instagram.com/yfactorial/','@yfactorial')}<br>Website Development — 박서현 (Seohyun Park)<br>Translation — Maya West<br>Photography &amp; Filming — 조혁수, 소농지 ${external('https://www.instagram.com/sonongji_studio/','@sonongji_studio')}</p><h3>VIDEO CREDITS</h3><p>Produced by — Studio Omyo Cho<br>Video Production — 벡오 (Behgoh) ${external('https://www.instagram.com/behgoh/','@behgoh')}, 강기현 (Kang Keehyun) ${external('https://www.instagram.com/werk.media/','@werk.media')}<br>Sound — 정다운 (DAWN) ${external('https://www.instagram.com/jeongdawn/','@jeongdawn')}</p><p>Single-channel video, 2′30″</p><p>Hanwha Life Building (63 Building), G Floor<br>50, 63-ro, Yeongdeungpo-gu, Seoul</p><p>${external('https://plusprelude.art/?tab=works&work=led','Plus Prelude — 작업 보기')}</p>`,
 'yonsei-sound-art-research':`<h2 id="exhibition-title">2025 가을 성암 페차쿠차</h2><p class="exhibition-meta">AI 시대 창작과 커뮤니케이션의 재구성<br>2025. 10. 30(목) 17:30–19:00<br>연세대학교 성암관 307호</p><h3>딥러닝 기반 사운드 아트 사례 연구</h3><p>발표: 정다운 (미디어아트 석사과정)</p><p>성암 페차쿠차는 대학원 내 연구·창작 활동의 공유와 확산을 도모하고 과거와 현재의 지식을 잇는 대화의 장을 마련합니다.</p><p>각 전공의 졸업생, 재학생, 교수 등이 참여하여 학술 연구, 창작 경험, 전문적 통찰 등을 자유로운 형식으로 발표하게 됩니다!</p><p>《페차쿠차》에서는 재학생과 졸업생의 5분 발표가 이어집니다. 각자의 연구와 창작이 교차하며, ‘AI 시대의 창작과 커뮤니케이션’이라는 큰 주제 아래에서 다양한 실험과 사유가 펼쳐집니다.</p><p>짧지만 밀도 있는 발표 속에서 서로의 시선과 질문이 만나 새로운 영감을 나누는 시간이 될 것입니다.</p><div class="event-posters"><img src="./works/pechakucha-2025-1.jpg" width="1587" height="2245" alt="2025 가을 성암 페차쿠차 행사 포스터"><img src="./works/pechakucha-2025-2.jpg" width="1587" height="2245" alt="성암 페차쿠차 주제 및 발표자: 정다운, 딥러닝 기반 사운드 아트 사례 연구" loading="lazy"></div>`,
 'already-part-of-exhibition':`<h2 id="exhibition-title">Audible Body</h2><p class="exhibition-meta">2025 · 인터랙티브 사운드 설치</p><h3>작품 소개</h3><p>소리를 통해 자신의 몸을 느끼고, 그 감각을 따라 스스로를 바라보는 경험을 유도하는 작품이다. 걸음의 진동이 소리로 확장되고, 관객은 자신의 움직임이 만들어내는 소리를 들으며 ‘나’의 존재와 경계를 감각한다.</p><h3>작품 구성</h3><ol class="artwork-materials"><li>나무, 오디오 시스템 (컨택트 마이크·컴퓨터·스피커)<br>240 × 40 × 3 cm</li><li>카메라, 프로젝터, 컴퓨터<br>가변 크기</li><li>전자 스위치<br>15 × 12 × 5 cm</li></ol><h3>크레딧</h3><p>AI Vision Developer — 김준현 ${external('https://www.instagram.com/anvry_jh/','@anvry_jh')}<br>Video Archive — 손샛별 ${external('https://www.instagram.com/bee_ver_son/','@bee_ver_son')}</p><h3>전시 정보</h3><p>《이미 당신도 전시의 일부》<br>2025.07.04–07.06<br>정금형 작업실 겸 수장고 · 부천</p><p>‘(현시원) in 정금형 작업실 겸 수장고’의 일부로 열린 전시다. 작가 정금형의 제안을 받은 현시원이 연세대학교 커뮤니케이션대학원 ‘전시 매체’ 수업 (2025년 1학기) 참여자들을 작업실과 수장고로 초대했다.</p><h3>참여 작가</h3><p>벡오, 손샛별, 신수찬, 임민지, 정다운</p>`,
 'lee-sujin-solo':`<h2 id="exhibition-title">이수진 Jade Sujin LEE 《텔릭 Telic》</h2><p class="exhibition-meta">2023 서울문화재단 유망예술지원 선정전시<br>2023.10.17.(화)–10.29(일)<br>서울문화재단 청년예술청 SAPY 그레이룸</p><h3>정다운의 역할</h3><p>인터랙티브 사운드 디자인을 맡아 Max 프로그래밍을 통해 관객의 참여에 반응하는 사운드 시스템을 구현했다. 관객과 작품 사이의 상호작용을 소리로 연결하며, 전시 공간의 청각적 경험을 구성했다.</p><h3>작업 소개</h3><p>소리와 빛으로 요동치는 울림의 공간 속 매개들만의 퍼포먼스는 언어가 없는 자들인 사물이나 동물, 식물, 박테리아, 혹은 땅속 미생물까지 정치적 주체가 되는 세계에 대한 상상을 펼쳐지게 한다. ‘환청과 소환’, ‘마찰과 중첩’, ‘파괴와 섞임’, 관객들이 소리를 자발적으로 발생시키며 어디론가에서 불러들여진 초월적 경험은 마치 대지 아래 지하세계에 도사리고 있는 거대한 심장박동과 같이 신비한 이야기들이 생성되는 비문의 우주론이 이루어질 것이다.</p><h3>전시 안내</h3><p>일시: 2023.10.17.(화)–10.29(일)<br>오프닝: 2023.10.20(금) 오후 5:00<br>관람시간: 14:00–19:00, 월요일 휴관<br>장소: 서울문화재단 청년예술청 SAPY 그레이룸<br>주최·주관: 서울문화재단<br>관람예약: ${external('https://www.instagram.com/jadesujinlee_studio/','작가 Instagram 프로필 링크 참조')}<br>문의: 박수현 코디네이터 <a href="mailto:suhyun_p@naver.com">suhyun_p@naver.com</a></p><h3>도움을 주신 분들</h3><p>조명: 우기성<br>음향디자인: 김용현<br>인터렉션 사운드 디자인: 정다운<br>구조제작: 김동현<br>나레이터: 두이<br>퍼포먼스: 선은지<br>그래픽디자인: 마빈킴(스파인프레스)<br>코디네이터: 박수현<br>제작/진행도움: 박정선, 임현정, 장찬희, 문제욱</p><img class="artwork-detail-image" src="./works/telic-installation.jpg" alt="텔릭 Telic 전시 현장" loading="lazy"><img class="artwork-detail-poster" src="./works/telic-poster.jpg" alt="이수진 Jade Sujin LEE 텔릭 Telic 전시 포스터" loading="lazy">`,
 'hexnut-fragments':`<h2 id="exhibition-title">HEXNUT — 파편의 숨</h2><p class="exhibition-meta">미디어아트 프로젝트 · 사운드 총괄<br>2025 · 광주미디어아트플랫폼 G.MAP</p><h3>작품 소개</h3><p>〈파편의 숨〉은 미디어아트 팀 HEXNUT이 ‘깨뜨려 이어붙이기’를 주제로 제작한 세 작품으로 구성된다. 3D 애니메이션 〈ㅅ〉, 8채널 서라운드 사운드 설치 〈ㅜ〉, 나전칠기 작품 〈ㅁ〉을 통해 영상·소리·물질을 아우르는 프로젝트를 선보인다.</p><h3>사운드 작업</h3><p>정다운은 프로젝트의 사운드 총괄로 참여해 필드 레코딩 워크숍을 기획하고, 수집한 소리를 바탕으로 8채널 공간음향 설치를 제작했다. 사운드 믹싱에도 공동 참여하며, 소리의 수집부터 다채널 설치 제작과 믹싱에 이르는 작업을 수행했다.</p><h3 class="artwork-part-heading">파편의 숨 — ㅅ</h3><p>3D 애니메이션 · 1분 31초<br>전시 장소 — G.MAP 미디어월, 광주송정역 5번 출구 앞 (창의벨트 5권역)<br>해외 상영 — 미국 뉴욕 타임스퀘어 전광판</p><h3 class="artwork-part-heading">파편의 숨 — ㅜ</h3><p>8채널 서라운드 사운드 설치<br>8-Channel Spatial Audio Installation<br>전시 장소 — G.MAP 3층</p><h3 class="artwork-part-heading">파편의 숨 — ㅁ</h3><p>65 × 39 cm<br>나무에 옻칠과 자개 (나전칠기)<br>전시 장소 — G.MAP 3층</p><h3>크레딧</h3><p>아티스트 — hexnut<br>기획 — 손샛별, 신수찬, 임민지<br>프로듀서 — 비고<br>3D 영상 — 강기현(WERK MEDIA), 벡오<br>사운드 총괄 — 정다운<br>사운드 믹싱 — 김용현, 정다운<br>공간음향 디자인 — 송선혁, 김성원<br>전시 설치 — 이종혁<br>기록 사진, 영상 — 박준하, 강지훈(WERK MEDIA)<br>의상 스타일링 — 정겨운 작업실<br>제작 지원 — G.MAP (광주미디어아트플랫폼)</p><h3>도움 주신 분들</h3><p>김현정 디렉터<br>여비진 옻칠 아카데미 최은정<br>스튜디오 일로 김용현 조정현</p><h3>전시 스케치 — 8채널 공간음향 설치</h3><video class="artwork-video" controls playsinline preload="metadata" aria-label="8채널 공간음향 설치 전시 스케치"><source src="./works/hexnut-spatial-sketch.mp4#t=0.1" type="video/mp4"></video><h3>설치 전경</h3><img class="artwork-detail-image" src="./works/hexnut-fragments-full.jpg" alt="파편의 숨 설치 전경" loading="lazy"><h3>작품 영상 · 전시 기록</h3><p>${external('https://youtu.be/NHQVm3LUUVc','전시 영상 1')}&nbsp; ${external('https://youtu.be/OOTew75xRYU','전시 영상 2')}</p><h3>합주 기록</h3><img class="artwork-detail-image" src="./works/hexnut-rehearsal.jpg" alt="HEXNUT 합주 현장" loading="lazy"><p>${external('https://youtu.be/S72bNOe3V0c','라이브 퍼포먼스')}</p><h3>타임스퀘어 상영 기록</h3><img class="artwork-detail-image" src="./works/hexnut-times-square.jpg" alt="뉴욕 타임스퀘어 전광판 파편의 숨 상영 기록" loading="lazy"><h3>전시 정보</h3><p>디지털아트 컬처랩 쇼케이스 : 빛의 궤도<br>2025.12.09–12.21 · 광주미디어아트플랫폼 G.MAP</p>`
};
{
 const entry=entries.find(item=>item.id==='yeonjeok');
 exhibitionIntroductions['yeonjeok']=`<h2 id="exhibition-title">${escape(entry.title)}</h2><p class="exhibition-meta">${escape(entry.year)}</p>${workDescription(entry)}<h3>크레딧</h3><p>원작 — 김호연 소설 『연적』<br>프로듀서 — 황기현<br>각색·연출 — 홍현우<br>음악감독 — 정다운</p>${safeUrl(entry.url)?`<p>${external(entry.url,'관련 자료 보기')}</p>`:''}<h3>관련 기사</h3><p>${external('https://www.artsnculture.com/news/articleView.html?idxno=5113','아츠앤컬쳐 — 연적 관련 기사')}</p>`;
}
exhibitionIntroductions['paik-not-a-stain']=`<h2 id="exhibition-title">백승환 단독공연 〈not a stain...〉</h2><p class="exhibition-meta">2026.07.31 (금) 20:00 · 고라니 특공대</p><p>연주 참여</p><h3>공연 정보</h3><p>공연기간 — 2026.07.31 (금)<br>공연시간 — 금요일 20:00<br>러닝타임 — 1시간 30분<br>관람연령 — 전체 관람가</p>`;
for(const id of ['three-leaf-clover','burning-up','fantastic-laundry']){
 const entry=entries.find(item=>item.id===id);
 exhibitionIntroductions[id]=`<h2 id="exhibition-title">${escape(entry.title)}</h2><p class="exhibition-meta">${escape(entry.year)}</p>${workDescription(entry)}<h3>크레딧</h3><p>연출 — 윤다흰<br>음악감독 — 정다운<br>안무감독 — 윤이나</p>${safeUrl(entry.url)?`<p>${external(entry.url,'관련 자료 보기')}</p>`:''}`;
}
let exhibitionReturn;
function closeExhibition(){exhibitionDialog.close();if(exhibitionReturn?.isConnected)exhibitionReturn.focus({preventScroll:true});}
exhibitionDialog.querySelector('.exhibition-close').addEventListener('click',closeExhibition);
exhibitionDialog.addEventListener('click',event=>{
 if(event.target.closest('a,button,video,audio,input,select,textarea,summary'))return;
 if(window.getSelection()?.toString())return;
 closeExhibition();
});
exhibitionDialog.addEventListener('close',()=>{exhibitionDialog.querySelectorAll('video').forEach(video=>video.pause());});
exhibitionDialog.addEventListener('cancel',event=>{event.preventDefault();closeExhibition();});
const main=document.querySelector('#main');
const dialog=document.querySelector('.lightbox');
dialog.insertAdjacentHTML('beforeend','<nav class="lightbox-thumbnails" aria-label="작업 사진 선택" hidden></nav>');
dialog.insertAdjacentHTML('beforeend',`<div class="lightbox-sound" hidden><audio preload="metadata" src="./audio/hanwha-pompidou.m4a"></audio><div class="sound-player-row"><button class="sound-toggle" type="button" aria-label="사운드 재생" aria-pressed="false">▶</button><input class="sound-seek" type="range" min="0" max="100" step="0.1" value="0" aria-label="사운드 재생 위치"><span class="sound-time">00:00 / --:--</span><label class="sound-volume-control"><span>Vol.</span><input class="sound-volume" type="range" min="0" max="100" step="1" value="100" aria-label="사운드 볼륨" aria-valuetext="100%"></label></div><p class="sound-credit">Sound design · 정다운</p><p class="sound-error" role="status" hidden>음원을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p></div>`);
dialog.insertAdjacentHTML('beforeend','<aside class="lightbox-description exhibition-body" hidden></aside>');
const lightboxSound=dialog.querySelector('.lightbox-sound');
const artworkAudio=lightboxSound.querySelector('audio');
const audioToggle=lightboxSound.querySelector('.sound-toggle');
const audioSeek=lightboxSound.querySelector('.sound-seek');
const audioTime=value=>{if(!Number.isFinite(value))return '--:--';return `${String(Math.floor(value/60)).padStart(2,'0')}:${String(Math.floor(value%60)).padStart(2,'0')}`;};
function updateArtworkAudio(){const playing=!artworkAudio.paused;audioToggle.textContent=playing?'Ⅱ':'▶';audioToggle.setAttribute('aria-label',playing?'사운드 일시정지':'사운드 재생');audioToggle.setAttribute('aria-pressed',String(playing));audioSeek.value=artworkAudio.duration?artworkAudio.currentTime/artworkAudio.duration*100:0;audioSeek.disabled=!Number.isFinite(artworkAudio.duration);audioSeek.setAttribute('aria-valuetext',audioTime(artworkAudio.currentTime));lightboxSound.querySelector('.sound-time').textContent=`${audioTime(artworkAudio.currentTime)} / ${audioTime(artworkAudio.duration)}`;}
function stopArtworkAudio(){artworkAudio.pause();artworkAudio.currentTime=0;updateArtworkAudio();}
audioToggle.addEventListener('click',async()=>{if(artworkAudio.paused){try{prepareArtworkVolume();const resume=artworkAudioContext?.resume();await Promise.all([artworkAudio.play(),resume]);lightboxSound.querySelector('.sound-error').hidden=true;}catch{lightboxSound.querySelector('.sound-error').hidden=false;}}else artworkAudio.pause();});
audioSeek.addEventListener('input',()=>{if(Number.isFinite(artworkAudio.duration))artworkAudio.currentTime=Number(audioSeek.value)/100*artworkAudio.duration;});
const audioVolume=lightboxSound.querySelector('.sound-volume');
let artworkAudioContext,artworkGain;
function prepareArtworkVolume(){
 if(!artworkAudioContext){const Context=window.AudioContext||window.webkitAudioContext;if(Context){const context=new Context();const gain=context.createGain();const source=context.createMediaElementSource(artworkAudio);source.connect(gain);gain.connect(context.destination);artworkAudioContext=context;artworkGain=gain;}}
 const volume=Number(audioVolume.value)/100;
 if(artworkGain){artworkAudio.volume=1;artworkGain.gain.setTargetAtTime(volume,artworkAudioContext.currentTime,.015);}else artworkAudio.volume=volume;
 artworkAudio.muted=false;audioVolume.setAttribute('aria-valuetext',`${audioVolume.value}%`);
}
audioVolume.addEventListener('input',prepareArtworkVolume);
['loadedmetadata','timeupdate','play','pause','ended'].forEach(event=>artworkAudio.addEventListener(event,updateArtworkAudio));
artworkAudio.addEventListener('error',()=>{lightboxSound.querySelector('.sound-error').hidden=false;});
dialog.addEventListener('close',()=>{dialog.querySelector('.lightbox-image iframe')?.remove();stopArtworkAudio();dialog.querySelectorAll('video').forEach(video=>video.pause());});

let hexMediaTab="photos",hexVideoIndex=0;
const hexVideos=[{title:"전시 스케치 · 8채널 공간음향 설치",src:"./works/hexnut-spatial-sketch.mp4#t=0.1"},{title:"전시 영상 1",id:"NHQVm3LUUVc"},{title:"전시 영상 2",id:"OOTew75xRYU"},{title:"라이브 퍼포먼스",id:"S72bNOe3V0c"}];
let photoIndex=0;
let lightboxPhotos=photographs;
let photoReturn;
function renderHome(){
 main.innerHTML=`<section class="home" aria-label="필름 사진"><div class="home-photo"><img src="./photographs/home-film.jpg" width="638" height="636" alt="DAWN의 필름 사진"></div></section>`;
}
const scenePhotos=[
 {image:'./works/phasic-1.jpg',title:'PRELUDE 01: Omyo Cho «Phasic»',part:'사운드 아트·전시',href:'#works/sound-art/hanwha-pompidou-ceiling'},
 {image:'./works/hexnut-fragments-full.jpg',title:'HEXNUT — 파편의 숨',part:'사운드 아트·전시',href:'#works/sound-art/hexnut-fragments'},
 {image:'./scenes/myvatn-shake.jpg',title:'Myvatn — 흔들기',part:'음반·음악 제작',href:'#works/composition/myvatn-shake'},
 {image:'./scenes/myvatn-like-you-lady-v2.jpg',title:'Myvatn — Like you lady',part:'음반·음악 제작',href:'#works/composition/myvatn-like-you-lady'},
 {image:'./scenes/john-cameron.jpg',title:'존 카메론 미첼 내한 공연',part:'공연·연주',href:'#works/live/john-cameron-mitchell'},
 {image:'./scenes/hedwig.jpg',title:'Musical — Hedwig and the Angry Inch',part:'공연·연주',href:'#works/live/hedwig'},
 {image:'./works/audible-body.jpg',title:'Audible Body',part:'사운드 아트·전시',href:'#works/sound-art/already-part-of-exhibition'},
 {image:'./scenes/film-camera.jpg',title:'Photography',part:'사진',href:'#photography'}
];
function openWorkIntroduction(id,trigger){
 if(workPhotoSets[id]){photoReturn=main.querySelector(`[data-work-photo-set="${id}"]`)||trigger;photoReturn.dataset.workPhotoSet=id;lightboxPhotos=workPhotoSets[id];photoIndex=0;hexMediaTab=["john-cameron-mitchell","hedwig"].includes(id)?"videos":"photos";renderLightbox();if(!dialog.open)dialog.showModal();return;}
 if(workVideos[id]||youtubeClip(entries.find(entry=>entry.id===id)?.url)){openWorkVideo(id,undefined,trigger);return;}
 const content=exhibitionIntroductions[id];if(!content)return;
 exhibitionReturn=trigger;exhibitionDialog.querySelector('.exhibition-body').innerHTML=content;
 exhibitionDialog.querySelector('.exhibition-close').setAttribute('aria-label','작업 소개 닫기');
 if(!exhibitionDialog.open)exhibitionDialog.showModal();exhibitionDialog.scrollTop=0;
}
const myvatnWorks=entries.filter(entry=>entry.id.startsWith('myvatn-'));
for(const entry of entries.filter(entry=>entry.id.startsWith('myvatn-')||['john-cameron-mitchell','hedwig'].includes(entry.id))){
 const clip=workVideos[entry.id];const url=clip?.url||safeUrl(entry.url);
 const related=entry.id.startsWith('myvatn-')?`<h3>Myvatn 관련 작업</h3><div class="related-works">${myvatnWorks.filter(item=>item.id!==entry.id).map(item=>`<button type="button" data-related-work="${item.id}">${escape(item.title)} · ${escape(item.year)} ↗</button>`).join('')}</div>`:'';
 exhibitionIntroductions[entry.id]=`<h2 id="exhibition-title">${escape(entry.title)}</h2><p class="exhibition-meta">${escape(entry.year)}</p>${workDescription(entry)}${url?`<p>${external(url,'영상·관련 자료 보기')}</p>`:''}${related}`;
}
exhibitionDialog.addEventListener('click',event=>{const button=event.target.closest('[data-related-work]');if(button)openWorkIntroduction(button.dataset.relatedWork,exhibitionReturn);});
function renderScenes(){
 main.innerHTML=`<section class="scenes-page" aria-label="대표 작업"><header class="scenes-header"><h1>Scenes</h1><span class="scenes-intro">Selected works</span></header><div class="scenes-board">${scenePhotos.map(photo=>`<a class="scene-slide" href="${photo.href}" aria-label="${escape(photo.title)} 보기"><div class="scene-image"><img src="${photo.image}" alt="${escape(photo.title)}"></div><div class="scene-copy"><p>${escape(photo.part)}</p><h2>${escape(photo.title)}</h2></div></a>`).join('')}</div></section>`;
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
 'just-j-min':[{src:'./works/just-j-min-poster.jpg',place:'Just J-Min : 제이민 첫번째 콘서트',alt:'2025 Just J-Min 제이민 첫번째 콘서트 포스터'}],
 'omyung':[1,2].map(n=>({src:`./works/omyung-still-${n}.jpg`,place:'오명',alt:`영화 오명 스틸 사진 ${n}`})),
 'paik-not-a-stain':[{src:'./works/paik-not-a-stain-live.jpg',place:'백승환 단독공연 〈not a stain...〉',alt:'백승환 단독공연 무대와 관객 전경'},{src:'./works/paik-not-a-stain-poster.jpg',place:'백승환 단독공연 〈not a stain...〉 · 공연 포스터',alt:'2026년 7월 31일 백승환 단독공연 not a stain 포스터'}],
 'hedwig':[2019,2021,2024].map(year=>({src:`./works/hedwig-${year}.jpg`,place:`헤드윅 · ${year}`,alt:`${year}년 헤드윅 공연 포스터`})),
 'lee-sujin-solo':[{src:'./works/telic-poster.jpg',place:'이수진 — 텔릭 Telic',alt:'텔릭 Telic 전시 포스터'},{src:'./works/telic-installation.jpg',place:'이수진 — 텔릭 Telic',alt:'텔릭 Telic 전시 현장'}],
 'burning-up':[{src:'./works/burning-up-poster.jpg',place:'버닝업',alt:'버닝업 공연 포스터'}],
 'yeonjeok':[{src:'./works/yeonjeok-poster.jpg',place:'연적',alt:'연적 공연 포스터'},...[1,2,3].map(n=>({src:`./works/yeonjeok-live-${n}.jpg`,place:'연적',alt:`연적 공연 사진 ${n}`}))],
 'fantastic-laundry':[{src:'./works/fantastic-laundry-poster.jpg',place:'판타스틱 런드리',alt:'판타스틱 런드리 공연 포스터'}],

 'already-part-of-exhibition':[{src:'./works/audible-body.jpg',place:'Audible Body · 2025',alt:'Audible Body 전시 현장'},{src:'./works/audible-body-exhibition.jpeg',place:'Audible Body · 전시 포스터',alt:'(현시원) in 정금형 작업실 겸 수장고 전시 포스터'}],
 'hanwha-pompidou-ceiling':[1,2,3].map(n=>({src:`./works/phasic-${n}.jpg`,place:'PRELUDE 01: Omyo Cho «Phasic»',alt:`오묘초 Phasic 천장 상영 전경 ${n}`})),
 'hexnut-fragments':[{src:'./works/hexnut-fragments-full.jpg',place:'HEXNUT — 파편의 숨',alt:'HEXNUT — 파편의 숨 전시 현장'},{src:'./works/hexnut-rehearsal.jpg',place:'HEXNUT — 파편의 숨 · 합주 기록',alt:'HEXNUT 합주 현장'},{src:'./works/hexnut-times-square.jpg',place:'HEXNUT — 파편의 숨 · 타임스퀘어 상영 기록',alt:'뉴욕 타임스퀘어 전광판 파편의 숨 상영 기록'},...[2,3].map(n=>({src:`./works/hexnut-rehearsal-${n}.jpg`,place:'HEXNUT — 파편의 숨 · 제작 기록',alt:n===2?'HEXNUT 녹음 현장':'HEXNUT 합주 작업 노트와 사운드 장비'})),{src:'./works/hexnut-outdoor-screen.jpg',place:'HEXNUT — 파편의 숨 · 야외 전광판 상영 기록',alt:'야외 대형 전광판에서 상영 중인 HEXNUT 작품'},{src:'./works/hexnut-rehearsal-4.jpg',place:'HEXNUT — 파편의 숨 · 합주 기록',alt:'건반과 샘플러를 연주하는 HEXNUT 합주 현장'}].map((_,index,photos)=>photos[[0,2,5,1,3,4,6][index]]).concat({src:'./works/gmap-orbit-of-light-poster.jpg',place:'HEXNUT — 파편의 숨 · 전시 포스터',alt:'2025 디지털아트 컬처랩 쇼케이스 빛의 궤도 전시 포스터'}),
 'tomorrows-apple':[1,2].map(n=>({src:`./works/tomorrows-apple-${n}.jpg`,place:'내일 건네줄 사과',alt:n===1?'광주비엔날레 다성의 기록 상영 프로그램 포스터':'내일 건네줄 사과가 포함된 스크리닝 상영 일정'}))
};
function workMedia(entry){
 const template=document.createElement('template');
 template.innerHTML=buildWorkMedia(entry);
 if(['john-cameron-mitchell','hedwig'].includes(entry.id)){template.content.querySelectorAll('[data-work-photo-set]').forEach(button=>(button.closest('.work-poster-item')||button).remove());template.content.querySelector('.work-media')?.classList.remove('is-multiple');}
 if(workPhotoSets[entry.id]?.length)template.content.querySelectorAll('.exhibition-open').forEach(button=>button.remove());
 const photos=[...template.content.querySelectorAll('.work-thumbnail-button[data-work-photo-set]')];
 if(photos.length>1){
  photos.slice(1).forEach(button=>{const item=button.closest('.work-poster-item');(item||button).remove();});
  const representative=photos[0];
  const item=representative.closest('.work-poster-item');
  if(item)item.replaceWith(representative);
  const media=template.content.querySelector('.work-media');
  if(media)media.classList.toggle('is-multiple',media.querySelectorAll('.work-thumbnail-button,.work-video-thumbnail').length>1);
 }
 return template.innerHTML;
}
function buildWorkMedia(entry){
 if(entry.id==='just-j-min')return '<div class="work-media"><button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="just-j-min" data-work-photo-index="0" aria-label="제이민 공연 포스터 크게 보기"><img class="work-thumbnail" src="./works/just-j-min-poster.jpg" alt="제이민 첫번째 콘서트 포스터" loading="lazy"></button></div>';
 if(entry.id==='yoon-soho')return '<div class="work-media"><button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="yoon-soho" data-work-photo-index="0" aria-label="윤소호 단독콘서트 SOHO 포스터 크게 보기"><img class="work-thumbnail" src="https://doublekent.co.kr/wp-content/uploads/2021/09/soho-poster-001.jpg" width="1440" height="2038" alt="윤소호 첫 단독 콘서트 Soho 포스터" loading="lazy"></button></div>';
 if(entry.id==='inner-communication-2025')return `<div class="work-media is-multiple">${workPhotoSets[entry.id].map((photo,index)=>`<button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="${entry.id}" data-work-photo-index="${index}" aria-label="${escape(photo.alt)} ${index+1} 크게 보기"><img class="work-thumbnail" src="${photo.src}" alt="${escape(photo.alt)}" loading="lazy"></button>`).join('')}</div>`;
 if(entry.id==='lee-sujin-solo')return `<div class="work-media is-multiple">${workPhotoSets[entry.id].map((photo,index)=>`<button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="lee-sujin-solo" data-work-photo-index="${index}" aria-label="${escape(photo.alt)} 크게 보기"><img class="work-thumbnail" src="${photo.src}" alt="${escape(photo.alt)}" loading="lazy"></button>`).join('')}<button class="exhibition-open" data-exhibition="lee-sujin-solo">전시 소개 보기 ↗</button></div>`;
 if(['burning-up','yeonjeok','fantastic-laundry'].includes(entry.id))return `<div class="work-media"><button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="${entry.id}" data-work-photo-index="0" aria-label="${escape(entry.title)} 포스터 크게 보기"><img class="work-thumbnail" src="${workPhotoSets[entry.id][0].src}" alt="${escape(entry.title)} 공연 포스터" loading="lazy"></button></div>`;
 if(entry.id==='hanwha-pompidou-ceiling')return '<div class="work-media"><button class="work-thumbnail-button" data-work-photo-set="hanwha-pompidou-ceiling" data-work-photo-index="0" aria-label="오묘초 Phasic 사진 크게 보기"><img class="work-thumbnail" src="./works/phasic-1.jpg" width="1672" height="941" alt="PRELUDE 01: Omyo Cho Phasic 영상 작업" loading="lazy"></button><button class="exhibition-open" data-exhibition="hanwha-pompidou-ceiling">작업 소개 보기 ↗</button><a class="work-related-link" href="https://plusprelude.art/?tab=works&amp;work=led" target="_blank" rel="noopener noreferrer">Plus Prelude ↗</a></div>';
 if(entry.id==='tomorrows-apple')return `<div class="work-media is-multiple">${workPhotoSets[entry.id].map((photo,index)=>`<button class="work-thumbnail-button work-poster-thumbnail" data-work-photo-set="${entry.id}" data-work-photo-index="${index}" aria-label="내일 건네줄 사과 자료 ${index+1} 크게 보기"><img class="work-thumbnail" src="${photo.src}" width="1080" height="1440" alt="${photo.alt}" loading="lazy"></button>`).join('')}<button class="exhibition-open" data-exhibition="tomorrows-apple">작업 소개</button></div>`;
 if(entry.description.includes('공간소리 소속'))return '';
 if(entry.id==='yonsei-sound-art-research')return '<div class="work-media"><button class="exhibition-open" data-exhibition="yonsei-sound-art-research">행사 소개 보기 ↗</button></div>';
 if(entry.id==='already-part-of-exhibition')return '<div class="work-media"><button class="work-thumbnail-button" data-work-photo-set="already-part-of-exhibition" data-work-photo-index="0" aria-label="Audible Body 사진 크게 보기"><img class="work-thumbnail" src="./works/audible-body.jpg" alt="Audible Body 전시 현장" loading="lazy"></button><button class="exhibition-open" data-exhibition="already-part-of-exhibition">작품·전시 소개 보기 ↗</button></div>';
 if(entry.id==='hexnut-fragments')return '<div class="work-media"><button class="work-thumbnail-button" data-work-photo-set="hexnut-fragments" data-work-photo-index="0" aria-label="파편의 숨 설치 전경 크게 보기"><img class="work-thumbnail" src="./works/hexnut-fragments.jpg" alt="파편의 숨 설치 전경" loading="lazy"></button><button class="exhibition-open" data-exhibition="hexnut-fragments">작업 소개 보기 ↗</button></div>';
 if(entry.id==='paik-not-a-stain')return '<div class="work-media"><button class="work-thumbnail-button" data-work-photo-set="paik-not-a-stain" data-work-photo-index="0" aria-label="백승환 공연 사진 크게 보기"><img class="work-thumbnail" src="./works/paik-not-a-stain-live.jpg" alt="백승환 단독공연 무대와 관객 전경" loading="lazy"></button></div>';
 const video=workVideos[entry.id];
 const items=[];
 if(entry.id==='john-cameron-mitchell')items.push('<button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="john-cameron-mitchell" data-work-photo-index="0" aria-label="존 카메론 미첼 공연 포스터 크게 보기"><img class="work-thumbnail" src="./works/john-cameron-mitchell-poster.png" width="300" height="400" alt="존 카메론 미첼 내한 공연 포스터" loading="lazy"></button>');
 if(entry.id==='jeongsuk')items.push('<a class="work-related-link" href="https://www.kmdb.or.kr/db/kor/detail/movie/K/25460/own/image#dataHashStillDetail1" target="_blank" rel="noopener noreferrer">KMDb 영화 이미지 ↗</a>');
 if(entry.id==='hedwig')items.push(...workPhotoSets.hedwig.map((photo,index)=>`<div class="work-poster-item"><button class="work-thumbnail-button performance-poster-thumbnail" data-work-photo-set="hedwig" data-work-photo-index="${index}" aria-label="${escape(photo.alt)} 크게 보기"><img class="work-thumbnail" src="${photo.src}" alt="${escape(photo.alt)}" loading="lazy"></button><span class="work-poster-year">${[2019,2021,2024][index]}</span></div>`));
 if(entry.id==='omyung')items.push('<button class="work-thumbnail-button" data-work-photo-set="omyung" data-work-photo-index="0" aria-label="영화 오명 사진 크게 보기"><img class="work-thumbnail" src="./works/omyung-still-1.jpg" alt="영화 오명 스틸 사진" loading="lazy"></button>');
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
 if(workPhotoSets[entry.id]?.length)return `<button class="work-title-link exhibition-open" data-exhibition="${escape(entry.id)}">${escape(entry.title)}</button>`;
 if(workVideos[entry.id])return `<button class="work-title-link" data-work-video="${escape(entry.id)}">${escape(entry.title)}</button>`;
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
 main.innerHTML=`<section class="content text-content"><h1>Works</h1><nav class="work-categories" aria-label="작업 분야">${filters.map(filter=>`<a href="#works/${filter.id}" ${filter.id===group.id?'aria-current="page"':''}>${escape(filter.label)}</a>`).join('')}</nav><section class="work-group" id="group-${group.id}"><h2>${escape(group.label)}<span class="work-sort-label">최신순 · ${works.length}개</span></h2><div>${works.map(entry=>{const media=workMedia(entry);return `<article id="work-${group.id}-${entry.id}" data-work-id="${escape(entry.id)}" class="work-row${media?' has-thumbnail':''}${media.includes('is-multiple')?' has-multiple-media':''}"><span>${escape(entry.year)}</span><div class="work-copy"><h3>${workTitle(entry,media)}</h3>${workDescription(entry)}${!category?`<p class="work-field">${entry.categories.map(id=>escape(categories.find(item=>item.id===id).label)).join(' / ')}</p>`:''}</div>${media}</article>`;}).join('')}</div></section></section>`;
 main.querySelectorAll('[data-work-video]').forEach(button=>button.addEventListener('click',()=>openWorkVideo(button.dataset.workVideo,undefined,button)));
 main.querySelectorAll('.exhibition-open').forEach(button=>button.addEventListener('click',event=>openWorkIntroduction(button.dataset.exhibition,event.currentTarget)));
 main.querySelectorAll('[data-work-photo-set]').forEach(button=>button.addEventListener('click',()=>{photoReturn=button;lightboxPhotos=workPhotoSets[button.dataset.workPhotoSet];photoIndex=Number(button.dataset.workPhotoIndex);hexMediaTab="photos";renderLightbox();dialog.showModal();}));
 main.querySelectorAll('.work-thumbnail-button[data-work-photo-set]').forEach(button=>{const count=workPhotoSets[button.dataset.workPhotoSet]?.length||0;if(count>1){button.insertAdjacentHTML('beforeend',`<span class="work-photo-count">사진 ${count}장</span>`);button.setAttribute('aria-label',`${button.getAttribute('aria-label')} · 사진 ${count}장`);}});
 main.querySelectorAll('.work-video-thumbnail img').forEach(image=>image.addEventListener('error',()=>{image.hidden=true;image.closest('a').classList.add('image-unavailable');}));
}
function youtubeClip(url){try{const u=new URL(url);if(!/(^|\.)(youtube\.com|youtu\.be)$/.test(u.hostname))return null;const videoId=u.hostname==='youtu.be'?u.pathname.slice(1):u.searchParams.get('v');const playlist=u.searchParams.get('list');return /^[\w-]{11}$/.test(videoId||'')?{videoId,playlist}:playlist?{playlist}:null;}catch{return null;}}
const videoDialog=document.createElement('dialog');videoDialog.className='work-video-dialog';videoDialog.innerHTML='<button class="work-video-close" type="button" aria-label="영상 작업 창 닫기">Close ×</button><div class="work-video-view"></div><article class="work-video-description exhibition-body"></article>';document.body.append(videoDialog);
let videoReturn,videoWork;
function closeWorkVideo(){videoDialog.close();}
videoDialog.addEventListener('close',()=>{videoDialog.querySelector('.work-video-view').innerHTML='';videoReturn?.isConnected&&videoReturn.focus({preventScroll:true});});
videoDialog.querySelector('.work-video-close').addEventListener('click',closeWorkVideo);
videoDialog.addEventListener('click',event=>{if(event.target===videoDialog)closeWorkVideo();const related=event.target.closest('[data-related-work]');if(related)openWorkVideo(related.dataset.relatedWork,undefined,videoReturn);});
function openWorkVideo(id,url,trigger){
 if(['john-cameron-mitchell','hedwig'].includes(id)){photoReturn=main.querySelector(`[data-exhibition="${id}"]`)||trigger;photoReturn.dataset.workPhotoSet=id;lightboxPhotos=workPhotoSets[id];photoIndex=0;hexMediaTab='videos';hexVideoIndex=0;renderLightbox();if(!dialog.open)dialog.showModal();return;}
 const entry=entries.find(item=>item.id===id);if(!entry)return;const clip=youtubeClip(url||workVideos[id]?.url||entry.url)||workVideos[id];if(!clip)return;
 videoReturn=trigger||videoReturn;videoWork=id;
 if(exhibitionDialog.open)exhibitionDialog.close();if(dialog.open)dialog.close();
 const source=clip.videoId?`https://www.youtube-nocookie.com/embed/${encodeURIComponent(clip.videoId)}?rel=0`:`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(clip.playlist)}`;
 videoDialog.querySelector('.work-video-view').innerHTML=`<iframe src="${source}" title="${escape(entry.title)} 영상" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
 const clips=workVideos[id]?[workVideos[id],...(workVideos[id].additionalVideos||[])]:[];
 videoDialog.querySelector('.work-video-description').innerHTML=(exhibitionIntroductions[id]||`<h2>${escape(entry.title)}</h2><p class="exhibition-meta">${escape(entry.year)} · ${entry.categories.map(cid=>escape(categories.find(c=>c.id===cid)?.label||'')).join(' / ')}</p>${workDescription(entry)}${recordDetails[id]?.note?`<p>${escape(recordDetails[id].note)}</p>`:''}`)+(clips.length>1?`<h3>관련 영상</h3><p>${clips.map((item,i)=>external(item.url,`영상 ${i+1}`)).join('<br>')}</p>`:'');
 if(!videoDialog.open)videoDialog.showModal();videoDialog.scrollTop=0;
}
document.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(!link||!youtubeClip(link.href))return;const row=link.closest('[data-work-id]');const id=row?.dataset.workId||(videoDialog.contains(link)?videoWork:dialog.contains(link)?dialog.dataset.workId:exhibitionReturn?.dataset.exhibition);if(!id)return;event.preventDefault();openWorkVideo(id,link.href,link);},true);
function renderBiography(){
 main.innerHTML=`<section class="content text-content biography"><h1>Biography</h1><section><h2>정다운</h2><p>사운드 아티스트 · 작곡가 · 프로듀서 · 사운드 엔지니어 겸 포토그래퍼</p></section><figure class="biography-photo"><img src="./works/biography-studio.jpg" alt="햇빛이 들어오는 작업실의 신디사이저와 헤드폰" width="734" height="740" loading="lazy"></figure><section><h2>Education</h2>${profile.education.map(item=>`<p>${escape(item.school)}<br>${escape(item.detail)}</p>`).join('')}</section><section><h2>Links</h2>${external('https://www.instagram.com/jeongdawn/','Instagram @jeongdawn')}</section><footer>새벽소리 · 사업자등록번호 102-17-67120</footer></section>`;
}
function renderLightbox(){
 const photo=lightboxPhotos[photoIndex];
 const workId=photoReturn?.dataset.workPhotoSet;const combined=Boolean(workId);dialog.dataset.workId=workId||'';
 dialog.classList.toggle('has-description',combined);const description=dialog.querySelector('.lightbox-description');description.hidden=!combined;
 if(combined&&description.dataset.work!==workId){const entry=entries.find(item=>item.id===workId);description.querySelectorAll('video').forEach(video=>video.pause());description.innerHTML=exhibitionIntroductions[workId]||(entry?`<h2>${escape(entry.title)}</h2><p class="exhibition-meta">${escape(entry.year)}</p>${workDescription(entry)}${safeUrl(entry.url)?`<p>${external(entry.url,'관련 자료 보기')}</p>`:''}`:'');if(entry&&safeUrl(entry.url)&&exhibitionIntroductions[workId]&&!Array.from(description.querySelectorAll('a[href]')).some(link=>link.href===safeUrl(entry.url)))description.insertAdjacentHTML('beforeend',`<p>${external(entry.url,'관련 자료 보기')}</p>`);
 const gallerySources=new Set(lightboxPhotos.map(photo=>new URL(photo.src,location.href).href));
 description.querySelectorAll('img').forEach(image=>{if(gallerySources.has(new URL(image.getAttribute('src'),location.href).href)){const heading=image.previousElementSibling;if(heading?.tagName==='H3')heading.remove();image.remove();}});
 description.querySelectorAll('.event-posters').forEach(group=>{if(!group.children.length)group.remove();});
 if(workId==='hexnut-fragments'){
 description.querySelectorAll('video').forEach(video=>{if(video.previousElementSibling?.tagName==='H3')video.previousElementSibling.remove();video.remove();});
 description.querySelectorAll('a[href]').forEach(link=>{if(youtubeClip(link.href)){const paragraph=link.closest('p');if(paragraph?.previousElementSibling?.tagName==='H3')paragraph.previousElementSibling.remove();paragraph?.remove();}});
 }
 description.dataset.work=workId;description.scrollTop=0;}

 const hasAudio=photoReturn?.dataset.workPhotoSet==='hanwha-pompidou-ceiling';lightboxSound.hidden=!hasAudio;dialog.classList.toggle('has-audio',hasAudio);if(!hasAudio)stopArtworkAudio();updateArtworkAudio();
 dialog.dataset.clickToClose=String(Boolean(photoReturn?.hasAttribute('data-work-photo-set')));
 const hex=['hexnut-fragments','john-cameron-mitchell','hedwig'].includes(workId);const mediaVideos=workId==='hexnut-fragments'?hexVideos:workVideos[workId]?[workVideos[workId],...(workVideos[workId].additionalVideos||[])].map((item,index)=>({id:item.videoId,title:`영상 ${index+1}`})):[];if(hexVideoIndex>=mediaVideos.length)hexVideoIndex=0;const videoMode=hex&&hexMediaTab==='videos';const clip=mediaVideos[hexVideoIndex];
 const media=videoMode?(clip.src?`<video controls playsinline preload="metadata" aria-label="${clip.title}"><source src="${clip.src}" type="video/mp4"></video>`:`<iframe src="https://www.youtube-nocookie.com/embed/${clip.id}?rel=0" title="${clip.title}" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`):`<img src="${photo.src}" alt="${escape(photo.alt||photo.place+'에서 촬영한 필름 사진')}">`;
 dialog.querySelectorAll('.lightbox-image video').forEach(video=>video.pause());
 dialog.querySelector('.lightbox-image').innerHTML=hex?`<div class="hex-media-tabs" role="group" aria-label="미디어 종류"><button data-hex-tab="photos" aria-pressed="${!videoMode}">기록 사진 · ${lightboxPhotos.length}</button><button data-hex-tab="videos" aria-pressed="${videoMode}">영상 · ${mediaVideos.length}</button></div><div class="hex-media-stage">${media}</div>`:media;
 dialog.classList.toggle('has-hex-media',hex);
 dialog.querySelector('#photo-caption').textContent=videoMode?clip.title:combined?(lightboxPhotos.length>1?`${photoIndex+1} / ${lightboxPhotos.length}`:''):`${photo.place}${lightboxPhotos.length>1?` / ${photoIndex+1} / ${lightboxPhotos.length}`:''}`;
 dialog.classList.toggle('has-photo-navigation',videoMode||lightboxPhotos.length>1);
 dialog.querySelectorAll('[data-photo-step]').forEach(button=>button.hidden=videoMode||lightboxPhotos.length<2);
 const thumbnails=dialog.querySelector('.lightbox-thumbnails');
 const showThumbnails=videoMode||lightboxPhotos.length>1;
 dialog.classList.toggle('has-thumbnails',showThumbnails);thumbnails.hidden=!showThumbnails;thumbnails.classList.toggle('is-video-list',videoMode);
 thumbnails.innerHTML=videoMode?mediaVideos.map((item,index)=>`<button type="button" data-hex-video="${index}" aria-current="${index===hexVideoIndex}" aria-label="${item.title}">${item.id?`<img src="https://i.ytimg.com/vi/${item.id}/mqdefault.jpg" alt="">`:'<span>▶</span>'}<span>${item.title}</span></button>`).join(''):showThumbnails?lightboxPhotos.map((item,index)=>`<button type="button" data-photo-index="${index}" aria-label="사진 ${index+1} / ${lightboxPhotos.length}" aria-current="${index===photoIndex?'true':'false'}"><img src="${escape(item.src)}" alt="${escape(item.alt||item.place)}"></button>`).join(''):'';
 thumbnails.querySelector('[aria-current="true"]')?.scrollIntoView({block:'nearest',inline:'nearest'});

}
dialog.querySelector('.lightbox-thumbnails').addEventListener('click',event=>{const button=event.target.closest('[data-photo-index]');if(!button)return;photoIndex=Number(button.dataset.photoIndex);renderLightbox();dialog.querySelector(`[data-photo-index="${photoIndex}"]`)?.focus({preventScroll:true});});
function closePhoto(){stopArtworkAudio();dialog.close();if(photoReturn?.isConnected)photoReturn.focus({preventScroll:true});}
dialog.querySelector('.lightbox-close').addEventListener('click',closePhoto);
dialog.querySelector('.lightbox-image').addEventListener('click',event=>{const tab=event.target.closest('[data-hex-tab]');if(tab){hexMediaTab=tab.dataset.hexTab;renderLightbox();return;}if(event.target.closest('video,iframe,.hex-media-tabs'))return;closePhoto();});
dialog.querySelector('.lightbox-thumbnails').addEventListener('click',event=>{const button=event.target.closest('[data-hex-video]');if(button){hexVideoIndex=Number(button.dataset.hexVideo);renderLightbox();}});
dialog.addEventListener('cancel',event=>{event.preventDefault();closePhoto();});
dialog.querySelectorAll('[data-photo-step]').forEach(button=>button.addEventListener('click',()=>{photoIndex=(photoIndex+Number(button.dataset.photoStep)+lightboxPhotos.length)%lightboxPhotos.length;renderLightbox();}));
dialog.addEventListener('keydown',event=>{if(event.target.closest('.lightbox-sound')||(['hexnut-fragments','john-cameron-mitchell','hedwig'].includes(dialog.dataset.workId)&&hexMediaTab==='videos'))return;if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();photoIndex=(photoIndex+(event.key==='ArrowRight'?1:-1)+lightboxPhotos.length)%lightboxPhotos.length;renderLightbox();}});
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
 if(active==='works'&&workId&&exhibitionIntroductions[workId])openWorkIntroduction(workId,main.querySelector(`[data-exhibition="${workId}"]`));
 if(active==='works'&&categories.some(item=>item.id===category)){const target=workId?document.getElementById(`work-${category}-${workId}`):null;(target||document.getElementById(`group-${category}`)).scrollIntoView({block:'start'});}
}
document.querySelector('.mobile-menu').addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');document.querySelector('.mobile-menu').setAttribute('aria-expanded',String(open));});
initializeAnalytics();
window.addEventListener('hashchange',route);
route();
