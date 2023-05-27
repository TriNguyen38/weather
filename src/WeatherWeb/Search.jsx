import React from "react";
import { useState } from "react";


// List Icon
// [
//     {
//       type: "Clear",
//       img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
//     },
//     {
//       type: "Rain",
//       img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
//     },
//     {
//       type: "Snow",
//       img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
//     },
//     {
//       type: "Clouds",
//       img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
//     },
//     {
//       type: "Haze",
//       img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
//     },
//     {
//       type: "Smoke",
//       img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
//     },
//     {
//       type: "Mist",
//       img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
//     },
//     {
//       type: "Drizzle",
//       img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
//     },
//   ]

function Search() {
  const [error, setError] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState({
    celcius: "",
    country: "Your Country",
    icon: "logo.png",
    humidityPercent: "",
    windSpeed: "",
  });

  const handleClick = () => {
    if (country !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=51c3f89fd4282530a411e1498495cc58&&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          let imgWeather = "";
          if (data.weather[0].main === "Clear") {
            imgWeather = "Clears.png";
          } else if (data.weather[0].main === "Clouds") {
            imgWeather = "clound.png";
          } else if (data.weather[0].main === "Drizzle") {
            imgWeather = "drizzle.png";
          } else if (data.weather[0].main === "Haze") {
            imgWeather = "haze.png";
          } else if (data.weather[0].main === "Mist") {
            imgWeather = "mist.png";
          } else if (data.weather[0].main === "Rain" || "Thunderstorm") {
            imgWeather = "rain.png";
          } else if (data.weather[0].main === "Smoke") {
            imgWeather = "smoke.png";
          } else if (data.weather[0].main === "Snow") {
            imgWeather = "snow.png";
          } else {
            imgWeather = "logo.png";
          }
          setWeatherData({
            ...data,
            celcius: data.main.temp,
            country: data.name,
            icon: imgWeather,
            humidityPercent: data.main.humidity,
            windSpeed: data.wind.speed,
          });
          setError("");

          console.log(data);
        })

        .catch((err) => {
          if (country !== country.name) {
            setError("Wrong City");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="container-box">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="your country...?"
            onChange={(e) => setCountry(e.target.value)}
          />
          <button onClick={handleClick}><img src="loupe.png" alt="" /></button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>

        <div className="weatherInfo">
          <h1>{weatherData.country}</h1>
          <img className="icon" src={weatherData.icon} alt="" />
          <h2>{Math.round(weatherData.celcius)}°C</h2>


        
        </div>
        <div className="another">
            <div className="left">
              <div className = "humidityIcon">
            <img src="humidity.png" alt="" />
            </div>
            <div className="humidityInfo">
              <p>Humidity</p>
              <p>{weatherData.humidityPercent}%</p>
              </div>
            </div>
            <div className="right">
              <div className="windIcon">
            <img src="wind.png" alt="" />
            </div>
            <div className="windInfo">
              <p>Wind</p>
              <p>{weatherData.windSpeed}km/h</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Search;
