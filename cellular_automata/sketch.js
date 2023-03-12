// create empty 2d array
function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid, cols, rows;
cell_size = 10;

function setup() {
    createCanvas(800, 600);

    // calculate variables
    cols = floor(width / cell_size);
    rows = floor(height / cell_size);
    // initialize grid with random values
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0);

    // iterate and apply rules
    next_grid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // check neighbours
            let sum = -grid[i][j];
            for (let ii = -1; ii < 2; ii++) {
                for (let jj = -1; jj < 2; jj++) {
                    sum += grid[(i + ii + cols) % cols][(j + jj + rows) % rows];
                }
            }
            if (grid[i][j] == 1 && sum > 1 && sum < 4) {
                next_grid[i][j] = 1;
            } else if (sum == 3) {
                next_grid[i][j] = 1;
            } else next_grid[i][j] = 0;
        }
    }

    grid = next_grid;

    // render
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] == 1) {
                let x = i * cell_size;
                let y = j * cell_size;
                
                stroke(0);
                fill(255);
                rect(x, y, cell_size, cell_size)
            }
        }
    }
}