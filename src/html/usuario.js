import { ParteController } from "../js/partes-cv/parteController.js";

const controllerP = new ParteController();

document.addEventListener("DOMContentLoaded", function () {
    run();
});

function run() {
    const nombre = localStorage.getItem("currentUser");
    const estado = controllerP.getEstado();

    document.getElementById("welcome").textContent = `Bienvenido, ${nombre}`;
    document.getElementById("estado").value = estado || "No disponible";
}

document.getElementById("goToCV")
document.getElementById("goToCV")
    .addEventListener("click", () => {
        window.location.href = "partes-hoja-de-vida/1-datos-personales.html";
    });

document.getElementById("logout")
    .addEventListener("click", () => {
        window.location.href = "login.html";
        localStorage.removeItem("currentUser");
        localStorage.removeItem("rol");
    });
