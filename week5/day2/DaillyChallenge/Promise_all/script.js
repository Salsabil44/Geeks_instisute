const form = document.getElementById('sunrise-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const lat1 = document.getElementById('lat1').value;
    const lng1 = document.getElementById('lng1').value;
    const lat2 = document.getElementById('lat2').value;
    const lng2 = document.getElementById('lng2').value;

    const url1 = `https://api.sunrise-sunset.org/json?lat=${lat1}&lng=${lng1}&formatted=0`;
    const url2 = `https://api.sunrise-sunset.org/json?lat=${lat2}&lng=${lng2}&formatted=0`;

    // Fetch both sunrise times simultaneously
    Promise.all([fetch(url1), fetch(url2)])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => {
            const sunrise1 = new Date(data[0].results.sunrise).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const sunrise2 = new Date(data[1].results.sunrise).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            resultsDiv.innerHTML = `
                <p>Sunrise in City 1: ${sunrise1}</p>
                <p>Sunrise in City 2: ${sunrise2}</p>
            `;
        })
        .catch(err => {
            console.error(err);
            resultsDiv.textContent = "Failed to fetch sunrise times. Please check the coordinates.";
        });
});
