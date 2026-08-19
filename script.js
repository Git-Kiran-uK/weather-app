const formElem = document.querySelector("#search-form");
const imgElem = document.querySelector("#weather-img");
const tempElem = document.querySelector("#temp");
const locationElem = document.querySelector("#location");
const humidityElem = document.querySelector("#humidity");
const windSpeedElem = document.querySelector("#wind-speed");

formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElem);
    const location = formData.get("search");
    updateInfo(location);
});

async function updateInfo(location){
    const weatherData = await fetchWeatherData(location);
    imgElem.src = `https://rodrigokamada.github.io/openweathermap/images/${weatherData.weather[0]?.icon}_t@4x.png`;
    tempElem.textContent = weatherData?.main?.temp != null
    ? Math.ceil(weatherData.main.temp)
    : '--';
    locationElem.textContent = weatherData?.name ?? "New Delhi";
    humidityElem.textContent = weatherData?.main?.humidity ?? '--'
    windSpeedElem.textContent = weatherData?.wind?.speed ?? '--';
}

function handleError(err){
    alert(`Error: ${err.message}`);
}

async function fetchWeatherData(location) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=2d4fa12c7f312e1005f6da9fbabc98e9`);
        if(!response.ok){
            if(response.status == 404) throw new Error(`Unknown location '${location}'`);
            throw new Error(response.statusText);
        }
        return response.json();
    } catch(err){
        handleError(err);
    }
}

updateInfo('New Delhi');