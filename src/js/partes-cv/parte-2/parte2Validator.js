// true means invalid

export class Parte2Validator {

    titulo(titulo) {
        if (!titulo || titulo.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.]+$/.test(titulo)) return true;
        return false;
    }

}
