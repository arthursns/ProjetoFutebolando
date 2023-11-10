const renderPart = (domElement) => {
  domElement.classList.add("ativo");
};

const typeAnim = (domElement, textToType, speed) => {
  return new Promise((response) => {
    domElement.innerHTML = textToType;
    const textToArray = domElement.innerHTML.split("");
    domElement.innerHTML = "";
    textToArray.forEach((char, index) => {
      setTimeout(() => {
        domElement.innerHTML += char;
        if (index === textToType.length - 1) response();
      }, index * speed);
    });
  });
};

const initBanner = async () => {
  const domElement = document.querySelector("[data-type]");
  const textToType = "Tirando Jovens das Ruas";
  const domBtn = document.querySelector("[data-anim]");
  await typeAnim(domElement, textToType, 120);
  renderPart(domBtn);
};

export default initBanner;
