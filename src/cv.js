// 제공받은 CV의 역할, 날짜, 후보·공개 예정 표기를 보존합니다.
// 공개 연락 이메일은 제공받은 후에만 추가합니다.
export const profile = {
  name: "정다운",
  studio: "새벽소리",
  email: "",
  education: [
    { school: "동아방송예술대학", detail: "작곡 졸업" },
    { school: "연세대학교 커뮤니케이션대학원", detail: "미디어아트 (M.F.A.)" },
  ],
};

export const categories = [
  { id: "sound-art", label: "사운드 아트·전시" },
  { id: "performance", label: "연극·뮤지컬 음악감독" },
  { id: "screen", label: "영상·광고" },
  { id: "composition", label: "프로듀싱·작곡·편곡" },
  { id: "live", label: "연주" },
  { id: "engineering", label: "믹싱·마스터링" },
  { id: "post", label: "포스트 프로덕션" },
  { id: "education", label: "강의·연구·수상" },
];

const group = (category, rows) =>
  rows.map(([id, year, title, description, url]) => ({
    id,
    category,
    year,
    title,
    description,
    ...(url ? { url } : {}),
  }));
const musicalMix = (id, year, title, format) => ({
  id,
  category: "post",
  year,
  title: `${title} — ${format}`,
  description: `공간소리 소속 Sound Engineer · 뮤지컬 실황 ${format} 믹스 참여`,
});

const originalEntries = [
  ...group("sound-art", [
    [
      "hexnut-fragments",
      "2025",
      "HEXNUT — 파편의 숨",
      "GMAP 광주미디어아트센터 · 전시 및 사운드 디자인",
      "https://youtu.be/NHQVm3LUUVc?si=hr-gxHZQdDrXJ3w2",
    ],
    [
      "already-part-of-exhibition",
      "2025",
      "이미 당신도 전시의 일부",
      "기획전 · 정금형 작업실 겸 수장고, 부천 · 전시 및 사운드 디자인",
    ],
    [
      "lee-sujin-solo",
      "2023",
      "이수진 개인전 — 텔릭 Telic",
      "서울문화재단 청년예술청 SAPY 그레이룸 · 인터랙션 사운드 디자인",
      "https://www.instagram.com/p/CyNhbW5puEX/?igsh=MWR4NWo2eDExZmJpdw==",
    ],
  ]),
  ...group("performance", [
    [
      "three-leaf-clover",
      "2026",
      "세잎클로버",
      "창작 뮤지컬 · 원작 소설 『시한부』 · 극단 지우 · 음악감독",
      "https://jiwooprojects.com/sihanbu",
    ],
    [
      "burning-up",
      "2024",
      "버닝업",
      "창작 뮤지컬 · 극단 지우 · 음악감독, 작편곡 및 사운드 디자인",

    ],
    [
      "yeonjeok",
      "2023",
      "연적",
      "연극 · 대학로 유니플렉스 · 극단 지우 · 음악감독, 작편곡",
      "https://m.search.naver.com/search.naver?sm=mtp_sug.top&where=m&query=연극+연적&acq=연극+연적&acr=1&qdt=0",
    ],
    [
      "fantastic-laundry",
      "2023",
      "판타스틱 런드리",
      "창작 뮤지컬 · 주) 브라더후드 · 음악감독, 작편곡 및 사운드 디자인",
    ],
  ]),
  ...group("screen", [
    [
      "humanoid-billy",
      "2026",
      "휴머노이드 로봇 빌리",
      "광고음악",
      "https://youtu.be/ZdZdz524-B0?si=cIMjzIEyhMuXUAdb",
    ],
    [
      "kt-cloud-brand-film",
      "2026",
      "KT cloud 브랜드 필름",
      "광고음악 · 제공 이력 기준 2026 상반기 릴리즈 예정",
    ],
    [
      "twinkling-watermelon",
      "2023",
      "반짝이는 워터멜론",
      "tvN 청춘 밴드 드라마 · 편곡 참여, 연주 코칭",
    ],
    [
      "omyung",
      "2015",
      "오명",
      "김의석 감독 · 단편영화 음악감독 · 제20회 부산국제영화제 와이드앵글-한국단편경쟁 부문 후보, 제36회 청룡영화제 단편영화상 부문 후보",
    ],
    [
      "jeongsuk",
      "2011",
      "정숙씨, 가슴을",
      "김은영 감독 · 단편영화 음악감독 · 제29회 부산국제단편영화제 공식경쟁부문 후보",
    ],
    ["butterfly", "2011", "ButterFly", "VideoDance 작품 감독"],
    ["mrs-a", "2011", "Mrs_A", "한예종 단편영화 · 음악감독"],
    ["welcome", "2011", "어서오세요", "단편영화 · 음악감독"],
    ["lost-time", "2011", "당신이 잃어버린 시간", "단편영화 · 음악감독"],
    ["art-society", "2011", "아트소사이어티", "로드다큐 · 음악감독"],
    ["kafa-prologue", "2011", "한국영화아카데미 영화제 프롤로그", "음악 제작"],
  ]),
  ...group("records", [
    [
      "my-satan-book-ost",
      "2026",
      "나의 사탄 — Book OST",
      "베스트셀러 작가 백은별 · 프로듀싱 및 작편곡",
      "https://youtu.be/YOPfdLOFGfk?si=QV6LHVr97n2F1yqV",
    ],
    ["yunaone-tidal-mind", "2025", "유나원 — Tidal mind", "편곡 참여",
      "https://www.youtube.com/watch?v=BXhjhXSBG5Y",
    ],
    ["yunaone-green-heart", "2025", "유나원 — 초록의 마음으로", "편곡 참여",
      "https://www.youtube.com/playlist?list=OLAK5uy_msUotlSmaG6Lx5OOvSuWQ_AkZreOnkdmQ",
    ],
    [
      "summer-night-lawn",
      "2025",
      "여름밤잔디",
      "경북음악창작소 제작지원 사업 · Mix & Mastering",
    ],
    [
      "sogeumji-ep",
      "2023",
      "소금지 — EP",
      "수록곡 「그냥 그대로」, 「이름」 · Mix & Mastering",
      "https://www.youtube.com/playlist?list=OLAK5uy_kJ_47qGYJhC9C-STr_PgEhvd8odxYfYtc",
    ],
    ["cho-sukyung-swim", "2023", "조수경 — 헤엄치고 싶다면", "Mix & Mastering",
      "https://www.youtube.com/watch?v=QUytdPkewMs",
    ],
    [
      "joy-avenue-hymns",
      "2022",
      "조이애비뉴 — Hymns from Joy Avenue",
      "EP 앨범 · Mix & Mastering",
      "https://www.youtube.com/playlist?list=OLAK5uy_kN6qc-1vyHA8UMZz271YSgN0kPlpD7wLI",
    ],
    ["juha-got-ya", "2022", "주하 — Got ya", "디지털 싱글앨범 · Mix",
      "https://www.youtube.com/watch?v=yqr9YAHeTTc",
    ],
    ["juha-wave", "2022", "주하 — 파도", "디지털 싱글앨범 · 편곡, Mix",
      "https://www.youtube.com/watch?v=rVSvCOkU2QE",
    ],
    ["juha-avocado", "2021", "주하 — 아보카도", "디지털 싱글앨범 · Mix",
      "https://www.youtube.com/watch?v=PXaD-5ZbOk0",
    ],
    [
      "enigmata-highway",
      "2021",
      "에니그마타 — Highway",
      "디지털 싱글 · 편곡 참여",
      "https://www.youtube.com/watch?v=W8caBDUd5Us",
    ],
    [
      "chae-suhyun-2020",
      "2020",
      "채수현 — 태풍이 지나가고 / 환상의 빛",
      "싱글 앨범 · 2020.04.24 발매 · 믹싱 & 마스터링",
      "https://www.youtube.com/playlist?list=OLAK5uy_l-Z-NYtTxEcx4rqvqfAWz2QZrTt9tYJmU",
    ],
    ["juha-seonju", "2020", "주하 — 선주", "디지털 싱글앨범 · 편곡, Mix",
      "https://www.youtube.com/watch?v=tAF112t2Do4",
    ],
    ["juha-fishbowl", "2019", "주하 — 어항", "디지털 싱글앨범 · Mix",
      "https://www.youtube.com/watch?v=YAlStXo5bu0",
    ],
    [
      "juha-false-adult",
      "2019",
      "주하 — 거짓어른",
      "EP 앨범 · 수록곡 「앵무새」, 「들꽃」, 「마음이란게」, 「두려워」, 「어항」 · Mix",
      "https://www.youtube.com/playlist?list=OLAK5uy_l9Wl455BLxShY2r8-TGpM0qhJ34Gu-FVU",
    ],
    ["chae-suhyun-depression", "2018", "채수현 — 우울증", "Mix",
      "https://www.youtube.com/watch?v=uif3fthGUBU",
    ],
    ["girlsonmood", "2018", "girlsonmood — baby dream night", "편곡",
      "https://www.youtube.com/watch?v=1HvSVa2FSkM",
    ],
    ["collor-butterfly", "2017", "Collor — 나비 (Feat. 난아진)", "편곡 참여",
      "https://www.youtube.com/watch?v=fNAEf926bUw",
    ],
    [
      "chae-suhyun-great-night",
      "2017",
      "채수현 — 멋진밤",
      "편곡, Artwork Design",
      "https://www.youtube.com/watch?v=r_WtQ5g89uI",
    ],
    [
      "eungyo-understand",
      "2016",
      "은교 — Understand",
      "EP 앨범 · 수록곡 「그럼에도」, 「잠들지 못하는 그대」 · 편곡, Mix",
      "https://www.youtube.com/playlist?list=OLAK5uy_keFwV-ltbjai9DKa_whMaz9GrR7xs_JtM",
    ],
    [
      "no-tomorrow-no-regret",
      "2014",
      "강토밴드 — No Tomorrow, No Regret",
      "정규앨범 · 전체 수록곡 건반 연주, 편곡",
      "https://www.youtube.com/playlist?list=OLAK5uy_keaWDDdnkzuqUoYfh55yUimiO1x2KhWvQ",
    ],
    [
      "myvatn-shake",
      "2015",
      "Myvatn — 흔들기",
      "디지털 싱글 · MV 제작, 작사, 작곡, 편곡, 믹스",
      "https://www.youtube.com/watch?v=mriKZW-qpb8",
    ],
    [
      "myvatn-bury",
      "2016",
      "Myvatn — BURY",
      "디지털 싱글 · MV 제작, 작사, 작곡, 편곡, 믹스",
      "https://www.youtube.com/watch?v=eFWTkYrUmdQ",
    ],
    [
      "myvatn-like-you-lady",
      "2016",
      "Myvatn — Like you lady",
      "디지털 싱글 · 노래, MV 제작, 작사, 작곡, 편곡, 믹스",
      "https://www.youtube.com/watch?v=Qm4Ksg0Spy8",
    ],
    ["myvatn-rain", "2016", "Myvatn — Rain", "디지털 싱글 · 편곡, 믹스",
      "https://www.youtube.com/watch?v=HwoVsixFQU4",
    ],

    ["becovered", "2013", "BECOVERED", "CCM 밴드 · 싱어, 편곡, 믹스"],
            ["joy-avenue-collaboration", "2022", "조이애비뉴", "Mix & Mastering"],
  ]),
  ...group("live", [
    [
      "paik-not-a-stain",
      "2026",
      "백승환 단독공연 — not a stain...",
      "고라니 특공대 · 연주 참여",
      "https://search.naver.com/search.naver?where=nexearch&pkid=269&os=41592357&query=%EB%B0%B1%EC%8A%B9%ED%99%98%20%EB%8B%A8%EB%8F%85%EA%B3%B5%EC%97%B0%20not%20a%20stain",
    ],
    [
      "just-j-min",
      "2025",
      "Just J-Min",
      "제이민 첫번째 콘서트 · 건반 연주",
      "https://www.ticketlink.co.kr/product/54001",
    ],
    [
      "john-cameron-mitchell",
      "2024",
      "존 카메론 미첼 내한 공연",
      "건반 연주",
      "https://tickets.interpark.com/goods/24016208",
    ],
    [
      "hedwig",
      "2019–2024",
      "헤드윅",
      "뮤지컬 · 미르코 역(앵그리인치 밴드) · 2019 홍익대 대학로 아트센터, 2021 충무아트센터, 2024 샤롯데 씨어터",
    ],
    [
      "baek-space",
      "2023",
      "백지영 — BAEK SPACE",
      "전국투어 콘서트 · 편곡 참여",
    ],
    ["go-baek", "2022", "백지영 — GO BAEK", "전국투어 콘서트 · 편곡 참여"],
    ["yoon-soho", "2019", "윤소호 콘서트", "뮤지컬 배우 윤소호 · 건반 세션"],
  ]),
  ...group("post", [
    [
      "tomorrows-apple",
      "2026",
      "내일 건네줄, 사과",
      "김윤서 작가 · 영화 사운드 믹싱",
    ],
  ]),
  ...[
    ["sisyphus-2026", "2026", "시지프스", "OST"],
    ["pirates-2025", "2025", "해적", "OST"],
    ["hook-2024", "2024", "후크", "OST"],
    ["nanseol-2024", "2024", "난설", "OST"],
    ["mio-fratello-2024", "2024", "미오프라텔로", "DVD"],
    ["ludwig-2023", "2023", "Ludwig", "OST"],
    ["pirates-2023", "2023", "해적", "DVD"],
    ["ending-note-2022", "2022", "엔딩노트", "OST / DVD"],
    ["mio-fratello-2022", "2022", "미오프라텔로", "OST / DVD"],
    ["nanseol-2022", "2022", "난설", "OST"],
    ["v-ever-after-2022", "2022", "브이에버애프터", "OST / DVD"],
    ["therese-raquin-2022", "2022", "테레즈 라캥", "OST"],
    ["anna-tchaikovsky-2022", "2022", "안나 차이코프스키", "OST"],
    ["ludwig-2021", "2021", "Ludwig", "DVD"],
    ["myeongdong-romance-2021", "2021", "명동 로망스", "DVD"],
    ["brothers-karamazov-2021", "2021", "브라더스 까라마조프", "DVD"],
    ["pirates-2021", "2021", "해적", "OST / DVD"],
    ["pungwolju-2021", "2021", "풍월주", "OST"],
    ["flaming-sonata-2020", "2020", "광염소나타", "OST"],
    ["nanseol-2020", "2020", "난설", "DVD"],
    ["mio-fratello-2020", "2020", "미오 프라텔로", "OST"],
  ].map((row) => musicalMix(...row)),
  ...group("engineering", [
    ["bearrose-ep-2025", "2025", "베어로즈 — 1st EP", "Mastering"],
    ["bearrose-ep-2026", "2026", "베어로즈 — 2nd EP", "Mix & Mastering", "https://www.youtube.com/watch?v=VpSu7Pdi6bY&list=OLAK5uy_njFq4rpHX_ufQmfdsYAgUZiIJlvrlXOOc"],
  ]),
  ...group("education", [
    [
      "hakchon-kim-kwang-seok-2015",
      "2015",
      "김광석 노래부르기 2015",
      "학전 · 기타상 수상",
    ],
    [
      "daelim-mentoring",
      "2026",
      "대림대학교 방송음향기술과",
      "2026.10 · 음반제작프로젝트관리(믹스 & 마스터링) 멘토링",
    ],
    [
      "yonsei-composition-lectures",
      "2025",
      "연세대학교 작곡과 특강",
      "2025.05 · 1차 「독립 아티스트의 앨범 프로듀싱」, 2차 「인공지능과 사운드」",
    ],
    [
      "yonsei-sound-art-research",
      "2025",
      "딥러닝 기반 사운드 아트 사례 연구",
      "연세대 커뮤니케이션 대학원 학술제",
    ],
    ["jam-music-academy", "2016–현재", "JAM Music Academy", "강사"],
  ]),
];


// 역할이 함께 기록된 작업은 여러 분야에 속하지만 원본 항목은 한 건만 유지합니다.
// 음반 작업과 기존 연주·편곡 작업의 크레딧을 기준으로 분류합니다.
const roleCategories = {
  composition: new Set([
    "my-satan-book-ost", "yunaone-tidal-mind", "yunaone-green-heart",
    "juha-wave", "enigmata-highway", "juha-seonju", "girlsonmood",
    "collor-butterfly", "chae-suhyun-great-night", "eungyo-understand",
    "no-tomorrow-no-regret", "myvatn-shake", "myvatn-bury",
    "myvatn-like-you-lady", "myvatn-rain", "becovered",
    "juha-collaboration",
    "baek-space", "go-baek",
  ]),
  engineering: new Set([
    "summer-night-lawn", "sogeumji-ep",
    "cho-sukyung-swim", "joy-avenue-hymns", "juha-got-ya", "juha-wave",
    "juha-avocado", "chae-suhyun-2020", "juha-seonju", "juha-fishbowl",
    "juha-false-adult", "chae-suhyun-depression", "eungyo-understand",
    "myvatn-shake", "myvatn-bury", "myvatn-like-you-lady",
    "myvatn-rain", "becovered", "eungyo-collaboration",
    "joy-avenue-collaboration",
  ]),
  live: new Set([
    "paik-not-a-stain",
    "just-j-min", "john-cameron-mitchell", "hedwig", "yoon-soho",
  ]),
};

// 같은 연도 안에서 숫자가 작을수록 먼저 표시됩니다. 미지정 작업은 기존 순서입니다.
export const entryOrder = {};

export const latestYear = (entry) =>
  Math.max(0, ...(entry.year.match(/\d{4}/g) || []).map(Number));

export const compareEntries = (a, b) =>
  latestYear(b) - latestYear(a) || a.sortOrder - b.sortOrder;

export const entries = originalEntries.map((entry) => {
  const memberships = entry.category === "records" || entry.category === "live"
    ? Object.entries(roleCategories)
        .filter(([, ids]) => ids.has(entry.id))
        .map(([category]) => category)
    : [entry.category];
  if (!memberships.length) throw new Error(`작업 분야 누락: ${entry.id}`);
  return { ...entry, category: memberships[0], categories: memberships };
}).sort((a, b) =>
  categories.findIndex((item) => item.id === a.category)
  - categories.findIndex((item) => item.id === b.category)
).map((entry, index) => ({
  ...entry,
  sortOrder: entryOrder[entry.id] ?? index * 10,
})).sort(compareEntries);
