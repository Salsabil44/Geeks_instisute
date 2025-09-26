
//  Exercise 1: CommonJS Multiple Exports/Imports

if (false) {
  const products = [
    { name: "Laptop", price: 1200, category: "Electronics" },
    { name: "Shoes", price: 80, category: "Fashion" },
    { name: "Book", price: 15, category: "Education" }
  ];

  function findProduct(productName) {
    return products.find(p => p.name === productName);
  }

  console.log(findProduct("Laptop"));
  console.log(findProduct("Shoes"));
  console.log(findProduct("Book"));
}



//  Exercise 2: ES6 Import/Export

if (false) {
  const persons = [
    { name: "Fatima", age: 22, location: "Benslimane" },
    { name: "Sara", age: 25, location: "Casablanca" },
    { name: "Ali", age: 30, location: "Rabat" }
  ];

  function averageAge(people) {
    const total = people.reduce((sum, p) => sum + p.age, 0);
    return total / people.length;
  }

  console.log("Average age:", averageAge(persons));
}



//  Exercise 3: File Management (CommonJS)

if (false) {
  const fs = require("fs");

  function readFile(fileName) {
    return fs.readFileSync(fileName, "utf-8");
  }

  function writeFile(fileName, content) {
    fs.writeFileSync(fileName, content);
  }

  const helloContent = readFile("Hello World.txt");
  console.log("Hello file content:", helloContent);

  writeFile("Bye World.txt", "Writing to the file");
  console.log("Bye World.txt updated successfully!");
}



//  Exercise 4: Todo List (ES6 class)

if (false) {
  class TodoList {
    constructor() {
      this.tasks = [];
    }

    addTask(task) {
      this.tasks.push({ task, completed: false });
    }

    completeTask(index) {
      if (this.tasks[index]) {
        this.tasks[index].completed = true;
      }
    }

    listTasks() {
      return this.tasks;
    }
  }

  const myTodo = new TodoList();
  myTodo.addTask("Learn Node.js");
  myTodo.addTask("Build an API");
  myTodo.completeTask(0);

  console.log(myTodo.listTasks());
}



 // Exercise 5: Custom Module + lodash

if (false) {
  const _ = require("lodash");

  function add(a, b) {
    return a + b;
  }
  function multiply(a, b) {
    return a * b;
  }

  console.log("Add:", add(2, 3));
  console.log("Multiply:", multiply(4, 5));

  const numbers = [1, 2, 3, 4, 5];
  console.log("Shuffled:", _.shuffle(numbers));
}



//  Exercise 6: Chalk package

if (false) {
  const chalk = require("chalk");

  console.log(chalk.blue("Hello Fatima!"));
  console.log(chalk.green.bold("This is a colorful message!"));
  console.log(chalk.red.underline("Error: Something went wrong..."));
}



// Exercise 7: Reading and Copying Files

if (false) {
  const fs = require("fs");

  // copy-file.js
  const content = fs.readFileSync("source.txt", "utf-8");
  fs.writeFileSync("destination.txt", content);
  console.log("File copied successfully!");

  // read-directory.js
  fs.readdir(".", (err, files) => {
    if (err) throw err;
    console.log("Files in directory:", files);
  });
}
