import { ParteController } from "../../js/partes-cv/parteController.js";

const controllerP = new ParteController();

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        run();
    });

});

function run() {
    let invalid = false;

    const aPublico = Number(document.getElementById("tiempoAniosPublico").value || 0);
    const mPublico = Number(document.getElementById("tiempoMesesPublico").value || 0);

    const aPrivado = Number(document.getElementById("tiempoAniosPrivado").value || 0);
    const mPrivado = Number(document.getElementById("tiempoMesesPrivado").value || 0);

    const aInd = Number(document.getElementById("tiempoAniosInd").value || 0);
    const mInd = Number(document.getElementById("tiempoMesesInd").value || 0);

    // Simple validation: no negativos, meses 0-11
    if (aPublico < 0 || mPublico < 0 || mPublico > 11) {
        document.getElementById("error-tiempoPublico").textContent = "Tiempo público inválido";
        invalid = true;
    } else {
        document.getElementById("error-tiempoPublico").textContent = "";
    }

    if (aPrivado < 0 || mPrivado < 0 || mPrivado > 11) {
        document.getElementById("error-tiempoPrivado").textContent = "Tiempo privado inválido";
        invalid = true;
    } else {
        document.getElementById("error-tiempoPrivado").textContent = "";
    }

    if (aInd < 0 || mInd < 0 || mInd > 11) {
        document.getElementById("error-tiempoIndependiente").textContent = "Tiempo independiente inválido";
        invalid = true;
    } else {
        document.getElementById("error-tiempoIndependiente").textContent = "";
    }

    if (invalid) return;

    let totalMonths = (aPublico * 12 + mPublico) + (aPrivado * 12 + mPrivado) + (aInd * 12 + mInd);

    const totalYears = Math.floor(totalMonths / 12);
    const restMonths = totalMonths % 12;

    document.getElementById("tiempoTotal").textContent = totalYears;
    document.getElementById("tiempoTotalMeses").textContent = restMonths;

    // Build data and show confirm modal
    const data = {
        publico: { anios: aPublico, meses: mPublico },
        privado: { anios: aPrivado, meses: mPrivado },
        independiente: { anios: aInd, meses: mInd },
        total: { anios: totalYears, meses: restMonths }
    };

    const pretty = `Tiempo total:\n  Público: ${aPublico} años ${mPublico} meses\n  Privado: ${aPrivado} años ${mPrivado} meses\n  Independiente: ${aInd} años ${mInd} meses\n\nTotal: ${totalYears} años ${restMonths} meses`;

    document.getElementById("confirmData").textContent = pretty;
    $("#confirmModal").modal("show");

    document.getElementById("confirmSave").onclick = () => {
        const currentPart = 4;
        if (controllerP.store(data, currentPart)) {
            window.location.href = "5-firma.html";
        } else {
            alert("No se pudo guardar la información");
        }
    };

}
