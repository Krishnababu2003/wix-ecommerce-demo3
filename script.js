document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const searchBtn = document.getElementById("searchBtn");
  const mobileSearch = document.getElementById("mobileSearch");
  const closeSearch = document.getElementById("closeSearch");
  const siteSearch = document.getElementById("siteSearch");

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  // Mobile dropdowns
  document.querySelectorAll(".dropdown-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (window.innerWidth <= 900) {
        event.preventDefault();
        trigger.parentElement.classList.toggle("open");
      }
    });
  });

  // Search
  searchBtn.addEventListener("click", () => {
    mobileSearch.classList.add("visible");
    siteSearch.focus();
  });

  closeSearch.addEventListener("click", () => {
    mobileSearch.classList.remove("visible");
    siteSearch.value = "";
  });

  siteSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const query = siteSearch.value.trim();
      if (query) {
        alert(`Search requested for: ${query}`);
      }
    }
  });

  // Smooth close of mobile nav after selecting a link
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Feature switching
  const featureData = {
    brand: {
      title: "YOUR BRAND",
      eyebrow: "NEW SEASON",
      heading: "Everything you need\nto look your best.",
      background: "radial-gradient(circle at 78% 32%, rgba(255,255,255,.75), transparent 15%), linear-gradient(135deg, #d5d5cb, #a4a399)"
    },
    mobile: {
      title: "MOBILE FIRST",
      eyebrow: "SHOP ANYWHERE",
      heading: "A beautiful store\non every screen.",
      background: "radial-gradient(circle at 22% 30%, rgba(255,255,255,.55), transparent 18%), linear-gradient(135deg, #c8d0ca, #929d96)"
    },
    conversion: {
      title: "YOUR STORE",
      eyebrow: "BEST SELLERS",
      heading: "Turn attention\ninto purchases.",
      background: "radial-gradient(circle at 68% 22%, rgba(255,255,255,.52), transparent 18%), linear-gradient(135deg, #d2c5bd, #a98e84)"
    },
    ai: {
      title: "SMART CONTENT",
      eyebrow: "CREATE FASTER",
      heading: "Build content\nin less time.",
      background: "radial-gradient(circle at 64% 38%, rgba(255,255,255,.55), transparent 18%), linear-gradient(135deg, #c6c9d7, #9093a5)"
    }
  };

  const previewTitle = document.getElementById("previewTitle");
  const previewBanner = document.getElementById("previewBanner");
  const previewEyebrow = previewBanner.querySelector("small");
  const previewHeading = previewBanner.querySelector("h3");

  document.querySelectorAll(".feature-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".feature-item").forEach((el) => {
        el.classList.remove("active");
      });
      item.classList.add("active");

      const data = featureData[item.dataset.feature];
      previewTitle.textContent = data.title;
      previewEyebrow.textContent = data.eyebrow;
      previewHeading.innerHTML = data.heading.replace("\n", "<br>");
      previewBanner.style.background = data.background;

      previewBanner.animate(
        [
          { transform: "scale(.985)", opacity: .75 },
          { transform: "scale(1)", opacity: 1 }
        ],
        { duration: 280, easing: "ease-out" }
      );
    });
  });

  // Template category filter
  const categoryButtons = document.querySelectorAll(".cat-btn");
  const cards = document.querySelectorAll(".template-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;

      cards.forEach((card) => {
        const show = card.dataset.category === category;
        card.style.display = show ? "" : "none";
      });
    });
  });

  // Show all template cards when leaving the section filter via resize:
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      document.querySelectorAll(".nav-group").forEach((group) => group.classList.remove("open"));
    }
  });

  /* =========================================================
     REVIEW CAROUSEL
  ========================================================= */

  const reviewSlides = document.querySelectorAll(".review-slide");
  const reviewDots = document.querySelectorAll(".review-dot");
  const reviewPrev = document.getElementById("reviewPrev");
  const reviewNext = document.getElementById("reviewNext");
  let reviewIndex = 0;

  function showReview(index) {
    if (!reviewSlides.length) return;

    reviewIndex = (index + reviewSlides.length) % reviewSlides.length;

    reviewSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === reviewIndex);
    });

    reviewDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === reviewIndex);
    });
  }

  if (reviewPrev) {
    reviewPrev.addEventListener("click", () => {
      showReview(reviewIndex - 1);
    });
  }

  if (reviewNext) {
    reviewNext.addEventListener("click", () => {
      showReview(reviewIndex + 1);
    });
  }

  reviewDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showReview(Number(dot.dataset.index));
    });
  });

  if (reviewSlides.length > 1) {
    setInterval(() => {
      showReview(reviewIndex + 1);
    }, 5000);
  }


  /* =========================================================
     CONTACT FORM
  ========================================================= */

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const message = document.getElementById("contactMessage")?.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please complete all required fields.";
        formStatus.style.color = "#f0a49a";
        return;
      }

      formStatus.textContent =
        `Thanks, ${name}. Your message has been captured successfully.`;
      formStatus.style.color = "#b7c6b7";

      contactForm.reset();
    });
  }

});
