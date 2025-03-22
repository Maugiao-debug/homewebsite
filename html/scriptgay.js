document.addEventListener("DOMContentLoaded", function () {
  const profile = document.querySelector(".profile");
  const search = document.querySelector(".search-form");
  const sideBar = document.querySelector(".side-bar");
  const body = document.body;

  document.querySelector("#user-btn")?.addEventListener("click", function () {
      profile.classList.toggle("active");
      search.classList.remove("active");
  });

  document.querySelector("#search-btn")?.addEventListener("click", function () {
      search.classList.toggle("active");
      profile.classList.remove("active");
  });

  document.querySelector("#menu-btn")?.addEventListener("click", function () {
      sideBar.classList.toggle("active");
      body.classList.toggle("active");
  });

  document.querySelector("#close-btn")?.addEventListener("click", function () {
      sideBar.classList.remove("active");
      body.classList.remove("active");
  });

  window.addEventListener("scroll", function () {
      profile.classList.remove("active");
      search.classList.remove("active");

      if (window.innerWidth < 1200) {
          sideBar.classList.remove("active");
          body.classList.remove("active");
      }
  });
});
