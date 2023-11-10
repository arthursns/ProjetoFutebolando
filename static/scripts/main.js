import initBanner from "./modules/typer.js";
import initDropdown from "./modules/dropdown.js";
import initMobile from "./modules/mobile.js";

if (window.location.pathname !== "/" && window.location.pathname !== "/home") {
  document.querySelector("header").classList.add("header-static");
} else {
  document.querySelector("header").classList.remove("header-static")
}

initBanner();
initDropdown();
initMobile();
