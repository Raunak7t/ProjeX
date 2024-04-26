const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
let s1CurItem = null;
let s2CurItem = null;

showList(projects, section1);
showList(effects, section2);

function showList(projects, parent) {
  let list = parent.querySelector(".project-list ul");
  list.innerHTML = "";
  projects.forEach((p) => {
    let item = document.createElement("li");
    item.classList.add("item");
    item.setAttribute("id", p.name);
    item.innerHTML = `<h3>${p.name}</h3>`;
    item.addEventListener("click", () => {
      selectItem(p, parent);
    });
    list.appendChild(item);
  });
  list.firstElementChild.dispatchEvent(new Event("click"));
}

function selectItem(project, parent) {
  if (parent == section1) {
    s1CurItem?.classList.remove("active");
    s1CurItem = document.querySelector(`#${project.name}`);
    s1CurItem.classList.add("active");
  } else if (parent == section2) {
    s2CurItem?.classList.remove("active");
    s2CurItem = document.querySelector(`#${project.name}`);
    s2CurItem.classList.add("active");
  }
  displayProject(project, parent);
}

function displayProject(project, parent) {
  parent.querySelector("iframe").src = `./projects/${project.liveSrc}`;
  parent.querySelector(".project-name").innerText = project.name;
  parent.querySelector(".code-link").href = project.codeSrc;
  parent.querySelector(".live-link").href = `./projects/${project.liveSrc}`;
  parent.querySelector(".text").innerText = project.desc;
}
