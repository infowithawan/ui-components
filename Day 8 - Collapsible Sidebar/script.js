const menuClose = document.querySelector(".menu-close");
const menuOpen = document.querySelector(".menu-open");
const themeBtn = document.querySelector(".theme-btn");
const themeImg = document.querySelector(".theme-btn>img");
const sidebar = document.querySelector(".sidebar");
const nav = document.querySelector("nav");
const sidebarContent = document.querySelector(".sidebar-inner");

menuOpen.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
  sidebar.classList.toggle("sidebar-open");
  setTimeout(() => {
    sidebarContent.classList.toggle("hidden");
  }, 600);
});

menuClose.addEventListener("click", () => {
  sidebarContent.classList.toggle("hidden");
  nav.classList.toggle("nav-open");
  setTimeout(() => {
    sidebar.classList.toggle("sidebar-open");
  }, 600);
});

themeBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
  document.body.classList.toggle("dark");
  if (themeImg.getAttribute("src") === "assets/moon.svg") {
    themeImg.src = "assets/sun.svg";
    localStorage.setItem("theme", "dark");
  } else {
    themeImg.src = "assets/moon.svg";
    localStorage.setItem("theme", "light");
  }
}

function setTheme() {
  const storedTheme = localStorage.getItem("theme");
  let userTheme;
  if (
    storedTheme !== null &&
    (storedTheme === "dark" || storedTheme === "light")
  ) {
    userTheme = storedTheme;
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      userTheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      userTheme = "light";
      localStorage.setItem("theme", "light");
    }
  }
  if (userTheme === "dark") {
    toggleTheme();
  }
  return;
}

setTheme();

