//Exercice 1:
function displayNumbersDivisible(divisor) {
    let sum = 0;
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            console.log(i);
            sum += i;
        }
    }
    console.log("Sum:", sum);
}
//Exercice 2:
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 
const shoppingList = ["banana", "orange", "apple"];


function myBill() {
    let total = 0;

    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {   
            total += prices[item];                
            stock[item]--;                        
        }
    }

    return total;
}


console.log("Total Bill:", myBill());
console.log("Updated Stock:", stock);
//Exercice 3:
function changeEnough(itemPrice, amountOfChange) {
    const coinValues = [0.25, 0.10, 0.05, 0.01];

    
    let total = 0;
    for (let i = 0; i < amountOfChange.length; i++) {
        total += amountOfChange[i] * coinValues[i];
    }

    
    return total >= itemPrice;
}


console.log(changeEnough(4.25, [25, 20, 5, 0]));  
console.log(changeEnough(14.11, [2, 100, 0, 0]));  
console.log(changeEnough(0.75, [0, 0, 20, 5]));    
//Exercice 4:
function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    destination = destination.toLowerCase();
    if (destination === "london") return 183;
    if (destination === "paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) {
        cost *= 0.95;
    }
    return cost;
}

function totalVacationCost() {
    let nights, destination, days;

    do {
        nights = prompt("How many nights would you like to stay in the hotel?");
    } while (isNaN(nights) || nights === "" || nights === null);

    do {
        destination = prompt("What is your destination?");
    } while (!destination || !isNaN(destination));

    do {
        days = prompt("How many days would you like to rent the car?");
    } while (isNaN(days) || days === "" || days === null);

    nights = Number(nights);
    days = Number(days);

    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);

    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    console.log(`Total vacation cost: $${car + hotel + plane}`);
}

totalVacationCost();

//Exercice 5:
const container = document.getElementById("container");
console.log(container);

const firstList = document.querySelectorAll(".list")[0];
firstList.children[1].textContent = "Richard";

const secondList = document.querySelectorAll(".list")[1];
secondList.removeChild(secondList.children[1]);

document.querySelectorAll(".list").forEach(ul => {
  ul.children[0].textContent = "Fatima Zahra";
});

document.querySelectorAll(".list").forEach(ul => {
  ul.classList.add("student_list");
});

firstList.classList.add("university", "attendance");

container.style.backgroundColor = "lightblue";
container.style.padding = "10px";

Array.from(document.querySelectorAll("li")).forEach(li => {
  if (li.textContent === "Dan") {
    li.style.display = "none";
  }
});

Array.from(document.querySelectorAll("li")).forEach(li => {
  if (li.textContent === "Richard") {
    li.style.border = "2px solid black";
  }
});

document.body.style.fontSize = "18px";

if (container.style.backgroundColor === "lightblue") {
  const names = Array.from(document.querySelectorAll("ul.list li"))
    .map(li => li.textContent)
    .filter(name => name !== "Dan");
  alert(`Hello ${names[0]} and ${names[1]}`);
}
//Exercice 6:
const div = document.getElementById("navBar");
div.setAttribute("id", "socialNetworkNavigation");

const newLi = document.createElement("li");
const textNode = document.createTextNode("Logout");

newLi.appendChild(textNode);

const ul = div.querySelector("ul");
ul.appendChild(newLi);

const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;


console.log("First <li>:", firstLi.textContent);
console.log("Last <li>:", lastLi.textContent);
//Exercice 7:
const allBooks = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    alreadyRead: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    alreadyRead: false
  }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
  const bookDiv = document.createElement("div");
  bookDiv.style.margin = "10px";
  bookDiv.style.padding = "10px";
  bookDiv.style.border = "1px solid #ccc";
  bookDiv.style.width = "200px";

  const details = document.createElement("p");
  details.textContent = `${book.title} written by ${book.author}`;

  if (book.alreadyRead) {
    details.style.color = "red";
  }

  const img = document.createElement("img");
  img.src = book.image;
  img.style.width = "100px";

  bookDiv.appendChild(details);
  bookDiv.appendChild(img);

  section.appendChild(bookDiv);
});