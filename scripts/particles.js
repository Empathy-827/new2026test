export function initParticles() {
  const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (coarse || reducedMotion) return;

  const canvas = document.createElement("canvas");
  canvas.className = "fx-particles";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let w;
  let h;
  const particles = [];
  const count = window.matchMedia("(max-width: 768px)").matches ? 24 : 48;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  let mouse = { x: w / 2, y: h / 2 };
  window.addEventListener("mousemove", (e) => {
    mouse = { x: e.clientX, y: e.clientY };
  });

  for (let i = 0; i < count; i += 1) {
    particles.push({ x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0 });
  }

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const d2 = Math.max(dx * dx + dy * dy, 80);
      p.vx += (dx / d2) * 10;
      p.vy += (dy / d2) * 10;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(120,255,255,.75)";
      ctx.fill();
    }
    requestAnimationFrame(tick);
  };

  tick();
}
