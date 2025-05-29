import axios from "axios";
import { useState } from "react";
import './App.css';
import validname from "./validation/validname";
import logo from './image/logo.png'; // Add your logo in `src` and import it

function App() {
  const apiKey = "bb65dcbb6b3878b245f091216b0c41da";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState('');

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    axios.get(apiURL).then((res) => {
      setData(res.data);
      setForecast("5 Day Forecast");
      setError('');
    }).catch((err) => {
      if (err.response?.status === 404) {
        setError("Invalid City Name");
        setForecast("");
      }
    });
  };

  const handleSearch = () => {
    if (!inputCity.trim()) {
      setError('');
      return;
    }
    getWeatherDetails(inputCity);
  };

  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString();
console.log(data);

  return (
    <>
      <div className="container py-4">
        {/* Logo and Heading */}
        <div className="d-flex flex-column align-items-center justify-content-center text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-2"
            style={{ width: 200, maxWidth: '100%' }}
          />
          <h1 className="text-primary fs-2">Globeweather App</h1>
        </div>

        {/* Search Section */}
        <div className="d-flex flex-column align-items-center justify-content-center text-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the City Name"
              value={inputCity}
              onChange={(e) => {
                setInputCity(e.target.value);
                if (e.target.value.trim() === '') {
                  setError('');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              onKeyUp={validname}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Weather Info */}
        {Object.keys(data).length > 0 && (
         <div className="row justify-content-center">
  {/* Current Weather Card */}
  <div className="col-lg-4 mb-4">
   
    <div className="card shadow">
      <div className="card-body text-center">
        <img
          src={`https://openweathermap.org/img/wn/${data.list[0]?.weather[0].icon}@2x.png`}
          alt="weather"
          style={{ width: 100 }}
        />
        <h4 className="mt-3">{data.city?.name}</h4>
        <p>{currentDate}</p>
        <h3>{((data.list[0]?.main?.temp) - 273.15).toFixed(1)}°C</h3>
        <p>{currentTime}</p>
        <p>Visibility: {data.list[0]?.visibility} m</p>
        <p>Min: {((data.list[0]?.main?.temp_min) - 273.15).toFixed(1)}°C</p>
        <p>Max: {((data.list[0]?.main?.temp_max) - 273.15).toFixed(1)}°C</p>
        <p>Pressure: {data.list[0]?.main?.pressure} Pa</p>
        <p>Humidity: {data.list[0]?.main?.humidity}%</p>
        <p>Wind: {data.list[0]?.wind?.speed} km/hr</p>
      </div>
    </div>
  </div>

  {/* Forecast Table */}
  <div className="col-lg-8 mb-4">
    <h3 className="text-primary mb-4">Upcoming Forecast</h3>
    <div className="table-responsive">
     <table className="table table-bordered table-secondary text-center" style={{ borderRadius: "10px", overflow: "hidden" }}>

        <thead className="table-dark">
          <tr>
            <th>Date & Time</th>
            <th>Icon</th>
            <th>Temperature (°C)</th>
            <th>Weather</th>
            <th>Humidity (%)</th>
            <th>Wind (km/hr)</th>
          </tr>
        </thead>
        <tbody>
          {data.list.slice(0, 10).map((item, idx) => (
            <tr key={idx}>
              <td>{new Date(item.dt_txt).toLocaleString()}</td>
              <td>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  style={{ width: 40 }}
                />
              </td>
              <td>{(item.main.temp - 273.15).toFixed(1)}</td>
              <td>{item.weather[0].main}</td>
              <td>{item.main.humidity}</td>
              <td>{item.wind.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

        )}

        {Object.keys(data).length > 0 && (
          <div className="row justify-content-center">
            
    {forecast && <h3 className="text-primary mb-4 text-center">{forecast}</h3>}
            {[12, 20, 28, 36, 39].map((index) => {
              const weather = data.list[index]?.weather[0]?.main;


              let bgColor = '';
              switch (weather) {
                case 'Clear':
                  bgColor = '#2596be'; // sunny yellow
                  break;
                case 'Rain':
                  bgColor = '#c084f'; // blueish
                  break;
                case 'Clouds':
                  bgColor = '#2596be'; // grey
                  break;
                case 'Snow':
                  bgColor = '#f0f8ff'; // icy blue
                  break;
                case 'Thunderstorm':
                  bgColor = '#c084fc'; // purple
                  break;
                default:
                  bgColor = '#e0e0e0'; // default grey
              }

              return (
                
                <div className="col-md-12 col-lg-2 mb-4" key={index}>
                  
                  <div
                    className="card h-100 text-center p-2 shadow-sm"
                    style={{ backgroundColor: bgColor }}
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${data.list[index]?.weather[0]?.icon}@2x.png`}
                      alt={data.list[index]?.weather[0]?.description}
                      style={{ width: 60, margin: "0 auto" }}
                    />
                    <p className="mt-2">
                      {new Date(data.list[index]?.dt_txt).toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p>Temp: {((data.list[index]?.main?.temp) - 273.15).toFixed(1)}°C</p>
                    <p>Visibility: {data.list[index]?.visibility} m</p>
                    <p>Wind: {data.list[index]?.wind?.speed} km/hr</p>
                    <p>Humidity: {data.list[index]?.main?.humidity}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer bg-gradient text-white py-4 mt-5">
        <div className="container text-center">
          <div className="mb-3">
            <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-5">
              <i className="bi bi-cloud-sun"></i> OpenWeather
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-5">
              <i className="bi bi-github"></i> GitHub
            </a>
            <a href="mailto:contact@example.com" className="text-white fs-5">
              <i className="bi bi-envelope-fill"></i> Contact
            </a>
          </div>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} <strong>GlobeWeather</strong> 🌍 | Crafted with ❤️ using React
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
