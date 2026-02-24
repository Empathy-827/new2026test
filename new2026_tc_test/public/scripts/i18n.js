const STORAGE_KEY = "neo_lang";
let currentLang = localStorage.getItem(STORAGE_KEY) || "zh";

const dict = {
  zh: {
    nav_home: "首页",
    nav_videos: "视频",
    nav_gallery: "图片",
    nav_about: "关于",
    footer_text: "© 2026 Neo Vision. All rights reserved.",
    home_eyebrow: "科幻视觉作品集",
    home_title: "构建未来叙事的视觉现场",
    home_copy: "聚焦短片、概念美术与动态影像，展示我的科幻艺术创作。",
    home_cta_videos: "观看视频",
    home_cta_gallery: "进入画廊",
    home_featured_videos: "精选视频",
    home_featured_images: "精选图片",
    home_view_all: "查看全部",
    videos_eyebrow: "动态影像",
    videos_title: "视频作品库",
    videos_copy: "点击卡片可在弹窗播放器中观看视频。",
    gallery_eyebrow: "静态视觉",
    gallery_title: "图片画廊",
    gallery_copy: "按分类筛选并点击查看大图。",
    filter_all: "全部",
    filter_concept: "概念",
    filter_poster: "海报",
    filter_still: "剧照",
    about_eyebrow: "创作者档案",
    about_title: "关于我",
    about_copy: "我专注于科幻视觉叙事，结合动态影像与概念设计来构建未来世界观。",
    about_step_1_title: "研究与概念",
    about_step_1_desc: "建立视觉设定、色彩逻辑和故事语义。",
    about_step_2_title: "动态实验",
    about_step_2_desc: "将静态概念转化为短片与动态镜头语言。",
    about_step_3_title: "输出与发布",
    about_step_3_desc: "统一包装视觉资产并面向平台发布。",
    about_contact_title: "联系与合作",
    open_preview: "打开预览",
    video_unavailable: "当前视频未上传，请将 mp4 放到 assets/videos。"
  },
  en: {
    nav_home: "Home",
    nav_videos: "Videos",
    nav_gallery: "Gallery",
    nav_about: "About",
    footer_text: "© 2026 Neo Vision. All rights reserved.",
    home_eyebrow: "Sci-Fi Visual Portfolio",
    home_title: "Building Future Narratives Through Visual Worlds",
    home_copy: "Focused on short films, concept art, and motion pieces from my sci-fi practice.",
    home_cta_videos: "Watch Videos",
    home_cta_gallery: "Open Gallery",
    home_featured_videos: "Featured Videos",
    home_featured_images: "Featured Images",
    home_view_all: "View all",
    videos_eyebrow: "Motion Works",
    videos_title: "Video Library",
    videos_copy: "Click a card to open playback in a lightbox.",
    gallery_eyebrow: "Still Visuals",
    gallery_title: "Image Gallery",
    gallery_copy: "Filter by category and click to zoom.",
    filter_all: "All",
    filter_concept: "Concept",
    filter_poster: "Poster",
    filter_still: "Still",
    about_eyebrow: "Creator Profile",
    about_title: "About Me",
    about_copy: "I focus on sci-fi visual storytelling through motion and concept world-building.",
    about_step_1_title: "Research and Concept",
    about_step_1_desc: "Define visual settings, color logic, and narrative semantics.",
    about_step_2_title: "Motion Experiments",
    about_step_2_desc: "Translate static concepts into cinematic motion language.",
    about_step_3_title: "Delivery and Release",
    about_step_3_desc: "Package visual assets and publish for platform use.",
    about_contact_title: "Contact and Collaboration",
    open_preview: "Open preview",
    video_unavailable: "Video not uploaded yet. Put mp4 files in assets/videos."
  }
};

function applyTranslations() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = dict[currentLang][key];
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-title-zh][data-title-en]").forEach((el) => {
    el.textContent = currentLang === "zh" ? el.dataset.titleZh : el.dataset.titleEn;
  });
  document.querySelectorAll("[data-desc-zh][data-desc-en]").forEach((el) => {
    el.textContent = currentLang === "zh" ? el.dataset.descZh : el.dataset.descEn;
  });

  const toggle = document.getElementById("lang-toggle");
  if (toggle) toggle.textContent = currentLang === "zh" ? "EN" : "中";
}

export function initI18n() {
  applyTranslations();
  const toggle = document.getElementById("lang-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem(STORAGE_KEY, currentLang);
    applyTranslations();
    window.dispatchEvent(new CustomEvent("langchange"));
  });
}

export function getCurrentLang() {
  return currentLang;
}

export function t(key) {
  return dict[currentLang][key] || key;
}
