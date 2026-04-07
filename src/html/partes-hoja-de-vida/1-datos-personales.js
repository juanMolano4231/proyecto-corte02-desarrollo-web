import { Parte1Validator } from "../../js/partes-cv/parte-1/parte1Validator.js";

const validator = new Parte1Validator();

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        run();
    });

});

const paisesLATAM = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica",
    "Cuba", "Ecuador", "El Salvador", "Guatemala", "Honduras",
    "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana",
    "Uruguay", "Venezuela"
];

const distritosMilitares = [
    "1 - Bogotá", "2 - Ubaté", "3 - Cáqueza", "4 - Chocontá", "5 - Tunja",
    "6  Chiquinquirá", "7 - Garagoa", "8 - Sogamoso", "9  Soatá", "10 - Santa Rosa de Viterbo",
    "11 - Girardot", "12 - Ambalema", "13 - Piedecuesta", "14 - Socorro", "15 - Málaga",
    "16 - Ocaña", "17 - Barranquilla", "18 - Corozal", "19 - Magangué", "20 - Santa Marta",
    "21 - Yarumal", "22 - Frontino", "23 - Medellín", "24 - Sonsón", "25 - Manzanares",
    "26 - Ríosucio", "27 - Cartago", "28 - Cali", "29 - Garzón", "30 - Popayán",
    "31 - Pasto", "32 - Ipiales"
];

const today = new Date().toISOString().split("T")[0];
document.getElementById("fechaNacimiento").setAttribute("max", today);

function run() {

    const primerApellido = document.getElementById("primerApellido").value.trim();
    const segundoApellido = document.getElementById("segundoApellido").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const tipoDocumento = document.querySelector('input[name="tipoDocumento"]:checked')?.value || "";
    const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value || "";
    const nacionalidad = document.getElementById("nacionalidad")?.value || "";
    const claseLibreta = document.querySelector('input[name="claseLibreta"]:checked')?.value || "";
    const numeroLibreta = document.getElementById("numeroLibreta").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
    const paisNacimiento = document.getElementById("paisNacimiento")?.value || "";
    const regionNacimiento = document.getElementById("regionNacimiento").value.trim();
    const paisResidencia = document.getElementById("paisResidencia")?.value || "";
    const distritoMilitar = document.getElementById("distritoMilitar")?.value || "";
    const regionResidencia = document.getElementById("regionResidencia").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();

    let invalid = false;

    if (validator.primerApellido(primerApellido)) {
        document.getElementById("error-primerApellido").textContent = "El apellido es inválido";
        invalid = true;
    } else {
        document.getElementById("error-primerApellido").textContent = "";
    }

    if (validator.segundoApellido(segundoApellido)) {
        document.getElementById("error-segundoApellido").textContent = "El segundo apellido es inválido";
        invalid = true;
    } else {
        document.getElementById("error-segundoApellido").textContent = "";
    }

    if (validator.nombres(nombres)) {
        document.getElementById("error-nombres").textContent = "El nombre es inválido";
        invalid = true;
    } else {
        document.getElementById("error-nombres").textContent = "";
    }

    if (validator.numeroDocumento(numeroDocumento)) {
        document.getElementById("error-numeroDocumento").textContent = "El número de documento es inválido";
        invalid = true;
    } else {
        document.getElementById("error-numeroDocumento").textContent = "";
    }

    if (validator.numeroLibreta(sexo, numeroLibreta)) {
        document.getElementById("error-numeroLibreta").textContent = "Número de libreta inválida";
        invalid = true;
    } else {
        document.getElementById("error-numeroLibreta").textContent = "";
    }

    if (validator.regionNacimiento(regionNacimiento)) {
        document.getElementById("error-regionNacimiento").textContent = "Región de nacimiento inválida";
        invalid = true;
    } else {
        document.getElementById("error-regionNacimiento").textContent = "";
    }

    if (validator.regionResidencia(regionResidencia)) {
        document.getElementById("error-regionResidencia").textContent = "Región de residencia inválida";
        invalid = true;
    } else {
        document.getElementById("error-regionResidencia").textContent = "";
    }

    if (validator.direccion(direccion)) {
        document.getElementById("error-direccion").textContent = "Dirección inválida";
        invalid = true;
    } else {
        document.getElementById("error-direccion").textContent = "";
    }

    if (validator.telefono(telefono)) {
        document.getElementById("error-telefono").textContent = "Telefono inválido";
        invalid = true;
    } else {
        document.getElementById("error-telefono").textContent = "";
    }

    if (validator.email(email)) {
        document.getElementById("error-email").textContent = "Email inválido";
        invalid = true;
    } else {
        document.getElementById("error-email").textContent = "";
    }

    

    if (invalid) return;

    const data = {
        primerApellido,
        segundoApellido,
        nombres,
        tipoDocumento,
        numeroDocumento,
        sexo,
        nacionalidad,
        claseLibreta,
        numeroLibreta,
        distritoMilitar,
        fechaNacimiento,
        paisNacimiento,
        regionNacimiento,
        paisResidencia,
        regionResidencia,
        direccion,
        telefono,
        email
    };

    const stored = localStorage.getItem("parte-1");
    const arr = stored ? JSON.parse(stored) : [];

    arr.push(data);

    localStorage.setItem("parte-1", JSON.stringify(arr));

}

document.addEventListener("DOMContentLoaded", () => {
    const nacionalidadSelect = document.getElementById("nacionalidad");
    paisesLATAM.forEach(pais => {
        const option = document.createElement("option");
        option.value = pais.toLowerCase();
        option.textContent = pais;
        nacionalidadSelect.appendChild(option);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dmSelect = document.getElementById("distritoMilitar");
    distritosMilitares.forEach(d => {
        const option = document.createElement("option");
        option.value = d;
        option.textContent = d;
        dmSelect.appendChild(option);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const paisNacimientoSelect = document.getElementById("paisNacimiento");
    paisesLATAM.forEach(pais => {
        const option = document.createElement("option");
        option.value = pais.toLowerCase();
        option.textContent = pais;
        paisNacimientoSelect.appendChild(option);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const paisResidenciaSelect = document.getElementById("paisResidencia");
    paisesLATAM.forEach(pais => {
        const option = document.createElement("option");
        option.value = pais.toLowerCase();
        option.textContent = pais;
        paisResidenciaSelect.appendChild(option);
    });
});