import { Parte2Validator } from "../../js/partes-cv/parte-2/parte2Validator.js";
import { Parte2Controller } from "../../js/partes-cv/parte-2/parte2Controller.js";
import { ParteController } from "../../js/partes-cv/parteController.js";


const validator = new Parte2Validator();
const controllerP = new ParteController();
const controller = new Parte2Controller(controllerP);

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        run();
    });

});

function run() {

    const educacionBasica = document.getElementById("educacionBasica")?.value || "";
    const titulo = document.getElementById("titulo").value.trim();
    const fechaGrado = document.getElementById("fechaGrado").value.trim();
    const tablaFormacion = controller.getTablaFormacion();
    const tablaIdiomas = controller.getTablaIdiomas();

    let invalid = false;

    if (validator.titulo(titulo)) {
        document.getElementById("error-titulo").textContent = "El titulo es inválido";
        invalid = true;
    } else {
        document.getElementById("error-titulo").textContent = "";
    }

    if (validator.fechaGrado(fechaGrado)) {
        document.getElementById("error-fechaGrado").textContent = "La fecha es inválida";
        invalid = true;
    } else {
        document.getElementById("error-fechaGrado").textContent = "";
    }

    if (validator.tablaFormacion(tablaFormacion)) {
        document.getElementById("error-tablaFormacion").textContent = "Hay al menos un campo inválido";
        invalid = true;
    } else {
        document.getElementById("error-tablaFormacion").textContent = "";
    }

    if (validator.tablaIdiomas(tablaIdiomas)) {
        document.getElementById("error-tablaIdiomas").textContent = "Hay al menos un campo inválido";
        invalid = true;
    } else {
        document.getElementById("error-tablaIdiomas").textContent = "";
    }

    if (invalid) return;

    const data = {
        educacionBasica,
        titulo,
        fechaGrado,
        tablaFormacion,
        tablaIdiomas
    };

    controller.showConfirmModal(data);

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

document.getElementById("addRowTablaFormacion").addEventListener("click", controller.addRowTablaFormacion);

document.getElementById("addRowTablaIdiomas").addEventListener("click", controller.addRowTablaIdiomas);
