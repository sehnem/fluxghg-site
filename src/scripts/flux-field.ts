/**
 * Hero visuals.
 *
 * 1. `initFluxField` — particles advected by a smooth pseudo-turbulent vector
 *    field, standing in for the eddies an eddy covariance tower actually samples.
 * 2. `initFluxTrace` — a scrolling trace shaped like a diurnal net CO2 flux
 *    signal (uptake by day, respiration at night). Explicitly labelled
 *    illustrative in the UI.
 *
 * Both bail out gracefully: reduced motion renders one static frame, and the
 * loops pause whenever the canvas leaves the viewport or the tab is hidden.
 */

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  life: number;
  maxLife: number;
  speed: number;
  hueMix: number;
};

/** Smooth, cheap, tileable-ish angle field. */
function fieldAngle(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.0016 + t * 0.16) * 1.25 +
    Math.cos(y * 0.0021 - t * 0.12) * 1.1 +
    Math.sin((x + y) * 0.0011 + t * 0.07) * 0.95 +
    Math.cos(x * 0.0005 - y * 0.0007 + t * 0.04) * 1.6
  );
}

export function initFluxField(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles: Particle[] = [];
  let raf = 0;
  let running = false;
  let t = 0;

  const density = () => {
    const area = width * height;
    // Keep the particle budget sane on large displays and phones alike.
    return Math.round(Math.min(760, Math.max(160, area / 2600)));
  };

  const spawn = (p: Particle) => {
    p.x = Math.random() * width;
    p.y = Math.random() * height;
    p.px = p.x;
    p.py = p.y;
    p.maxLife = 90 + Math.random() * 220;
    p.life = Math.random() * p.maxLife;
    p.speed = 0.35 + Math.random() * 1.15;
    p.hueMix = Math.random();
    return p;
  };

  const build = () => {
    const n = density();
    particles = Array.from({ length: n }, () =>
      spawn({ x: 0, y: 0, px: 0, py: 0, life: 0, maxLife: 0, speed: 1, hueMix: 0 })
    );
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    build();
  };

  const step = () => {
    t += 0.01;

    // Trail decay instead of a hard clear.
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.055)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    ctx.lineCap = 'round';

    for (const p of particles) {
      const a = fieldAngle(p.x, p.y, t);
      // Slight upward bias: fluxes are a vertical exchange.
      p.px = p.x;
      p.py = p.y;
      p.x += Math.cos(a) * p.speed;
      p.y += Math.sin(a) * p.speed - 0.18;
      p.life += 1;

      if (
        p.life > p.maxLife ||
        p.x < -20 ||
        p.x > width + 20 ||
        p.y < -20 ||
        p.y > height + 20
      ) {
        spawn(p);
        continue;
      }

      const fade = Math.sin((p.life / p.maxLife) * Math.PI);
      const alpha = 0.16 * fade;
      if (alpha <= 0.002) continue;

      // Cyan → green mix, matching the brand palette.
      const r = Math.round(35 + p.hueMix * 91);
      const g = Math.round(159 + p.hueMix * 22);
      const b = Math.round(188 - p.hueMix * 77);

      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = 0.55 + p.hueMix * 0.85;
      ctx.beginPath();
      ctx.moveTo(p.px, p.py);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'source-over';
    raf = requestAnimationFrame(step);
  };

  const start = () => {
    if (running || reduceMotion()) return;
    running = true;
    raf = requestAnimationFrame(step);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const staticFrame = () => {
    ctx.globalCompositeOperation = 'lighter';
    for (const p of particles) {
      let x = p.x;
      let y = p.y;
      ctx.strokeStyle = 'rgba(35,159,188,0.14)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let i = 0; i < 26; i++) {
        const a = fieldAngle(x, y, 0);
        x += Math.cos(a) * 2.2;
        y += Math.sin(a) * 2.2;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  };

  resize();
  if (reduceMotion()) {
    staticFrame();
  } else {
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);
    document.addEventListener('visibilitychange', () =>
      document.hidden ? stop() : start()
    );
  }

  let resizeTimer: number;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const wasRunning = running;
      stop();
      resize();
      if (reduceMotion()) staticFrame();
      else if (wasRunning) start();
    }, 180);
  });
}

export function initFluxTrace(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let phase = 0;
  let raf = 0;
  let running = false;

  /**
   * Diurnal net ecosystem exchange: strong uptake (negative) around midday,
   * mild release (positive) overnight, with turbulence-scale noise on top.
   */
  const signal = (u: number) => {
    const day = Math.sin(u);
    const uptake = day > 0 ? -Math.pow(day, 1.35) : -day * 0.28;
    const noise =
      Math.sin(u * 11.3) * 0.05 + Math.sin(u * 27.7 + 1.3) * 0.03 + Math.sin(u * 5.1) * 0.04;
    return uptake + noise;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height || 32;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const mid = height / 2;
    const amp = height * 0.36;

    // Zero line
    ctx.strokeStyle = 'rgba(164,184,191,0.16)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, mid);
    ctx.lineTo(width, mid);
    ctx.stroke();

    const stepPx = 2;
    const pts: [number, number][] = [];
    for (let x = 0; x <= width; x += stepPx) {
      const u = (x + phase) * 0.012;
      pts.push([x, mid + signal(u) * amp]);
    }

    // Filled area, tinted by sign of the flux
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(126,181,111,0.20)');
    grad.addColorStop(0.5, 'rgba(35,159,188,0.10)');
    grad.addColorStop(1, 'rgba(35,159,188,0.02)');
    ctx.beginPath();
    ctx.moveTo(0, mid);
    for (const [x, y] of pts) ctx.lineTo(x, y);
    ctx.lineTo(width, mid);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const [x, y] = pts[i]!;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(63,195,222,0.95)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    // Leading marker
    const last = pts[pts.length - 1];
    if (last) {
      ctx.beginPath();
      ctx.arc(last[0] - 1, last[1], 2, 0, Math.PI * 2);
      ctx.fillStyle = '#9bd489';
      ctx.fill();
    }
  };

  const step = () => {
    phase += 0.55;
    draw();
    raf = requestAnimationFrame(step);
  };

  const start = () => {
    if (running || reduceMotion()) return;
    running = true;
    raf = requestAnimationFrame(step);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  resize();
  draw();

  if (!reduceMotion()) {
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  }

  let timer: number;
  window.addEventListener('resize', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      resize();
      draw();
    }, 180);
  });
}
