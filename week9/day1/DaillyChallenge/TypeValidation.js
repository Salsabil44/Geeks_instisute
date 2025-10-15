function validateUnionType(value, allowedTypes) {
    return allowedTypes.some(function (type) { return typeof value === type; });
}
var allowed = ["number", "string"];
console.log(validateUnionType(42, allowed));
console.log(validateUnionType("hello", allowed));
console.log(validateUnionType(true, allowed));
