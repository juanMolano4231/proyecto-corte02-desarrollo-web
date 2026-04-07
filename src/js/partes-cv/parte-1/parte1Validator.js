// true means invalid

export class Parte1Validator {

    primerApellido(apellido) {
        if (!apellido || apellido.trim() === "") return true;
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(apellido)) return true;
        return false;
    }

    segundoApellido(apellido) {
        if (!apellido) return false; // optional
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(apellido)) return true;
        return false;
    }

    nombres(nombres) {
        if (!nombres || nombres.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.]+$/.test(nombres)) return true;
        return false;
    }

    numeroDocumento(ced) {
        if (!ced || ced.trim() === "") return true;            // empty
        if (!/^\d+$/.test(ced)) return true;                  // not all digits
        return false;
    }

    numeroLibreta(sexo, lib) {
        // If sex is male, require a value
        if (sexo === "masculino") {
            if (!lib || lib.trim() === "") return true;   // required
        } else {
            // If not male and no value, OK
            if (!lib) return false;
        }

        // If there is a value, must be numeric
        if (!/^\d+$/.test(lib)) return true;

        return false;
    }

    regionNacimiento(region) {
        if (!region || region.trim() === "") return true;
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,-]+$/.test(region)) return true;
        return false;
    }

    regionResidencia(region) {
        if (!region || region.trim() === "") return true;
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,-]+$/.test(region)) return true;
        return false;
    }

    direccion(direccion) {
        if (!direccion || direccion.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#.,-]+$/.test(direccion)) return true;
        return false;
    }

    telefono(telefono) {
        if (!telefono || telefono.trim() === "") return true;
        if (!/^[0-9]{7,15}$/.test(telefono)) return true;
        return false;
    }

    email(email) {
        if (!email || email.trim() === "") return true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return true;
        return false;
    }

}
