import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../styles/Weather.css';

export default function Weather() {
    const [currentWeather, setCurrentWeather] = useState(null); 
    const [forecast, setForecast] = useState(null); 
    const [searchInput, setSearchInput] = useState(""); 
    const [city, setCity] = useState("Toronto"); 
    const [error, setError] = useState(""); 

    const API_KEY = "5bc651908c8e7c8e54c17e9b2732c7d7";
    const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    useEffect(() => {
    
        const fetchData = async () => {
            try {
                // Fetch current weather
                const weatherResponse = await fetch(CURRENT_WEATHER_URL);
                const weatherData = await weatherResponse.json();

                if (weatherResponse.ok) {
                    setCurrentWeather(weatherData); // Set current weather
                } else {
                    setError("Error fetching weather data");
                }

                // Fetch forecast data
                const forecastResponse = await fetch(FORECAST_URL);
                const forecastData = await forecastResponse.json();

                if (forecastResponse.ok) {
                    setForecast(forecastData); // Set forecast data
                } else {
                    setError("Error fetching forecast data");
                }

            } catch (error) {
                setError(error.message); // Catch any errors in fetching
            }
        };

        fetchData();
    }, [city]); // Re-run whenever the city changes

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value); 
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevents default form submission
        if (searchInput.trim()) {
            setCity(searchInput); // Only update city when the button is clicked
            setError(""); // Clear previous error if any
        } else {
            setError("Please enter a valid city name.");
        }
    };

    if (error) {
        return (
            <Container>
                <h1>Error: {error}</h1>
            </Container>
        );
    }

    if (!currentWeather) {
        return (
            <Container>
                <h1>Loading...</h1>
            </Container>
        );
    }

    return (
        <Container className="weather-container">
            <Row className="mt-3 text-center">
                <h3>{city} - {currentWeather.sys.country}</h3>

                <form onSubmit={handleSearchSubmit} className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={searchInput} 
                        onChange={handleSearchChange} 
                    />
                    <button type="submit">Search</button>
                </form>
            </Row>

            <Row className="mt-3 text-center">
                <Col>
                    <img
                        src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                        alt={currentWeather.weather[0].main}
                    />
                    <h1>{currentWeather.main.temp} °C</h1>
                    <h2>{currentWeather.weather[0].main}</h2>
                    <h3>{currentWeather.weather[0].description}</h3>
                </Col>

                <Col>
                    <h4>Wind:</h4>
                    <p>Speed: {currentWeather.wind.speed} km/h</p>
                    <p>Deg: {currentWeather.wind.deg} °</p>

                    <h4>Clouds:</h4>
                    <p>All: {currentWeather.clouds.all}</p>
                </Col>
            </Row>

         
            {forecast && (
                <Row className="mt-3">
                    <Col>
                        <h4>7-Day Forecast:</h4>
                        <div className="forecast">
                            {forecast.list.slice(0, 7).map((day, index) => (
                                <div className="forecast-item" key={index}>
                                    <h5>{new Date(day.dt * 1000).toLocaleDateString()}</h5>
                                    <p>{day.main.temp} °C</p>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                        alt={day.weather[0].description}
                                    />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
