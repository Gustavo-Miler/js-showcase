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
paused = false;
eraser_mode = false;
let msg, eraser_state, pause_state;

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent("box");

    // calculate variables
    cols = floor(width / cell_size);
    rows = floor(height / cell_size);
    // initialize grid with random values
    grid = randomGrid(make2DArray(cols, rows));

    msg = createP("space - pause<br>r - reset<br>b - empty grid<br>e - toggle eraser");
    msg.position(10, height + 20);
    eraser_state = createP('Eraser mode = OFF');
    eraser_state.position(150, height + 20);
    pause_state = createP('Pause = OFF');4
    pause_state.position(150, height + 40);
}

function draw() {
    background(0);

    // get input
    if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        if (mouseButton == LEFT) {
            if (eraser_mode) {
                grid[floor(mouseX / cell_size)][floor(mouseY / cell_size)] = 0;
            } else grid[floor(mouseX / cell_size)][floor(mouseY / cell_size)] = 1;
        }
    }
    // iterate and apply rules
    if (!paused) {
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
    }
    // render
    for (let i = 0; i < cols; i++) {
        stroke(50);
        line(i * cell_size, 0, i * cell_size, height);
        for (let j = 0; j < rows; j++) {
            stroke(50);
            line(0, j * cell_size, width, j * cell_size);
            if (grid[i][j] == 1) {
                let x = i * cell_size;
                let y = j * cell_size;
                
                noStroke();
                fill(255);
                rect(x, y, cell_size, cell_size)
            }
        }
    }
}

function keyPressed() {
    switch (keyCode) {
        case 32: if (paused) {
                    paused = false;
                    pause_state.html('Pause = OFF');
                } else {
                    paused = true;
                    pause_state.html('Pause = ON');
                }; break;
        case 66: grid = make2DArray(cols, rows); break;
        case 69: if (eraser_mode) {
                    eraser_mode = false;
                    eraser_state.html('Eraser mode = OFF');
                } else {
                    eraser_mode = true;
                    eraser_state.html('Eraser mode = ON');
                }; break;
        case 82: grid = randomGrid(grid); break;
    }
}

function randomGrid(grid) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    return grid;
}