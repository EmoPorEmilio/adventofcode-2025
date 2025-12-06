const input = await Bun.file("input.txt").text();
const lines = input.trim().split("\n"); 

let grid = [];
for (const line of lines) {
    let row = [];
    const characters = line.trim().split("");
    for (const character of characters) {
        row.push(character);
    };
    grid.push(row);
}

let count = 0;
for (let i=0; i<grid.length; i++) {
    let row = grid[i];
    for (let j = 0; j < row.length; j++) {
        let adjacent_rolls_count = 0;
        if (row[j] === "@") {
            if (i-1 >= 0) {
                if (grid[i-1][j-1] === "@") {
                    adjacent_rolls_count++;
                }
                if (grid[i-1][j] === "@") {
                    adjacent_rolls_count++;
                }
                if (grid[i-1][j+1] === "@") {
                    adjacent_rolls_count++;
                }
            }
            if (i+1 < grid.length) {
                if (grid[i+1][j-1] === "@") {
                    adjacent_rolls_count++;
                }
                if (grid[i+1][j] === "@") {
                    adjacent_rolls_count++;
                }
                if (grid[i+1][j+1] === "@") {
                    adjacent_rolls_count++;
                }
            }
            if (grid[i][j-1] === "@") {
                adjacent_rolls_count++;
            }
            if (grid[i][j+1] === "@") {
                adjacent_rolls_count++;
            }

            if (adjacent_rolls_count < 4) {
                count++;
            }
        }
    }
}
console.log(count);

count = 0;
let removing = true;
let marking = true;
let pairsToBeRemoved = [];
while (removing) {
    if (marking) {
        pairsToBeRemoved = [];
        for (let i=0; i<grid.length; i++) {
            let row = grid[i];
            for (let j = 0; j < row.length; j++) {
                let adjacent_rolls_count = 0;
                if (row[j] === "@") {
                    if (i-1 >= 0) {
                        if (grid[i-1][j-1] === "@") {
                            adjacent_rolls_count++;
                        }
                        if (grid[i-1][j] === "@") {
                            adjacent_rolls_count++;
                        }
                        if (grid[i-1][j+1] === "@") {
                            adjacent_rolls_count++;
                        }
                    }
                    if (i+1 < grid.length) {
                        if (grid[i+1][j-1] === "@") {
                            adjacent_rolls_count++;
                        }
                        if (grid[i+1][j] === "@") {
                            adjacent_rolls_count++;
                        }
                        if (grid[i+1][j+1] === "@") {
                            adjacent_rolls_count++;
                        }
                    }
                    if (grid[i][j-1] === "@") {
                        adjacent_rolls_count++;
                    }
                    if (grid[i][j+1] === "@") {
                        adjacent_rolls_count++;
                    }

                    if (adjacent_rolls_count < 4) {
                        count++;
                        pairsToBeRemoved.push([i, j]);
                    }
                }
            }
        }
        if (pairsToBeRemoved.length === 0) {
            removing = false;
        }
        marking = false;
    } else {
        pairsToBeRemoved.forEach((pair) => {
            let i = pair[0];
            let j = pair[1];
            grid[i][j] = ".";
        })
        marking = true;
    }
}

console.log("part 2: " + count);