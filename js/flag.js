/* ============================================================
   flag.js - makes the Union Jack in the hero WAVE.
   The trick: an SVG filter (feTurbulence + feDisplacementMap, see
   index.html) distorts the flag using smooth noise. If we slowly
   change the noise settings every frame, the distortion moves, and
   our eyes read that as fabric rippling in the wind.
   ============================================================ */

(function () { // IIFE: wraps the code so its variables don't leak into the global scope and clash with other scripts
  const noise = document.getElementById("waveNoise"); // the <feTurbulence> element in the SVG
  const hero = document.getElementById("hero");
  if (!noise || !hero) return; // safety: if the markup is missing, quietly do nothing instead of crashing

  // Users who ask their OS for reduced motion get a still flag
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let t = 0;          // "time" counter that drives the wave
  let running = true; // we pause the animation when the hero isn't visible to save battery/CPU

  // IntersectionObserver tells us when an element enters/leaves the screen
  new IntersectionObserver(([entry]) => { running = entry.isIntersecting; }).observe(hero);

  function frame() {
    if (running) {
      t += 0.012; // speed of the wave: bigger = faster
      // Two sine waves at different speeds, added together, give a natural non-repeating ripple
      const fx = 0.012 + Math.sin(t) * 0.004;       // horizontal frequency (how many ripples across)
      const fy = 0.03 + Math.cos(t * 0.7) * 0.008;  // vertical frequency
      noise.setAttribute("baseFrequency", fx.toFixed(4) + " " + fy.toFixed(4)); // update the SVG attribute
    }
    requestAnimationFrame(frame); // ask the browser to call us again before the next screen repaint (~60 times/second)
  }
  requestAnimationFrame(frame);
})();
