const form = document.querySelector("[data-form]");
const errorMessage = document.querySelectorAll("[data-error]");
const progressForm = document.querySelector("[data-progress]");
const progressText = progressForm.parentNode.querySelectorAll(".step");
const formGroups = form.querySelectorAll(".form-group");

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (event) => {
    const formData = new FormData(form);
    formData.delete("csrf_token");
    formData.delete("image");

    const xhr = new XMLHttpRequest();
    const csrf = document.getElementById("csrf_token");

    xhr.open("POST", "/cadastro", true);

    xhr.setRequestHeader("X-CSRFToken", csrf.value);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        Object.entries(JSON.parse(xhr.responseText).message).forEach((erro) => {
          const errorMessageDom = form.querySelector(
            `input[name='${erro[0]}']`
          );
          if (errorMessageDom.parentElement.parentElement === formGroups[1]) {
            document.querySelectorAll(".voltar")[1].click();
          } else if (
            errorMessageDom.parentElement.parentElement === formGroups[0]
          ) {
            document.querySelectorAll(".voltar")[1].click();
            document.querySelectorAll(".voltar")[0].click();
          }
          errorMessageDom.nextElementSibling.textContent = erro[1];
        });
      }
    };
    xhr.send(formData);
    event.preventDefault();
  });
});

form.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    const formGroup = event.target.parentElement.parentElement;
    event.preventDefault();

    if (event.target.classList.contains("avancar")) {
      midToStart(formGroup);
      endToMid(formGroup.nextElementSibling);
      if (progressForm.classList.contains("meio")) {
        progressForm.classList.add("fim");
        progressText[2].classList.add("check");
      } else {
        progressForm.classList.add("meio");
        progressText[1].classList.add("check");
      }
    } else if (event.target.classList.contains("voltar")) {
      midToEnd(formGroup);
      startToMid(formGroup.previousElementSibling);
      if (progressForm.classList.contains("fim")) {
        progressForm.classList.remove("fim");
        progressText[2].classList.remove("check");
      } else {
        progressForm.classList.remove("meio");
        progressText[1].classList.remove("check");
      }
    }
  }
});

function midToStart(domElement) {
  domElement.classList.add("comeco");
  domElement.classList.remove("meio");
}

function endToMid(domElement) {
  domElement.classList.add("meio");
  domElement.classList.remove("fim");
}

function startToMid(domElement) {
  domElement.classList.add("meio");
  domElement.classList.remove("comeco");
}

function midToEnd(domElement) {
  domElement.classList.add("fim");
  domElement.classList.remove("meio");
}

document
  .querySelector('form input[type="file"]')
  .addEventListener("change", function (event) {
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
  });

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
