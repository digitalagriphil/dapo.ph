function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Highlight active side-dot as the visitor scrolls through sections
const sections = document.querySelectorAll("section[id]");
const dots = document.querySelectorAll(".dots a");
const dotMap = {};
dots.forEach(d => dotMap[d.getAttribute("href").slice(1)] = d);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      dots.forEach(d => d.classList.remove("active"));
      const active = dotMap[entry.target.id];
      if (active) active.classList.add("active");
    }
  });
}, { threshold: 0.6 });

sections.forEach(s => sectionObserver.observe(s));

// ===== "Our Innovations" product carousel =====
const carTrack = document.getElementById("carTrack");
const carPrev = document.getElementById("carPrev");
const carNext = document.getElementById("carNext");
const carDotsWrap = document.getElementById("carDots");

if (carTrack && carDotsWrap) {
  const slides = Array.from(carTrack.children);

  // Build one dot per slide
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      carTrack.scrollTo({ left: carTrack.clientWidth * i, behavior: "smooth" });
    });
    carDotsWrap.appendChild(dot);
  });
  const carDots = Array.from(carDotsWrap.children);

  function currentIndex() {
    return Math.round(carTrack.scrollLeft / carTrack.clientWidth);
  }

  function updateActiveDot() {
    const idx = Math.min(currentIndex(), carDots.length - 1);
    carDots.forEach(d => d.classList.remove("active"));
    if (carDots[idx]) carDots[idx].classList.add("active");
  }

  let scrollTicking = false;
  carTrack.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateActiveDot();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  carPrev.addEventListener("click", () => {
    const idx = Math.max(currentIndex() - 1, 0);
    carTrack.scrollTo({ left: carTrack.clientWidth * idx, behavior: "smooth" });
  });

  carNext.addEventListener("click", () => {
    const idx = Math.min(currentIndex() + 1, slides.length - 1);
    carTrack.scrollTo({ left: carTrack.clientWidth * idx, behavior: "smooth" });
  });
}
