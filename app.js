const GRID_SIZE = 600;

const sketchArea = document.querySelector('.sketch-container');
const drawColorPicker = document.querySelector('.draw-color-picker');
let drawColor = '#000000';
drawColorPicker.addEventListener('input', () => {
    drawColor = drawColorPicker.value;
});

createGrid(16);
let drawing = false;

function createGrid(n) {
    sketchArea.replaceChildren();
    for (let i = 0; i < (n * n); i ++) {
        const grid = document.createElement('div');
        grid.className = 'sketch';
        let size = GRID_SIZE / n;
        grid.style.flexBasis = `${size}px`
        grid.style.width = `${size}px`;
        sketchArea.appendChild(grid);
    }
}

const slider = document.querySelector(".slider");
const sliderDisplay = document.querySelector(".slider-display");
slider.addEventListener('input', () => {
    sliderDisplay.textContent = `${slider.value} x ${slider.value}`;
    createGrid(slider.value);
});

function color(element) {
    if (drawing) {
        element.style.backgroundColor = drawColor;
    }
}

sketchArea.childNodes.forEach((element) => {
    element.addEventListener('mousedown', () => {
        drawing = true;
        color(element);
    });
    element.addEventListener('mouseover', () => {
        color(element);
    });
    element.addEventListener('mouseup', () => {
        drawing = false;
    });
});

const eraser = document.querySelector('.eraser');
eraser.addEventListener("click", () => {
    if (drawColor === '#ffffff') {
        drawColor = drawColorPicker.value;
    } else {
        drawColor = '#ffffff';
    }
});