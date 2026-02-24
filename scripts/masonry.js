export function initMasonry() {
  const filters = document.getElementById("gallery-filters");
  const grid = document.getElementById("gallery-grid");
  if (!filters || !grid) return;

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    const value = btn.dataset.filter;

    filters.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    grid.querySelectorAll("[data-category]").forEach((item) => {
      const matched = value === "all" || item.dataset.category === value;
      item.classList.toggle("is-hidden", !matched);
    });
  });
}
