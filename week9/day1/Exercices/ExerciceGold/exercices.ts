//Exercise1:
function processValue(value: string | number): string {
  if (typeof value === "number") {
    return `$${value.toFixed(2)}`; 
  } else {
    return value.split("").reverse().join(""); 
  }
}

// Test
console.log(processValue(100));       
console.log(processValue("hello"));  

//Exercise2
function sumNumbersInArray(arr: (number | string)[]): number {
  let sum = 0;
  for (let item of arr) {
    if (typeof item === "number") {
      sum += item;
    }
  }
  return sum;
}

// Test
console.log(sumNumbersInArray([1, "a", 2, "b", 3])); 
console.log(sumNumbersInArray(["x", "y", 10]));     


//Exercise3: 
type AdvancedUser = {
  name: string;
  age: number;
  address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
  let message = `Hello, my name is ${user.name} and I am ${user.age} years old.`;
  if (user.address) {
    message += ` I live at ${user.address}.`;
  }
  return message;
}

// Test 
console.log(introduceAdvancedUser({ name: "Alice", age: 25 }));
console.log(introduceAdvancedUser({ name: "Bob", age: 30, address: "123 Street" }));


//Exercise4
function welcomeUser(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// Test 
console.log(welcomeUser("Alice"));          
console.log(welcomeUser("Bob", "Hi"));    
