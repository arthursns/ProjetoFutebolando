import outsideClick from "./outside.js";

const dropDownElement = document.querySelector("[data-dropdown]");
const eventos = ["touchstart", "click"];

const initDropdown = () => {
  if (window.matchMedia("(min-width: 800px)").matches) {
    eventos.forEach((evento) => {
      dropDownElement.addEventListener(evento, handleClick);
    });
  }
};

function handleClick(e) {
  e.preventDefault();
  this.classList.add("active");
  outsideClick(this, eventos, () => {
    this.classList.remove("active");
  });
}

export default initDropdown;
