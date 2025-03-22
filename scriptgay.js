// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("toggle-btn");
const body = document.body;
const darkMode = localStorage.getItem("dark-mode");

if (darkMode === "enabled") {
  body.classList.add("dark");
  toggleBtn.classList.replace("fa-sun", "fa-moon");
}

toggleBtn.onclick = () => {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    toggleBtn.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("dark-mode", "disabled");
  } else {
    body.classList.add("dark");
    toggleBtn.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("dark-mode", "enabled");
  }
};


// 📌 Xử lý giao diện người dùng
const profile = document.querySelector(".header .flex .profile");
document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

const search = document.querySelector(".header .flex .search-form");
document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

const sideBar = document.querySelector(".side-bar");
document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};
