//exercice 1
console.log("Hello world!");
//exercice 2
var nom = "salsabil";
var age = 22;
console.log("Hello " + nom + ", you are " + age + " years old.");
//exercice 3
var id;
id = 123;
id = "ABC";
//exercice 4
function checkNumber(num) {
    if (num > 0)
        return "positive";
    else if (num < 0)
        return "negative";
    else
        return "zero";
}
console.log(checkNumber(5));
console.log(checkNumber(-3));
console.log(checkNumber(0));
//exercice 5
function getDetails(name, age) {
    return [name, age, "Hello, ".concat(name, "! you are ").concat(age, " years old.")];
}
console.log(getDetails("salsabil", 22));
function createPerson(name, age) {
    return { name: name, age: age };
}
console.log(createPerson("salsabil", 22));
//exercice 7
//let element = document.getElementById("myInput") as HTMLInputElement;
//element.value = "Hello!";
//console.log(element.value);
//exercice 8
function getAction(role) {
    switch (role) {
        case "admin":
            return "Manage users and settings";
        case "editor":
            return "Edit content";
        case "viewer":
            return "View content";
        case "guest":
            return "Limited access";
        case "unknown":
            return "Invalid role";
        default:
            return "Invalid role";
    }
}
// Test the function with different roles
console.log(getAction("admin")); // Output: Manage users and settings
console.log(getAction("editor")); // Output: Edit content
console.log(getAction("viewer")); // Output: View content
console.log(getAction("guest")); // Output: Limited access
console.log(getAction("unknown")); // Output: Invalid role
//exercice 9
function greet(name) {
    if (name === void 0) { name = "user"; }
    return "Hello, ".concat(name, "!");
}
console.log(greet());
console.log(greet("salsabil"));
