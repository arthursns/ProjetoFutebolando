import outsideClick from "./outside.js";
const eventos = ["touchstart", "click"];

export default function initMobile() {
  const menuButton = document.querySelector("[data-menu='btn']");
  const menuList = document.querySelector("[data-menu='list']");
  function openMenu(event) {
    menuList.classList.toggle("active");
    menuButton.classList.toggle("active");
    outsideClick(menuList, eventos, () => {
      menuList.classList.remove("active");
      menuButton.classList.remove("active");
      console.log
    });
  }
  eventos.forEach((userEvent) =>
    menuButton.addEventListener(userEvent, openMenu)
  );
}
