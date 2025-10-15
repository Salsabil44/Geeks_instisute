//Exercise1:
function processValue(value) {
    if (typeof value === "number") {
        return "$".concat(value.toFixed(2));
    }
    else {
        return value.split("").reverse().join("");
    }
}
// Test
console.log(processValue(100));
console.log(processValue("hello"));
//Exercise2
function sumNumbersInArray(arr) {
    var sum = 0;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (typeof item === "number") {
            sum += item;
        }
    }
    return sum;
}
// Test
console.log(sumNumbersInArray([1, "a", 2, "b", 3]));
console.log(sumNumbersInArray(["x", "y", 10]));
function introduceAdvancedUser(user) {
    var message = "Hello, my name is ".concat(user.name, " and I am ").concat(user.age, " years old.");
    if (user.address) {
        message += " I live at ".concat(user.address, ".");
    }
    return message;
}
// Test 
console.log(introduceAdvancedUser({ name: "Alice", age: 25 }));
console.log(introduceAdvancedUser({ name: "Bob", age: 30, address: "123 Street" }));
//Exercise4
function welcomeUser(name, greeting) {
    if (greeting === void 0) { greeting = "Hello"; }
    return "".concat(greeting, ", ").concat(name, "!");
}
// Test 
console.log(welcomeUser("Alice"));
console.log(welcomeUser("Bob", "Hi"));
