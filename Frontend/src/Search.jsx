import React, { useEffect, useState } from 'react'
import { useParams , useSearchParams } from 'react-router-dom'
import SevenDay from './SevenDay';

const Search = () => {
  const [searchLocation] = useSearchParams();
  const locationSearched = searchLocation.get('location');
  
  const [weather, setWeather] = useState({});
  
    function getWeather() {
        //API call to get weather data of the four countries
        fetch(`http://familiar-mariam-pizzko-8d766642.koyeb.app/hourlyCurrent?location=${locationSearched}`)
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
    }, [locationSearched]); // if variables in brackets get changed, the function in useEffect is ran /// if empty brackets, useEffect is ran when the page gets rendered

    const [sevenDayWeather, setSevenDayWeather] = useState({})

    function getSevenDays() {
      fetch(`http://familiar-mariam-pizzko-8d766642.koyeb.app/sevenDay?location=${locationSearched}`)
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
      })
      .then(data => {
        setSevenDayWeather(data);
      })
      .catch(error => {
          console.error("Error fetching the data:", error);
      })
    }

    useEffect(() => {
      getSevenDays();
    }, [locationSearched]);

    const [temperatureArr, setTemperatureArr] = useState(0);
    const [startingTime, setStartingTime] = useState(0);

    function loadHours(weather) {
      if(weather && weather.hourly) {
        let number = parseInt(getHours(weather), 10);
        let tempArr = weather.hourly.temperature_2m.slice(number, number + 18);
        return tempArr;
      }
    }

    useEffect(() => {
      if(weather && weather.hourly) {
        setTemperatureArr(loadHours(weather));
        setStartingTime(getHours(weather));
      }
    }, [weather])

    function convertToStandardTime(starting, index) {
      console.log(starting + "-" + index)
      let milHour = parseInt(starting, 10) + parseInt(index, 10);
      let period = "PM"
      if(Math.floor(milHour / 12) == 0 || Math.floor((milHour / 12)) % 2 == 0) {
        period = "AM"
      }
       // Determines AM or PM
      const standardTime = milHour % 12 || 12;
      if(index == 0) {
        return "Now"
      }
      return `${standardTime} ${period}`
    }



  return (
    <div>
      {weather && weather.daily && sevenDayWeather && sevenDayWeather.daily && 
      <div>
        <div className="text-7xl m-4 p-2">
          <div className="flex gap-4 my-5 p-2 w-fit border-x-4 border-y-2 text-sky-500 rounded-lg border-teal-100">
            {weather.location_name}{hourlyWeatherImage(weather, 24-temperatureArr.length, 24-temperatureArr.length)}
          </div>
          <div className=' p-2 my-4 underline decoration-cyan-100 underline-offset-8'>
            {Math.round(weather.current.temperature_2m)}{weather.daily_units.temperature_2m_min}
          </div>
        </div>
        <div className="flex w-full justify-around my-10">
          <SevenDay name={sevenDayWeather.daily.time[0]} sDayWeather={sevenDayWeather} number={0} />
          <SevenDay name={sevenDayWeather.daily.time[1]} sDayWeather={sevenDayWeather} number={1} />
          <SevenDay name={sevenDayWeather.daily.time[2]} sDayWeather={sevenDayWeather} number={2} />
          <SevenDay name={sevenDayWeather.daily.time[3]} sDayWeather={sevenDayWeather} number={3} />
          <SevenDay name={sevenDayWeather.daily.time[4]} sDayWeather={sevenDayWeather} number={4} />
          <SevenDay name={sevenDayWeather.daily.time[5]} sDayWeather={sevenDayWeather} number={5} />
          <SevenDay name={sevenDayWeather.daily.time[6]} sDayWeather={sevenDayWeather} number={6} />
        </div>
        <div className='flex text-6xl m-6'>Hourly Forecast</div>
        <div className="flex flex-col border-x-8 border-y-4 gap-4 p-2 mx-20 text-3xl border-sky-100">
          {temperatureArr &&
          temperatureArr.map((temp, hour) => (
            <div className="flex border-2 justify-between border-sky-100 px-4 py-2">
              <div>{convertToStandardTime(startingTime,hour)}</div> <div>{hourlyWeatherImage(weather, parseInt(startingTime,10) + parseInt(hour, 10), (parseInt(startingTime,10) + hour) % 24)}</div> <div className='flex'>{weather.hourly.precipitation_probability[24-temperatureArr.length + hour]}%<div className="flex flex-col text-xl justify-center">💧</div></div> <div>{Math.floor(temp)}{weather.daily_units.temperature_2m_min}</div>
            </div>
          ))}
        </div>
      </div>
      }
    </div>
  )
}

function hourlyWeatherImage(weather, index, milHour) {
  if(weather && weather.hourly && weather.daily) {
    let weatherCode = weather.hourly.weather_code[index];
    console.log(index)
    let sunriseHour = weather.daily.sunrise[0].substring(11, 13);
    let sunsetHour = weather.daily.sunset[0].substring(11, 13);
    if(index / 24 >= 1) {
      sunriseHour = weather.daily.sunrise[1].substring(11, 13);
      sunsetHour = weather.daily.sunset[1].substring(11, 13);
    }
    if(milHour < sunriseHour || milHour > sunsetHour) {
      return(
        <div>🌙</div>
      )
    }
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
}

function getHours(weather) {
  if(weather && weather.current) {
  let time = weather.current.time.substring(11,13);
  return time;
  }
}

export default Search