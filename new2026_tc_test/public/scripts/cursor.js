export function initCursor() {
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (touch) return;

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });

  const loop = () => {
    rx += (mx - rx) * 0.24;
    ry += (my - ry) * 0.24;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();

  document.body.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .card")) document.body.classList.add("cursor-hover");
  });
  document.body.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .card")) document.body.classList.remove("cursor-hover");
  });
}
