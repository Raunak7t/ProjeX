const storyData = [
  {
    dp: "assets/wallpaper-652.jfif",
    storyImg: "assets/wallpaper-11.jfif",
    username: "Shiva",
  },
  {
    dp: "assets/wallpaper-339.jfif",
    storyImg: "assets/wallpaper-632.jfif",
    username: "Adiyogi",
  },
  {
    dp: "assets/wallpaper-586.jfif",
    storyImg: "assets/wallpaper-877.jfif",
    username: "Mahadev",
  },
  {
    dp: "assets/wallpaper-877.jfif",
    storyImg: "assets/wallpaper-842.jfif",
    username: "Yogeshwaray",
  },
  {
    dp: "assets/wallpaper-982.jfif",
    storyImg: "assets/wallpaper-995.jfif",
    username: "Sarveshwaray",
  },
  {
    dp: "assets/wallpaper-652.jfif",
    storyImg: "assets/wallpaper-11.jfif",
    username: "Shiva",
  },
  {
    dp: "assets/wallpaper-339.jfif",
    storyImg: "assets/wallpaper-632.jfif",
    username: "Adiyogi",
  },
  {
    dp: "assets/wallpaper-586.jfif",
    storyImg: "assets/wallpaper-899.jfif",
    username: "Mahadev",
  },
  {
    dp: "assets/wallpaper-877.jfif",
    storyImg: "assets/wallpaper-842.jfif",
    username: "Yogeshwaray",
  },
  {
    dp: "assets/wallpaper-982.jfif",
    storyImg: "assets/wallpaper-995.jfif",
    username: "Sarveshwaray",
  },
];
storyData[-1] = {
  storyImg: "assets/raunak.jpg",
  username: "Raunak",
};

const storiesDiv = document.querySelector(".stories");

storyData.forEach((elem, id) => {
  let storyElem = `<div class="img">
      <img src="${elem.dp}" alt="dp" />
    </div>
    <p>${elem.username}</p>`;
  elem = document.createElement("div");
  elem.classList.add("story");
  elem.setAttribute("id", id);
  elem.innerHTML = storyElem;
  storiesDiv.appendChild(elem);
});

storiesDiv.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  storiesDiv.scrollLeft += evt.deltaY;
});

const fullScreenStory = document.querySelector(".full-screen-story");
const storyImg = fullScreenStory.querySelector("img");
const storyUsername = fullScreenStory.querySelector(".username p");

storiesDiv.addEventListener("click", (evt) => {
  let elem = evt.target.closest(".story");
  if (!elem) return;
  fullScreenStory.style.display = "block";
  setTimeout(() => {
    fullScreenStory.style.display = "none";
  }, 1000);
  storyImg.src = storyData[elem.id].storyImg;
  storyUsername.innerText = storyData[elem.id].username;
});
