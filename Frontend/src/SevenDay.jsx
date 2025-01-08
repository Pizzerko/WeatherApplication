import React from 'react'

const SevenDay = ({name, sDayWeather, number}) => {

    return (
    <div className="flex-col border-4 border-teal-100 p-2 px-4 gap-2">
            <div className="flex justify-center underline underline-offset-1 text-4xl">
                {name.substring(5)}
            </div>
            <div className="flex justify-center text-6xl">
                {weatherImage(sDayWeather, number)}
            </div>
            <div className="text-4xl ">
                {Math.round(sDayWeather.daily.temperature_2m_min[number])}{sDayWeather.daily_units.temperature_2m_min}/{Math.round(sDayWeather.daily.temperature_2m_max[number])}{sDayWeather.daily_units.temperature_2m_min}
            </div>       
    </div>
  )
}

function weatherImage(weather, num) {
    let weatherCode = weather.daily.weather_code[num]
    if(weatherCode == 0) {
        return(
            <div>☀️</div>
        )
    }
    if(weatherCode >= 45 && weatherCode <= 48) {
        return (
            <div>🌁</div>
        )
    }
    if(weatherCode > 0 && weatherCode <= 3) {
        return (
            <div>☁️</div>
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

export default SevenDay