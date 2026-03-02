/* =========================================================
   main.js — site-wide, safe-by-default
   - Only runs features when matching DOM exists
========================================================= */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Footer year */
  (() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  })();

  /* Mobile nav toggle
     Supports your current markup:
     - button[data-nav-toggle]
     - nav[data-nav]
     Uses .nav.is-open (matches CSS)
  */
  (() => {
    const toggle = document.querySelector("[data-nav-toggle]") || document.querySelector(".nav-toggle");
    const nav = document.querySelector("[data-nav]") || document.querySelector(".nav");
    if (!toggle || !nav) return;

    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
    };

    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) close();
      else open();
    });

    nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      close();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  })();

  /* July 4 countdown ticker
     Works with:
     [data-july-ticker] and children:
     [data-tt-days] [data-tt-hours] [data-tt-mins] [data-tt-secs]
  */
  (() => {
    const ticker = $("[data-july-ticker]");
    if (!ticker) return;

    const dEl = $("[data-tt-days]", ticker);
    const hEl = $("[data-tt-hours]", ticker);
    const mEl = $("[data-tt-mins]", ticker);
    const sEl = $("[data-tt-secs]", ticker);
    if (!dEl || !hEl || !mEl || !sEl) return;

    const pad2 = (n) => String(n).padStart(2, "0");

    const getNextJuly4 = () => {
      const now = new Date();
      const year = now.getFullYear();
      let target = new Date(year, 6, 4, 0, 0, 0, 0); // July 4 00:00 local

      // If >= July 5 00:00, count to next year
      const cutoff = new Date(year, 6, 5, 0, 0, 0, 0);
      if (now >= cutoff) target = new Date(year + 1, 6, 4, 0, 0, 0, 0);

      return target;
    };

    const tickClass = (el) => {
      el.classList.remove("is-tick");
      // force reflow for animation restart
      void el.offsetWidth;
      el.classList.add("is-tick");
    };

    let last = { d: null, h: null, m: null, s: null };

    const render = () => {
      const now = new Date();
      const target = getNextJuly4();
      let diff = target.getTime() - now.getTime();
      if (diff < 0) diff = 0;

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const mins = Math.floor((totalSeconds % (60 * 60)) / 60);
      const secs = totalSeconds % 60;

      const dTxt = String(days);
      const hTxt = pad2(hours);
      const mTxt = pad2(mins);
      const sTxt = pad2(secs);

      if (last.d !== dTxt) { dEl.textContent = dTxt; tickClass(dEl); last.d = dTxt; }
      if (last.h !== hTxt) { hEl.textContent = hTxt; tickClass(hEl); last.h = hTxt; }
      if (last.m !== mTxt) { mEl.textContent = mTxt; tickClass(mEl); last.m = mTxt; }
      if (last.s !== sTxt) { sEl.textContent = sTxt; tickClass(sEl); last.s = sTxt; }
    };

    render();
    const t = setInterval(render, 1000);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) render();
    });

    window.addEventListener("beforeunload", () => clearInterval(t));
  })();

  /* Fundraising carousel
     Expects:
     .fundpage-carousel
       .fundpage-slide
       .fundpage-dot
       .fundpage-carousel-btn.prev / .next (optional)
  */
  (() => {
    const carousel = document.querySelector(".fundpage-carousel");
    if (!carousel) return;

    const slides = $$(".fundpage-slide", carousel);
    if (slides.length < 2) {
      if (slides[0]) slides[0].classList.add("is-active");
      return;
    }

    const dotsWrap = $(".fundpage-dots", carousel) || carousel;
    const dots = $$(".fundpage-dot", dotsWrap);

    const prevBtn = $(".fundpage-carousel-btn.prev", carousel);
    const nextBtn = $(".fundpage-carousel-btn.next", carousel);

    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 5200;

    const setActive = (i) => {
      index = (i + slides.length) % slides.length;

      slides.forEach((s, n) => {
        s.classList.toggle("is-active", n === index);
        s.classList.toggle("active", n === index);
      });

      if (dots.length) {
        dots.forEach((d, n) => {
          const on = n === index;
          d.classList.toggle("is-active", on);
          d.classList.toggle("active", on);
          d.setAttribute("aria-current", on ? "true" : "false");
        });
      }
    };

    const next = () => setActive(index + 1);
    const prev = () => setActive(index - 1);

    const start = () => {
      stop();
      timer = setInterval(next, AUTOPLAY_MS);
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    const pre = slides.findIndex((s) => s.classList.contains("is-active") || s.classList.contains("active"));
    setActive(pre >= 0 ? pre : 0);

    if (dots.length) {
      dots.forEach((d, n) => d.addEventListener("click", () => { setActive(n); start(); }));
    }

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); start(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); start(); });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    start();
    window.addEventListener("beforeunload", stop);
  })();

})();
