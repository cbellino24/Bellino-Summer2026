const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const clickedToggle = menuToggle.contains(event.target);
    const clickedNav = siteNav.contains(event.target);

    if (!clickedToggle && !clickedNav && siteNav.classList.contains("is-open")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* Hero image + copy sync */
const heroImageSlides = document.querySelectorAll(".hero-slide");
const heroCopySlides = document.querySelectorAll(".hero-copy-slide");
const heroCopyContainer = document.querySelector("[data-hero-copy]");
let currentHeroIndex = 0;
let heroInterval;

function setHeroCopyHeight() {
  if (!heroCopyContainer || !heroCopySlides.length) return;

  const previousStyles = [];

  heroCopySlides.forEach((slide, index) => {
    previousStyles[index] = {
      position: slide.style.position,
      opacity: slide.style.opacity,
      pointerEvents: slide.style.pointerEvents,
      transform: slide.style.transform,
      inset: slide.style.inset
    };

    slide.style.position = "relative";
    slide.style.opacity = "1";
    slide.style.pointerEvents = "auto";
    slide.style.transform = "none";
    slide.style.inset = "auto";
  });

  let maxHeight = 0;
  heroCopySlides.forEach((slide) => {
    maxHeight = Math.max(maxHeight, slide.offsetHeight);
  });

  heroCopyContainer.style.height = `${maxHeight}px`;

  heroCopySlides.forEach((slide, index) => {
    slide.style.position = previousStyles[index].position;
    slide.style.opacity = previousStyles[index].opacity;
    slide.style.pointerEvents = previousStyles[index].pointerEvents;
    slide.style.transform = previousStyles[index].transform;
    slide.style.inset = previousStyles[index].inset;
  });
}

function showHeroSlide(index) {
  heroImageSlides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });

  heroCopySlides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });

  currentHeroIndex = index;
}

function nextHeroSlide() {
  if (!heroImageSlides.length) return;
  const nextIndex = (currentHeroIndex + 1) % heroImageSlides.length;
  showHeroSlide(nextIndex);
}

function startHeroSlider() {
  if (heroInterval) clearInterval(heroInterval);

  if (window.innerWidth <= 700) {
    showHeroSlide(0);
    return;
  }

  if (heroImageSlides.length > 1) {
    heroInterval = setInterval(nextHeroSlide, 5000);
  }
}

if (heroImageSlides.length > 1 && heroCopySlides.length === heroImageSlides.length) {
  setHeroCopyHeight();
  showHeroSlide(0);
  startHeroSlider();

  window.addEventListener("resize", () => {
    setHeroCopyHeight();
    startHeroSlider();
  });

  window.addEventListener("load", () => {
    setHeroCopyHeight();
    startHeroSlider();
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function updateJuly4Countdown() {
  const countdownEl = document.getElementById("july4Countdown");
  if (!countdownEl) return;

  const now = new Date();
  const currentYear = now.getFullYear();
  let target = new Date(currentYear, 6, 4, 0, 0, 0);

  if (now > target) {
    target = new Date(currentYear + 1, 6, 4, 0, 0, 0);
  }

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    countdownEl.textContent = "It’s July 4th!";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateJuly4Countdown();
setInterval(updateJuly4Countdown, 1000);

/* Fundraising carousel */
const fundCarousel = document.querySelector("[data-fund-carousel]");

if (fundCarousel) {
  const slides = fundCarousel.querySelectorAll(".fund-slide");
  const dots = fundCarousel.querySelectorAll(".fund-dot");
  const prevBtn = fundCarousel.querySelector("[data-fund-prev]");
  const nextBtn = fundCarousel.querySelector("[data-fund-next]");
  let currentIndex = 0;
  let autoplay;

  function showFundSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });

    currentIndex = index;
  }

  function nextFundSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showFundSlide(nextIndex);
  }

  function prevFundSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showFundSlide(prevIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    if (slides.length > 1) {
      autoplay = setInterval(nextFundSlide, 4500);
    }
  }

  function stopAutoplay() {
    if (autoplay) clearInterval(autoplay);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevFundSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextFundSlide();
      startAutoplay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showFundSlide(index);
      startAutoplay();
    });
  });

  fundCarousel.addEventListener("mouseenter", stopAutoplay);
  fundCarousel.addEventListener("mouseleave", startAutoplay);

  showFundSlide(0);
  startAutoplay();
}

/* Nebraska city filter */
const neFilterButtons = document.querySelectorAll(".ne-filter-btn");
const neCityPanels = document.querySelectorAll(".ne-city-panel");

if (neFilterButtons.length && neCityPanels.length) {
  function showNebraskaPanels(filter) {
    neCityPanels.forEach((panel) => {
      const panelCity = panel.getAttribute("data-city-panel");
      const shouldShow = filter === "all" || panelCity === filter;
      panel.style.display = shouldShow ? "block" : "none";
    });

    neFilterButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.getAttribute("data-city-filter") === filter
      );
    });
  }

  neFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-city-filter");
      showNebraskaPanels(filter);
    });
  });

  showNebraskaPanels("all");
}

/* Iowa city filter */
const iaFilterButtons = document.querySelectorAll(".ia-filter-btn");
const iaCityPanels = document.querySelectorAll(".ia-city-panel");

if (iaFilterButtons.length && iaCityPanels.length) {
  function showIowaPanels(filter) {
    iaCityPanels.forEach((panel) => {
      const panelCity = panel.getAttribute("data-ia-city-panel");
      const shouldShow = filter === "all" || panelCity === filter;
      panel.style.display = shouldShow ? "block" : "none";
    });

    iaFilterButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.getAttribute("data-ia-city-filter") === filter
      );
    });
  }

  iaFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-ia-city-filter");
      showIowaPanels(filter);
    });
  });

  showIowaPanels("all");
}

/* Product category filter + search */
const productFilterButtons = document.querySelectorAll(".product-filter-btn");
const productCards = document.querySelectorAll("[data-product-card]");
const productSearchInput = document.querySelector("[data-product-search]");

if (productCards.length) {
  let activeProductFilter = "all";
  let productSearchTerm = "";

  function normalize(text) {
    return String(text || "").trim().toLowerCase();
  }

  function updateProductCards() {
    const term = normalize(productSearchTerm);

    productCards.forEach((card) => {
      const type = normalize(card.getAttribute("data-product-type"));
      const name = normalize(card.getAttribute("data-product-name"));

      const matchesFilter = activeProductFilter === "all" || type === activeProductFilter;
      const matchesSearch = !term || name.includes(term);

      card.style.display = matchesFilter && matchesSearch ? "" : "none";
    });
  }

  if (productFilterButtons.length) {
    productFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeProductFilter = normalize(button.getAttribute("data-product-filter")) || "all";

        productFilterButtons.forEach((btn) => {
          btn.classList.toggle(
            "is-active",
            normalize(btn.getAttribute("data-product-filter")) === activeProductFilter
          );
        });

        updateProductCards();
      });
    });
  }

  if (productSearchInput) {
    productSearchInput.addEventListener("input", (event) => {
      productSearchTerm = event.target.value;
      updateProductCards();
    });
  }

  updateProductCards();
}