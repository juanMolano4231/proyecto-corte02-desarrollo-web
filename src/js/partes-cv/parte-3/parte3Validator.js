// true means invalid

export class Parte3Validator {

    empresa(nombre) {
        if (!nombre || nombre.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(nombre)) return true;
        return false;
    }

    pais(pais) {
        if (!pais || pais.trim() === "") return true;
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(pais)) return true;
        return false;
    }

    municipio(mun) {
        if (!mun || mun.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(mun)) return true;
        return false;
    }

    correo(email) {
        if (!email || email.trim() === "") return true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return true;
        return false;
    }

    telefonos(tel) {
        if (!tel || tel.trim() === "") return true;
        if (!/^[0-9+()\s-]{7,20}$/.test(tel)) return true;
        return false;
    }

    fecha(fecha) {
        if (!fecha) return true;

        if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fecha)) return true;

        const inputDate = new Date(fecha);
        const today = new Date();
        if (isNaN(inputDate.getTime())) return true;
        if (inputDate > today) return true;
        return false;
    }

    cargo(cargo) {
        if (!cargo || cargo.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(cargo)) return true;
        return false;
    }

    dependencia(dep) {
        if (!dep) return false; // optional
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(dep)) return true;
        return false;
    }

    direccion(dir) {
        if (!dir || dir.trim() === "") return true;
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#.,-]+$/.test(dir)) return true;
        return false;
    }

    tablaContratos(tabla) {
        if (!Array.isArray(tabla)) return true;

        for (const row of tabla) {
            if (this.empresa(row.empresa)) return true;
            if (!row.tipo) return true;
            if (this.pais(row.pais)) return true;
            if (this.municipio(row.municipio)) return true;
            if (this.correo(row.correo)) return true;
            if (this.telefonos(row.telefonos)) return true;
            if (this.fecha(row.fechaIngreso)) return true;
            if (this.fecha(row.fechaRetiro)) return true;
            if (this.cargo(row.cargo)) return true;
            if (this.dependencia(row.dependencia)) return true;
            if (this.direccion(row.direccion)) return true;
        }

        return false;
    }

}
