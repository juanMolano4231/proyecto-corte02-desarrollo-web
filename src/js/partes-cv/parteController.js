export class ParteController {

    store(data, cvPart) {
        const stored = localStorage.getItem("parts");
        const parts = stored ? JSON.parse(stored) : [];

        const user = localStorage.getItem("currentUser");

        const fullData = {
            ...data,
            user,
            cvPart
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

        localStorage.setItem("parts", JSON.stringify(parts));
        return true;
    }
}