const themeBtn = document.querySelector(".theme");
const menuBtn = document.querySelector(".menu");
const aside = document.querySelector("aside");
const closeMenuBtn = document.querySelector(".close-menu");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

menuBtn.addEventListener("click", () => {
  aside.style.left = 0;
});

closeMenuBtn.addEventListener("click", () => {
  aside.style.left = "-14rem";
});
