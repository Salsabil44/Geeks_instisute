const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("gif-form");
const searchInput = document.getElementById("search-input");
const gifsContainer = document.getElementById("gifs-container");
const deleteAllBtn = document.getElementById("delete-all");

// Fetch a random GIF based on user input
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const category = searchInput.value.trim();
    if (!category) return;

    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${category}`);
        const data = await res.json();
        const gifUrl = data.data.images.fixed_height.url;

        // Create a container for the GIF and DELETE button
        const gifItem = document.createElement("div");
        gifItem.classList.add("gif-item");

        const img = document.createElement("img");
        img.src = gifUrl;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            gifsContainer.removeChild(gifItem);
        });

        gifItem.appendChild(img);
        gifItem.appendChild(deleteBtn);
        gifsContainer.appendChild(gifItem);

        searchInput.value = ""; // Clear input
    } catch (error) {
        console.error("Error fetching GIF:", error);
        alert("Failed to fetch GIF. Try again.");
    }
});

// Delete all GIFs
deleteAllBtn.addEventListener("click", () => {
    gifsContainer.innerHTML = "";
});
