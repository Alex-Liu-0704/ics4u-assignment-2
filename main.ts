const form = document.getElementById("cubic-form") as HTMLFormElement;
const outputContainer: HTMLElement = document.getElementById("output-container") as HTMLElement;

function trignometricMethod(a: number, b: number, p: number, q: number): number[] {
    const theta: number = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
    const y1: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta);
    const y2: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3);
    const y3: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3);
    return [y1, y2, y3].map((root) => root - b / (3 * a));
};

const cardanosMethod = (a: number, b: number, q: number, disciminant: number): number => {
    return (
        Math.cbrt(-q / 2 + Math.sqrt(disciminant)) + Math.cbrt(-q / 2 - Math.sqrt(disciminant)) - b / (3 * a)
    );
};

function drawGraph(roots: number[], a: number, b: number, c: number, d: number): void {
    const canvas = document.getElementById("graph") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!ctx) {
        return;
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const xCenter: number = canvas.width / 2;
    const yCenter: number = canvas.height / 2;
    const scale: number = 25;

    // draw grid
    ctx.beginPath();
    ctx.strokeStyle = "#E7E7E7";
    ctx.lineWidth = 1;

    for (let x: number = 0; x <= canvas.width; x += scale) { // dont know if i need a type for for loop but i put it anyways
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    };

    for (let y: number = 0; y <= canvas.height; y += scale) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    };

    ctx.stroke();

    // draw the axis
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.moveTo(xCenter, 0);
    ctx.lineTo(xCenter, canvas.height);
    ctx.moveTo(0, yCenter);
    ctx.lineTo(canvas.width, yCenter);
    ctx.stroke();

    // draw curve
    ctx.beginPath();
    ctx.strokeStyle = "Red";
    ctx.lineWidth = 2;

    const xStart: number = -canvas.width / 2 / scale;
    const xEnd: number = canvas.width / 2 / scale;
    const yStart: number = a * xStart * xStart * xStart + b * xStart * xStart + c * xStart + d;

    ctx.moveTo(xCenter + xStart * scale, yCenter - yStart * scale);

    for (let x: number = xStart; x <= xEnd; x += 0.1) {
        const y: number = a * x * x * x + b * x * x + c * x + d;
        const canvasX: number = xCenter + x * scale;
        const canvasY: number = yCenter - y * scale;
        ctx.lineTo(canvasX, canvasY);
    };

    ctx.stroke();

    // plot roots
    ctx.fillStyle = "#8C93A8";

    for (let i: number = 0; i < roots.length; i++) {
        const root: number = roots[i];
        const x: number = xCenter + root * scale;
        const y: number = yCenter;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    };
};

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    if (a === 0) {
        alert("'a' value cannot be zero!");
        return;
    };

    const p: number = (3 * a * c - b * b) / (3 * a * a);
    const q: number = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
    const discriminant: number = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

    let roots: number[] = [];

    // setting the equation 
    (document.getElementById("equation") as HTMLInputElement).textContent =
        `${a === 1 ? "" : a}x³` +
        `${b === 0 ? "" : b === 1 ? ` + x²` : b === -1 ? ` - x²` : b > 0 ? ` + ${b}x²` : ` - ${Math.abs(b)}x²`}` +
        `${c === 0 ? "" : c === 1 ? ` + x` : c === -1 ? ` - x` : c > 0 ? ` + ${c}x` : ` - ${Math.abs(c)}x`}` +
        `${d === 0 ? "" : d > 0 ? ` + ${d}` : ` - ${Math.abs(d)}`}` +
        ` = 0`; 

    if (discriminant < 0) {
        roots = trignometricMethod(a, b, p, q);
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

    roots.sort((a, b) => a - b);

    // display results using DOM
    (document.getElementById("p") as HTMLTableCellElement).textContent = `${p.toFixed(5)}`;
    (document.getElementById("q") as HTMLTableCellElement).textContent = `${q.toFixed(5)}`;
    (document.getElementById("discriminant") as HTMLTableCellElement).textContent = `${discriminant.toFixed(5)}`;
    (document.getElementById("root-one") as HTMLTableCellElement).textContent = `${roots[0].toFixed(2)}`;
    (document.getElementById("root-two") as HTMLTableCellElement).textContent =
        roots.length === 3 ? `${roots[1].toFixed(2)}` : discriminant > 0 ? "complex" : `${roots[0].toFixed(2)}`;
    (document.getElementById("root-three") as HTMLTableCellElement).textContent =
        roots.length === 3 ? `${roots[2].toFixed(2)}` : discriminant > 0 ? "complex" : `${roots[0].toFixed(2)}`;
    
    drawGraph(roots, a, b, c, d);
    outputContainer.hidden = false;
});