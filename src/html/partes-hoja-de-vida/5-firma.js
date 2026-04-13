import { ParteController } from "../../js/partes-cv/parteController.js";

const controllerP = new ParteController();

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const checkbox = document.getElementById("checkboxFirma");
        if (!checkbox.checked) {
            document.getElementById("error-checkboxFirma").textContent = "Debe confirmar la declaración";
            return;
        }

        document.getElementById("error-checkboxFirma").textContent = "";

        const data = { confirmed: true };

        const pretty = "El postulante confirma la veracidad de los datos.";
        document.getElementById("confirmData").textContent = pretty;
        $("#confirmModal").modal("show");

        document.getElementById("confirmSave").onclick = () => {
            const currentPart = 5;
            if (controllerP.store(data, currentPart)) {
                // finalizar o volver al inicio
                window.location.href = "../usuario.html";
            } else {
                alert("No se pudo guardar la información");
            }
        };

    });

});
