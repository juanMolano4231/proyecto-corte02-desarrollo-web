import { Parte3Validator } from "../../js/partes-cv/parte-3/parte3Validator.js";
import { Parte3Controller } from "../../js/partes-cv/parte-3/parte3Controller.js";
import { ParteController } from "../../js/partes-cv/parteController.js";

const validator = new Parte3Validator();
const controllerP = new ParteController();
const controller = new Parte3Controller(controllerP);

let countriesData = [];

async function loadCountriesAndCities() {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries');
        const json = await res.json();
        if (json && Array.isArray(json.data)) {
            countriesData = json.data.map(c => ({ country: c.country, cities: Array.isArray(c.cities) ? c.cities.slice().sort((a,b)=> a.localeCompare(b)) : [] }));
            populateAllCountrySelects();
            return;
        }
    } catch (err) {
        console.warn('countriesnow failed', err);
    }

    // fallback: restcountries (sin ciudades)
    try {
        const r = await fetch('https://restcountries.com/v3.1/all');
        const j = await r.json();
        countriesData = j.map(c => ({ country: c.name.common, cities: [] })).sort((a,b)=> a.country.localeCompare(b.country));
        populateAllCountrySelects();
    } catch (e) {
        console.warn('restcountries failed', e);
    }
}

function populateCountrySelect(selectEl) {
    if (!selectEl) return;
    selectEl.innerHTML = '<option value="">-- Seleccione --</option>' +
        countriesData.map(c => `<option value="${c.country}">${c.country}</option>`).join('');
}

function populateMunicipioSelect(muniSelect, countryName) {
    if (!muniSelect) return;
    const entry = countriesData.find(c => c.country === countryName);
    const cities = entry ? (entry.cities || []) : [];
    if (!cities || cities.length === 0) {
        muniSelect.innerHTML = '<option value="">(sin datos)</option>';
    } else {
        muniSelect.innerHTML = cities.map(city => `<option value="${city}">${city}</option>`).join('');
    }
}

function populateAllCountrySelects() {
    const curPais = document.getElementById('currentPais');
    const curMun = document.getElementById('currentMunicipio');
    if (curPais) populateCountrySelect(curPais);
    if (curPais && curMun) {
        curPais.addEventListener('change', (e) => populateMunicipioSelect(curMun, e.target.value));
    }

    // populate any existing dynamic rows
    document.querySelectorAll('#tbodyContratos tr').forEach(tr => {
        const p = tr.querySelector('.pais');
        const m = tr.querySelector('.municipio');
        if (p) {
            populateCountrySelect(p);
            p.addEventListener('change', (e) => populateMunicipioSelect(m, e.target.value));
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        run();
    });

    document.getElementById("trabajandoCheckbox").addEventListener("change", function (e) {
        const show = e.target.checked;
        document.getElementById("currentContractFieldset").style.display = show ? "block" : "none";
    });

    document.getElementById("addRowTablaContratos").addEventListener("click", () => {
        controller.addRowTablaContratos();
        const tr = document.querySelector('#tbodyContratos tr:last-child');
        if (!tr) return;
        const paisSelect = tr.querySelector('.pais');
        const muniSelect = tr.querySelector('.municipio');
        if (paisSelect) {
            populateCountrySelect(paisSelect);
            paisSelect.addEventListener('change', (e) => populateMunicipioSelect(muniSelect, e.target.value));
        }
    });

    // load countries and cities
    loadCountriesAndCities();

});

function run() {
    let invalid = false;

    const trabajando = document.getElementById("trabajandoCheckbox").checked;

    let currentContract = null;

    if (trabajando) {
        const empresa = document.getElementById("currentEmpresa").value.trim();
        const tipo = document.getElementById("currentTipoEmpresa").value;
        const pais = document.getElementById("currentPais").value.trim();
        const municipio = document.getElementById("currentMunicipio").value.trim();
        const correo = document.getElementById("currentCorreo").value.trim();
        const telefonos = document.getElementById("currentTelefonos").value.trim();
        const fechaIngreso = document.getElementById("currentFechaIngreso").value;
        const cargo = document.getElementById("currentCargo").value.trim();
        const dependencia = document.getElementById("currentDependencia").value.trim();
        const direccion = document.getElementById("currentDireccion").value.trim();

        // Empresa
        if (validator.empresa(empresa)) {
            document.getElementById("error-currentEmpresa").textContent = "Empresa inválida";
            invalid = true;
        } else {
            document.getElementById("error-currentEmpresa").textContent = "";
        }

        // Pais
        if (validator.pais(pais)) {
            document.getElementById("error-currentPais").textContent = "País inválido";
            invalid = true;
        } else {
            document.getElementById("error-currentPais").textContent = "";
        }

        // Municipio
        if (validator.municipio(municipio)) {
            document.getElementById("error-currentMunicipio").textContent = "Municipio inválido";
            invalid = true;
        } else {
            document.getElementById("error-currentMunicipio").textContent = "";
        }

        // Correo
        if (validator.correo(correo)) {
            document.getElementById("error-currentCorreo").textContent = "Correo inválido";
            invalid = true;
        } else {
            document.getElementById("error-currentCorreo").textContent = "";
        }

        // Telefonos
        if (validator.telefonos(telefonos)) {
            document.getElementById("error-currentTelefonos").textContent = "Teléfono inválido";
            invalid = true;
        } else {
            document.getElementById("error-currentTelefonos").textContent = "";
        }

        // Cargo
        if (validator.cargo(cargo)) {
            document.getElementById("error-currentCargo").textContent = "Cargo inválido";
            invalid = true;
        } else {
            document.getElementById("error-currentCargo").textContent = "";
        }

        // Dependencia
        if (validator.dependencia(dependencia)) {
            document.getElementById("error-currentDependencia").textContent = "Dependencia inválida";
            invalid = true;
        } else {
            document.getElementById("error-currentDependencia").textContent = "";
        }

        // Direccion
        if (validator.direccion(direccion)) {
            document.getElementById("error-currentDireccion").textContent = "Dirección inválida";
            invalid = true;
        } else {
            document.getElementById("error-currentDireccion").textContent = "";
        }

        // Fecha ingreso (opcional pero validate if provided)
        if (fechaIngreso && validator.fecha(fechaIngreso)) {
            // use generic error placeholder near fechaIngreso by using existing error for fecha
            document.getElementById("error-currentEmpresa").textContent = "Fecha de ingreso inválida";
            invalid = true;
        }

        currentContract = { empresa, tipo, pais, municipio, correo, telefonos, fechaIngreso, cargo, dependencia, direccion };
    }

    const tablaContratos = controller.getTablaContratos();

    if (validator.tablaContratos(tablaContratos)) {
        document.getElementById("error-tablaContratos").textContent = "Hay al menos un campo inválido";
        invalid = true;
    } else {
        document.getElementById("error-tablaContratos").textContent = "";
    }

    if (invalid) return;

    const data = {
        trabajando,
        currentContract,
        tablaContratos
    };

    controller.showConfirmModal(data);

}
