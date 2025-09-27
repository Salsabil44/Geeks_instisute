
import { persons } from "./data.js";

function averageAge(people) {
  const total = people.reduce((sum, p) => sum + p.age, 0);
  return total / people.length;
}

console.log("Average age:", averageAge(persons));
