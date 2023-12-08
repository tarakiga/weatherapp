// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Move the getWeather function outside of the DOMContentLoaded event listener
    function getWeather() {
        const locationInput = document.getElementById('locationInput');
        const location = locationInput.value;

        if (location === '') {
            alert('Please enter a location.');
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function displayWeather(data) {
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const weatherIconElement = document.getElementById('weatherIcon');
        const descriptionElement = document.getElementById('description');

        if (!data.name || !data.sys || !data.sys.country || !data.main || !data.main.temp || !data.weather || !data.weather[0] || !data.weather[0].icon || !data.weather[0].description) {
            console.error('Invalid weather data received:', data);
            return;
        }

        locationElement.textContent = data.name + ', ' + data.sys.country;
        temperatureElement.textContent = data.main.temp + '°C';

        // Use the weather icon if available, otherwise, use the placeholder image
        weatherIconElement.src = data.weather[0].icon
            ? `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            : 'weather.png'; // Replace 'weather.png' with the correct path to your placeholder image

        descriptionElement.textContent = data.weather[0].description;
    }

    // Check if the button element exists before adding the event listener
    const weatherButton = document.getElementById('weatherButton');
    if (weatherButton) {
        weatherButton.addEventListener('click', getWeather);
    } else {
        console.error('Button element not found.');
    }
});
