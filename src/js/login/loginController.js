export class LoginController {

    login(data) {
        const stored = localStorage.getItem("usuarios");
        if (!stored) return false;

        const usuarios = JSON.parse(stored);

        const user = usuarios.find(u => u.usuario === data.usuario);

        if (!user) return false;

        if (user.contrasena !== data.contrasena) return false;

        // derive role
        const rol = (user.usuario === "admin") ? "admin" : "usuario";

        localStorage.setItem("rol", rol);
        localStorage.setItem("currentUser", user.usuario)

        return true;
    }

}