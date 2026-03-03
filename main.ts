const form = document.getElementById("cubic-form") as HTMLFormElement;

let roots: number[] = [];

function trignometricMethod(a: number, b: number, p: number, q: number) {
    const theta: number = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))))
    const y1: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta)
    const y2: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3)
    const y3: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3)
    roots = [y1, y2, y3]
    roots = roots.map((root) => root - b / (3 * a))
}

function cardanosMethod(a: number, b: number, q: number, disciminant: number) {
    return (
        Math.cbrt(-q / 2 + Math.cbrt(disciminant)) + Math.cbrt(-q / 2 - Math.cbrt(disciminant)) - b / (3 * a)
    );
}

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

    console.log(a, b, c, d)

    if (discriminant < 0) {
        trignometricMethod(a, b, p, q)
        //     (document.getElementById("result") as HTMLInputElement).value = "No Roots";
    } else if (discriminant > 0) {
        roots = [cardanosMethod(a, b, q, discriminant)]
        //     const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        //     const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
        //     (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo}`;
    } else {
        if (p == 0 && q == 0) {
            roots = [cardanosMethod(a, b, q, discriminant)]
        } else {
            roots = [
                cardanosMethod(a, b, q, discriminant),
                // cardanosMethod(a, b, q, discriminant), // when i do 2 cardanos, i get the wrong double root
                Math.cbrt(q / 2) - b / (3 * a),
                Math.cbrt(q / 2) - b / (3 * a)
            ]
        }
    }
    console.log(roots)

    //     const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
    //     (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne}`;
    // }
})