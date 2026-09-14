// Pointer-reactive sky: the mist layers lean toward the cursor at
// different depths, with inertia. Without a fine pointer (phones,
// tablets) the lean wanders on its own instead. Only two CSS variables
// change; the ambient drift keeps running underneath. Reduced-motion
// readers keep the ambient sky only.
const sky = document.querySelector(".sky");
const finePointer = matchMedia("(pointer: fine)").matches;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const setLean = (x, y) => {
  sky.style.setProperty("--lean-x", x.toFixed(4));
  sky.style.setProperty("--lean-y", y.toFixed(4));
};

const followPointer = () => {
  const ease = 0.04;
  let targetX = 0;
  let targetY = 0;
  let leanX = 0;
  let leanY = 0;
  let frame = 0;

  const settle = () => {
    leanX += (targetX - leanX) * ease;
    leanY += (targetY - leanY) * ease;
    setLean(leanX, leanY);
    const remaining = Math.abs(targetX - leanX) + Math.abs(targetY - leanY);
    frame = remaining > 0.002 ? requestAnimationFrame(settle) : 0;
  };

  addEventListener(
    "pointermove",
    (event) => {
      targetX = (event.clientX / innerWidth) * 2 - 1;
      targetY = (event.clientY / innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(settle);
    },
    { passive: true },
  );
};

const wander = () => {
  const start = performance.now();
  const step = (now) => {
    const t = (now - start) / 1000;
    const x = 1.6 * Math.sin(t / 3.5) + 0.5 * Math.sin(t / 8.3);
    const y = 1.2 * Math.cos(t / 4.7);
    setLean(x, y);
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if (sky && !reducedMotion) {
  if (finePointer) followPointer();
  else wander();
}
