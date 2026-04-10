export class Parte1Controller {

    constructor() {
        this.paisesLATAM = [
            "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica",
            "Cuba", "Ecuador", "El Salvador", "Guatemala", "Honduras",
            "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana",
            "Uruguay", "Venezuela"
        ];

        this.distritosMilitares = [
            "1 - Bogotá", "2 - Ubaté", "3 - Cáqueza", "4 - Chocontá", "5 - Tunja",
            "6 - Chiquinquirá", "7 - Garagoa", "8 - Sogamoso", "9 - Soatá", "10 - Santa Rosa de Viterbo",
            "11 - Girardot", "12 - Ambalema", "13 - Piedecuesta", "14 - Socorro", "15 - Málaga",
            "16 - Ocaña", "17 - Barranquilla", "18 - Corozal", "19 - Magangué", "20 - Santa Marta",
            "21 - Yarumal", "22 - Frontino", "23 - Medellín", "24 - Sonsón", "25 - Manzanares",
            "26 - Ríosucio", "27 - Cartago", "28 - Cali", "29 - Garzón", "30 - Popayán",
            "31 - Pasto", "32 - Ipiales"
        ];
    }

    getPaises() {
        return this.paisesLATAM;
    }

    getDistritosMilitares() {
        return this.distritosMilitares;
    }
}