
const planets = [
  { name: "Mercury", color: "gray", moons: 0 },
  { name: "Venus", color: "orange", moons: 0 },
  { name: "Earth", color: "blue", moons: 1 },
  { name: "Mars", color: "red", moons: 2 },
  { name: "Jupiter", color: "brown", moons: 79 },
  { name: "Saturn", color: "goldenrod", moons: 82 },
  { name: "Uranus", color: "lightseagreen", moons: 27 },
  { name: "Neptune", color: "darkblue", moons: 14 }
];


const section = document.querySelector(".listPlanets");

planets.forEach(planet => {

  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet");
  planetDiv.style.backgroundColor = planet.color;

  planetDiv.textContent = planet.name;


  for (let i = 0; i < planet.moons; i++) {
    const moon = document.createElement("div");
    moon.classList.add("moon");

    const angle = (i / planet.moons) * 2 * Math.PI;
    const radius = 70 + Math.random() * 20; 
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    moon.style.left = 50 + x + "px";
    moon.style.top = 50 + y + "px";

    planetDiv.appendChild(moon);
  }

  section.appendChild(planetDiv);
});