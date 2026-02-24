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
  const coreIndexes = [];
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const count = isMobile ? 56 : 112;

  const corePoints = [
    { x: 0.12, y: 0.62 }, { x: 0.2, y: 0.54 }, { x: 0.28, y: 0.58 },
    { x: 0.36, y: 0.46 }, { x: 0.46, y: 0.52 }, { x: 0.56, y: 0.4 },
    { x: 0.64, y: 0.48 }, { x: 0.74, y: 0.38 }, { x: 0.82, y: 0.44 },
    { x: 0.22, y: 0.32 }, { x: 0.34, y: 0.3 }, { x: 0.48, y: 0.26 },
    { x: 0.62, y: 0.24 }, { x: 0.76, y: 0.28 }, { x: 0.88, y: 0.32 }
  ];

  const coreEdges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [1, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
    [3, 10], [4, 11], [5, 12], [6, 13], [7, 14]
  ];

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

  for (let i = 0; i < corePoints.length; i += 1) {
    const p = corePoints[i];
    const px = p.x * w;
    const py = p.y * h;
    coreIndexes.push(i);
    particles.push({
      x: px,
      y: py,
      ox: px,
      oy: py,
      vx: 0,
      vy: 0,
      size: 2.2,
      core: true
    });
  }

  for (let i = corePoints.length; i < count; i += 1) {
    const base = corePoints[i % corePoints.length];
    const spread = isMobile ? 45 : 70;
    const px = base.x * w + (Math.random() - 0.5) * spread;
    const py = base.y * h + (Math.random() - 0.5) * spread;
    particles.push({
      x: px,
      y: py,
      ox: px,
      oy: py,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: 1.2 + Math.random() * 0.9,
      core: false
    });
  }

  const tick = () => {
    ctx.clearRect(0, 0, w, h);

    const connectDist = isMobile ? 72 : 92;
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy);
        if (d < connectDist) {
          const alpha = 1 - d / connectDist;
          ctx.strokeStyle = `rgba(92, 220, 255, ${alpha * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const [ai, bi] of coreEdges) {
      const a = particles[coreIndexes[ai]];
      const b = particles[coreIndexes[bi]];
      ctx.strokeStyle = "rgba(118, 236, 255, 0.32)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    for (const p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const d = Math.hypot(dx, dy);
      const dSafe = Math.max(d, 6);
      const attractRadius = isMobile ? 180 : 260;
      const attractRatio = Math.max(0, 1 - d / attractRadius);
      const attract = attractRatio * attractRatio * (isMobile ? 1.8 : 2.8);

      p.vx += (dx / dSafe) * attract;
      p.vy += (dy / dSafe) * attract;

      const homeForce = p.core ? 0.006 : 0.003;
      p.vx += (p.ox - p.x) * homeForce;
      p.vy += (p.oy - p.y) * homeForce;

      p.vx *= 0.9;
      p.vy *= 0.9;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -0.6;
      if (p.y < 0 || p.y > h) p.vy *= -0.6;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.core ? "rgba(159, 246, 255, 0.96)" : "rgba(120, 255, 255, 0.78)";
      ctx.fill();
    }

    const glow = ctx.createRadialGradient(mouse.x, mouse.y, 2, mouse.x, mouse.y, isMobile ? 85 : 120);
    glow.addColorStop(0, "rgba(130, 245, 255, 0.22)");
    glow.addColorStop(1, "rgba(130, 245, 255, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, isMobile ? 85 : 120, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(tick);
  };

  tick();
}
