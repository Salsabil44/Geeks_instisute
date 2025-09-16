const generateCards = (data) => {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  data.forEach(({ name, username, email, image }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>${username}</p>
      <p>${email}</p>
    `;
    container.appendChild(card);
  });
};

generateCards(robots);

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = robots.filter(({ name }) =>
    name.toLowerCase().includes(query)
  );
  generateCards(filtered);
});