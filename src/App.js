


import axios from "axios";
import {useState } from "react";
import './App.css';
import validname from "./validation/validname";


function App() {


  const apiKey = "bb65dcbb6b3878b245f091216b0c41da"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})
  const [error,seterror]=useState('');
  const[ forcast,setforcast]=useState('');
  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
      setforcast("5 Day....Forcast");
    }).catch((err) => {
      if(err.response.status===404)
      {
        seterror("Invalid City Name");
        setforcast("");
      }
      else{
        
        seterror("");
       
      }
    
    })
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }
  
  
   const currentDate =new  Date();
    const getdate=currentDate.toDateString();
    const time=currentDate.toLocaleTimeString();
   
   
  return (
    <div className="mainclass">
        
        <div className="inputsearch">
      
        <h1 className="heading">Globeweather App</h1>
        <input type="text" 
            value={inputCity}
            onChange={handleChangeInput} id="N"onKeyUp={validname}placeholder="Enter the City Name" />
          <button className="btn" type="button"
            onClick={handleSearch}
          >.</button>
         
        <h1 id="errorpage">{error}</h1>
        <h1  id="M"></h1>
        </div>
        <div className="daylyforcast">
           <h1 className="Weatherforcast">{forcast}</h1>
        </div>
        
          
               
   {Object.keys(data).length > 0 &&
<div className="c">

  
         <div className="weadherresult">
          <div className="shadow rounded wetherResultBox">
           
          <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />
 
           
 <h5 className="weathorCity">
              {data?.city?.name}
            </h5>
           
            <h4 className="time">{getdate}</h4>
           
            <h6 className="weathorTemp">{((data?.list[0]?.main?.temp) - 273.15).toFixed(0)}°C</h6>
            <p className="time-2">{time}</p>
            
            <div className="visible"></div>
            <h2 id="visiblity">{(data?.list[0]?.visibility)}</h2>
            <h4 id="min">Min :{((data?.list[0]?.main?.temp_min)-273.15).toFixed(0)}°C</h4><br></br>
            <h4 id="min">Max :{((data?.list[0]?.main?.temp_max)-273.15).toFixed(0)}°C</h4>
           <h2 id="visi">Visibility :</h2>
           <div className="pressure"/>
           <h2 id="press">Pressure :</h2>
           <h2 id="pressureis">{(data?.list[0].main?.pressure)}Pa</h2>
            <div className="humidity" >
           <h2 id="humid">{((data?.list[0]?.main?.humidity))}%</h2>
           <h2 id="humid">Humidity</h2>
          </div>
          <div className="wind" >
           <h2 id="wid">{((data?.list[0]?.wind?.speed))}km/hr</h2>
           <h2 id="wid">Wind</h2>
          </div>
          
          <div className="first">
          <img className="img1"
              src="https://cdn-icons-png.flaticon.com/128/1163/1163634.png" />
 
     <p id="com">{data?.list[4]?.dt_txt}</p >
     <p id="com"> temp:{((data?.list[4]?.main?.temp)-273.15).toFixed(2)}°C</p> 
     <p id="com">visibility:{(data?.list[4]?.visibility)}</p> 
     <p id="com">speed:{(data?.list[4]?.wind?.speed)}km/hr</p> 
     <p id="com">humidity:{(data?.list[4]?.main?.humidity)}%</p> 
         </div>
          
         <div className="second">
         <img className="img1"
              src="https://cdn-icons-png.flaticon.com/128/1163/1163657.png" />
     <p id="com">{data?.list[12]?.dt_txt}</p>
     <p  id="com"> temp:{((data?.list[12]?.main?.temp)-273.15).toFixed(2)}°C</p> 
     <p id="com">visibility:{(data?.list[12]?.visibility)}</p> 
     <p id="com">speed:{(data?.list[12]?.wind?.speed)}km/hr</p> 
     <p id="com">humidity:{(data?.list[12]?.main?.humidity)}%</p> 
         </div> 
         
         <div className="third">
         <img className="img1"
              src="https://cdn-icons-png.flaticon.com/128/3093/3093390.png" />
     <p id="com">{data?.list[20]?.dt_txt}</p>
     <p id="com"> temp:{((data?.list[20]?.main?.temp)-273.15).toFixed(2)}°C</p> 
     <p id="com">visibility:{(data?.list[20]?.visibility)}</p> 
     <p id="com">speed:{(data?.list[20]?.wind?.speed)}km/hr</p> 
     <p id="com">humidity:{(data?.list[20]?.main?.humidity)}%</p> 
         </div> 
         <div className="fourth">
         <img className="img1"
              src="https://cdn-icons-png.flaticon.com/128/2698/2698194.png"/>
     <p id="com">{data?.list[28]?.dt_txt}</p>
     <p id="com"> temp:{((data?.list[28]?.main?.temp)-273.15).toFixed(2)}°C</p> 
     <p id="com">visibility:{(data?.list[28]?.visibility)}</p> 
     <p id="com">speed:{(data?.list[28]?.wind?.speed)}km/hr</p> 
     <p id="com">humidity:{(data?.list[28]?.main?.humidity)}%</p> 
         </div> 
         
         <div className="five">
         <img className="img1"
              src="https://cdn-icons-png.flaticon.com/128/1163/1163625.png" />
              
     <p id="com">{data?.list[36]?.dt_txt}</p>
     <p  id="com"> temp:{((data?.list[36]?.main?.temp)-273.15).toFixed(2)}°C</p> 
     <p  id="com">visibility:{(data?.list[36]?.visibility)}</p> 
     <p id="com">speed:{(data?.list[36]?.wind?.speed)}km/hr</p> 
     <p id="com">humidity:{(data?.list[36]?.main?.humidity)}%</p> 
         </div>  
        
</div>

          </div>
        
        </div>
        
        
      }
      
      
    </div>
  );
}

export default App;


