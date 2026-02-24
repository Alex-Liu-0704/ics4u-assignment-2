const form = document.getElementById("cubic-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const p: number = (3 * a * c - b * b)/(3 * a * a)
    const q: number = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b)/(27 * a * a * a)

    const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);

    // if (discriminant < 0) {
    //     (document.getElementById("result") as HTMLInputElement).value = "No Roots";
    // } else if (discriminant > 0) {
    //     const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
    //     const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
    //     (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo}`;
    // } else {
    //     const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
    //     (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne}`;
    // }
})