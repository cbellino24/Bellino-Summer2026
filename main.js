/* =========================================================
   main.js — site-wide, safe-by-default
   - Only runs features when matching DOM exists
   - Matches CSS mobile nav: .nav.is-open
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
     Mobile nav toggle (CSS expects .nav.is-open on mobile)
  ------------------------- */
  (() => {
    const toggle = $(".nav-toggle");
    const nav = $(".nav");
    if (!toggle || !nav) return;

    const mq = window.matchMedia("(max-width: 900px)");

    const setClosed = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    const setOpen = () => {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
    };

    // Ensure correct initial state on load for mobile
    const syncToViewport = () => {
      if (mq.matches) setClosed();
      else {
        // desktop: nav is always visible via CSS; remove mobile class
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    };

    syncToViewport();
    mq.addEventListener?.("change", syncToViewport);

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      if (isOpen) setClosed();
      else setOpen();
    });

    // Close on link click (mobile only)
    nav.addEventListener("click", (e) => {
      if (!mq.matches) return;
      const link = e.target.closest("a");
      if (!link) return;
      setClosed();
    });

    // Close on Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setClosed();
    });
  })();

  /* -------------------------
     July 4 Countdown (sitewide)
     Markup expects:
     [data-july-ticker]
       [data-tt-days] [data-tt-hours] [data-tt-mins] [data-tt-secs]
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

      // July 4 @ 00:00 local time
      let target = new Date(year, 6, 4, 0, 0, 0, 0); // month 6 = July

      // If we're at/after July 5 00:00, count to next year
      const cutoff = new Date(year, 6, 5, 0, 0, 0, 0);
      if (now >= cutoff) target = new Date(year + 1, 6, 4, 0, 0, 0, 0);

      return target;
    };

    const tickPulse = (el) => {
      el.classList.remove("is-tick");
      // force reflow
      void el.offsetWidth;
      el.classList.add("is-tick");
    };

    let prev = { d: null, h: null, m: null, s: null };

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

      const next = { d: String(days), h: pad2(hours), m: pad2(mins), s: pad2(secs) };

      if (prev.d !== next.d) tickPulse(dEl);
      if (prev.h !== next.h) tickPulse(hEl);
      if (prev.m !== next.m) tickPulse(mEl);
      if (prev.s !== next.s) tickPulse(sEl);

      dEl.textContent = next.d;
      hEl.textContent = next.h;
      mEl.textContent = next.m;
      sEl.textContent = next.s;

      prev = next;
      ticker.classList.add("tt-ready");
    };

    render();
    const t = setInterval(render, 1000);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) render();
    });

    window.addEventListener("beforeunload", () => clearInterval(t));
  })();

  /* -------------------------
     About Tabs
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

    const initialBtn = btns.find((b) => b.classList.contains("is-active")) || btns[0];
    const initialKey = initialBtn.dataset.tab;

    panels.forEach((p) => (p.hidden = !p.classList.contains("is-active")));
    activate(initialKey);

    btns.forEach((b) => b.addEventListener("click", () => activate(b.dataset.tab)));
  })();

  /* -------------------------
     Count-up stats (About hero)
     Container: [data-countup]
     Numbers:   [data-count="35"]
  ------------------------- */
  (() => {
    const root = $("[data-countup]");
    if (!root) return;

    const nums = $$("[data-count]", root);
    if (!nums.length) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateEl = (el) => {
      const raw = el.getAttribute("data-count");
      const target = Number(raw);
      if (!Number.isFinite(target)) return;

      if (prefersReduced) {
        el.textContent = String(target) + "+";
        return;
      }

      const duration = 850;
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
        { threshold: 0.35 }
      );
      io.observe(root);
    } else {
      run();
    }
  })();

  /* -------------------------
     Fundraising Carousel
     .fundpage-carousel
       .fundpage-slide
       .fundpage-dot
       .fundpage-carousel-btn.prev / .next
  ------------------------- */
  (() => {
    const carousel = $(".fundpage-carousel");
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

      slides.forEach((s, n) => s.classList.toggle("is-active", n === index));

      if (dots.length) {
        dots.forEach((d, n) => {
          d.classList.toggle("is-active", n === index);
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

    const pre = slides.findIndex((s) => s.classList.contains("is-active"));
    setActive(pre >= 0 ? pre : 0);

    if (dots.length) dots.forEach((d, n) => d.addEventListener("click", () => { setActive(n); start(); }));
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
