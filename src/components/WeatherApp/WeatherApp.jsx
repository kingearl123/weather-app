import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        wind: '',
        temperature: '',
        location: '',
    });

    const apikey = "fa6b2a99f183075c192489400ac540cd";

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(2);
    };

    const search = async () => {
        const element = document.querySelector('.CityInput');
        if (element.value === "") {
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&appid=${apikey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: kelvinToCelsius(data.main.temp),
                location: data.name,
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className='CityInput' placeholder='' />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={cloud_icon} alt="" />
            </div>
            <div className="weather-temp">
                {weatherData.temperature} °C
            </div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">{weatherData.wind} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
