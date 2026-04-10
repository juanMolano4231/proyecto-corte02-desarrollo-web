export class ParteController {

    store(data, cvPart) {
        const stored = localStorage.getItem("parts");
        const parts = stored ? JSON.parse(stored) : [];

        const user = localStorage.getItem("currentUser");

        const fullData = {
            user,
            cvPart,
            ...data
        };

        const index = parts.findIndex(p =>
            p.user === user &&
            p.cvPart === cvPart
        );

        if (index !== -1) {
            parts[index] = fullData;
        } else {
            parts.push(fullData);
        }

        const index0 = parts.findIndex(p =>
            p.user === user &&
            p.cvPart === 0
        );

        const estadoData = {
            user,
            cvPart: 0,
            estado: "pendiente"
        };

        if (index0 !== -1) {
            parts[index0] = estadoData;
        } else {
            parts.push(estadoData);
        }

        localStorage.setItem("parts", JSON.stringify(parts));
        return true;
    }

    getEstado() {
        const stored = localStorage.getItem("parts");
        if (!stored) return null;

        const parts = JSON.parse(stored);
        const user = localStorage.getItem("currentUser");

        const part0 = parts.find(p =>
            p.user === user &&
            p.cvPart === 0
        );

        return part0 ? part0.estado : null;
    }
}