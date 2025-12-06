const input = await Bun.file("input.txt").text();
const lines = input.trim().split("\n");

//part 1 digits_to_sum = 2
//part 2

let digits_to_sum = 12;

let total_max_count = 0n;
for (const line of lines) {
    const joltages = line.trim().split("");
    let digits = [];
    while (digits.length < 12) {
        let i = 0;
        if (digits.length) {
            i = digits[digits.length - 1] + 1;
        }
        let max = 0n;
        let max_position = 0;
        while (i <= joltages.length - 12 + digits.length) {
            if (BigInt(joltages[i]) > max) {
                max = BigInt(joltages[i]);
                max_position = i;
            }
            i++;
        }
        digits.push(max_position);
    }
    let number = "";
    digits.forEach((position) => {
        number += joltages[position];
    })
    total_max_count += BigInt(number);
}

console.log("part2: " + total_max_count);