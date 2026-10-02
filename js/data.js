async function loadProjects() {
  const response = await fetch("data/projects.json"); // 1. la réponse du serveur
  const projects = await response.json(); // 2. le contenu, converti
  return projects; // 3. un tableau de projets
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
                <img
                  src="${project.image}"
                  alt="projet ${project.title}"
                />
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
                  <img src="${project.image}" alt="${project.alt}" />
                  <div>
                    <p>${project.number}</p>
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                  </div>
                </article>
              </div>
            </div>
          </article>`,
    );
  });
}

init();


