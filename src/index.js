
<<<<<<< Updated upstream
// import './js/clock';
import './sass/main.scss';
import './js/weather';
import './js/cloc-data'
=======
let isDrawing = false;
let lastX;
let lastY;
let hue = 0;
let direction = true;

function draw(ev) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(ev.offsetX, ev.offsetY);
    ctx.stroke();
    [lastX, lastY] = [ev.offsetX, ev.offsetY];
    hue++;
    if (hue >= 360) {
        hue = 0;
    };
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    };
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    };

    // console.log(hue);
};

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
})
canvas.addEventListener('mouseup', () => (isDrawing = false))
canvas.addEventListener('mouseout', () => (isDrawing = false))
>>>>>>> Stashed changes
