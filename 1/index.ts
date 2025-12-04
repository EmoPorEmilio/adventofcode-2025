const input = await Bun.file("input.txt").text();
const lines = input.trim().split("\n");

const getNextPosition = (current: number, clicks: number, moveTo: string): number => {
    switch (moveTo) {
        case "L":
            return (current - clicks) % 100;
        case "R":
            return (current + clicks) % 100;
        default:
            return current;
    }
};

let startPosition = 50;
let endPosition = startPosition;
let zeroCount = 0;

for (const line of lines) {
    const moveTo = line.charAt(0);
    const clicks = parseInt(line.substring(1));
    endPosition = getNextPosition(endPosition, clicks, moveTo);
    if (endPosition === 0) zeroCount++; 
}
console.log(zeroCount);

//part 2

startPosition = 50;
endPosition = startPosition;
zeroCount = 0;

for (const line of lines) {
    const moveTo = line.charAt(0);
    const clicks = parseInt(line.substring(1));
    for (let i = 0; i < clicks; i++) {
        endPosition = getNextPosition(endPosition, 1, moveTo);
        if (endPosition === 0) zeroCount++; 
    }
}
console.log(zeroCount);