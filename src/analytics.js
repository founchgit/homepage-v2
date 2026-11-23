// Set to the owner's GA4 web-stream measurement ID to activate collection.
export const measurementId = 'G-8KTDXF8PT3';

export function initializeAnalytics(id = measurementId) {
 if (!/^G-[A-Z0-9]+$/.test(id) || !['dawnsound.kr','www.dawnsound.kr'].includes(location.hostname)) return;
 window.dataLayer = window.dataLayer || [];
 function gtag(){window.dataLayer.push(arguments);}
 window.gtag = gtag;
 gtag('js', new Date());
 gtag('config', id, {send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});
 const script=document.createElement('script');
 script.async=true;
 script.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;
 document.head.append(script);
 const context=element=>{
  const row=element.closest('.work-row');
  return row?{work_id:row.dataset.workId,work_title:row.querySelector('h3')?.textContent.trim()}:{};
 };
 let openWork={};
 document.addEventListener('click',event=>{
  const element=event.target.closest('a,button');
  if(!element)return;
  const work=context(element);
  if(element.matches('.work-title-link'))gtag('event','work_click',work);
  if(element.dataset.exhibition){openWork={work_id:element.dataset.exhibition,...work};gtag('event','work_intro_open',openWork);}
  if(element.dataset.workPhotoSet){openWork={work_id:element.dataset.workPhotoSet,...work};gtag('event','work_photo_open',{...openWork,photo_index:Number(element.dataset.workPhotoIndex||0)});}
  if(element.matches('a[href^="https://"]')){
   const target=new URL(element.href);
   gtag('event', /youtu\.?be/.test(target.hostname)?'video_link_click':'outbound_click',{...work,...(!work.work_id&&element.closest(".exhibition-dialog,.lightbox")?openWork:{}),link_domain:target.hostname,link_url:target.origin+target.pathname});
  }
 },true);
 const played=new WeakSet();
 document.addEventListener('play',event=>{
  const media=event.target;
  if(!media.matches('audio,video')||played.has(media))return;
  played.add(media);
  gtag('event',media.tagName==='AUDIO'?'sound_play':'video_play',{...openWork,media_name:(media.currentSrc||media.src||media.querySelector('source')?.src||'').split('/').pop().split('#')[0]});
 },true);
 function pageview(){
  openWork={};
  const path='/'+(location.hash.slice(1)||'home');
  gtag('event','page_view',{page_title:document.title,page_location:location.origin+path,page_referrer:document.referrer?new URL(document.referrer).origin:''});
 }
 window.addEventListener('hashchange',pageview);
 pageview();
}
