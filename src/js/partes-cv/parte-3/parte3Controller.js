export class Parte3Controller {

    constructor(controllerP) {
        this.controllerP = controllerP;
        this.pendingData = null;

        document.addEventListener("DOMContentLoaded", () => {
            const btn = document.getElementById("confirmSave");
            if (btn) {
                btn.addEventListener("click", () => this.confirmSave());
            }
        });
    }

    showConfirmModal(data) {
        this.pendingData = data;

        let pretty = "";

        pretty += `Trabajando actualmente: ${data.trabajando ? 'sí' : 'no'}\n\n`;

        if (data.trabajando && data.currentContract) {
            pretty += 'Contrato actual:\n';
            for (const [k, v] of Object.entries(data.currentContract)) {
                pretty += `  ${k}: ${v}\n`;
            }
            pretty += '\n';
        }

        pretty += 'Contratos anteriores:\n';
        if (!data.tablaContratos || data.tablaContratos.length === 0) {
            pretty += '  (vacío)\n';
        } else {
            data.tablaContratos.forEach((row, i) => {
                pretty += `  [${i + 1}]\n`;
                for (const [k, v] of Object.entries(row)) {
                    pretty += `    ${k}: ${v}\n`;
                }
            });
        }

        document.getElementById("confirmData").textContent = pretty;

        $("#confirmModal").modal("show");
    }

    confirmSave() {
        const currentPart = 3;

        if (this.controllerP.store(this.pendingData, currentPart)) {
            window.location.href = "4-tiempo-total.html";
        } else {
            alert("No se pudo guardar la información");
        }
    }

    addRowTablaContratos = () => {
        const tbody = document.getElementById("tbodyContratos");

        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td><input type="text" class="form-control empresa"></td>
        <td>
            <select class="form-control tipo">
                <option value="Publica">Pública</option>
                <option value="Privada">Privada</option>
            </select>
        </td>
        <td><select class="form-control pais"></select></td>
        <td><select class="form-control municipio"></select></td>
        <td><input type="email" class="form-control correo"></td>
        <td><input type="text" class="form-control telefonos"></td>
        <td><input type="date" class="form-control fechaIngreso" min="1900-01-01"></td>
        <td><input type="date" class="form-control fechaRetiro" min="1900-01-01"></td>
        <td><input type="text" class="form-control cargo"></td>
        <td><input type="text" class="form-control dependencia"></td>
        <td><input type="text" class="form-control direccion"></td>
        <td><button type="button" class="btn btn-danger btn-sm eliminar">X</button></td>
        `;

        tr.querySelector(".eliminar").addEventListener("click", () => tr.remove());

        tbody.appendChild(tr);
    }

    getTablaContratos = () => {
        const rows = document.querySelectorAll("#tbodyContratos tr");

        return Array.from(rows).map(tr => ({
            empresa: tr.querySelector(".empresa").value.trim(),
            tipo: tr.querySelector(".tipo").value,
            pais: tr.querySelector(".pais").value.trim(),
            municipio: tr.querySelector(".municipio").value.trim(),
            correo: tr.querySelector(".correo").value.trim(),
            telefonos: tr.querySelector(".telefonos").value.trim(),
            fechaIngreso: tr.querySelector(".fechaIngreso").value,
            fechaRetiro: tr.querySelector(".fechaRetiro").value,
            cargo: tr.querySelector(".cargo").value.trim(),
            dependencia: tr.querySelector(".dependencia").value.trim(),
            direccion: tr.querySelector(".direccion").value.trim()
        }));
    }

}
