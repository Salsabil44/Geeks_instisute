const products = require("./products"); 

function findProduct(productName) {
  return products.find(p => p.name === productName);
}

console.log(findProduct("Laptop"));
console.log(findProduct("Shoes"));
console.log(findProduct("Book"));