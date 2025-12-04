const input = await Bun.file("input.txt").text();
const line = input.trim().split("\n");
console.log(line);