import React, { useEffect, useState } from 'react'
import { useParams , useSearchParams } from 'react-router-dom'
import SevenDay from './SevenDay';

const Search = () => {
  const [searchLocation] = useSearchParams();
  const locationSearched = searchLocation.get('location');
  
  const [weather, setWeather] = useState({});
  
    function getWeather() {
        //API call to get weather data of the four countries
        fetch(`http://localhost:5000/hourlyCurrent?location=${locationSearched}`)
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

    const [sevenDayWeather, setSevenDayWeather] = useState({})

    function getSevenDays() {
      fetch(`http://localhost:5000/sevenDay?location=${locationSearched}`)
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
      console.log(sevenDayWeather)
    }, [sevenDayWeather]);

  return (
    <div>
      {weather && weather.daily && sevenDayWeather && sevenDayWeather.daily && 
      <div>
        <div className="text-7xl m-4 p-2">
          <div className="flex gap-10 my-5 p-2 w-fit border-x-4 border-y-2 text-sky-500 rounded-lg border-teal-100">
            {weather.location_name}{weatherImage(weather)}
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
        <div className="flex ">

        </div>
      </div>
      }
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


export default Search