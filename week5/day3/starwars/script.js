const btn = document.getElementById('get-character-btn');
const characterDiv = document.getElementById('character');

function getRandomId() {
    return Math.floor(Math.random() * 83) + 1;
}


function fetchCharacter(id) {
    characterDiv.innerHTML = `<p class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</p>`;

    const url = `https://www.swapi.tech/api/people/${id}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => displayCharacter(data.result))
        .catch(error => {
            console.error(error);
            characterDiv.innerHTML = `<p class="error">Error fetching character. Please try again.</p>`;
        });
}

function displayCharacter(char) {
    characterDiv.innerHTML = `
        <p><strong>Name:</strong> ${char.properties.name}</p>
        <p><strong>Height:</strong> ${char.properties.height} cm</p>
        <p><strong>Gender:</strong> ${char.properties.gender}</p>
        <p><strong>Birth Year:</strong> ${char.properties.birth_year}</p>
        <p><strong>Homeworld:</strong> <span id="homeworld">Loading...</span></p>
    `;


    fetch(char.properties.homeworld)
        .then(res => res.json())
        .then(data => {
            document.getElementById('homeworld').textContent = data.result.properties.name;
        })
        .catch(() => {
            document.getElementById('homeworld').textContent = 'Unknown';
        });
}

btn.addEventListener('click', () => {
    const randomId = getRandomId();
    fetchCharacter(randomId);
});
