
const h1 = document.querySelector("h1");
console.log(h1);


const article = document.querySelector("article");
article.lastElementChild.remove();

const h2 = document.querySelector("h2");
h2.addEventListener("click", () => {
  h2.style.backgroundColor = "red";
});

const h3 = document.querySelector("h3");
h3.addEventListener("click", () => {
  h3.style.display = "none";
});


const button = document.getElementById("boldBtn");
button.addEventListener("click", () => {
  document.querySelectorAll("p").forEach(p => {
    p.style.fontWeight = "bold";
  });
});

// BONUS: 
h1.addEventListener("mouseover", () => {
  const randomSize = Math.floor(Math.random() * 101); // 0 to 100px
  h1.style.fontSize = `${randomSize}px`;
});

const secondP = document.querySelectorAll("p")[1];
secondP.addEventListener("mouseover", () => {
  secondP.classList.add("fade-out");
});
