import React, { useEffect, useState } from 'react'

const Weather = ({name}) => {

    const [weather, setWeather] = useState({});

    function getWeather() {
        //API call to get weather data of the four countries
        fetch(`http://familiar-mariam-pizzko-8d766642.koyeb.app/hourlyCurrent?location=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            setWeather(data);
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        })
    }
    useEffect(() => {
        getWeather();
    }, []); // if variables in brackets get changed, the function in useEffect is ran /// if empty brackets, useEffect is ran when the page gets rendered

    return (
        <div>
            <div className="flex text-4xl border-4 border-teal-100 p-2 px-4 gap-2">
                <div>
                    {name}
                </div>
                {weather && weather.daily &&
                <div className="flex ">
                    <div>
                        {Math.round(weather.daily.temperature_2m_min[0])}{weather.daily_units.temperature_2m_min}/{Math.round(weather.daily.temperature_2m_max[0])}{weather.daily_units.temperature_2m_max}
                    </div>
                    {weatherImage(weather)}
                </div>
                }
            </div>
        </div>
    )
}

function weatherImage(weather) {
    let weatherCode = weather.current.weather_code
    if(weatherCode == 0) {
        return(
            <div>☀️</div>
        )
    }
    if(weatherCode > 0 && weatherCode <= 3) {
        return (
            <div>☁️</div>
        )
    }
    if(weatherCode >= 45 && weatherCode <= 48) {
        return (
            <div>🌁</div>
        )
    }
    if((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 99)) {
        return (
            <div>🌧️</div>
        )
    }
    if(weatherCode >= 71 && weatherCode <= 77) {
        return (
            <div>🌨️</div>
        )
    }
    if(weatherCode >= 95 && weatherCode <= 99) {
        return(
            <div>⛈️</div>
        )
    }
}

export default Weather