function validateUnionType (value : any, allowedTypes: string[]): boolean{
    return allowedTypes.some(type => typeof value === type);
}
const allowed = ["number", "string"];
console.log(validateUnionType(42, allowed));        
console.log(validateUnionType("hello", allowed));
console.log(validateUnionType(true, allowed));