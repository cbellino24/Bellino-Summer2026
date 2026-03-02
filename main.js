/* =========================================================
   main.js — site-wide, safe-by-default
   - Only runs features when matching DOM exists
========================================================= */
(() => {
  "use strict";

  /* -------------------------
     Helpers
  ------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* -------------------------
     Footer year
  ------------------------- */
  (() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  })();

  /* -------------------------
     Mobile nav toggle (supports .nav or .mobile-nav patterns)
  ------------------------- */
  (() => {
    const toggle = $(".nav-toggle");
    if (!toggle) return;

    // Some pages may use .mobile-nav, others just .nav
    const nav = $(".mobile-nav") || $(".nav");
    if (!nav) return;

    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("nav-open");
      nav.hidden = false;
    };

    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("nav-open");
      // Only hide if element supports "hidden" behavior
      nav.hidden = true;
    };

    // Initialize hidden state safely
    // (If your CSS handles visibility, this won't hurt.)
    if (toggle.getAttribute("aria-expanded") !== "true") {
      nav.hidden = true;
    }

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) close();
      else open();
    });

    // Close on link click (mobile)
    nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      close();
    });

    // Close on Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  })();

  /* -------------------------
     July 4 Top Ticker Countdown
     Markup expects:
     <section class="top-ticker" data-july-ticker>
       ... [data-tt-days] [data-tt-hours] [data-tt-mins] [data-tt-secs]
  ------------------------- */
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

      // Local time July 4 @ 00:00
      let target = new Date(year, 6, 4, 0, 0, 0, 0); // month 6 = July

      // If we're already past July 4 (end of day), count to next year
      // Safer: if now >= July 5 00:00, use next year
      const cutoff = new Date(year, 6, 5, 0, 0, 0, 0);
      if (now >= cutoff) target = new Date(year + 1, 6, 4, 0, 0, 0, 0);

      return target;
    };

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

      // Set text (days can be 1-3 digits; don't pad)
      dEl.textContent = String(days);
      hEl.textContent = pad2(hours);
      mEl.textContent = pad2(mins);
      sEl.textContent = pad2(secs);

      // Optional: add a "loaded" class so you can style away placeholders
      ticker.classList.add("tt-ready");
    };

    render();
    const t = setInterval(render, 1000);

    // If page is hidden, reduce work; resume on focus
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      render();
    });

    // Safety cleanup if needed (not usually required)
    window.addEventListener("beforeunload", () => clearInterval(t));
  })();

  /* -------------------------
     About page Tabs
     Wrapper: [data-tabs]
     Buttons: .tab-btn[data-tab="..."]
     Panels:  .tab-panel[data-panel="..."]
  ------------------------- */
  (() => {
    const tabsRoot = $("[data-tabs]");
    if (!tabsRoot) return;

    const btns = $$(".tab-btn", tabsRoot);
    const panels = $$(".tab-panel", tabsRoot);
    if (!btns.length || !panels.length) return;

    const activate = (key) => {
      btns.forEach((b) => {
        const isOn = b.dataset.tab === key;
        b.classList.toggle("is-active", isOn);
        b.setAttribute("aria-selected", isOn ? "true" : "false");
      });

      panels.forEach((p) => {
        const isOn = p.dataset.panel === key;
        p.classList.toggle("is-active", isOn);
        p.hidden = !isOn;
      });
    };

    // init: hide non-active panels
    const initialBtn = btns.find((b) => b.classList.contains("is-active")) || btns[0];
    const initialKey = initialBtn.dataset.tab;
    panels.forEach((p) => (p.hidden = !p.classList.contains("is-active")));
    activate(initialKey);

    btns.forEach((b) => {
      b.addEventListener("click", () => activate(b.dataset.tab));
    });
  })();

  /* -------------------------
     Count-up stats (About hero)
     Container: [data-countup]
     Numbers:   [data-count="35"] etc
  ------------------------- */
  (() => {
    const root = $("[data-countup]");
    if (!root) return;

    const nums = $$("[data-count]", root);
    if (!nums.length) return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateEl = (el) => {
      const raw = el.getAttribute("data-count");
      const target = Number(raw);
      if (!Number.isFinite(target)) return;

      if (prefersReduced) {
        el.textContent = String(target) + "+";
        return;
      }

      const duration = 800;
      const start = 0;
      const startTime = performance.now();

      const tick = (now) => {
        const p = Math.min(1, (now - startTime) / duration);
        const val = Math.round(start + (target - start) * p);
        el.textContent = String(val) + "+";
        if (p < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    let ran = false;

    const run = () => {
      if (ran) return;
      ran = true;
      nums.forEach(animateEl);
    };

    // run when visible
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run();
              io.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      io.observe(root);
    } else {
      // fallback
      run();
    }
  })();

  /* -------------------------
     Fundraising Carousel (safe, only if exists)
     Expected:
     .fundpage-carousel
       .fundpage-slide (background-image via CSS or inline)
       .fundpage-dot
       .fundpage-carousel-btn.prev / .next (optional)
  ------------------------- */
  (() => {
    const carousel = $(".fundpage-carousel");
    if (!carousel) return;

    const slides = $$(".fundpage-slide", carousel);
    if (slides.length < 2) {
      // ensure first is active if only one
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
        s.classList.toggle("active", n === index); // supports either class name
      });

      if (dots.length) {
        dots.forEach((d, n) => {
          d.classList.toggle("is-active", n === index);
          d.classList.toggle("active", n === index);
          d.setAttribute("aria-current", n === index ? "true" : "false");
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

    // init: pick any pre-marked active slide
    const pre = slides.findIndex((s) => s.classList.contains("is-active") || s.classList.contains("active"));
    setActive(pre >= 0 ? pre : 0);

    // dots click
    if (dots.length) {
      dots.forEach((d, n) => d.addEventListener("click", () => { setActive(n); start(); }));
    }

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); start(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); start(); });

    // pause on hover/focus
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    // kickoff autoplay
    start();

    window.addEventListener("beforeunload", stop);
  })();
})();
