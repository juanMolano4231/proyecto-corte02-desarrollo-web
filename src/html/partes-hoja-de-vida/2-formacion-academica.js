import { Parte2Validator } from "../../js/partes-cv/parte-2/parte2Validator.js";
import { Parte2Controller } from "../../js/partes-cv/parte-2/parte2Controller.js";
import { ParteController } from "../../js/partes-cv/parteController.js";


const validator = new Parte2Validator();
const controller = new Parte2Controller();
const controllerP = new ParteController();

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        run();
    });

});

const today = new Date().toISOString().split("T")[0];
document.getElementById("fechaGrado").setAttribute("max", today);

function run() {

    const educacionBasica = document.getElementById("educacionBasica")?.value || "";
    const titulo = document.getElementById("titulo").value.trim();
    const fechaGrado = document.getElementById("fechaGrado").value.trim();
    
    //const tipoDocumento = document.querySelector('input[name="tipoDocumento"]:checked')?.value || "";

    let invalid = false;

    if (validator.titulo(eductituloacionBasica)) {
        document.getElementById("error-titulo").textContent = "El titulo es inválido";
        invalid = true;
    } else {
        document.getElementById("error-titulo").textContent = "";
    }

    if (invalid) return;

    const data = {
        educacionBasica,
        titulo,
        fechaGrado
    };

    const currentPart = 2;

    if (controllerP.store(data, currentPart)) {
        window.location.href = "3-experiencia-laboral.html";
    } else {
        alert("No se pudo guardar la información");
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const educacionBasicaSelect = document.getElementById("educacionBasica");
    controller.getGrados().forEach(grado => {
        const option = document.createElement("option");
        option.value = grado.toLowerCase();
        option.textContent = grado;
        educacionBasicaSelect.appendChild(option);
    });
});
