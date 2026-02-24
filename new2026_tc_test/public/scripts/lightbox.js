let lightbox;
let content;
let titleEl;

function ensureLightbox() {
  if (lightbox) return;
  lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-panel" role="dialog" aria-modal="true" aria-label="preview">
      <div class="lightbox-head">
        <strong id="lightbox-title"></strong>
        <button id="lightbox-close" class="btn btn-ghost" type="button">Close</button>
      </div>
      <div id="lightbox-content" class="lightbox-content"></div>
    </div>
  `;
  document.body.appendChild(lightbox);
  content = lightbox.querySelector("#lightbox-content");
  titleEl = lightbox.querySelector("#lightbox-title");

  lightbox.querySelector("#lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

export function initLightbox() {
  ensureLightbox();
}

export function openLightbox({ type, src, title, poster, fallbackText }) {
  ensureLightbox();
  titleEl.textContent = title;
  content.innerHTML = "";

  if (type === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    if (poster) video.poster = poster;
    const source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
    content.appendChild(video);
    if (fallbackText) {
      const note = document.createElement("p");
      note.style.color = "var(--muted)";
      note.textContent = fallbackText;
      content.appendChild(note);
    }
  } else {
    const img = document.createElement("img");
    img.src = src;
    img.alt = title;
    content.appendChild(img);
  }

  lightbox.classList.add("is-open");
}

export function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  if (content) content.innerHTML = "";
}
