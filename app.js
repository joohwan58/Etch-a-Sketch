const GRID_SIZE = 600;


const sketchArea = document.querySelector('.sketch-container');
console.log(sketchArea);

function createGrid(n) {
    for (let i = 0; i < (n * n); i ++) {
        const grid = document.createElement('div');
        grid.className = 'sketch';
        let size = GRID_SIZE / n;
        grid.style.flexBasis = `${size}px`
        grid.style.width = `${size}px`;
        sketchArea.appendChild(grid);
    }
}

createGrid(16);