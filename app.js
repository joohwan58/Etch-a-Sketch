const GRID_SIZE = 600;
const DEFAULT_COLOR = '#000000';
const SHADER_1 = '#ffffff'
const SHADER_2 = '#e1e1e1'
const SHADER_3 = '#c8c8c8'
const SHADER_4 = '#afafaf'
const SHADER_5 = '#969696'
const SHADER_6 = '#7d7d7d'
const SHADER_7 = '#646464'
const SHADER_8 = '#4b4b4b'
const SHADER_9 = '#323232'
const SHADER_10 = '#191919'

const sketchArea = document.querySelector('.sketch-container');
const drawColorPicker = document.querySelector('.draw-color-picker');
let drawColor = DEFAULT_COLOR;
drawColorPicker.addEventListener('input', () => {
    drawColor = drawColorPicker.value;
});


let drawing = false;
let bordered = true;
createGrid(16);

function createGrid(n) {
    sketchArea.replaceChildren();
    for (let i = 0; i < (n * n); i ++) {
        const grid = document.createElement('div');
        grid.classList.add('sketch');
        if (bordered) {
            grid.classList.add('grid-border');
        }
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
        if (shaded) {
            let backgroundColorArray = getComputedStyle(element).backgroundColor.split(",");
            let opacity = backgroundColorArray[3].slice(0, -1);
            let newOpacity = parseFloat(opacity) + 0.1;
            let newBackgroundColor = backgroundColorArray[0] + "," + backgroundColorArray[1] + "," + backgroundColorArray[2] + "," + ` ${newOpacity}` + ")"
            element.style.backgroundColor = newBackgroundColor;
            return;
        }
        element.style.backgroundColor = drawColor;
        }
}

let erase = false;
const eraser = document.querySelector('.eraser');
eraser.addEventListener("click", () => {
    erase = !erase;
    toggleRainbow = false;
    shaded = false;
    resetButtons();
    if (erase == true) {
        eraser.classList.add('activated');
    }
});

const rainbow = document.querySelector('.rainbow');
let toggleRainbow = false;
rainbow.addEventListener("click", () => {
    toggleRainbow = !toggleRainbow;
    erase = false;
    shaded = false;
    resetButtons();
    if (toggleRainbow == true) {
        rainbow.classList.add('activated');
    }
})

function chooseRandomColor() {
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}

const shading = document.querySelector('.shading');
let shaded = false;
shading.addEventListener('click', () => {
    shaded = !shaded;
    erase = false;
    toggleRainbow = false;
    resetButtons();
    drawColorPicker.value = "#000000";
    if (shaded == true) {
        shading.classList.add('activated');
    }
});

const borderToggle = document.querySelector(".border-toggle");
borderToggle.addEventListener('click', () => {
    sketchArea.childNodes.forEach((element) => {
        element.classList.toggle('grid-border');
    });
    bordered = !bordered;
    if (bordered) {
        borderToggle.classList.add('activated');
        borderToggle.textContent = 'Toggle grid border: On';
    } else {
        borderToggle.classList.remove('activated');
        borderToggle.textContent = 'Toggle grid border: Off'
    }
    
});

const clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    createGrid(slider.value);
    resetButtons();
    shaded = false;
    erase = false;
    toggleRainbow = false;
});

function resetButtons() {
    rainbow.classList.remove('activated');
    eraser.classList.remove('activated');
    shading.classList.remove('activated');
}