(function () {
  const progress = document.getElementById("progress");
  const wrap = document.getElementById("progressWrap");
  const pctBubble = document.getElementById("pctBubble");
  const root = document.documentElement;

  let ticking = false;

  const lerp = (a, b, t) => a + (b - a) * t;

  function update() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const raw = scrollable > 0 ? scrollTop / scrollable : 0;
    const pct = Math.min(1, Math.max(0, raw));

    progress.style.transform = `scaleX(${pct})`;

    const percentInt = Math.round(pct * 100);
    pctBubble.textContent = percentInt + "%";
    wrap.setAttribute("aria-valuenow", String(percentInt));

    const h1Start = 210,
      h1End = 320;
    const h2Start = 260,
      h2End = 360;
    const h1 = Math.round(lerp(h1Start, h1End, pct));
    const h2 = Math.round(lerp(h2Start, h2End, pct));
    root.style.setProperty("--bg1", h1);
    root.style.setProperty("--bg2", h2);

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  update();

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(update);
  });
})();
