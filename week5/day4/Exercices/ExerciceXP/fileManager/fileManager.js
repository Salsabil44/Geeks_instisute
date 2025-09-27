const fs = require("fs");

function readFile(fileName) {
  return fs.readFileSync(fileName, "utf-8");
}

function writeFile(fileName, content) {
  fs.writeFileSync(fileName, content);
}

module.exports = { readFile, writeFile };