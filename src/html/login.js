import { LoginValidator } from '../js/login/loginValidator.js';
import { LoginController } from '../js/login/loginController.js'

const validator = new LoginValidator();
const loginController = new LoginController();

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        run();
    });

});

function run() {

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (validator.usuario(usuario)) {
        document.getElementById("error-usuario").textContent = "El usuario es inválido";
    } else {
        document.getElementById("error-usuario").textContent = "";
    }

    if (validator.contrasena(contrasena)) {
        document.getElementById("error-contrasena").textContent = "La contraseña es inválida";
    } else {
        document.getElementById("error-contrasena").textContent = "";
    }

    const data = {
        usuario: usuario,
        contrasena: contrasena
    }

    if (loginController.login(data)) {
        const rol = localStorage.getItem("rol");

        if (rol === "admin") {
            window.location.href = "admin.html";
        } else if (rol === "usuario") {
            window.location.href = "usuario.html";
        } else {
            alert("Su usuario no posee un rol válido");
        }
    } else {
        alert("Inicio de sesión fallido")
    }

}