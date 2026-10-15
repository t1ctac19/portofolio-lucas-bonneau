async function loadProjects() {
  const response = await fetch("data/projects.json"); // 1. la réponse du serveur
  const projects = await response.json(); // 2. le contenu, converti
  return projects; // 3. un tableau de projets
}

function createCarousel(images, alt, projectTitle) {
  const slides = images
    .map(
      (image, imageIndex) => `
        <img
          class="project-carousel__image${imageIndex === 0 ? " project-carousel__image--active" : ""}${image.endsWith("messenger_rise_03.png") ? " project-carousel__image--contain" : ""}"
          src="${image}"
          alt="${alt} - image ${imageIndex + 1}"
          data-carousel-slide="${imageIndex}"
          ${imageIndex === 0 ? "" : "hidden"}
        />`,
    )
    .join("");

  const indicators = images
    .map(
      (_, imageIndex) => `
        <button
          class="project-carousel__indicator${imageIndex === 0 ? " project-carousel__indicator--active" : ""}"
          type="button"
          aria-label="Afficher l'image ${imageIndex + 1} de ${projectTitle}"
          aria-current="${imageIndex === 0 ? "true" : "false"}"
          data-carousel-go-to="${imageIndex}"
        ></button>`,
    )
    .join("");

  return `
    <div class="project-carousel" data-carousel>
      <div class="project-carousel__viewport">
        ${slides}
        <button class="project-carousel__button project-carousel__button--previous" type="button" aria-label="Image précédente" data-carousel-action="previous">&lsaquo;</button>
        <button class="project-carousel__button project-carousel__button--next" type="button" aria-label="Image suivante" data-carousel-action="next">&rsaquo;</button>
      </div>
      <div class="project-carousel__indicators" aria-label="Images du projet">
        ${indicators}
      </div>
    </div>`;
}

function createProjectVisual(project) {
  const images = Array.isArray(project.image) ? project.image : [project.image];

  return images.length > 1
    ? createCarousel(images, project.alt, project.title)
    : `<img src="${images[0]}" alt="${project.alt}" />`;
}

function createProjectCardVisual(project) {
  const image = Array.isArray(project.image) ? project.image[0] : project.image;

  return `<img src="${image}" alt="${project.alt}" />`;
}

function createProcessSection(process, processId) {
  if (!process) {
    return "";
  }

  return `
    <section class="project-process" aria-labelledby="${processId}">
      <h3 id="${processId}">Processus de création</h3>
      <ol>
        ${process.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </section>`;
}

function createProjectDetails(project) {
  const details = [
    ["Académique ou personnel", project.academicStatus],
    ["Réalisé dans le cadre du cours", project.course],
    ["Individuel ou en équipe", project.teamStatus],
    ["Nom de vos coéquipiers", project.teammates],
    ["Contexte du projet", project.context],
    ["Réalisation", project.realization],
  ].filter(([, description]) => description);

  return details
    .map(
      ([title, description]) => `
        <section class="project-description">
          <h3>${title}</h3>
          <p>${description}</p>
        </section>`,
    )
    .join("");
}

function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
    const indicators = [...carousel.querySelectorAll("[data-carousel-go-to]")];
    let currentIndex = 0;

    const showSlide = (nextIndex) => {
      currentIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const isActive = index === currentIndex;
        slide.hidden = !isActive;
        slide.classList.toggle("project-carousel__image--active", isActive);
      });
      indicators.forEach((indicator, index) => {
        const isActive = index === currentIndex;
        indicator.classList.toggle("project-carousel__indicator--active", isActive);
        indicator.setAttribute("aria-current", String(isActive));
      });
    };

    carousel.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-carousel-action]");
      const indicator = event.target.closest("[data-carousel-go-to]");

      if (actionButton) {
        showSlide(currentIndex + (actionButton.dataset.carouselAction === "next" ? 1 : -1));
      } else if (indicator) {
        showSlide(Number(indicator.dataset.carouselGoTo));
      }
    });
  });
}

async function init() {
  const projects = await loadProjects();
  const project_grid = document.querySelector(".projects-grid");
 
  console.table(projects);
  projects.forEach((project) => {
    console.log(project.title);
  });
 
  projects.forEach((project, index) => {
    const projectModalId = `project-modal-${index + 2}`;

    project_grid.insertAdjacentHTML(
      "beforeend",
      `<article class="component-card">
            <div>
              <div class="header-card">
                <p>${project.number}</p>
              </div>
              <div class="component-card-top"></div>
              <div class="image-card">
                ${createProjectCardVisual(project)}
              </div>
              <div class="background-card">
                <div class="classification-order-card">
                  <div class="classification-card">
                    <p>${project.categories.map((categories) => `<span>${categories}</span>`).join("")}</p>
                  </div>
                </div>
                <p class="header-paragraph">${project.title}</p>
                <p class="text-paragraph">
                  ${project.description}
                </p>
                <input class="tabradio" type="radio" name="project-modal" id="${projectModalId}" />
                <label class="project-button tablabel" for="${projectModalId}">
                  ${project.bouton}
                </label>
                <article class="panel project-modal-panel" id="project-panel-${index + 2}">
                  <label class="project-modal-panel__close" for="project-modal-none" aria-label="Fermer la fenêtre">&times;</label>
                  <div>
                    <h2>${project.title}</h2>
                    <p class="project-modal__description">${project.description}</p>
                    ${createProjectVisual(project)}
                    ${createProjectDetails(project)}
                    ${createProcessSection(project.process, `${projectModalId}-process-title`)}
                  </div>
                </article>
              </div>
            </div>
          </article>`,
    );
  });

  initCarousels();
}

init();
