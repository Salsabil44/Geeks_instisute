
const form = document.querySelector("form");
console.log(form);

const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
console.log(fnameInput, lnameInput);


const fnameByName = document.getElementsByName("firstname")[0];
const lnameByName = document.getElementsByName("lastname")[0];
console.log(fnameByName, lnameByName);

const ul = document.querySelector(".usersAnswer");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const firstName = fnameInput.value.trim();
  const lastName = lnameInput.value.trim();

  if (firstName === "" || lastName === "") {
    alert("Please fill in both fields");
    return;
  }

  ul.innerHTML = "";

  const li1 = document.createElement("li");
  li1.textContent = firstName;

  const li2 = document.createElement("li");
  li2.textContent = lastName;
  ul.appendChild(li1);
  ul.appendChild(li2);
});
