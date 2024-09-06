const weatherIcons = {
    0: {
        day: "assets/weather-code-icons/day/sun.png",
        night: "assets/weather-code-icons/night/clear-sky-night.png",
        description: "Clear sky"
    },
    1: {
        day: "assets/weather-code-icons/day/overcast.png",
        night: "assets/weather-code-icons/night/overcast-night.png",
        description: "Mainly clear"
    },
    2: {
        day: "assets/weather-code-icons/day/overcast.png",
        night: "assets/weather-code-icons/night/overcast-night.png",
        description: "Partly cloudy"
    },
    3: {
        day: "assets/weather-code-icons/day/overcast.png",
        night: "assets/weather-code-icons/night/overcast-night.png",
        description: "Overcast"
    },
    45: {
        day: "assets/weather-code-icons/day/fog.png",
        night: "assets/weather-code-icons/night/fog-night.png",
        description: "Fog"
    },
    48: {
        day: "assets/weather-code-icons/day/fog.png",
        night: "assets/weather-code-icons/night/fog-night.png",
        description: "Depositing rime fog"
    },
    51: {
        day: "assets/weather-code-icons/day/drizzle.png",
        night: "assets/weather-code-icons/night/drizzle-night.png",
        description: "Drizzle: Light intensity"
    },
    53: {
        day: "assets/weather-code-icons/day/drizzle.png",
        night: "assets/weather-code-icons/night/drizzle-night.png",
        description: "Drizzle: Moderate intensity"
    },
    55: {
        day: "assets/weather-code-icons/day/drizzle.png",
        night: "assets/weather-code-icons/night/drizzle-night.png",
        description: "Drizzle: Dense intensity"
    },
    56: {
        day: "assets/weather-code-icons/day/cloud.png",
        night: "assets/weather-code-icons/night/cloud-night.png",
        description: "Freezing Drizzle: Light intensity"
    },
    57: {
        day: "assets/weather-code-icons/day/cloud.png",
        night: "assets/weather-code-icons/night/cloud-night.png",
        description: "Freezing Drizzle: Dense intensity"
    },
    61: {
        day: "assets/weather-code-icons/day/raining.png",
        night: "assets/weather-code-icons/night/rainy-night.png",
        description: "Rain: Slight intensity"
    },
    63: {
        day: "assets/weather-code-icons/day/raining.png",
        night: "assets/weather-code-icons/night/rainy-night.png",
        description: "Rain: Moderate intensity"
    },
    65: {
        day: "assets/weather-code-icons/day/raining.png",
        night: "assets/weather-code-icons/night/rainy-night.png",
        description: "Rain: Heavy intensity"
    },
    66: {
        day: "assets/weather-code-icons/day/freezing-rain.png",
        night: "assets/weather-code-icons/night/freezing-rain-night.png",
        description: "Freezing Rain: Light intensity"
    },
    67: {
        day: "assets/weather-code-icons/day/freezing-rain.png",
        night: "assets/weather-code-icons/night/freezing-rain-night.png",
        description: "Freezing Rain: Heavy intensity"
    },
    71: {
        day: "assets/weather-code-icons/day/snowy.png",
        night: "assets/weather-code-icons/night/snow-night.png",
        description: "Snowfall: Slight intensity"
    },
    73: {
        day: "assets/weather-code-icons/day/snowy.png",
        night: "assets/weather-code-icons/night/snow-night.png",
        description: "Snowfall: Moderate intensity"
    },
    75: {
        day: "assets/weather-code-icons/day/snowy.png",
        night: "assets/weather-code-icons/night/snow-night.png",
        description: "Snowfall: Heavy intensity"
    },
    77: {
        day: "assets/weather-code-icons/day/snow-grains.png",
        night: "assets/weather-code-icons/night/snow-grain-night.png",
        description: "Snow grains"
    },
    80: {
        day: "assets/weather-code-icons/day/rain-shower.png",
        night: "assets/weather-code-icons/night/rain-shower-night.png",
        description: "Rain showers: Slight intensity"
    },
    81: {
        day: "assets/weather-code-icons/day/rain-shower.png",
        night: "assets/weather-code-icons/night/rain-shower-night.png",
        description: "Rain showers: Moderate intensity"
    },
    82: {
        day: "assets/weather-code-icons/day/rain-shower.png",
        night: "assets/weather-code-icons/night/rain-shower-night.png",
        description: "Rain showers: Violent intensity"
    },
    85: {
        day: "assets/weather-code-icons/day/snow-shower.png",
        night: "assets/weather-code-icons/night/snow-shower-night.png",
        description: "Snow showers: Slight intensity"
    },
    86: {
        day: "assets/weather-code-icons/day/snow-shower.png",
        night: "assets/weather-code-icons/night/snow-shower-night.png",
        description: "Snow showers: Heavy intensity"
    },
    95: {
        day: "assets/weather-code-icons/day/thunderstorm.png",
        night: "assets/weather-code-icons/night/thunderstorm-night.png",
        description: "Thunderstorm: Slight or moderate"
    },
    96: {
        day: "assets/weather-code-icons/day/thunderstorm.png",
        night: "assets/weather-code-icons/night/thunderstorm-night.png",
        description: "Thunderstorm with slight hail"
    },
    99: {
        day: "assets/weather-code-icons/day/thunderstorm.png",
        night: "assets/weather-code-icons/night/thunderstorm-night.png",
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

export {weatherIcons, getWeatherIcon};