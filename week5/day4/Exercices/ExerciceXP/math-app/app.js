const _ = require("lodash");
const { add, multiply } = require("./math");

console.log("Add:", add(2, 3));
console.log("Multiply:", multiply(4, 5));

const numbers = [1, 2, 3, 4, 5];
console.log("Shuffled:", _.shuffle(numbers));