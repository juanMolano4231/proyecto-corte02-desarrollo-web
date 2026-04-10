// true means invalid

export class Parte2Validator {

    titulo(titulo) {
        if (!titulo || titulo.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.]+$/.test(titulo)) return true;
        return false;
    }

    fechaGrado(fecha) {
        if (!fecha) return true;

        // formato YYYY-MM-DD
        if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fecha)) return true;

        const inputDate = new Date(fecha);
        const today = new Date();

        // fecha inválida real (ej: 2024-02-30)
        if (isNaN(inputDate.getTime())) return true;

        // no permitir fechas futuras
        if (inputDate > today) return true;

        return false;
    }

    tablaFormacion(tabla) {
        if (!Array.isArray(tabla) || tabla.length === 0) return true;

        for (const row of tabla) {

            if (!row.modalidadAcademica) return true;

            if (
                !Number.isInteger(row.numSemestresAprobados) ||
                row.numSemestresAprobados < 0 || row.numSemestresAprobados > 14
            ) return true;

            if (typeof row.graduado !== "boolean") return true;

            if (this.titulo(row.tituloObtenido)) return true;

            // YYYY-MM
            if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(row.terminacion)) return true;

            if (row.numTarjetaProfesional) {
                if (!/^\d+$/.test(row.numTarjetaProfesional)) return true;
            }
        }

        return false;
    }

    tablaIdiomas(tabla) {
        if (!Array.isArray(tabla)) return true;

        for (const row of tabla) {

            if (!row.idioma || row.idioma.trim() === "") return true;

            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(row.idioma)) return true;
        }

        return false;
    }

}