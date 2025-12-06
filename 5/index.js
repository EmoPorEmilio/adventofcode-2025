const input = await Bun.file("input.txt").text();
const lines = input.trim().split("\n");

let input_messy_ranges = [];
let ranges = [];
let ids = [];
const insertOrdered = (previous_ranges, [first_number, second_number]) => {
  //la idea es hacerlo recursivo asumiendo que tengo un array ya ordenado y con rangos disjuntos
  //las opciones para el primer elemento del array (comienzo, final) son:
  //disjunto antes, solo lo agrego al principio
  //no disjunto, se fusionan en la unión y llamo recursivamente con el resto del array
  //disjunto después, dejo el anterior como el primer elemento y llamo recursivamente sobre los siguientes sin el primero
  if (previous_ranges.length === 0) {
    return [[first_number, second_number]];
  } else {
    let previous_first_number = previous_ranges[0][0];
    let previous_second_number = previous_ranges[0][1];
    let new_range = previous_ranges;
    const [previous_first, ...rest] = previous_ranges;
    if (previous_first_number > second_number) {
      new_range.unshift([first_number, second_number]);
    } else if (previous_second_number < first_number) {
      new_range = [previous_first, ...insertOrdered(rest, [first_number, second_number])];
    } else if ((second_number >= previous_first_number && first_number <= previous_first_number) ||
      (first_number <= previous_second_number && second_number >= previous_second_number)) {
      new_range = insertOrdered(rest, [Math.min(previous_first_number, first_number), Math.max(previous_second_number, second_number)]);
    }
    return new_range;
  }
}

for (const line of lines) {
  const characters = line.trim().split("");
  if (line.includes("-")) {
    let i = 0;
    let first_number = "";
    let second_number = "";
    while (characters[i] !== "-") {
      first_number += characters[i];
      i++;
    }
    i++;
    while (characters[i]) {
      second_number += characters[i];
      i++;
    }
    input_messy_ranges.push([parseInt(first_number), parseInt(second_number)]);
    ranges = insertOrdered(ranges, [parseInt(first_number), parseInt(second_number)]);
  } else {
    if (characters.length > 1) {
      let newId = "";
      for (const character of characters) {
        newId += character;
      }
      ids.push(parseInt(newId));
    }
  }
}
let count = 0;
for (let i = 0; i < ids.length; i++) {
  let fresh = false;
  for (let j = 0; j < ranges.length; j++) {
    if (ids[i] >= ranges[j][0] && ids[i] <= ranges[j][1]) {
      fresh = true;
    }
  }
  if (fresh) {
    count++;
  }
}
console.log("count part 1: " + count);

count = 0;

for (let j = 0; j < ranges.length; j++) {
  count += ranges[j][1] - ranges[j][0] + 1;
}

console.log("count part 2: " + count);
