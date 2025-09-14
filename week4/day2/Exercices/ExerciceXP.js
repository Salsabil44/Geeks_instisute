//exercice 1
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
colors.forEach((color, index) => {
  console.log(`${index + 1}# choice is ${color}.`);
});

colors.includes("Violet") ? console.log("Yeah") : console.log("No...");
//exercice 2
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
  let position = index + 1;
  let suffix = 
    position === 1 ? ordinal[1] :
    position === 2 ? ordinal[2] :
    position === 3 ? ordinal[3] : ordinal[0];
    
  console.log(`${position}${suffix} choice is ${color}.`);
});
//exercice 3
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
// ["bread", "carrot", "potato", "chicken", "apple", "orange"]

const country = "USA";
console.log([...country]);
// ["U", "S", "A"]

//Bonus
let newArray = [...[,,]];
console.log(newArray);
// [undefined, undefined]
//exercice 4
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);

const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log(fullStackResidents);

// Bonus: 
const lastNames = users
  .filter(user => user.role === 'Full Stack Resident')
  .map(user => user.lastName);
console.log(lastNames);
//exercice 5
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const sentence = epic.reduce((acc, word) => acc + " " + word);
console.log(sentence);
//exercice 6
const students = [
  {name: "Ray", course: "Computer Science", isPassed: true}, 
  {name: "Liam", course: "Computer Science", isPassed: false}, 
  {name: "Jenner", course: "Information Technology", isPassed: true}, 
  {name: "Marco", course: "Robotics", isPassed: true}, 
  {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
  {name: "Jamie", course: "Big Data", isPassed: false}
];

const passedStudents = students.filter(student => student.isPassed);
console.log(passedStudents);

// Bonus:
students
  .filter(student => student.isPassed)
  .forEach(student => {
    console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
  });
