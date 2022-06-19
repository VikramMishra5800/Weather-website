import React, { useEffect, useState } from "react";
import WeatherImage from "./Weather";
import UserLoc from "./UserLoc";
import "./css/styles.css";

function MainApp(){
    const[weatherdetail,setweather] = useState(null);
    const[wind,setwindSpeed] = useState(null);

    const [search,setSearch] = useState({
        newCity: "Delhi",
        unit: "metric"
    });

    
    const [city,setCity] = useState(null);
    useEffect(() => {
        async function fetchAPI(){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search.newCity}&units=${search.unit}&appid=${process.env.REACT_APP_MY_API_KEY}`;
            const response = await fetch(url);
            const resJSON = await response.json();
            setCity(resJSON.main);
            setweather(resJSON.weather[0]);
            setwindSpeed(resJSON.wind.speed);
            // console.log(resJSON);
        }

        fetchAPI();
    },[search.newCity , search.unit]);
    
    function handleChange(event){
        const name = event.target.name;
        setSearch((prevValue)=>{
            return {
                ...prevValue,
                [name]: event.target.value
            }
        })
    }
   

    return (
        <>
            <UserLoc unit = {search.unit}/>

            <div className="box">

                <div className="inputData">
                    <input type="search" name="newCity" value = {search.newCity} className="inputField" onChange={handleChange}/>
                </div>

                <div>
                <select name="unit" onChange={handleChange}>
                <option value="metric">Celsius</option>
                <option value="imperial">Fahrenheit</option>
                <option>Kelvin</option>
                </select>
                </div>

                {!city ? (<p className="errorMsg">No such city found</p>): 
                (
                <div>
                <div className="info">
                    <h3 className="location">
                    {search.newCity}
                    </h3>

                    <WeatherImage id = {weatherdetail.id}/>
                    <h2>{weatherdetail.main}</h2>
                    <h1 className="temp">
                        {city.temp}
                    </h1>
                    <h3 className="tempmin_max">Min Temp: {city.temp_min} | Max Temp: {city.temp_max}</h3>
                    <h4 id="humidity">Humidity: {city.humidity}%</h4>
                    <h4 id="windSpeed">Wind Speed: {wind} meter/sec</h4>
                    
                </div>

                <div className="wave -one"></div>
                <div className="wave -two"></div>
                <div className="wave -three"></div>
                </div>
                )}
                
            </div>
        </>
    )
}
export default MainApp;