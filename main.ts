const form = document.getElementById("cubic-form") as HTMLFormElement;

let roots: number[] = [];

function trignometricMethod(a: number, b: number, p: number, q: number): void {
    const theta: number = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
    const y1: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta);
    const y2: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3);
    const y3: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3);
    roots = [y1, y2, y3];
    roots = roots.map((root) => root - b / (3 * a));
};

const cardanosMethod = (a: number, b: number, q: number, disciminant: number): number => {
    return (
        Math.cbrt(-q / 2 + Math.sqrt(disciminant)) + Math.cbrt(-q / 2 - Math.sqrt(disciminant)) - b / (3 * a)
    );
};

function displayResults (p: number, q: number, discriminant: number) {
    (document.getElementById("p") as HTMLInputElement).value = `${p}`;
    (document.getElementById("p") as HTMLInputElement).value = `${q}`;
    (document.getElementById("discriminant") as HTMLInputElement).value = `${discriminant}`;
    if (roots.length === 3) {
        (document.getElementById("root-one") as HTMLInputElement).value = `${roots[0]}`;
        (document.getElementById("root-two") as HTMLInputElement).value = `${roots[1]}`;
        (document.getElementById("root-three") as HTMLInputElement).value = `${roots[2]}`;
    } else {
        if (discriminant > 0) {
            (document.getElementById("root-one") as HTMLInputElement).value = `${roots[0]}`;
            (document.getElementById("root-two") as HTMLInputElement).value = "complex";
            (document.getElementById("root-three") as HTMLInputElement).value = "complex";
        } else {
            (document.getElementById("root-one") as HTMLInputElement).value = `${roots[0]}`;
            (document.getElementById("root-two") as HTMLInputElement).value = `${roots[0]}`;
            (document.getElementById("root-three") as HTMLInputElement).value = `${roots[0]}`;
        };
    };
};

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const p: number = (3 * a * c - b * b) / (3 * a * a);
    const q: number = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);

    const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);

    if (discriminant < 0) {
        trignometricMethod(a, b, p, q);
    } else if (discriminant > 0) {
        roots = [cardanosMethod(a, b, q, discriminant)];
    } else {
        if (p === 0 && q === 0) {
            roots = [cardanosMethod(a, b, q, discriminant)];
        } else {
            roots = [
                cardanosMethod(a, b, q, discriminant),
                Math.cbrt(q / 2) - b / (3 * a),
                Math.cbrt(q / 2) - b / (3 * a)
            ];
        };
    };
    console.log(a, b, c, d);
    console.log(roots);
    displayResults(p, q, discriminant);
});
