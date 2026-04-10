export class Parte2Controller {

    constructor(controllerP) {
        this.controllerP = controllerP;

        this.grados = [
            "1o.", "2o.", "3o.", "4o.", "5o.",
            "6o.", "7o.", "8o.", "9o.", "10", "11"
        ];

        this.modalidades = [
            "TC (Técnica)",
            "TL (Tecnológica)",
            "TE (Tecnológica Especializada)",
            "UN (Universitaria)",
            "ES (Especialización)",
            "MG (Maestría o Magister)",
            "DOC (Doctorado o Phd)"
        ];

        this.nivel = [
            "Regular",
            "Bien",
            "Muy bien"
        ];

        this.pendingData = null;

        document.addEventListener("DOMContentLoaded", () => {
            const btn = document.getElementById("confirmSave");
            if (btn) {
                btn.addEventListener("click", () => this.confirmSave());
            }
        });
    }

    getGrados() { return this.grados; }
    getModalidades() { return this.modalidades; }
    getNivel() { return this.nivel; }

    showConfirmModal(data) {
        this.pendingData = data;

        let pretty = "";

        pretty += `educacionBasica: ${data.educacionBasica}\n`;
        pretty += `titulo: ${data.titulo}\n`;
        pretty += `fechaGrado: ${data.fechaGrado}\n\n`;

        // tablaFormacion
        pretty += "tablaFormacion:\n";
        if (data.tablaFormacion.length === 0) {
            pretty += "  (vacío)\n";
        } else {
            data.tablaFormacion.forEach((row, i) => {
                pretty += `  [${i + 1}]\n`;
                pretty += `    modalidadAcademica: ${row.modalidadAcademica}\n`;
                pretty += `    numSemestresAprobados: ${row.numSemestresAprobados}\n`;
                pretty += `    graduado: ${row.graduado ? "sí" : "no"}\n`;
                pretty += `    tituloObtenido: ${row.tituloObtenido}\n`;
                pretty += `    terminacion: ${row.terminacion}\n`;
                pretty += `    numTarjetaProfesional: ${row.numTarjetaProfesional}\n`;
            });
        }

        pretty += "\n";

        // tablaIdiomas
        pretty += "tablaIdiomas:\n";
        if (data.tablaIdiomas.length === 0) {
            pretty += "  (vacío)\n";
        } else {
            data.tablaIdiomas.forEach((row, i) => {
                pretty += `  [${i + 1}]\n`;
                pretty += `    idioma: ${row.idioma}\n`;
                pretty += `    habla: ${row.habla}\n`;
                pretty += `    lee: ${row.lee}\n`;
                pretty += `    escribe: ${row.escribe}\n`;
            });
        }

        document.getElementById("confirmData").textContent = pretty;

        $("#confirmModal").modal("show");
    }

    confirmSave() {
        const currentPart = 2;

        if (this.controllerP.store(this.pendingData, currentPart)) {
            window.location.href = "3-experiencia-laboral.html";
        } else {
            alert("No se pudo guardar la información");
        }
    }

    addRowTablaFormacion = () => {
        const tbody = document.getElementById("tbodyFormacion");

        const options = this.getModalidades()
            .map(m => `<option value="${m}">${m}</option>`)
            .join("");

        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td><select class="form-control modalidad">${options}</select></td>
        <td><input type="number" class="form-control semestres"></td>
        <td><input type="checkbox" class="graduado"></td>
        <td><input type="text" class="form-control titulo"></td>
        <td><input type="month" class="form-control terminacion"></td>
        <td><input type="number" class="form-control tarjeta"></td>
        <td><button type="button" class="btn btn-danger btn-sm eliminar">X</button></td>
        `;

        tr.querySelector(".eliminar").addEventListener("click", () => tr.remove());

        tbody.appendChild(tr);
    }

    getTablaFormacion = () => {
        const rows = document.querySelectorAll("#tbodyFormacion tr");

        return Array.from(rows).map(tr => ({
            modalidadAcademica: tr.querySelector(".modalidad").value,
            numSemestresAprobados: Number(tr.querySelector(".semestres").value),
            graduado: tr.querySelector(".graduado").checked,
            tituloObtenido: tr.querySelector(".titulo").value.trim(),
            terminacion: tr.querySelector(".terminacion").value,
            numTarjetaProfesional: tr.querySelector(".tarjeta").value.trim()
        }));
    }

    addRowTablaIdiomas = () => {
        const tbody = document.getElementById("tbodyIdiomas");

        const options = this.getNivel()
            .map(m => `<option value="${m}">${m}</option>`)
            .join("");

        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td><input type="text" class="form-control idioma"></td>
        <td><select class="form-control lo-habla">${options}</select></td>
        <td><select class="form-control lo-lee">${options}</select></td>
        <td><select class="form-control lo-escribe">${options}</select></td>
        <td><button type="button" class="btn btn-danger btn-sm eliminar">X</button></td>
        `;

        tr.querySelector(".eliminar").addEventListener("click", () => tr.remove());

        tbody.appendChild(tr);
    }

    getTablaIdiomas = () => {
        const rows = document.querySelectorAll("#tbodyIdiomas tr");

        return Array.from(rows).map(tr => ({
            idioma: tr.querySelector(".idioma").value.trim(),
            habla: tr.querySelector(".lo-habla").value,
            lee: tr.querySelector(".lo-lee").value,
            escribe: tr.querySelector(".lo-escribe").value,
        }));
    }
}