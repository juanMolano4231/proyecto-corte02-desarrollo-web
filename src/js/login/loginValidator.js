// true means invalid

export class LoginValidator {

    usuario(usuario) {
        if (!usuario || usuario.trim() === "") {
            return true;
        }

        // length constraint
        if (usuario.length < 3 || usuario.length > 20) {
            return true;
        }

        // only letters, numbers, underscore
        if (!/^[a-zA-Z0-9_]+$/.test(usuario)) {
            return true;
        }

        return false;
    }

    contrasena(contrasena) {
        if (!contrasena || contrasena.trim() === "") {
            return true;
        }

        // no whitespace allowed
        if (/\s/.test(contrasena)) {
            return true;
        }
        // minimum length
        if (contrasena.length < 6) {
            return true;
        }

        // at least one letter and one number
        if (!/[a-zA-Z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
            return true;
        }

        return false;
    }
}