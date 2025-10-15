function mapType(value) {
    if (typeof value === "number") {
        return (value * value);
    }
    else {
        return value.length;
    }
}
//Test
console.log(mapType(5));
console.log(mapType("hello"));
//Exercise 2:
function getProperty(obj, key) {
    return obj[key];
}
//Test
var person = { name: "salsabil", age: 22, country: "Morocco" };
console.log(getProperty(person, "name"));
console.log(getProperty(person, "age"));
console.log(getProperty(person, "country"));
function multiplyProperty(obj, key, factor) {
    return obj[key] * factor;
}
//test
var product = { price: 50, quantity: 3 };
console.log(multiplyProperty(product, "price", 2));
console.log(multiplyProperty(product, "quantity", 4));
