//Exercice 1:
//Part1:
const people = ["Greg", "Mary", "Devon", "James"];
people.shift();
people[people.indexOf("James")] ="Jason";
people.push("Salsabil");
console.log(people.indexOf("Mary"));
const peopleCopy = people.slice(1, -1);
console.log(people.indexOf("Foo"));
//the results will be -1 that means Foo is not in the array
const last = people[people.length - 1];
console.log(last);
//the index of the last element is always one less then thw array's length
//Part 2:
const people = ["Mary", "Devon", "Jason", "Salsabil"];

for (let i = 0; i < people.length; i++){
    console.log(people[i]);
}
for (let i = 0; i < people.length; i++){
    console.log(people[i]);
    if(people[i] == "Devon") {
        break;
    }
}

//Exercice 2:
const colors = ["black", "blue", "purple", "red", "green"];
const suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++){
 console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}
//Exercice 3:
let number ;
do{
    number = Number(prompt("Enter a number:"));
}while (number < 10);
console.log("you entered",number, "which is greater than or equal to 10");
//Exercice 4:
const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,   
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {   
    Sarah: [3, 990],
    Dan: [4, 1000],
    David: [1, 500],
  },
};

console.log("Number of floors:", building.numberOfFloors);
console.log("Apts on 1st floor:", building.numberOfAptByFloor.firstFloor);
console.log("Apts on 3rd floor:", building.numberOfAptByFloor.thirdFloor);

let saraRent = building.numberOfRoomsAndRent.Sarah[1];
let davidRent = building.numberOfRoomsAndRent.David[1];
let danRent = building.numberOfRoomsAndRent.Dan[1];

if (saraRent + davidRent > danRent) {
  building.numberOfRoomsAndRent.Dan[1] = 1200;
}

console.log("Updated rents:", building.numberOfRoomsAndRent);

//Exercice 5:
const family = {
    father: "Mohammed",
    mother: "Samar",
    son: "imrane",
    daughter: "lina"
};
console.log("Keys:");
for (let key in family){
    console.log(key);
}
console.log("values");
for (let key in family){
    console.log(family[key]);
}
//Exercice 6:
const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'raindeer'
};
let sentence = "";
for (let key in details){
    sentence += key + " " +details[key] + " ";
}
console.log(sentence.trim());
//Exercice 7:
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
let init = names.map(name => name[0]);
init.sort();
let SocietyName = init.join("");
console.log(SocietyName);