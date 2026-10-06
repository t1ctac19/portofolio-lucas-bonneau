document.addEventListener("DOMContentLoaded", () => {
  const progressSection = document.querySelector(".progress-section");
  const progressBars = document.querySelectorAll(".progress-component__fill");

  if (!progressSection || !progressBars.length || !window.gsap) {
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

  const observer = new IntersectionObserver(([section]) => {
    if (!section.isIntersecting) return;

    animateProgressBars();
    observer.disconnect();
  }, { threshold: 0.25 });

  observer.observe(progressSection);
});