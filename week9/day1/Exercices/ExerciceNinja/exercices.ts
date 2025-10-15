//Exercise 1:
type MappedType<T> = T extends number ? number : number;
function mapType<T extends number | string>(value: T): MappedType<T> {
  if (typeof value === "number") {
    return (value * value) as MappedType<T>;
  } else {
    return value.length as MappedType<T>;
  }
}

//Test
console.log(mapType(5));         
console.log(mapType("hello"));   



//Exercise 2:

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

//Test
const person = { name: "salsabil", age: 22, country: "Morocco" };

console.log(getProperty(person, "name"));    
console.log(getProperty(person, "age"));      
console.log(getProperty(person, "country"));  



//Exercise3:
interface HasNumericProperty {
  [key: string]: number; 
}

function multiplyProperty<T extends HasNumericProperty, K extends keyof T>(
  obj: T,
  key: K,
  factor: number
): number {
  return obj[key] * factor;
}

//test
const product = { price: 50, quantity: 3 };

console.log(multiplyProperty(product, "price", 2));   
console.log(multiplyProperty(product, "quantity", 4)); 
