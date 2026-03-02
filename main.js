/* =========================================================
   FUNDRAISING PAGE ONLY (safe / isolated)
   Paste at BOTTOM of styles.css
   - Scoped to body.fundraising-page so it won't touch index
========================================================= */

body.fundraising-page{
  background: var(--bg2);
  color: var(--white);
}

/* =========================
   HERO (Modern + Carousel)
========================= */
body.fundraising-page .fundpage-hero{
  position: relative;
  overflow: hidden;
  padding: 92px 0 72px;
  background: #0a0d1b;
}

body.fundraising-page .fundpage-hero-bg{
  position:absolute;
  inset:0;
  background:
    radial-gradient(1100px 560px at 18% 25%, rgba(255,255,255,.10), transparent 60%),
    radial-gradient(900px 520px at 82% 70%, rgba(225,29,46,.18), transparent 62%),
    linear-gradient(180deg, #0b1020 0%, #070a14 100%);
}

body.fundraising-page .fundpage-hero-shade{
  position:absolute;
  inset:0;
  background:
    radial-gradient(900px 520px at 70% 20%, rgba(225,29,46,.10), transparent 60%),
    linear-gradient(90deg, rgba(0,0,0,.42) 0%, rgba(0,0,0,.18) 56%, rgba(0,0,0,.06) 100%),
    linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.36));
}

body.fundraising-page .fundpage-hero-inner{ position:relative; z-index:2; }

body.fundraising-page .fundpage-hero-grid{
  display:grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 18px;
  align-items: start;
}

body.fundraising-page .fundpage-hero-grid--modern{
  gap: 22px;
}

body.fundraising-page .fundpage-pill{
  display:inline-block;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(225,29,46,.18);
  border: 1px solid rgba(225,29,46,.30);
  color: rgba(255,255,255,.92);
  font-weight: 1000;
  font-size: 12px;
  letter-spacing: .02em;
}

body.fundraising-page .fundpage-h1{
  margin: 14px 0 10px;
  font-size: clamp(36px, 4.2vw, 62px);
  line-height: 1.03;
  letter-spacing: -.02em;
  text-shadow: 0 14px 30px rgba(0,0,0,.28);
}

body.fundraising-page .fundpage-h1-accent{
  color: var(--red);
  text-shadow: 0 14px 30px rgba(0,0,0,.22);
}

body.fundraising-page .fundpage-sub{
  margin: 0 0 16px;
  color: rgba(255,255,255,.86);
  line-height: 1.7;
  font-size: 16px;
  max-width: 760px;
  text-shadow: 0 14px 30px rgba(0,0,0,.20);
}

body.fundraising-page .fundpage-hero-actions{
  display:flex;
  gap:12px;
  flex-wrap: wrap;
  margin: 10px 0 12px;
}

/* mini cards */
body.fundraising-page .fundpage-mini{
  margin-top: 12px;
  display:flex;
  gap: 12px;
  flex-wrap: wrap;
}
body.fundraising-page .fundpage-mini-card{
  padding: 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.06);
  box-shadow: 0 16px 30px rgba(0,0,0,.14);
}
body.fundraising-page .fundpage-mini-top{
  color: rgba(255,255,255,.74);
  font-weight: 900;
  font-size: 12px;
  letter-spacing: .02em;
}
body.fundraising-page .fundpage-mini-bot{
  margin-top: 6px;
  color: rgba(255,255,255,.90);
  font-weight: 1000;
  font-size: 13px;
}

body.fundraising-page .fundpage-checks{
  list-style:none;
  padding:0;
  margin: 16px 0 0;
  display:grid;
  gap:10px;
}
body.fundraising-page .fundpage-checks li{
  display:flex;
  align-items:flex-start;
  gap:10px;
  color: rgba(255,255,255,.88);
  font-weight: 800;
  line-height: 1.45;
  font-size: 14px;
}
body.fundraising-page .fundpage-check{
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.22);
  background: rgba(255,255,255,.06);
  position: relative;
  flex: 0 0 auto;
  margin-top: 2px;
}
body.fundraising-page .fundpage-check::after{
  content:"";
  position:absolute;
  width: 8px;
  height: 4px;
  border-left: 2px solid rgba(255,255,255,.92);
  border-bottom: 2px solid rgba(255,255,255,.92);
  transform: rotate(-45deg);
  top: 6px;
  left: 5px;
}

/* Right side: image carousel */
body.fundraising-page .fundpage-hero-media{
  margin-bottom: 14px;
}

body.fundraising-page .fundpage-carousel{
  position: relative;
  border-radius: var(--r22);
  border: 1px solid rgba(255,255,255,.14);
  overflow:hidden;
  background: rgba(255,255,255,.06);
  box-shadow: 0 24px 60px rgba(0,0,0,.35);

  /* Safari paint/stability helpers */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

body.fundraising-page .fundpage-carousel-track{
  position: relative;
  height: 260px;

  /* fallback so you don't see “empty” */
  background: #0b1020;
}

/* IMPORTANT: ensure slides paint above the track background */
body.fundraising-page .fundpage-slide{
  position:absolute;
  inset:0;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  opacity: 0;
  transform: scale(1.02) translateZ(0);
  -webkit-transform: scale(1.02) translateZ(0);

  transition: opacity 600ms ease, transform 900ms ease;
  will-change: opacity, transform;

  z-index: 1;
}

/* HARD FORCE: active slide must show (prevents “flash then disappears”) */
body.fundraising-page .fundpage-slide.is-active,
body.fundraising-page .fundpage-slide.active{
  opacity: 1 !important;
  transform: scale(1) translateZ(0);
  -webkit-transform: scale(1) translateZ(0);
  z-index: 2;
}

body.fundraising-page .fundpage-carousel::before{
  content:"";
  position:absolute;
  inset:0;
  z-index:3;           /* above slides */
  pointer-events:none;

  /* keep this clearly translucent */
  background:
    radial-gradient(900px 420px at 20% 0%, rgba(255,255,255,.10), transparent 60%),
    linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.32));
}

body.fundraising-page .fundpage-carousel-badge{
  position:absolute;
  left: 12px;
  bottom: 12px;
  z-index:4;
  display:flex;
  align-items:center;
  gap:10px;
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(0,0,0,.28);
  border: 1px solid rgba(255,255,255,.18);
  color: rgba(255,255,255,.92);
  font-weight: 900;
  font-size: 13px;
}

body.fundraising-page .fundpage-carousel-btn{
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.20);
  background: rgba(0,0,0,.22);
  color: rgba(255,255,255,.94);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:4;
  cursor:pointer;
  transition: transform .12s ease, background .12s ease, border-color .12s ease;
  font-size: 28px;
  line-height: 1;
}
body.fundraising-page .fundpage-carousel-btn:hover{
  background: rgba(0,0,0,.30);
  border-color: rgba(255,255,255,.32);
  transform: translateY(-50%) scale(1.03);
}
body.fundraising-page .fundpage-carousel-btn.prev{ left: 10px; }
body.fundraising-page .fundpage-carousel-btn.next{ right: 10px; }

body.fundraising-page .fundpage-dots{
  position:absolute;
  right: 12px;
  bottom: 12px;
  z-index:4;
  display:flex;
  gap:8px;
}
body.fundraising-page .fundpage-dot{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.30);
  background: rgba(255,255,255,.16);
  cursor:pointer;
  padding:0;
}
body.fundraising-page .fundpage-dot.is-active,
body.fundraising-page .fundpage-dot.active{
  background: rgba(255,255,255,.92);
}

/* Quick start card */
body.fundraising-page .fundpage-hero-card{
  border-radius: var(--r22);
  border: 1px solid rgba(255,255,255,.14);
  background:
    radial-gradient(900px 360px at 20% 0%, rgba(255,255,255,.10), transparent 62%),
    linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  box-shadow: var(--shadow-soft);
  overflow:hidden;
  padding: 18px;
}

body.fundraising-page .fundpage-hero-badge{
  display:inline-block;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.16);
  color: rgba(255,255,255,.92);
  font-weight: 1000;
  font-size: 12px;
  letter-spacing: .02em;
}
body.fundraising-page .fundpage-hero-card-h{
  margin: 10px 0 8px;
  font-size: 22px;
  font-weight: 1000;
  letter-spacing: -.02em;
}
body.fundraising-page .fundpage-hero-card-p{
  margin: 0 0 12px;
  color: rgba(255,255,255,.82);
  line-height: 1.65;
  font-weight: 700;
  font-size: 14px;
}

body.fundraising-page .fundpage-hero-card-steps{
  margin: 12px 0 14px;
  display:grid;
  gap: 10px;
}
body.fundraising-page .fundpage-step{
  display:flex;
  gap: 12px;
  align-items:flex-start;
  padding: 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(0,0,0,.18);
}
body.fundraising-page .fundpage-step-num{
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: rgba(225,29,46,.18);
  border: 1px solid rgba(225,29,46,.30);
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 1000;
}
body.fundraising-page .fundpage-step-title{
  font-weight: 1000;
  letter-spacing: -.01em;
  color: rgba(255,255,255,.92);
}
body.fundraising-page .fundpage-step-sub{
  margin-top: 4px;
  color: rgba(255,255,255,.74);
  font-weight: 700;
  line-height: 1.45;
  font-size: 13px;
}
body.fundraising-page .fundpage-hero-note{
  margin-top: 12px;
  display:flex;
  align-items:flex-start;
  gap:10px;
  color: rgba(255,255,255,.82);
  font-weight: 800;
  font-size: 13px;
  line-height: 1.45;
}

/* dot bullet helper (uses your existing .dot-bullet if present) */
body.fundraising-page .dot-bullet{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0,0,0,.18);
  flex: 0 0 auto;
}

/* =========================
   HEAD + BASE (light sections)
========================= */
body.fundraising-page .fundpage-head{ max-width: 980px; }

body.fundraising-page .fundpage-kicker{
  display:inline-block;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(225,29,46,.10);
  border: 1px solid rgba(225,29,46,.18);
  color: rgba(201,21,37,.92);
  font-weight: 1000;
  font-size: 12px;
  letter-spacing: .02em;
}

body.fundraising-page .fundpage-h2{
  margin: 14px 0 10px;
  font-size: clamp(28px, 3.0vw, 44px);
  line-height: 1.08;
  letter-spacing: -.02em;
  color: #0f172a;
}

body.fundraising-page .fundpage-p{
  margin: 0 0 18px;
  color: rgba(15,23,42,.72);
  line-height: 1.65;
  max-width: 860px;
}

/* =========================
   PROGRAMS (LIGHT)
========================= */
body.fundraising-page .fundpage-programs{
  background: #ffffff;
  color: var(--ink);
}
body.fundraising-page .fundpage-cards{
  margin-top: 14px;
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
body.fundraising-page .fundpage-card{
  padding: 18px 16px;
  border-radius: var(--r18);
  background: linear-gradient(180deg, rgba(15,23,42,.05), rgba(15,23,42,.03));
  border: 1px solid rgba(15,23,42,.12);
  box-shadow: 0 18px 45px rgba(2,6,23,.08);
  min-height: 190px;
}
body.fundraising-page .fundpage-card-top{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom: 8px;
}
body.fundraising-page .fundpage-icon{
  width: 36px;
  height: 36px;
  border-radius: 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(225,29,46,.10);
  border: 1px solid rgba(225,29,46,.18);
  font-size: 18px;
}
body.fundraising-page .fundpage-card h3{
  margin:0;
  font-size: 16px;
  letter-spacing: -.01em;
  color:#0f172a;
  font-weight: 1000;
}
body.fundraising-page .fundpage-card p{
  margin:0 0 10px;
  color: rgba(15,23,42,.72);
  line-height:1.6;
  font-size: 14px;
}
body.fundraising-page .fundpage-card ul{
  margin:0;
  padding-left: 18px;
  color: rgba(15,23,42,.72);
  line-height:1.7;
  font-weight: 700;
  font-size: 13px;
}
body.fundraising-page .fundpage-card li{ margin: 4px 0; }

body.fundraising-page .fundpage-bandline{ margin-top: 14px; }
body.fundraising-page .fundpage-bandline-card{
  padding: 14px 14px;
  border-radius: var(--r18);
  background: rgba(15,23,42,.03);
  border: 1px dashed rgba(15,23,42,.18);
}
body.fundraising-page .fundpage-bandline-title{
  font-weight: 1000;
  color: rgba(15,23,42,.82);
  margin-bottom: 10px;
}
body.fundraising-page .fundpage-bandline-tags{
  display:flex;
  gap:10px;
  flex-wrap: wrap;
}
body.fundraising-page .fundpage-bandline-tags span{
  padding: 9px 11px;
  border-radius: 999px;
  background: rgba(15,23,42,.04);
  border: 1px solid rgba(15,23,42,.10);
  font-weight: 900;
  font-size: 13px;
  color: rgba(15,23,42,.78);
}

/* =========================
   HOW IT WORKS (LIGHT)
========================= */
body.fundraising-page .fundpage-how{
  background:
    radial-gradient(900px 520px at 20% 0%, rgba(225,29,46,.06), transparent 62%),
    linear-gradient(180deg, #f7f8fd 0%, #ffffff 100%);
  color: var(--ink);
  border-top: 1px solid rgba(15,23,42,.08);
  border-bottom: 1px solid rgba(15,23,42,.08);
}
body.fundraising-page .fundpage-how-grid{
  margin-top: 14px;
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
body.fundraising-page .fundpage-how-card{
  padding: 18px 16px;
  border-radius: var(--r18);
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(15,23,42,.12);
  box-shadow: 0 18px 45px rgba(2,6,23,.08);
  min-height: 170px;
}
body.fundraising-page .fundpage-how-num{
  width: 36px;
  height: 36px;
  border-radius: 14px;
  background: rgba(225,29,46,.10);
  border: 1px solid rgba(225,29,46,.18);
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 1000;
  color: rgba(201,21,37,.92);
  margin-bottom: 10px;
}
body.fundraising-page .fundpage-how-card h3{
  margin:0 0 8px;
  font-size: 16px;
  letter-spacing:-.01em;
  color:#0f172a;
}
body.fundraising-page .fundpage-how-card p{
  margin:0;
  color: rgba(15,23,42,.72);
  line-height:1.6;
  font-size: 14px;
}

/* =========================
   PROOF (DARK)
========================= */
body.fundraising-page .fundpage-proof{
  position:relative;
  overflow:hidden;
  background: #0a0d1b;
  color: #fff;
}
body.fundraising-page .fundpage-proof::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(1100px 700px at 20% 10%, rgba(255,255,255,.10), transparent 60%),
    radial-gradient(900px 600px at 70% 90%, rgba(225,29,46,.10), transparent 58%),
    linear-gradient(180deg, #0b1020 0%, #070a14 100%);
  opacity: 1;
}
body.fundraising-page .fundpage-proof-grid{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 18px;
  align-items:start;
}
body.fundraising-page .fundpage-proof .fundpage-kicker{
  background: rgba(225,29,46,.18);
  border: 1px solid rgba(225,29,46,.30);
  color: rgba(255,255,255,.92);
}
body.fundraising-page .fundpage-proof .fundpage-h2{ color:#fff; }
body.fundraising-page .fundpage-proof .fundpage-p{ color: rgba(255,255,255,.82); }

body.fundraising-page .fundpage-proof-points{
  margin-top: 12px;
  display:grid;
  gap: 10px;
}
body.fundraising-page .fundpage-point{
  display:flex;
  align-items:center;
  gap:10px;
  color: rgba(255,255,255,.86);
  font-weight: 800;
  font-size: 13px;
}
body.fundraising-page .fundpage-proof-cta{
  margin-top: 14px;
  display:flex;
  gap:12px;
  flex-wrap: wrap;
}
body.fundraising-page .fundpage-video-note{
  margin-top: 10px;
  color: rgba(255,255,255,.76);
  font-weight: 800;
  font-size: 13px;
}

/* =========================
   FAQ (LIGHT / WHITE)
========================= */
body.fundraising-page .fundpage-faq{
  background:
    radial-gradient(900px 520px at 20% 0%, rgba(225,29,46,.06), transparent 62%),
    linear-gradient(180deg, #ffffff 0%, #f7f8fd 100%);
  color: var(--ink);
  border-top: 1px solid rgba(15,23,42,.08);
  border-bottom: 1px solid rgba(15,23,42,.08);
}

body.fundraising-page .fundpage-faq .fundpage-kicker{
  background: rgba(225,29,46,.10);
  border: 1px solid rgba(225,29,46,.18);
  color: rgba(201,21,37,.92);
}
body.fundraising-page .fundpage-faq .fundpage-h2{ color:#0f172a; }
body.fundraising-page .fundpage-faq .fundpage-p{ color: rgba(15,23,42,.72); }

body.fundraising-page .fundpage-faq-grid{
  margin-top: 14px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
body.fundraising-page .fundpage-faq-item{
  border-radius: 18px;
  border: 1px solid rgba(15,23,42,.12);
  background: rgba(255,255,255,.86);
  box-shadow: 0 18px 45px rgba(2,6,23,.08);
  padding: 12px 14px;
}
body.fundraising-page .fundpage-faq-item summary{
  cursor:pointer;
  font-weight: 1000;
  color: rgba(15,23,42,.92);
  list-style:none;
}
body.fundraising-page .fundpage-faq-item summary::-webkit-details-marker{ display:none; }
body.fundraising-page .fundpage-faq-a{
  margin-top: 10px;
  color: rgba(15,23,42,.74);
  line-height: 1.65;
  font-weight: 700;
  font-size: 14px;
}

/* =========================
   FORM (DARK)
========================= */
body.fundraising-page .fundpage-form{
  position:relative;
  overflow:hidden;
  background: #0a0d1b;
  color: #fff;
}
body.fundraising-page .fundpage-form::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(1000px 520px at 14% 18%, rgba(255,255,255,.10), transparent 60%),
    radial-gradient(900px 520px at 86% 70%, rgba(225,29,46,.16), transparent 62%),
    linear-gradient(180deg, #0b1020 0%, #070a14 100%);
  opacity: 1;
}
body.fundraising-page .fundpage-form .wrap{ position:relative; z-index:2; }

body.fundraising-page .fundpage-form .fundpage-kicker{
  background: rgba(225,29,46,.18);
  border: 1px solid rgba(225,29,46,.30);
  color: rgba(255,255,255,.92);
}
body.fundraising-page .fundpage-form .fundpage-h2{ color:#fff; }
body.fundraising-page .fundpage-form .fundpage-p{ color: rgba(255,255,255,.82); }

body.fundraising-page .fundpage-form-grid{
  margin-top: 14px;
  display:grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 18px;
  align-items:start;
}

body.fundraising-page .fundpage-form-card{
  border-radius: var(--r22);
  border: 1px solid rgba(255,255,255,.14);
  background:
    radial-gradient(900px 360px at 20% 0%, rgba(255,255,255,.10), transparent 62%),
    linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  box-shadow: var(--shadow-soft);
  overflow:hidden;
  padding: 16px;
}

body.fundraising-page .fundpage-form-row{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

body.fundraising-page .fundpage-form-card label{
  display:block;
  font-weight: 900;
  font-size: 13px;
  color: rgba(255,255,255,.88);
}

body.fundraising-page .fundpage-form-card input,
body.fundraising-page .fundpage-form-card select,
body.fundraising-page .fundpage-form-card textarea{
  width:100%;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(0,0,0,.18);
  color: rgba(255,255,255,.92);
  padding: 12px 12px;
  outline: none;
  font-weight: 700;
  margin-top: 6px;
}
body.fundraising-page .fundpage-form-card input::placeholder,
body.fundraising-page .fundpage-form-card textarea::placeholder{
  color: rgba(255,255,255,.55);
}
body.fundraising-page .fundpage-form-card input:focus,
body.fundraising-page .fundpage-form-card select:focus,
body.fundraising-page .fundpage-form-card textarea:focus{
  border-color: rgba(225,29,46,.45);
  box-shadow: 0 0 0 4px rgba(225,29,46,.12);
}

body.fundraising-page .fundpage-form-full{ margin-bottom: 12px; }

body.fundraising-page .fundpage-consent{
  display:flex !important;
  align-items:center;
  gap:10px;
  margin: 10px 0 12px;
  font-weight: 800 !important;
  font-size: 13px !important;
  color: rgba(255,255,255,.82) !important;
}
body.fundraising-page .fundpage-consent input{ width: 18px; height: 18px; margin: 0; }

body.fundraising-page .fundpage-submit{ width: 100%; }

body.fundraising-page .fundpage-form-note{
  margin-top: 12px;
  display:flex;
  align-items:center;
  gap:10px;
  color: rgba(255,255,255,.76);
  font-weight: 800;
  font-size: 13px;
}

/* sidebar cards */
body.fundraising-page .fundpage-form-side{
  display:grid;
  gap: 12px;
}
body.fundraising-page .fundpage-side-card{
  border-radius: var(--r22);
  border: 1px solid rgba(255,255,255,.14);
  background:
    radial-gradient(900px 360px at 20% 0%, rgba(255,255,255,.10), transparent 62%),
    linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  box-shadow: var(--shadow-soft);
  overflow:hidden;
  padding: 16px;
}
body.fundraising-page .fundpage-side-badge{
  display:inline-block;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.16);
  color: rgba(255,255,255,.92);
  font-weight: 1000;
  letter-spacing: .02em;
  font-size: 12px;
}
body.fundraising-page .fundpage-side-card h3{
  margin: 10px 0 8px;
  font-size: 18px;
  font-weight: 1000;
  letter-spacing:-.01em;
}
body.fundraising-page .fundpage-side-card p{
  margin: 0 0 12px;
  color: rgba(255,255,255,.82);
  line-height: 1.6;
  font-size: 14px;
  font-weight: 700;
}

body.fundraising-page .fundpage-side-list{
  list-style:none;
  padding:0;
  margin: 10px 0 12px;
  display:grid;
  gap: 10px;
}
body.fundraising-page .fundpage-side-list li{
  display:flex;
  align-items:center;
  gap:10px;
  color: rgba(255,255,255,.86);
  font-weight: 800;
  font-size: 13px;
}

body.fundraising-page .fundpage-side-mini{
  color: rgba(255,255,255,.74);
  font-weight: 700;
  line-height: 1.55;
  font-size: 13px;
}
body.fundraising-page .fundpage-side-mini strong{ color: rgba(255,255,255,.92); font-weight: 1000; }

body.fundraising-page .fundpage-side-card--alt{
  background:
    radial-gradient(900px 360px at 20% 0%, rgba(255,255,255,.08), transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.14));
}

/* =========================
   Responsive (Fundraising page)
========================= */
@media (max-width: 1020px){
  body.fundraising-page .fundpage-hero-grid,
  body.fundraising-page .fundpage-proof-grid,
  body.fundraising-page .fundpage-form-grid{
    grid-template-columns: 1fr;
  }

  body.fundraising-page .fundpage-cards{ grid-template-columns: repeat(2, 1fr); }
  body.fundraising-page .fundpage-how-grid{ grid-template-columns: repeat(2, 1fr); }

  body.fundraising-page .fundpage-carousel-track{ height: 240px; }
}

@media (max-width: 760px){
  body.fundraising-page .fundpage-hero{ padding: 78px 0 64px; }
  body.fundraising-page .fundpage-h1{ font-size: clamp(30px, 8vw, 44px); }

  body.fundraising-page .fundpage-faq-grid{ grid-template-columns: 1fr; }
  body.fundraising-page .fundpage-form-row{ grid-template-columns: 1fr; }

  body.fundraising-page .fundpage-mini-card{ width: 100%; }
  body.fundraising-page .fundpage-cards{ grid-template-columns: 1fr; }
  body.fundraising-page .fundpage-how-grid{ grid-template-columns: 1fr; }

  /* carousel buttons off on mobile (tap dots / auto) */
  body.fundraising-page .fundpage-carousel-btn{ display:none; }
  body.fundraising-page .fundpage-carousel-track{ height: 220px; }
}

/* =========================================================
   ABOUT PAGE: Tabs + Count-up (safe)
   Paste at bottom of main.js
========================================================= */

(() => {
  // Tabs
  const tabsRoot = document.querySelector("[data-tabs]");
  if (tabsRoot) {
    const btns = Array.from(tabsRoot.querySelectorAll("[data-tab]"));
    const panels = Array.from(tabsRoot.querySelectorAll("[data-panel]"));

    const setActive = (key) => {
      btns.forEach(b => {
        const on = b.getAttribute("data-tab") === key;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(p => p.classList.toggle("is-active", p.getAttribute("data-panel") === key));
    };

    btns.forEach(b => b.addEventListener("click", () => setActive(b.getAttribute("data-tab"))));
  }

  // Count-up (only runs if elements exist)
  const wrap = document.querySelector("[data-countup]");
  if (wrap) {
    const els = Array.from(wrap.querySelectorAll("[data-count]"));
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      els.forEach(el => {
        const target = parseInt(el.getAttribute("data-count") || "0", 10);
        if (!target) return;

        if (reduceMotion) {
          el.textContent = target >= 100 ? `${target}+` : String(target);
          return;
        }

        const start = 0;
        const dur = 900;
        const t0 = performance.now();

        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const val = Math.floor(start + (target - start) * p);
          el.textContent = target >= 100 ? `${val}+` : String(val);
          if (p < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });
    };

    // run once when visible-ish
    let ran = false;
    const io = new IntersectionObserver((entries) => {
      if (ran) return;
      if (entries.some(e => e.isIntersecting)) {
        ran = true;
        animate();
        io.disconnect();
      }
    }, { threshold: 0.2 });

    io.observe(wrap);
  }
})();
