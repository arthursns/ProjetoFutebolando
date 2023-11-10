class StepForm {
  constructor() {
    this.form = document.querySelector("[data-form]");
    this.progress = this.form.querySelector("[data-progress]");
    this.progressTexts = this.progress.parentNode.querySelectorAll(".step");
    this.currentStep = 0;
    this.imageInput = this.form.querySelector("input[type='file']");
    this.buttons = this.form.querySelectorAll("button");
    this.formGroups = this.form.querySelectorAll(".form-group");
    this.cepField = this.form.querySelector("input[name='cep']");
    document.addEventListener("DOMContentLoaded", () =>
      this.form.addEventListener("submit", (event) => this.submitForm(event))
    );

    this.initFormsRegex();
    this.buttons.forEach((btn) =>
      btn.addEventListener("click", (event) => this.activateForm(event))
    );

    this.imageInput.addEventListener("change", (event) =>
      this.changeImageForm(event)
    );
    this.cepInit();
  }

  submitForm(event) {
    const formData = new FormData(this.form);
    formData.delete("csrf_token");
    formData.delete("image");

    const xhr = new XMLHttpRequest();
    const csrf = document.getElementById("csrf_token");
    const formGroups = this.formGroups; // Armazena uma referência fora do escopo

    xhr.open("POST", "/cadastro", true);

    xhr.setRequestHeader("X-CSRFToken", csrf.value);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        Object.entries(JSON.parse(xhr.responseText).message).forEach((erro) => {
          const errorMessageInput = document.querySelector(
            `input[name='${erro[0]}']`
          );
          if (errorMessageInput.parentElement.parentElement === formGroups[1]) {
            this.buttons[3].click();
          } else if (
            errorMessageInput.parentElement.parentElement === formGroups[0]
          ) {
            this.buttons[1].click();
          } else {
            this.buttons[3].click();
            this.buttons[1].click();
          }

          errorMessageInput.nextElementSibling.textContent = erro[1];
          errorMessageInput.classList.add("erro");
        });
      }
    }.bind(this); // Associa o 'this' da classe à função de retorno
    xhr.send(formData);
    event.preventDefault();
  }

  activateForm(event) {
    const formGroup = event.target.parentElement.parentElement;
    event.preventDefault();

    if (event.target.classList.contains("avancar")) {
      this.moveFormPart(formGroup, "meio", "comeco");
      this.moveFormPart(formGroup.nextElementSibling, "fim", "meio");
      this.nextStep();
    } else {
      this.moveFormPart(formGroup, "meio", "fim");
      this.moveFormPart(formGroup.previousElementSibling, "comeco", "meio");
      this.previousStep();
    }
  }

  nextStep() {
    if (this.currentStep < this.progressTexts.length - 1) {
      this.currentStep++;
      this.updateProgressDom();
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateProgressDom();
    }
  }

  moveFormPart(domElement, start, end) {
    domElement.classList.add(end);
    domElement.classList.remove(start);
  }

  updateProgressDom() {
    this.progressTexts.forEach((text, index) =>
      this.currentStep < index ? text.classList.remove("check") : undefined
    );

    this.progressTexts[this.currentStep].classList.add("check");
    this.progress.setAttribute("class", "progress");

    const classProgress = ["inicio", "meio", "fim"];
    this.progress.classList.add(classProgress[this.currentStep]);
  }

  initFormsRegex() {
    const fields = this.form.querySelectorAll("input[type='text']");
    const regexTexts = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/;

    fields.forEach((field) => {
      if (
        field.getAttribute("name") !== "cep" &&
        field.getAttribute("name") !== "cpf"
      ) {
        field.addEventListener("input", (e) => {
          const inputValue = e.target.value;
          if (!regexTexts.test(inputValue)) {
            e.target.value = inputValue.replace(
              /[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g,
              ""
            );
          }
        });
      }
    });
  }

  cepInit() {
    const cepRegex = /^[0-9]{1,9}$/;
    this.cepField.addEventListener("keypress", (e) => {
      const keyPressed = String.fromCharCode(e.keyCode);
      if (!cepRegex.test(keyPressed)) {
        e.preventDefault();
        return;
      }
    });

    this.cepField.addEventListener("keyup", (e) => {
      const inputValue = e.target.value;

      if (inputValue.length === 8) {
        this.getAddress(inputValue);
      }
    });
  }

  updateAdressInfo(adressInfo) {}

  async getAddress(zipCode) {
    this.cepField.blur();
    const url = `https://viacep.com.br/ws/${zipCode}/json`;

    const response = await fetch(url);
  }

  changeImageForm(event) {
    let arquivos = event.target.files;
    if (arquivos.length !== 0) {
      if (
        arquivos[0].type === "image/jpeg" ||
        arquivos[0].type === "image/png" ||
        arquivos[0].type === "image/jpg"
      ) {
        const figure = document.querySelector("figure");
        const imageFig = figure.querySelector("img");
        imageFig.setAttribute("src", URL.createObjectURL(arquivos[0]));
        imageFig.classList.add("img-fluid");
      } else {
        alert("Formato não suportado");
      }
    }
  }
}

const formulario = new StepForm();

document.getElementById("nome").value = "Exemplo de Nome";
document.getElementById("cpf").value = "34583758138";
document.getElementById("nome_responsavel").value = "Exemplo de Responsável";
document.getElementById("observacoes").value = "Observações de exemplo";
document.getElementById("cep").value = "12345-678";
document.getElementById("data_nascimento").value = "2009-10-19";
document.getElementById("telefone").value = "(12) 3456-7890";
document.getElementById("email").value = "exemplo@email.com";
document.getElementById("bairro").value = "Bairro de Exemplo";
document.getElementById("rua").value = "Rua de Exemplo";
document.getElementById("cidade").value = "Cidade de Exemplo";
document.getElementById("numero_endereco").value = "123";
document.getElementById("direito_imagem").checked = true;
document.getElementById("permissoes").checked = true;
