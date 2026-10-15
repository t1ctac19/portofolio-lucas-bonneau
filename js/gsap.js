document.addEventListener("DOMContentLoaded", () => {
  const progressSection = document.querySelector(".progress-section");
  const progressBars = document.querySelectorAll(".progress-component__fill");

  if (!window.gsap) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const animateOnScroll = (elements, animation) => {
    if (!elements.length) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1 });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animation(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    elements.forEach((element) => observer.observe(element));
  };

  const demoReel = document.querySelector(".container");
  animateOnScroll(demoReel ? [demoReel] : [], (element) => {
    gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
    );
  });

  const animateProjectCards = (cards) => {
    animateOnScroll(cards, (element) => {
      gsap.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
      );
    });
  };

  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    const initialCards = [...projectsGrid.querySelectorAll(".component-card")];
    initialCards.forEach((card) => card.setAttribute("data-fade-in-ready", ""));
    animateProjectCards(initialCards);

    const projectsObserver = new MutationObserver(() => {
      const newCards = [...projectsGrid.querySelectorAll(
        ".component-card:not([data-fade-in-ready])",
      )];

      newCards.forEach((card) => card.setAttribute("data-fade-in-ready", ""));
      animateProjectCards(newCards);
    });

    projectsObserver.observe(projectsGrid, { childList: true });
  }

  if (!progressSection || !progressBars.length) {
    return;
  }

  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const progress = Number(bar.parentElement.getAttribute("aria-valuenow"));

      if (!Number.isFinite(progress)) return;

      gsap.fromTo(bar, { width: "0%" }, {
        width: `${progress}%`,
        duration: 1.4,
        ease: "power2.out",
      });
    });
  };

  const progressObserver = new IntersectionObserver(([section]) => {
    if (!section.isIntersecting) return;

    animateProgressBars();
    progressObserver.disconnect();
  }, { threshold: 0.25 });

  progressObserver.observe(progressSection);
});