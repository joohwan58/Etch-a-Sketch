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
        grid.classList.add('sketch', 'grid-border');
        let size = GRID_SIZE / n;
        grid.style.flexBasis = `${size}px`
        grid.style.width = `${size}px`;
        sketchArea.appendChild(grid);
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
}

const slider = document.querySelector(".slider");
const sliderDisplay = document.querySelector(".slider-display");
slider.addEventListener('input', () => {
    sliderDisplay.textContent = `${slider.value} x ${slider.value}`;
    createGrid(slider.value);
});

function color(element) {
    if (drawing) {
        if (erase) {
            element.style.backgroundColor = '#ffffff';
            return;
        }
        if (toggleRainbow) {
            element.style.backgroundColor = chooseRandomColor();
            return;
        }
        element.style.backgroundColor = drawColor;
        }
}

let erase = false;
const eraser = document.querySelector('.eraser');
eraser.addEventListener("click", () => {
    erase = !erase;
});

const rainbow = document.querySelector('.rainbow');
let toggleRainbow = false;
rainbow.addEventListener("click", () => {
    if (toggleRainbow) {
        toggleRainbow = false;
    } else {
        toggleRainbow = true;
    }
})

function chooseRandomColor() {
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}

const borderToggle = document.querySelector(".border-toggle");
borderToggle.addEventListener('click', () => {
    sketchArea.childNodes.forEach((element) => {
        element.classList.toggle('grid-border');
    });
});

const clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    createGrid(slider.value);
});