const GRID_SIZE = 600;

const sketchArea = document.querySelector('.sketch-container');

createGrid(16);

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
    element.style.backgroundColor = 'black';
}

sketchArea.childNodes.forEach((element) => {
    element.addEventListener('click', () => {
        color(element);
    });
});