const openButton = document.querySelector(".open_menu_btn");
const closeButton = document.querySelector(".close_menu_btn");
const sidebar = document.querySelector(".sidebar");
const toggleMenu = () => {
  sidebar.classList.toggle("sidebar_toggle");
};
openButton.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);
