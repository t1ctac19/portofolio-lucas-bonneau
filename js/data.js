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
 
  projects.forEach((project) => {
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
              </div>
            </div>
          </article>`,
    );
  });
}

init();


