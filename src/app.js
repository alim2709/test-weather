import {createApi} from "unsplash-js";
import  { DateTime } from "luxon";
// import {weatherIcons, getWeatherIcon} from "../collection-weather-code";
import "../style.css";

import americanStorm from './images/american-storm.gif';
import clearSkyNight from './images/clear-sky-night.png';
import clock from './images/clock.png';
import cloud from './images/cloud.png';
import cloudNight from './images/cloud-night.png';
import drizzle from './images/drizzle.png';
import drizzleNight from './images/drizzle-night.png';
import fog from './images/fog.png';
import fogNight from './images/fog-night.png';
import freezingRain from './images/freezing-rain.png';
import freezingRainNight from './images/freezing-rain-night.png';
import overcast from './images/overcast.png';
import overcastNight from './images/overcast-night.png';
import rainShower from './images/rain-shower.png';
import rainShowerNight from './images/rain-shower-night.png';
import raining from './images/raining.png';
import rainyNight from './images/rainy-night.png';
import snowGrainNight from './images/snow-grain-night.png';
import snowGrains from './images/snow-grains.png';
import snowNight from './images/snow-night.png';
import snowShower from './images/snow-shower.png';
import snowShowerNight from './images/snow-shower-night.png';
import snowy from './images/snowy.png';
import sun from './images/sun.png';
import sunrise from './images/sunrise.png';
import sunset from './images/sunset.png';
import thunderstorm from './images/thunderstorm.png';
import thunderstormNight from './images/thunderstorm-night.png';

const weatherIcons = {
    0: {
        day: "assets/sun.png",
        night: "assets/clear-sky-night.png",
        description: "Clear sky"
    },
    1: {
        day: "assets/overcast.png",
        night: "assets/overcast-night.png",
        description: "Mainly clear"
    },
    2: {
        day: "assets/overcast.png",
        night: "assets/overcast-night.png",
        description: "Partly cloudy"
    },
    3: {
        day: "assets/overcast.png",
        night: "assets/overcast-night.png",
        description: "Overcast"
    },
    45: {
        day: "assets/fog.png",
        night: "assets/fog-night.png",
        description: "Fog"
    },
    48: {
        day: "assets/fog.png",
        night: "assets/fog-night.png",
        description: "Depositing rime fog"
    },
    51: {
        day: "assets/drizzle.png",
        night: "assets/drizzle-night.png",
        description: "Drizzle: Light intensity"
    },
    53: {
        day: "assets/drizzle.png",
        night: "assets/drizzle-night.png",
        description: "Drizzle: Moderate intensity"
    },
    55: {
        day: "assets/drizzle.png",
        night: "assets/drizzle-night.png",
        description: "Drizzle: Dense intensity"
    },
    56: {
        day: "assets/cloud.png",
        night: "assets/cloud-night.png",
        description: "Freezing Drizzle: Light intensity"
    },
    57: {
        day: "assets/cloud.png",
        night: "assets/cloud-night.png",
        description: "Freezing Drizzle: Dense intensity"
    },
    61: {
        day: "assets/raining.png",
        night: "assets/rainy-night.png",
        description: "Rain: Slight intensity"
    },
    63: {
        day: "assets/raining.png",
        night: "assets/rainy-night.png",
        description: "Rain: Moderate intensity"
    },
    65: {
        day: "assets/raining.png",
        night: "assets/rainy-night.png",
        description: "Rain: Heavy intensity"
    },
    66: {
        day: "assets/freezing-rain.png",
        night: "assets/freezing-rain-night.png",
        description: "Freezing Rain: Light intensity"
    },
    67: {
        day: "assets/freezing-rain.png",
        night: "assets/freezing-rain-night.png",
        description: "Freezing Rain: Heavy intensity"
    },
    71: {
        day: "assets/snowy.png",
        night: "assets/snow-night.png",
        description: "Snowfall: Slight intensity"
    },
    73: {
        day: "assets/snowy.png",
        night: "assets/snow-night.png",
        description: "Snowfall: Moderate intensity"
    },
    75: {
        day: "assets/snowy.png",
        night: "assets/snow-night.png",
        description: "Snowfall: Heavy intensity"
    },
    77: {
        day: "assets/snow-grains.png",
        night: "assets/snow-grain-night.png",
        description: "Snow grains"
    },
    80: {
        day: "assets/rain-shower.png",
        night: "assets/rain-shower-night.png",
        description: "Rain showers: Slight intensity"
    },
    81: {
        day: "assets/rain-shower.png",
        night: "assets/rain-shower-night.png",
        description: "Rain showers: Moderate intensity"
    },
    82: {
        day: "assets/rain-shower.png",
        night: "assets/rain-shower-night.png",
        description: "Rain showers: Violent intensity"
    },
    85: {
        day: "assets/snow-shower.png",
        night: "assets/snow-shower-night.png",
        description: "Snow showers: Slight intensity"
    },
    86: {
        day: "assets/snow-shower.png",
        night: "assets/snow-shower-night.png",
        description: "Snow showers: Heavy intensity"
    },
    95: {
        day: "assets/thunderstorm.png",
        night: "assets/thunderstorm-night.png",
        description: "Thunderstorm: Slight or moderate"
    },
    96: {
        day: "assets/thunderstorm.png",
        night: "assets/thunderstorm-night.png",
        description: "Thunderstorm with slight hail"
    },
    99: {
        day: "assets/thunderstorm.png",
        night: "assets/thunderstorm-night.png",
        description: "Thunderstorm with heavy hail"
    }
};

function getWeatherIcon(code, isDaytime) {
    const iconSet = weatherIcons[code];
    if (!iconSet) {
        return null; // Return null if code is not found
    }
    return isDaytime ? iconSet.day : iconSet.night;
}


const searchIcon = document.querySelector('.search-icon');
const closeIcon = document.querySelector('.close');
const searchInput = document.querySelector('.search-input');

document.addEventListener('DOMContentLoaded', async () => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    console.log('Last searched city from localStorage:', savedCity);

    const defaultCity = savedCity ? savedCity : "Ghent, Belgium";

    const splideElement = document.querySelector('.splide');
    console.log('City to display on load:', defaultCity); // Debugging line


    if (splideElement) {
        const splide = new Splide('.splide', {
            perPage: 8,
            focus: 0,
            omitEnd: true,
            pagination: false,
            breakpoints: {
                1000: { // For screens smaller than or equal to 768px
                    perPage: 4, // Show 4 slides per page
                },
                480: { // For screens smaller than or equal to 480px
                    perPage: 2, // Show 2 slides per page
                },
            },
        });

        splide.mount()
    } else {
        console.error("Splide element not found. Make sure the .splide element exists in your HTML.");
    }


    // Fetch and display weather and photo for the default city
    await displayWeatherForCity(defaultCity);


    // Event listener for the search button
    searchIcon.addEventListener('click', function (event) {
        event.preventDefault();
        searchToggle(this, event);
    });

    // Function to fetch and display weather and photo for a given city
    async function displayWeatherForCity(cityName) {
        // Save the searched city to localStorage


        searchInput.value = cityName;
        const currentWeather = document.querySelector('.weather-info');
        currentWeather.innerHTML = "";

        // localStorage.setItem('lastSearchedCity', cityName);

        let imageUrl = await getPhotoByCityName(cityName);
        let imgElement = document.createElement('img');
        imgElement.classList.add("random-photo", "hover-effect");
        imgElement.src = imageUrl;
        imgElement.alt = cityName;
        currentWeather.appendChild(imgElement);

        const divWidgetElement = document.createElement('div');
        divWidgetElement.classList.add("current-weather", "hover-effect");
        currentWeather.appendChild(divWidgetElement);

        const cityElement = document.createElement('h2');
        cityElement.classList.add('text-temperature-color');
        cityElement.textContent = cityName;

        const weatherData = await getCurrentWeatherData(cityName);
        if (!weatherData.error_text) {
            console.log(weatherData);

            const weatherCode = weatherData.current.weather_code;

            const currentTemperatureElement = document.createElement("h1");
            currentTemperatureElement.classList.add('text-temperature-color');
            currentTemperatureElement.textContent = `${parseInt(weatherData.current.temperature_2m)} ${weatherData.current_units.temperature_2m}`;

            const weatherStatusImageElement = document.createElement('img');
            weatherStatusImageElement.classList.add('weather-status-image');
            if (weatherData.current.is_day === 1) {
                weatherStatusImageElement.src = getWeatherIcon(weatherCode, true);
            } else if (weatherData.current.is_day === 0) {
                weatherStatusImageElement.src = getWeatherIcon(weatherCode, false);
            }
            weatherStatusImageElement.alt = `${weatherIcons[weatherCode].description} image`;

            const weatherStatusTextElement = document.createElement('p');
            weatherStatusTextElement.classList.add('weather-current-text');
            weatherStatusTextElement.textContent = weatherIcons[weatherCode].description;

            const weatherMaxMinCurrentDay = document.createElement('p');
            weatherMaxMinCurrentDay.classList.add('weather-current-text');
            weatherMaxMinCurrentDay.textContent = `H:${parseInt(weatherData.daily.temperature_2m_max[0])} ${weatherData.daily_units.temperature_2m_max}  L:${parseInt(weatherData.daily.temperature_2m_min[0])} ${weatherData.daily_units.temperature_2m_max}`;

            divWidgetElement.append(
                cityElement,
                currentTemperatureElement,
                weatherStatusImageElement,
                weatherStatusTextElement,
                weatherMaxMinCurrentDay
            );

            await drawHourlyForecast(weatherData);
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `${weatherData.error_text} Please try again to search town`;
            errorMessage.classList.add('error-message');
            divWidgetElement.append(errorMessage);
        }
    }


    // Event listener for the close button
    closeIcon.addEventListener('click', function (event) {
        event.preventDefault();
        searchToggle(this, event);
    });


    // Event listener for typing in the search input field
    searchInput.addEventListener('input', async function () {
        await fetchSuggestions(this.value);
    });

    // Function to fetch city suggestions from the Open-Meteo API
    async function fetchSuggestions(query) {
        if (query.length < 3) {
            clearSuggestions();
            return;
        }

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    displaySuggestions(data.results);
                } else {
                    clearSuggestions();
                }
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
                clearSuggestions();
            });
    }

    // Function to toggle the search bar's active state
    function searchToggle(obj, evt) {
        const container = obj.closest('.search-wrapper');

        if (!container.classList.contains('active')) {
            container.classList.add('active');
            evt.preventDefault();
        } else if (container.classList.contains('active') && !obj.closest('.input-holder')) {
            container.classList.remove('active');
            // Clear input and suggestions
            const searchInput = container.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = '';
            }
            clearSuggestions();
        }
    }

    // Function to display the list of suggestions
    function displaySuggestions(cities) {
        const suggestionsList = document.querySelector('.suggestions-list');
        suggestionsList.innerHTML = '';

        cities.forEach(city => {
            const listItem = document.createElement('li');
            listItem.textContent = `${city.name}, ${city.country}`;
            listItem.addEventListener('click', async () => {
                searchInput.value = `${city.name}, ${city.country}`;

                clearSuggestions();
            });
            suggestionsList.appendChild(listItem);


        });

        suggestionsList.style.display = 'block';
    }

    // Function to clear the suggestions list
    function clearSuggestions() {
        const suggestionsList = document.querySelector('.suggestions-list');
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';

    }


});



async function getPhotoByCityName(cityName) {
    const unsplash = createApi({
        accessKey: 'sI7FRCTFZOQzksAcIv0hosRhHCh42D_ls5wYsIGThSU',
    });

    try {
        const result = await unsplash.search.getPhotos({
            query: `${cityName}`,
            page: 1,
            orderBy: "relevant",
        });

        // Debugging: Log the entire result to see what is returned
        console.log('Unsplash API result:', result);

        const photos = result.response.results;

        if (photos && photos.length > 0) {
            // Return the first image URL if found
            return photos[0].urls.regular;
        } else {
            console.log(`No photos found for ${cityName}`);
            // Return a placeholder image if no results are found
            return 'https://via.placeholder.com/800x600.png?text=No+Image+Found';
        }
    } catch (error) {
        console.error(`Error fetching photo for ${cityName}:`, error);
        // Return a placeholder image in case of an error
        return 'https://via.placeholder.com/800x600.png?text=Error+Fetching+Image';
    }
}

async function getCurrentWeatherData (cityName) {

    const coordinates = await fetchCoordinatesAndTimeZone(cityName);
    let weatherData
    if (coordinates) {
        const { latitude, longitude, timezone } = coordinates;
        weatherData = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,relative_humidity_2m,precipitation,weather_code&hourly=temperature_2m,precipitation,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`)

        return weatherData.json();
        // Proceed with fetching weather data using latitude and longitude
    } else {
        // Handle the case where coordinates could not be fetched
        weatherData = {"error_text": "Failed to fetch coordinates."}
        console.log("Failed to fetch coordinates.");
        return weatherData;
    }

}

async function fetchCoordinatesAndTimeZone (cityName) {
    localStorage.setItem('lastSearchedCity', cityName);

    const urlReadyLocation = cityName.replace(/ /g, "+").replace(/,/g, "%2C");

    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${urlReadyLocation}&count=1&language=en&format=json`
        );
        const data = await response.json();

        // Check if the results array exists and has at least one entry
        if (data.results && data.results.length > 0) {
            const { latitude, longitude, timezone } = data.results[0];
            return { latitude, longitude, timezone };
        } else {
            console.warn(`No results found for the city: ${cityName}`);
            return null; // Return null if no results are found
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null; // Return null if there's an error
    }
}

async function drawCurrentWeatherHourlyForecast () {
    searchIcon.addEventListener('click', async function (event) {
        event.preventDefault();
        const searchWrapper = document.querySelector('.search-wrapper');

        if (searchWrapper.classList.contains('active')) {
            const currentWeather = document.querySelector('.weather-info');
            currentWeather.innerHTML = "";
            console.log(searchInput.value);
            let imageUrl = await getPhotoByCityName(searchInput.value);
            console.log(imageUrl);
            let imgElement = document.createElement('img');
            imgElement.classList.add("random-photo", "hover-effect");
            imgElement.src = imageUrl;
            imgElement.alt = searchInput.value;
            currentWeather.appendChild(imgElement);

            const divWidgetElement = document.createElement('div');
            divWidgetElement.classList.add("current-weather", "hover-effect");
            currentWeather.appendChild(divWidgetElement);

            const cityElement = document.createElement('h2');
            cityElement.classList.add('text-temperature-color');
            cityElement.textContent = searchInput.value;


            const weatherData = await getCurrentWeatherData(searchInput.value);
            if (!weatherData.error_text){
                console.log(weatherData);

                const weatherCode = weatherData.current.weather_code;

                const currentTemperatureElement = document.createElement("h1");
                currentTemperatureElement.classList.add('text-temperature-color');
                currentTemperatureElement.textContent = `${parseInt(weatherData.current.temperature_2m)} ${weatherData.current_units.temperature_2m}`;

                const weatherStatusImageElement = document.createElement('img');
                weatherStatusImageElement.classList.add('weather-status-image');
                if (weatherData.current.is_day === 1){
                    weatherStatusImageElement.src = getWeatherIcon(weatherCode, true);

                } else if (weatherData.current.is_day === 0){
                    weatherStatusImageElement.src = getWeatherIcon(weatherCode, false);
                }
                weatherStatusImageElement.alt = `${weatherIcons[weatherCode].description} image`;

                const weatherStatusTextElement = document.createElement('p');
                weatherStatusTextElement.classList.add('weather-current-text');
                weatherStatusTextElement.textContent = weatherIcons[weatherCode].description;

                const weatherMaxMinCurrentDay = document.createElement('p');
                weatherMaxMinCurrentDay.classList.add('weather-current-text');
                weatherMaxMinCurrentDay.textContent = `H:${parseInt(weatherData.daily.temperature_2m_max[0])} 
            ${weatherData.daily_units.temperature_2m_max}  L:${parseInt(weatherData.daily.temperature_2m_min[0])} ${weatherData.daily_units.temperature_2m_max}`;


                console.log(weatherCode);
                divWidgetElement.append(
                    cityElement,
                    currentTemperatureElement,
                    weatherStatusImageElement,
                    weatherStatusTextElement,
                    weatherMaxMinCurrentDay
                );

                await drawHourlyForecast(weatherData);
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = `${weatherData.error_text} Please try again to search town`;
                errorMessage.classList.add('error-message');
                divWidgetElement.append(errorMessage);
            }
        }
    })
}


async function drawHourlyForecast (weatherData) {
    const hourlyForecastElement = document.querySelector(".hourly-info-forecast");
    const splideElement = document.querySelector(".splide");

    hourlyForecastElement.style.opacity = "1";

    const hourlyTitleElement = document.querySelector(".title-hourly-forecast");
    hourlyTitleElement.innerHTML = "";

    const titleHourlyForecastElement = document.createElement("p");
    titleHourlyForecastElement.textContent = "Hourly Forecast"

    const hourlyForecastIconElement = document.createElement("img");
    hourlyForecastIconElement.classList.add("hourly-icon");
    hourlyForecastIconElement.src = "assets/clock.png";
    hourlyForecastIconElement.alt = "Hourly Forecast";
    hourlyTitleElement.append(hourlyForecastIconElement, titleHourlyForecastElement);

    const hourlyForeCastMainContent = document.querySelector(".hourly-forecast-main-content");

    await drawHourlyForecastMainContent(weatherData, hourlyForeCastMainContent);

    // Re-mount Splide to recognize new slides
    if (splideElement) {
        const splide = new Splide('.splide', {
            perPage: 8,
            focus: 0,
            omitEnd: true,
            pagination: false,
            breakpoints: {
                1000: { // For screens smaller than or equal to 1000px
                    perPage: 4, // Show 4 slides per page
                },
                480: { // For screens smaller than or equal to 480px
                    perPage: 2, // Show 2 slides per page
                },
            },
        });

        splide.mount() // Mount again after slides are added
    }

}


async function drawHourlyForecastMainContent (weatherData, hourlyForeCastMainContent) {
    const hourlyForecastElement = document.querySelector(".splide__list");

    hourlyForecastElement.innerHTML = "";

    hourlyForecastElement.style.opacity = "1";

    const timeArray = weatherData.hourly.time;
    const currentDate = DateTime.now().setZone(weatherData.timezone);

    let count = 0;

    for (let i = 0; i < timeArray.length; i++) {
        console.log(timeArray.length);
        if (count === 26){
            break;
        }
        let responseDate = DateTime.fromISO(timeArray[i]).setZone(weatherData.timezone);
        const currentDayIndex = responseDate.day - currentDate.day;

        const sunriseTime = DateTime.fromISO(weatherData.daily.sunrise[currentDayIndex]);
        const sunsetTime = DateTime.fromISO(weatherData.daily.sunset[currentDayIndex]);

        if ((currentDate.hasSame(responseDate, 'hour') && currentDate.hasSame(responseDate, 'day'))) {

            const hourElement = document.createElement("div");
            hourElement.classList.add("cart-hour-weather", "splide__slide");
            const timeElement = document.createElement("p");
            timeElement.textContent = "Now";

            const weatherCodeNowHourElement = drawIconHourlyForecast(weatherData,i);
            const temperatureHourElement = document.createElement("p");
            temperatureHourElement.textContent = `${parseInt(weatherData.hourly.temperature_2m[i])} ${weatherData.current_units.temperature_2m}`;

            hourElement.append(timeElement, weatherCodeNowHourElement, temperatureHourElement);

            hourlyForeCastMainContent.append(hourElement);
            count++;
            if (currentDate.hasSame(sunriseTime, "day") && currentDate.hasSame(sunriseTime, 'hour')) {
                const sunriseElement = createSunriseSunsetElement("Sunrise", sunriseTime);
                hourlyForeCastMainContent.append(sunriseElement);
                count++;
            }
            if (currentDate.hasSame(sunsetTime, "day") && currentDate.hasSame(sunsetTime, 'hour')) {
                const sunsetElement = createSunriseSunsetElement("Sunset", sunsetTime);
                hourlyForeCastMainContent.append(sunsetElement);
                count++;
            }
        }
        else if (responseDate > currentDate) {
            const hourElement = document.createElement("div");
            hourElement.classList.add("cart-hour-weather", "splide__slide");
            const timeElement = document.createElement("p");
            timeElement.textContent = `${String(responseDate.hour).padStart(2, '0')}`;

            const weatherCodeHourElement = drawIconHourlyForecast(weatherData, i);

            const temperatureHourElement = document.createElement("p");
            temperatureHourElement.textContent = `${parseInt(weatherData.hourly.temperature_2m[i])} ${weatherData.current_units.temperature_2m}`;

            hourElement.append(timeElement, weatherCodeHourElement, temperatureHourElement);

            hourlyForeCastMainContent.append(hourElement);
            count++;
            if (responseDate.hasSame(sunriseTime, "day") && responseDate.hasSame(sunriseTime, 'hour')) {
                const sunriseElement = createSunriseSunsetElement("Sunrise", sunriseTime);
                hourlyForeCastMainContent.append(sunriseElement);
                count++;
            }
            if (responseDate.hasSame(sunsetTime, "day")  && responseDate.hasSame(sunsetTime, 'hour')) {
                const sunsetElement = createSunriseSunsetElement("Sunset", sunsetTime);
                hourlyForeCastMainContent.append(sunsetElement);
                count++;
            }
        }

    }

}


function createSunriseSunsetElement(type, time) {
    const element = document.createElement("div");
    element.classList.add("cart-hour-weather", "sunrise-sunset", "splide__slide");

    const timeElement = document.createElement("p");
    // timeElement.textContent = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
    timeElement.textContent = `${time.toFormat('HH:mm')}`;

    const iconSunRiseSunSetElement = document.createElement("img");
    iconSunRiseSunSetElement.classList.add("hourly-icon-cart");
    if (type === "Sunrise"){
        iconSunRiseSunSetElement.src = "assets/sunrise.png"
    } else if (type === "Sunset") {
        iconSunRiseSunSetElement.src = "assets/sunset.png"
    }
    iconSunRiseSunSetElement.alt = `${type} icon`;

    const sunsetSunriseElement = document.createElement("p");
    sunsetSunriseElement.textContent = `${type}`;
    element.append(timeElement, iconSunRiseSunSetElement, sunsetSunriseElement);

    return element;
}


function drawIconHourlyForecast (weatherData,index) {

    const weatherCodeHourElement = document.createElement("img");
    weatherCodeHourElement.classList.add("hourly-icon-cart");

    if (weatherData.hourly.is_day[index] === 1){
        weatherCodeHourElement.src = getWeatherIcon(weatherData.hourly.weather_code[index], true);
    }
    if (weatherData.hourly.is_day[index] === 0) {
        weatherCodeHourElement.src = getWeatherIcon(weatherData.hourly.weather_code[index], false);
    }
    weatherCodeHourElement.alt = weatherIcons[weatherData.hourly.weather_code[index]].description;

    return weatherCodeHourElement;
}

await drawCurrentWeatherHourlyForecast();
