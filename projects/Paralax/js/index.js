const hill1 = document.getElementById("hill1");
const hill2 = document.getElementById("hill2");
const hill3 = document.getElementById("hill3");
const hill4 = document.getElementById("hill4");
const hill5 = document.getElementById("hill5");
const leaf = document.getElementById("leaf");
const tree = document.getElementById("tree");
const text = document.getElementById("text");

window.addEventListener("scroll", (e) => {
  value = window.scrollY;
  text.style.marginTop = value * 1.3 + "px";
  leaf.style.top = value * -1.3 + "px";
  leaf.style.left = value * 1.3 + "px";
  tree.style.top = value * 0.3 + "px";
  hill5.style.left = value * 1.5 + "px";
  hill4.style.left = value * -1.5 + "px";
  hill3.style.top = value * 1 + "px";
  hill3.style.left = value * 1.1 + "px";
  hill2.style.top = value * 1 + "px";
  hill2.style.left = value * -1.1 + "px";
  hill1.style.top = value * 1.2 + "px";

});
