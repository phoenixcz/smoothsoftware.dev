// Pointer-reactive sky: the mist layers lean toward the cursor at
// different depths and a warm light follows it with inertia. Only CSS
// variables change; the ambient drift keeps running underneath.
// Touch devices and reduced-motion readers keep the ambient sky only.
const sky = document.querySelector(".sky");
const finePointer = matchMedia("(pointer: fine)").matches;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (sky && finePointer && !reducedMotion) {
  const ease = 0.04;
  let targetX = 0;
  let targetY = 0;
  let leanX = 0;
  let leanY = 0;
  let lightTargetX = innerWidth / 2;
  let lightTargetY = innerHeight * 0.4;
  let lightX = lightTargetX;
  let lightY = lightTargetY;
  let frame = 0;

  const settle = () => {
    leanX += (targetX - leanX) * ease;
    leanY += (targetY - leanY) * ease;
    lightX += (lightTargetX - lightX) * ease;
    lightY += (lightTargetY - lightY) * ease;
    sky.style.setProperty("--lean-x", leanX.toFixed(4));
    sky.style.setProperty("--lean-y", leanY.toFixed(4));
    sky.style.setProperty("--light-x", `${lightX.toFixed(1)}px`);
    sky.style.setProperty("--light-y", `${lightY.toFixed(1)}px`);
    const remaining =
      Math.abs(targetX - leanX) +
      Math.abs(targetY - leanY) +
      (Math.abs(lightTargetX - lightX) + Math.abs(lightTargetY - lightY)) / 100;
    frame = remaining > 0.002 ? requestAnimationFrame(settle) : 0;
  };

  addEventListener(
    "pointermove",
    (event) => {
      targetX = (event.clientX / innerWidth) * 2 - 1;
      targetY = (event.clientY / innerHeight) * 2 - 1;
      lightTargetX = event.clientX;
      lightTargetY = event.clientY;
      if (!frame) frame = requestAnimationFrame(settle);
    },
    { passive: true },
  );
}
