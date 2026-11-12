import "./style.css";
import { profile, categories, entries, compareEntries } from "./cv.js";
import { covers } from "./covers.js";

const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const count = (value) => String(value).padStart(2, "0");
const categoryName = (id) => categories.find((item) => item.id === id)?.label || "";
const safeUrl = (value) => {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : ""; }
  catch { return ""; }
};
const records = covers.map((cover) => ({ ...entries.find((entry) => entry.id === cover.id), ...cover }));
const albumCard = (record, index, hero = false) => `
  <a class="${hero ? "hero-record" : "record-link"}" href="${safeUrl(record.source)}" target="_blank" rel="noopener noreferrer" style="--order:${index}" aria-label="${escape(record.title)} 벅스에서 보기 (새 창)">
    <img src="${record.image}" alt="${escape(record.title)} 앨범 커버" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} width="1200" height="1200">
    ${hero ? '' : `<div class="record-caption"><span>${escape(record.title)}</span><span>↗</span></div><p>${escape(record.year)} · ${escape(record.description)}</p>`}
  </a>`;

document.querySelector("#app").innerHTML = `
  <header class="site-header"><a class="wordmark" href="#main">DAWN<span>새벽소리</span></a><nav aria-label="주 메뉴"><a href="#selected">Selected works</a><a href="#archive">Archive <sup>${entries.length}</sup></a><a href="#about">About ↗</a></nav></header>
  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-topline"><span>정다운 / DAWN</span><button class="motion-toggle" type="button" aria-pressed="false">움직임 멈추기 Ⅱ</button></div>
      <h1 id="hero-title">Making<br><span class="sound-word">sound</span><span class="asterisk" aria-hidden="true">✳</span><br><em>take shape.</em></h1>
      <div class="record-cloud" aria-label="참여 음반">${[records[1], records[2], records[0]].map((r, i) => albumCard(r, i, true)).join('')}</div>
      <div class="hero-bottom"><p>소리를 만들고,<br>그 너머의 장면을 그립니다.</p><p class="hero-roles">사운드 아티스트 · 작곡가<br>프로듀서 · 사운드 엔지니어</p><a href="#selected" class="scroll-link" aria-label="선별 작업으로 이동">Scroll to explore <span>↓</span></a></div>
    </section>
    <div class="ticker" aria-hidden="true"><div>${Array(4).fill('<span>SOUND ART</span> ✳ <span>COMPOSITION</span> ✳ <span>MIX & MASTERING</span> ✳ ').join('')}</div></div>
    <section class="selected section-wrap" id="selected" aria-labelledby="selected-title">
      <div class="section-kicker"><span>01 / SELECTED RECORDS</span><span>2015 — 2025</span></div>
      <h2 id="selected-title" class="display-title">소리의 <em>표정들.</em></h2>
      <div class="selected-intro"><p>작곡과 편곡, 믹싱과 마스터링.<br>함께 만든 음반을 펼쳐봅니다.</p><p>커버를 누르면 음원사이트로 연결됩니다. ↗</p></div>
      <div class="record-grid">${records.map((r, i) => `<article class="record reveal">${albumCard(r, i)}</article>`).join('')}</div>
    </section>
    <section class="screen-work section-wrap" aria-labelledby="screen-title"><div class="section-kicker"><span>02 / SOUND & SCENE</span><span>공연에서 화면까지</span></div><div class="screen-layout"><div><h2 id="screen-title">장면에<br><em>소리를.</em></h2><p>무대와 영상, 전시로 이어지는 작업.</p><a href="#archive">전체 작업 살펴보기 ↓</a></div><div class="film-grid"><a href="https://www.youtube.com/watch?v=RvGOFLYTYX0" target="_blank" rel="noopener noreferrer"><img src="https://i.ytimg.com/vi/RvGOFLYTYX0/hqdefault.jpg" alt="세잎클로버 영상 썸네일" loading="lazy"><span>세잎클로버 <small>음악감독 ↗</small></span></a><a href="https://www.youtube.com/watch?v=ZdZdz524-B0" target="_blank" rel="noopener noreferrer"><img src="https://i.ytimg.com/vi/ZdZdz524-B0/hqdefault.jpg" alt="휴머노이드 로봇 빌리 영상 썸네일" loading="lazy"><span>휴머노이드 로봇 빌리 <small>광고음악 ↗</small></span></a></div></div></section>
    <section class="archive-section section-wrap" id="archive" aria-labelledby="archive-title"><div class="section-kicker"><span>03 / FULL ARCHIVE</span><span>${entries.length} PROJECTS</span></div><h2 id="archive-title" class="display-title">작업 <em>아카이브.</em></h2>
      <div class="archive-layout"><aside class="archive-sidebar" aria-label="작업 분야"><p class="sidebar-label">DISCIPLINES</p><div class="category-list" role="group" aria-label="분야별 이력 필터"><button type="button" class="category-button active" data-category="all" aria-pressed="true"><span>전체 작업</span><span>${count(entries.length)}</span></button>${categories.map((category) => `<button type="button" class="category-button" data-category="${category.id}" aria-pressed="false"><span>${escape(category.label)}</span><span>${count(entries.filter((entry) => entry.categories.includes(category.id)).length)}</span></button>`).join('')}</div></aside>
      <div class="archive-main"><form class="search-form" role="search"><label for="archive-search" class="sr-only">작업명, 연도, 참여 역할 검색</label><input id="archive-search" type="search" placeholder="작업명, 연도, 참여 역할 검색" autocomplete="off"><button type="button" class="clear-search" hidden aria-label="검색어 지우기">×</button></form><div class="archive-results-top"><p id="result-status" role="status" aria-live="polite"></p><span>YEAR / PROJECT</span></div><div id="archive-results"></div><button id="load-more" class="load-more" type="button"></button></div></div>
    </section>
    <section class="about section-wrap" id="about" aria-labelledby="about-title"><div class="section-kicker"><span>04 / ABOUT</span><span>새벽소리</span></div><div class="about-layout"><h2 id="about-title">정다운<span><em>DAWN</em></span></h2><div class="about-copy"><p class="about-role">사운드 아티스트 · 작곡가<br>프로듀서 · 사운드 엔지니어</p><div class="education">${profile.education.map((item) => `<p>${escape(item.school)}<br><span>${escape(item.detail)}</span></p>`).join('')}</div><a class="instagram" href="https://www.instagram.com/jeongdawn/" target="_blank" rel="noopener noreferrer">Instagram @jeongdawn ↗</a></div></div><footer><span>새벽소리 · 사업자등록번호 102-17-67120</span><a href="#main">Back to top ↑</a></footer></section>
  </main><div id="notification" class="notification" role="status" aria-live="polite"></div>`;

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let paused = motionPreference.matches;
const motionButton = document.querySelector(".motion-toggle");
function updateMotion() {
  document.body.classList.toggle("motion-paused", paused);
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.textContent = paused ? "움직임 재생 ▷" : "움직임 멈추기 Ⅱ";
  if (paused) document.querySelector(".record-cloud").style.transform = "";
}
motionButton.addEventListener("click", () => { paused = !paused; updateMotion(); });
motionPreference.addEventListener("change", (event) => { paused = event.matches; updateMotion(); });
updateMotion();
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
document.querySelector(".hero").addEventListener("pointermove", (event) => {
  if (paused || !finePointer.matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  document.querySelector(".record-cloud").style.transform = `translate(${x * 18}px, ${y * 18}px)`;
});
document.querySelector(".hero").addEventListener("pointerleave", () => {
  document.querySelector(".record-cloud").style.transform = "";
});
const observer = new IntersectionObserver((changes) => {
  changes.forEach((change) => {
    if (change.isIntersecting) { change.target.classList.add("in-view"); observer.unobserve(change.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

let activeCategory = "all";
let search = "";
let limit = 12;
const results = document.querySelector("#archive-results");
const more = document.querySelector("#load-more");
const searchInput = document.querySelector("#archive-search");

function getMatches() {
  const terms = search
    .trim()
    .toLocaleLowerCase("ko")
    .split(/\s+/)
    .filter(Boolean);
  const matches = entries.filter((entry) => {
    const text =
      `${entry.year} ${entry.title} ${entry.description} ${entry.categories.map(categoryName).join(" ")}`.toLocaleLowerCase(
        "ko",
      );
    return (
      (activeCategory === "all" || entry.categories.includes(activeCategory)) &&
      terms.every((term) => text.includes(term))
    );
  });
  return matches.sort(compareEntries);
}

function renderArchive() {
  const matches = getMatches();
  const visible = matches.slice(0, limit);
  document.querySelector("#result-status").textContent =
    `${activeCategory === "all" ? "전체 작업" : categoryName(activeCategory)} · ${matches.length}개${matches.length > visible.length ? ` 중 ${visible.length}개 표시` : ""}`;
  if (!matches.length) {
    results.innerHTML =
      '<div class="empty-state"><span aria-hidden="true">—</span><h2>일치하는 작업이 없습니다.</h2><p>다른 검색어를 입력하거나 전체 작업을 확인해 보세요.</p><button type="button" class="text-button" id="reset-search">전체 작업 보기 ↗</button></div>';
    document
      .querySelector("#reset-search")
      .addEventListener("click", resetArchive);
  } else {
    results.innerHTML = visible
      .map((entry) => {
        const url = safeUrl(entry.url);
        return `<article class="archive-entry"><span class="entry-year">${escape(entry.year)}</span><div class="entry-details"><h2>${escape(entry.title)}</h2><p>${escape(entry.description)}</p></div>${url ? `<a class="entry-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} 관련 자료 (새 창)">↗</a>` : ""}</article>`;
      })
      .join("");
  }
  more.hidden = visible.length >= matches.length;
  more.textContent = `작업 더 보기 (${visible.length} / ${matches.length}) +`;
}

function setCategory(id) {
  activeCategory = id;
  limit = 12;
  document.querySelectorAll("[data-category]").forEach((button) => {
    const selected = button.dataset.category === id;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  renderArchive();
}

function resetArchive() {
  search = "";
  searchInput.value = "";
  document.querySelector(".clear-search").hidden = true;
  setCategory("all");
  searchInput.focus();
}

document
  .querySelectorAll("[data-category]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      setCategory(button.dataset.category),
    ),
  );
document
  .querySelector(".search-form")
  .addEventListener("submit", (event) => event.preventDefault());
searchInput.addEventListener("input", () => {
  search = searchInput.value;
  limit = search.trim() ? Infinity : 12;
  document.querySelector(".clear-search").hidden = !search;
  renderArchive();
});
document.querySelector(".clear-search").addEventListener("click", () => {
  searchInput.value = "";
  search = "";
  limit = 12;
  document.querySelector(".clear-search").hidden = true;
  renderArchive();
  searchInput.focus();
});
more.addEventListener("click", () => {
  const previousCount = results.querySelectorAll(".archive-entry").length;
  limit += 12;
  renderArchive();
  const firstNew = results.querySelectorAll(".archive-entry")[previousCount];
  if (firstNew) {
    firstNew.setAttribute("tabindex", "-1");
    firstNew.focus({ preventScroll: true });
  }
});

function downloadCV() {
  const lines = [
    profile.name,
    `${profile.studio} · 음반 제작업 대표`,
    "",
    "학력",
    ...profile.education.map((item) => `${item.school} / ${item.detail}`),
  ];
  categories.forEach((category) => {
    lines.push("", `■ ${category.label}`, "");
    entries
      .filter((entry) => entry.categories.includes(category.id))
      .forEach((entry) => {
        lines.push(`${entry.year} | ${entry.title}`, `  ${entry.description}`);
        if (safeUrl(entry.url)) lines.push(`  ${entry.url}`);
      });
  });
  const file = new Blob(["\uFEFF", lines.join("\n")], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "정다운_새벽소리_CV.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const notification = document.querySelector("#notification");
  notification.textContent = "전체 이력을 담은 CV 파일을 저장합니다.";
  notification.classList.add("visible");
  clearTimeout(downloadCV.timer);
  downloadCV.timer = setTimeout(
    () => notification.classList.remove("visible"),
    3500,
  );
}
document
  .querySelectorAll("[data-download]")
  .forEach((button) => button.addEventListener("click", downloadCV));

// 인쇄 시 검색/페이지 제한 없이 전체 CV를 보여주고, 종료 후 보던 상태를 복원합니다.
let printState;
window.addEventListener("beforeprint", () => {
  printState = { activeCategory, search, limit };
  activeCategory = "all";
  search = "";
  limit = Infinity;
  renderArchive();
});
window.addEventListener("afterprint", () => {
  if (printState) {
    ({ activeCategory, search, limit } = printState);
    renderArchive();
  }
});
renderArchive();

