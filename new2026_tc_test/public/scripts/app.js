import { works } from "/scripts/data.js";
import { initI18n, getCurrentLang, t } from "/scripts/i18n.js";
import { initCursor } from "/scripts/cursor.js";
import { initParticles } from "/scripts/particles.js";
import { initLightbox, openLightbox } from "/scripts/lightbox.js";
import { initMasonry } from "/scripts/masonry.js";

function setActiveNav() {
  const page = document.body.dataset.page;
  const current = document.querySelector(`[data-nav="${page}"]`);
  if (current) current.classList.add("is-active");
}

function mediaCard(item) {
  return `
    <article class="card" data-work-id="${item.id}" data-type="${item.type}" data-src="${item.src}" data-cover="${item.cover}">
      <button class="card-open" type="button" aria-label="${t("open_preview")}">
        <div class="media-thumb scanline">
          <img src="${item.cover}" alt="${item.title[getCurrentLang()]}" loading="lazy" />
        </div>
      </button>
      <div class="card-body">
        <h3 class="card-title" data-title-zh="${item.title.zh}" data-title-en="${item.title.en}">${item.title[getCurrentLang()]}</h3>
        <p class="card-desc" data-desc-zh="${item.desc.zh}" data-desc-en="${item.desc.en}">${item.desc[getCurrentLang()]}</p>
      </div>
    </article>
  `;
}

function wireCardClicks(scope = document) {
  scope.querySelectorAll(".card[data-src]").forEach((card) => {
    card.addEventListener("click", () => {
      const titleNode = card.querySelector(".card-title");
      openLightbox({
        type: card.dataset.type,
        src: card.dataset.src,
        poster: card.dataset.cover,
        title: titleNode ? titleNode.textContent : "Preview",
        fallbackText: t("video_unavailable")
      });
    });
  });
}

function renderHome() {
  const videoGrid = document.getElementById("home-video-grid");
  const imageGrid = document.getElementById("home-image-grid");
  if (!videoGrid || !imageGrid) return;

  videoGrid.innerHTML = works.filter((w) => w.type === "video").slice(0, 3).map(mediaCard).join("");
  imageGrid.innerHTML = works.filter((w) => w.type === "image").slice(0, 6).map(mediaCard).join("");

  wireCardClicks(videoGrid);
  wireCardClicks(imageGrid);
}

function renderVideos() {
  const grid = document.getElementById("video-grid");
  if (!grid) return;
  grid.innerHTML = works.filter((w) => w.type === "video").map(mediaCard).join("");
  wireCardClicks(grid);
}

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const images = works.filter((w) => w.type === "image");
  grid.innerHTML = images.map((item) => `
    <article class="masonry-item card" data-category="${item.category}" data-type="${item.type}" data-src="${item.src}" data-cover="${item.cover}">
      <div class="media-thumb">
        <img src="${item.src}" alt="${item.title[getCurrentLang()]}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3 class="card-title" data-title-zh="${item.title.zh}" data-title-en="${item.title.en}">${item.title[getCurrentLang()]}</h3>
        <p class="card-desc" data-desc-zh="${item.desc.zh}" data-desc-en="${item.desc.en}">${item.desc[getCurrentLang()]}</p>
      </div>
    </article>
  `).join("");

  wireCardClicks(grid);
}

function renderPage() {
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "videos") renderVideos();
  if (page === "gallery") renderGallery();
}

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  initCursor();
  initParticles();
  initLightbox();
  setActiveNav();
  renderPage();
  initMasonry();
  document.documentElement.classList.add("is-ready");

  window.addEventListener("langchange", () => {
    renderPage();
    initMasonry();
  });
});
