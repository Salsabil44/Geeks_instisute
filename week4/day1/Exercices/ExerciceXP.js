//Exercice1 :
function funcOne() {
    let a = 5; // local variable
    if (a > 1) {
        a = 3; // reassigned inside the block
    }
    alert(`inside the funcOne function ${a}`);
}
// #1.1 - run in the console:
funcOne(); 
// Prediction: alert will show  3
// Because a starts at 5 condition is true so it changes to 3.

// #1.2 What will happen if the variable is declared 
// with const instead of let ?
// With const reassignment is not allowed  it will throw an error 
// Assignment to constant variable when trying to do a = 3.


// #2
let a = 0; // global variable
function funcTwo() {
    a = 5; // modifies the global variable
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

// #2.1 - run in the console:
funcThree(); // alert "inside the funcThree function 0"
funcTwo();   // changes a to 5
funcThree(); // alert inside the funcThree function 5

// #2.2 What will happen if the variable is declared 
// with const instead of let ?
// If a was const = 0, then funcTwo() would try to reassign a = 5 → Error
// "Assignment to constant variable".


// #3
function funcFour() {
    window.a = "hello"; // creates a global variable "a" on the window object
}

function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// #3.1 - run in the console:
funcFour();  // defines window.a = "hello"
funcFive();  // alert "inside the funcFive function hello"
// Because a is now a property of window (global scope).


// #4
let a = 1; // global variable
function funcSix() {
    let a = "test"; // local variable shadows the global one
    alert(`inside the funcSix function ${a}`);
}

// #4.1 - run in the console:
funcSix(); 
// Prediction: alert inside the funcSix function test
// Because inside funcSix, the local variable a = "test" overrides global a.

// #4.2 What will happen if the variable is declared 
// with const instead of let ?
// Nothing changes in behavior still works the same because we’re not reassigning.
// Local const a = "test" just shadows the global variable.


// #5
let a = 2; // global variable
if (true) {
    let a = 5; // block-scoped variable, only inside this if block
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// #5.1 - run the code in the console
// First alert: "in the if block 5"
// Second alert: "outside of the if block 2"
// Because the inner 'a' only exists in the block outer 'a' remains unchanged.

// #5.2 What will happen if the variable is declared 
// with const instead of let ?
// Same behavior Both are block-scoped Works fine since no reassignment happens.

//Exercice 2:
const winBattle = () => true;

let experiencePoints = winBattle() ? 10 : 1;

console.log(experiencePoints);
//Exercice 3:
const isString = (value) => typeof value === "string";

console.log(isString("hello")); 
console.log(isString(123));     
//Exercice 4:
const sum = (a, b) => a + b;

console.log(sum(3, 4));
console.log(sum(10, 20)); 
//Exercice 5:
//  Function Declaration
function toGrams(weightKg) {
  return weightKg * 1000;
}
console.log(toGrams(5)); 
// Function Expression
const toGramsExpr = function(weightKg) {
  return weightKg * 1000;
};
console.log(toGramsExpr(3)); 
// Function declaration can be called before it's defined but function expression is not.

// One-line Arrow Function
const toGramsArrow = weightKg => weightKg * 1000;
console.log(toGramsArrow(7)); 

//Exercice 7:
