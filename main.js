/* =========================================================
   main.js (FULL) — sitewide
   Works for: index.html, about.html, fundraising.html, locations.html, arizona.html
   - Mobile nav toggle
   - Footer year
   - July 4 countdown ticker (sitewide)
   - Hero slider (index)
   - Generic carousel (new products on index)
   - Fundraising carousel (fundraising page)
   - Arizona hero slider (arizona page)
   - About tabs (about page)
   - Card tilt (Spark Lab + any [data-tilt])
========================================================= */

(function () {
  "use strict";

  /* =========================
     HELPERS
  ========================== */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  document.documentElement.classList.add("js-ready");

  /* =========================
     FOOTER YEAR
  ========================== */
  (function setYear() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  })();

  /* =========================
     MOBILE NAV TOGGLE (shared header)
     Requires:
       - button[data-nav-toggle]
       - nav[data-nav]
  ========================== */
  (function navToggle() {
    const btn = $("[data-nav-toggle]");
    const nav = $("[data-nav]");
    if (!btn || !nav) return;

    const closeNav = () => {
      btn.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };

    const openNav = () => {
      btn.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.body.classList.add("nav-open");
    };

    btn.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      if (isOpen) closeNav();
      else openNav();
    });

    // Close on link click (mobile)
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      if (window.matchMedia("(max-width: 980px)").matches) closeNav();
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // Close when resizing up
    window.addEventListener("resize", () => {
      if (!window.matchMedia("(max-width: 980px)").matches) closeNav();
    });
  })();

  /* =========================
     JULY 4 COUNTDOWN (sitewide)
     Requires:
       section[data-july-ticker]
       [data-tt-days] [data-tt-hours] [data-tt-mins] [data-tt-secs]
     Behavior:
       - counts down to next July 4 at 00:00 local time
       - if past July 4 for current year, targets next year
  ========================== */
  (function julyTicker() {
    const ticker = $("[data-july-ticker]");
    if (!ticker) return;

    const elDays = ticker.querySelector("[data-tt-days]");
    const elHours = ticker.querySelector("[data-tt-hours]");
    const elMins = ticker.querySelector("[data-tt-mins]");
    const elSecs = ticker.querySelector("[data-tt-secs]");
    if (!elDays || !elHours || !elMins || !elSecs) return;

    function getTarget() {
      const now = new Date();
      let year = now.getFullYear();
      let target = new Date(year, 6, 4, 0, 0, 0, 0); // July = 6 (0-based)
      if (now.getTime() >= target.getTime()) {
        year += 1;
        target = new Date(year, 6, 4, 0, 0, 0, 0);
      }
      return target;
    }

    function pad2(n) {
      return String(n).padStart(2, "0");
    }

    let targetDate = getTarget();

    function update() {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        // Rollover cleanly if we hit the target
        targetDate = getTarget();
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      elDays.textContent = String(days);
      elHours.textContent = pad2(hours);
      elMins.textContent = pad2(mins);
      elSecs.textContent = pad2(secs);
    }

    update();
    setInterval(update, 1000);
  })();

  /* =========================
     INDEX HERO SLIDER (index.html)
     Requires:
       [data-hero-slider] .hero-slide elements
  ========================== */
  (function heroSlider() {
    const slider = $("[data-hero-slider]");
    if (!slider) return;
    const slides = $$(".hero-slide", slider);
    if (slides.length <= 1) return;

    if (prefersReducedMotion()) {
      // ensure first visible only
      slides.forEach((s, i) => s.classList.toggle("is-active", i === 0));
      return;
    }

    let idx = 0;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === 0));

    setInterval(() => {
      slides[idx].classList.remove("is-active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("is-active");
    }, 5200);
  })();

  /* =========================
     GENERIC CAROUSEL (index new products)
     Requires:
       data-carousel="name"
       data-carousel-prev="name"
       data-carousel-next="name"
     Assumes horizontal scroll track.
  ========================== */
  (function genericCarousel() {
    const tracks = $$("[data-carousel]");
    if (!tracks.length) return;

    tracks.forEach((track) => {
      const name = track.getAttribute("data-carousel");
      if (!name) return;

      const prevBtn = document.querySelector(`[data-carousel-prev="${name}"]`);
      const nextBtn = document.querySelector(`[data-carousel-next="${name}"]`);

      const scrollByCard = (dir) => {
        const firstCard = track.querySelector("*");
        const amount = firstCard ? firstCard.getBoundingClientRect().width + 14 : 320;
        track.scrollBy({ left: dir * amount, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      };

      if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
      if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));
    });
  })();

  /* =========================
     FUNDRAISING CAROUSEL (fundraising.html)
     Requires:
       [data-fund-carousel]
         .fundpage-slide
       [data-fund-prev] [data-fund-next]
       [data-fund-dots] + buttons[data-fund-dot="0.."]
  ========================== */
  (function fundCarousel() {
    const root = $("[data-fund-carousel]");
    if (!root) return;

    const slides = $$(".fundpage-slide", root);
    if (slides.length <= 1) return;

    const prev = $("[data-fund-prev]", root);
    const next = $("[data-fund-next]", root);
    const dotsWrap = $("[data-fund-dots]", root);
    const dots = dotsWrap ? $$("[data-fund-dot]", dotsWrap) : [];

    let idx = 0;
    let timer = null;

    const setActive = (i) => {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === idx));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === idx));
    };

    const autoStart = () => {
      if (prefersReducedMotion()) return;
      autoStop();
      timer = setInterval(() => setActive(idx + 1), 5200);
    };
    const autoStop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    if (prev) prev.addEventListener("click", () => { setActive(idx - 1); autoStart(); });
    if (next) next.addEventListener("click", () => { setActive(idx + 1); autoStart(); });

    dots.forEach((d) => {
      d.addEventListener("click", () => {
        const n = parseInt(d.getAttribute("data-fund-dot") || "0", 10);
        setActive(n);
        autoStart();
      });
    });

    // Pause on hover (desktop)
    root.addEventListener("mouseenter", autoStop);
    root.addEventListener("mouseleave", autoStart);

    setActive(0);
    autoStart();
  })();

  /* =========================
     ARIZONA HERO SLIDER (arizona.html)
     Requires:
       [data-az-slider]
         .az-slide
       [data-az-prev] [data-az-next]
       [data-az-dots] .az-dot[data-az-dot="0.."]
  ========================== */
  (function arizonaSlider() {
    const slider = $("[data-az-slider]");
    if (!slider) return;

    const slides = $$(".az-slide", slider);
    if (slides.length <= 1) return;

    const prev = $("[data-az-prev]");
    const next = $("[data-az-next]");
    const dotsWrap = $("[data-az-dots]");
    const dots = dotsWrap ? $$("[data-az-dot]", dotsWrap) : [];

    let idx = 0;
    let timer = null;

    const setActive = (i) => {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === idx));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === idx));
    };

    const autoStart = () => {
      if (prefersReducedMotion()) return;
      autoStop();
      timer = setInterval(() => setActive(idx + 1), 5200);
    };
    const autoStop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    if (prev) prev.addEventListener("click", () => { setActive(idx - 1); autoStart(); });
    if (next) next.addEventListener("click", () => { setActive(idx + 1); autoStart(); });

    dots.forEach((d) => {
      d.addEventListener("click", () => {
        const n = parseInt(d.getAttribute("data-az-dot") || "0", 10);
        setActive(n);
        autoStart();
      });
    });

    slider.addEventListener("mouseenter", autoStop);
    slider.addEventListener("mouseleave", autoStart);

    setActive(0);
    autoStart();
  })();

  /* =========================
     ABOUT TABS (about.html)
     Requires:
       [data-tabs]
         .tab-btn[data-tab="key"]
         .tab-panel[data-panel="key"]
  ========================== */
  (function aboutTabs() {
    const tabs = $("[data-tabs]");
    if (!tabs) return;

    const btns = $$(".tab-btn", tabs);
    const panels = $$(".tab-panel", tabs);
    if (!btns.length || !panels.length) return;

    const activate = (key) => {
      btns.forEach((b) => {
        const is = b.getAttribute("data-tab") === key;
        b.classList.toggle("is-active", is);
        b.setAttribute("aria-selected", is ? "true" : "false");
      });
      panels.forEach((p) => {
        const is = p.getAttribute("data-panel") === key;
        p.classList.toggle("is-active", is);
      });
    };

    btns.forEach((b) => {
      b.addEventListener("click", () => activate(b.getAttribute("data-tab")));
    });

    // Default
    const first = btns.find((b) => b.classList.contains("is-active")) || btns[0];
    activate(first.getAttribute("data-tab"));
  })();

  /* =========================
     TILT (Spark Lab + any [data-tilt])
     Safe + subtle
  ========================== */
  (function tiltCards() {
    const cards = $$("[data-tilt]");
    if (!cards.length) return;
    if (prefersReducedMotion()) return;

    cards.forEach((card) => {
      let raf = null;

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;   // 0..1
        const y = (e.clientY - r.top) / r.height;   // 0..1
        const rx = (0.5 - y) * 8; // deg
        const ry = (x - 0.5) * 10;

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `translateY(-2px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
      };

      const onLeave = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        card.style.transform = "";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  })();

})();
