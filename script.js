// 1. Respect the user's OS-level "reduce motion" setting.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------
// 2. SCROLL PROGRESS BAR
// ---------------------------------------------------------------------
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + "%";
}

// ---------------------------------------------------------------------
// 3. NAVBAR BACKGROUND + ACTIVE LINK
// ---------------------------------------------------------------------
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateNavbarBackground() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function updateActiveNavLink() {
  let currentSectionId = sections[0] ? sections[0].id : "";
  const scrollPos = window.scrollY + window.innerHeight * 0.3;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + currentSectionId;
    link.classList.toggle("active", isActive);
  });
}

// ---------------------------------------------------------------------
// 4. MOBILE HAMBURGER MENU
// ---------------------------------------------------------------------
const hamburger = document.getElementById("hamburger");
const navLinksWrap = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  const isOpen = navLinksWrap.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu whenever a nav link is tapped
navLinksWrap.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksWrap.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ---------------------------------------------------------------------
// 5. SCROLL-REVEAL ANIMATION
//    Automatically marks section content as "reveal" and fades it in
//    the first time it enters the viewport.
// ---------------------------------------------------------------------
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    ".about-text, .about-cards, .skill-category, .project-card, " +
    ".timeline-item, .cert-card, .achievement-card, .github-panel, " +
    ".resume-inner, .contact-info, .contact-form"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  if (prefersReducedMotion) {
    // Skip the animation entirely — just show everything immediately.
    revealTargets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// ---------------------------------------------------------------------
// 6. HERO TYPING ANIMATION
// ---------------------------------------------------------------------
function initTypingAnimation() {
  const typedTextEl = document.getElementById("typed-text");
  const phrases = ["Machine Learning", "Deep Learning", "Python", "AI"];

  if (prefersReducedMotion) {
    typedTextEl.textContent = phrases.join(" • ");
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      typedTextEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      charIndex--;
      typedTextEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, isDeleting ? 40 : 80);
  }

  tick();
}

// ---------------------------------------------------------------------
// 7. NEURAL NETWORK CANVAS ANIMATION
//    A lightweight field of glowing nodes connected by lines, drifting
//    slowly and reacting a little to the mouse. Purely decorative.
// ---------------------------------------------------------------------
function initNeuralCanvas() {
  const canvas = document.getElementById("neural-canvas");
  const ctx = canvas.getContext("2d");
  const hero = document.querySelector(".hero");

  let width, height, nodes;
  let mouseX = -9999, mouseY = -9999;
  const NODE_COUNT = 55;
  const LINK_DISTANCE = 130;

  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update positions
    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Gentle pull toward the mouse for a subtle interactive feel
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        node.x -= dx * 0.002;
        node.y -= dy * 0.002;
      }
    });

    // Draw links between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINK_DISTANCE) {
          const opacity = 1 - dist / LINK_DISTANCE;
          ctx.strokeStyle = `rgba(79, 124, 255, ${opacity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 211, 238, 0.85)";
      ctx.fill();
    });

    if (!prefersReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  resize();
  createNodes();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createNodes();
    if (prefersReducedMotion) draw(); // redraw a single static frame
  });

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  hero.addEventListener("mouseleave", () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  // If motion is reduced, draw one static frame instead of animating.
  if (prefersReducedMotion) draw();
}

// ---------------------------------------------------------------------
// 7b. 3D PHOTO FRAME TILT
//     The frame tilts gently toward the mouse, then eases back to its
//     resting angle when the pointer leaves.
// ---------------------------------------------------------------------
function initPhotoFrameTilt() {
  const wrap = document.getElementById("photo-frame-wrap");
  if (!wrap) return;

  const frame = wrap.querySelector(".photo-frame");
  if (prefersReducedMotion) return;

  wrap.addEventListener("mousemove", (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = -8 + x * 20; // keep near the resting -8deg tilt
    const rotateX = 4 - y * 20;

    frame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  wrap.addEventListener("mouseleave", () => {
    frame.style.transform = "rotateY(-8deg) rotateX(4deg)";
  });
}

// ---------------------------------------------------------------------
// 8. BACK-TO-TOP BUTTON
// ---------------------------------------------------------------------
const backToTopBtn = document.getElementById("back-to-top");

function updateBackToTop() {
  backToTopBtn.classList.toggle("visible", window.scrollY > 500);
}

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

// ---------------------------------------------------------------------
// 9. CONTACT FORM VALIDATION (frontend-only for now)
// ---------------------------------------------------------------------
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

function showError(inputEl, errorEl, message) {
  inputEl.classList.add("invalid");
  errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove("invalid");
  errorEl.textContent = "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Remove this line once a real backend/Formspree/EmailJS is wired up.

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  let isFormValid = true;

  if (nameInput.value.trim().length < 2) {
    showError(nameInput, nameError, "Please enter your name.");
    isFormValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    isFormValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, "Message should be at least 10 characters.");
    isFormValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (!isFormValid) {
    formSuccess.classList.remove("show");
    return;
  }

  // --- No backend is connected yet, so we just show a success message. ---
  // Once you wire up Formspree, EmailJS, or a Flask endpoint, replace this
  // block with the actual send call (see the comment above the <form> in
  // index.html for exact instructions).
  formSuccess.classList.add("show");
  contactForm.reset();
});

// ---------------------------------------------------------------------
// SCROLL LISTENER (throttled with requestAnimationFrame)
// ---------------------------------------------------------------------
let scrollTicking = false;

function onScroll() {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateNavbarBackground();
      updateActiveNavLink();
      updateBackToTop();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}

window.addEventListener("scroll", onScroll);

// ---------------------------------------------------------------------
// INIT — run everything once the DOM is ready
// ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  updateScrollProgress();
  updateNavbarBackground();
  updateActiveNavLink();
  updateBackToTop();
  initScrollReveal();
  initTypingAnimation();
  initNeuralCanvas();
  initPhotoFrameTilt();
});
