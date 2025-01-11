import express from "express";
import cors from "cors";


const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})

app.get("/hourlyCurrent", (req, res) => {
    const location = req.query.location;
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    fetch(geoURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
    })
    .then(data => {
        const latitude = data.results[0].latitude
        const longitude = data.results[0].longitude
        const name = data.results[0].name
        const hourlyCurrentUrl  = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=3`;
        fetch(hourlyCurrentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data = {...data, location_name: name}
            console.log("Weather Data:", data);
            res.send(data);
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        })
    })
})

app.get("/sevenDay", (req, res) => {

    const location = req.query.location;
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    fetch(geoURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
    })
    .then(data => {
        const latitude = data.results[0].latitude
        const longitude = data.results[0].longitude
        const SevenDayUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`;
        fetch(SevenDayUrl)
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
        })
        .then(data => {
            console.log("Weather Data:", data);
            res.send(data);
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        });
    })
});