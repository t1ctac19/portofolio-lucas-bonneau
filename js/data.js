async function loadProjects() {
  const response = await fetch('js/projects.json');// 1. la réponse du serveur
  const projects = await response.json();            // 2. le contenu, converti
  return projects;                                   // 3. un tableau de projets
}

console.log(loadProjects())

async function init() {
  try {
    const projects = await loadProjects();
    console.table(projects);
  } catch (error) {
    console.error(error);
    document.querySelector('.projects__grid').innerHTML =
      '<p>Les projets n’ont pas pu être chargés.</p>';
  }
}
init()


// ÉTAPE 2 : parcourir le tableau avec forEach()
// Afficher le titre de chaque projet dans la console
projects.forEach((project) => {
  console.log(projects.title);
});