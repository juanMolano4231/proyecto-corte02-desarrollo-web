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

document.getElementById("viewMyCV").addEventListener("click", () => {
    const user = localStorage.getItem('currentUser');
    const stored = localStorage.getItem('parts');
    const parts = stored ? JSON.parse(stored) : [];
    const myParts = parts.filter(p => p.user === user).sort((a,b) => a.cvPart - b.cvPart);

    if (myParts.length === 0) {
        document.getElementById('myCvContent').textContent = 'No hay datos guardados aún.';
    } else {
        document.getElementById('myCvContent').textContent = myParts.map(p => `Parte ${p.cvPart}:\n${JSON.stringify(p, null, 2)}`).join('\n\n');
    }

    $('#myCvModal').modal('show');
});

document.getElementById("logout")
    .addEventListener("click", () => {
        window.location.href = "login.html";
        localStorage.removeItem("currentUser");
        localStorage.removeItem("rol");
    });
