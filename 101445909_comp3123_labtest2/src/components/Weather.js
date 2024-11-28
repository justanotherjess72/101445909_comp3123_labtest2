import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import '../styles/Weather.css';

export default function Weather() {
    const [currentWeather, setCurrentWeather] = useState(null) 
    const [forecast, setForecast] = useState(null)  
    const [city, setCity] = useState("Kingston")
    const [error, setError] = useState("")  
    const [searchTerm, setSearchTerm] = useState("") 

    const API_KEY = "5bc651908c8e7c8e54c17e9b2732c7d7"
    const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

    useEffect(() => {
        // Fetch current weather data and forecast when city or state changes
        const fetchData = async () => {
            try {
                const weatherResponse = await fetch(CURRENT_WEATHER_URL)
                const weatherData = await weatherResponse.json()

                if (weatherResponse.ok) {
                    setCurrentWeather(weatherData) 
                } else {
                    setError("Error fetching weather data")
                }

                const forecastResponse = await fetch(FORECAST_URL)
                const forecastData = await forecastResponse.json()

                if (forecastResponse.ok) {
                    setForecast(forecastData) 
                } else {
                    setError("Error fetching forecast data")
                }

            } catch (error) {
                setError(error.message) 
            }
        }

        fetchData()
    }, [city])  

    // Handle the search input and trigger city change
    const handleSearch = () => {
        if (searchTerm.trim()) {
            setCity(searchTerm)  // Update city state
            setSearchTerm("") // Reset the search bar
        }
    }

    if (error) {
        return (
            <Container>
                <h1>Error: {error}</h1>
            </Container>
        )
    }

    if (!currentWeather) {
        return (
            <Container>
                <h1>Loading...</h1>
            </Container>
        )
    }

    return (
        <Container className={["weatherApp", currentWeather.main.temp <= 0 ? "cold-weather" : "hot-weather"]}>
            {/* Search Bar */}
            <Row className="mt-3 text-center">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Enter city name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <Button variant="primary" onClick={handleSearch} className="mt-2">
                        Search
                    </Button>
                </Col>
            </Row>

            {/* Current Weather */}
            <Row className="mt-3 text-center">
                <h3>{city} - {currentWeather.sys.country}</h3>
                <Col>
                    <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt={currentWeather.weather[0].main} />
                    <h1>{currentWeather.main.temp} °C</h1>
                    <h2>{currentWeather.weather[0].main}</h2>
                    <h3>{currentWeather.weather[0].description}</h3>
                </Col>
            </Row>
            <Row className="mt-3 text-center">
                <Col>
                    <h4>Wind:</h4>
                    <p>Speed: {currentWeather.wind.speed} km/h</p>
                    <p>Deg: {currentWeather.wind.deg} °</p>
                </Col>
                <Col>
                    <h4>Clouds:</h4>
                    <p>All: {currentWeather.clouds.all}</p>
                </Col>
            </Row>

            {/* Display forecast if it's available */}
            {forecast && (
                <Row className="mt-3">
                    <Col>
                        <h4>Forecast:</h4>
                        <ul>
                            {forecast.list.slice(0, 5).map((day, index) => (
                                <li key={index}>
                                    {new Date(day.dt * 1000).toLocaleDateString()} - {day.main.temp} °C
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            )}
        </Container>
    )
}
