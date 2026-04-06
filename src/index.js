document.addEventListener("DOMContentLoaded", function () {
    initMockUsers();
});

function initMockUsers() {
    const existing = localStorage.getItem("usuarios");

    if (!existing) {
        const mock = [
            { usuario: "admin", contrasena: "1234" },
            { usuario: "juan", contrasena: "1234" }
        ];

        localStorage.setItem("usuarios", JSON.stringify(mock));
    }

    window.location.href = "html/login.html";
}