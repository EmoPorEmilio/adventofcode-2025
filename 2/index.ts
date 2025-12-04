const input = await Bun.file("input.txt").text();
const ranges = input.trim().split("\n")[0]?.split(",");
let sum = 0;

const hasRepeated = (integer: number) => {
    let arrayOfNumbers = integer.toString().split("");
    if (!(arrayOfNumbers.length % 2 == 0)) {
        return false;
    } else {
        for (let i = 0; i < arrayOfNumbers.length/2; i++) {
            if (arrayOfNumbers[i] != arrayOfNumbers[arrayOfNumbers.length/2 + i]) {
                return false
            }
        }
    }
    return true;
}

for (const range of ranges!) {
    let start = parseInt(range.split("-")[0]!);
    let end = parseInt(range.split("-")[1]!);

    for (let i = start; i <=end; i++) {
        
        if (hasRepeated(i)) {
            sum += i;
        }
    }
}

//console.log(sum);

// part 2

const hasRepeatedAtLeastTwice = (integer: number) => {
    let arrayOfNumbers = integer.toString().split("");
    for (let i = 0; i < arrayOfNumbers.length; i++) {
        if (arrayOfNumbers.length % i === 0) {
            let parts = [];
            for (let j = 0; j < arrayOfNumbers.length; j += i) {
                let part = "";
                for (let k = j; k < j + i; k++) {
                    part += arrayOfNumbers[k];
                }
                parts.push(part);
            }
            let equal = true;
            let previous = parts[0]
            for (let p = 1; p < parts.length; p++) {
                if (previous != parts[p]) {
                    equal = false;
                }
                previous = parts[p];
            }
            if (equal) {
                return true;
            }
        }
    }
    return false;
}

sum = 0;
for (const range of ranges!) {
    let start = parseInt(range.split("-")[0]!);
    let end = parseInt(range.split("-")[1]!);

    for (let i = start; i <=end; i++) {
        
        if (hasRepeatedAtLeastTwice(i)) {
            console.log(i);
            sum += i;
        }
    }
}
console.log(sum);