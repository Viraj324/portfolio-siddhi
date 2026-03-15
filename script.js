(() => {
  "use strict";

  // ── Typing animation ──
  const typedEl = document.getElementById("typed-text");
  const phrases = [
    "AI & Machine Learning Engineer",
    "Deep Learning Researcher",
    "Data Science Enthusiast",
    "NLP Practitioner",
    "Computer Vision Developer",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const TYPING_SPEED = 70;
  const DELETING_SPEED = 40;
  const PAUSE_END = 2000;
  const PAUSE_START = 400;

  function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, PAUSE_END);
        return;
      }
      setTimeout(typeLoop, TYPING_SPEED);
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, PAUSE_START);
        return;
      }
      setTimeout(typeLoop, DELETING_SPEED);
    }
  }
  setTimeout(typeLoop, 800);

  // ── Navbar scroll effect ──
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll(".nav-links a:not(.nav-cta)");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    let currentSection = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom > 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinksContainer.classList.toggle("open");
  });

  navLinksContainer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinksContainer.classList.remove("open");
    });
  });

  // ── Scroll reveal animation ──
  const revealTargets = document.querySelectorAll(
    ".timeline-item, .project-card, .skill-category, .education-card, .achievement-card, .about-grid, .contact-content"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  // ── Counter animation ──
  const statNumbers = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ── Parallax on hero background blobs ──
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        hero.style.setProperty("--mx", `${x}px`);
        hero.style.setProperty("--my", `${y}px`);
      },
      { passive: true }
    );
  }
})();
