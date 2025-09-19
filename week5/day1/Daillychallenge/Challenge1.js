//challenge 1
function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    if (words.every(word => typeof word === "string")) {
      resolve(words.map(word => word.toUpperCase()));
    } else {
      reject("Not all items are strings!");
    }
  });
}
function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve(words.sort());
    } else {
      reject("Array length is not bigger than 4!");
    }
  });
}
//in this example, the catch method is executed, because the array contains a number
makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, the catch method is executed, because the array length is not bigger than 4
makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, you should see in the console, 
// the array of words uppercased and sorted
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result)) //["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
      .catch(error => console.log(error))
//Challenge 2:
const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
  return new Promise((resolve, reject) => {
    const morseObj = JSON.parse(morse);
    if (Object.keys(morseObj).length === 0) {
      reject("Morse object is empty!");
    } else {
      resolve(morseObj);
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const input = prompt("Enter a word or sentence:").toLowerCase();
    const morseArr = [];

    for (let char of input) {
      if (!morseJS[char]) {
        reject(`Character "${char}" doesn't exist in Morse code!`);
        return;
      } else {
        morseArr.push(morseJS[char]);
      }
    }
    resolve(morseArr);
  });
}

function joinWords(morseTranslation) {
  const morseString = morseTranslation.join("\n");
  const pre = document.createElement("pre");
  pre.textContent = morseString;
  document.body.appendChild(pre);
}
toJs()
  .then(toMorse)
  .then(joinWords)
  .catch(error => console.log(error));
