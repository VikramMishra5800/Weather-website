import React, { useEffect, useState } from "react";
import UserLoc from "./UserLoc";
import WeatherImage from "./Weather";
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
        <div id="main-body">
            <UserLoc unit = {search.unit}/>

            <div className="inputData">
                <input className="inputField" type="search" name="newCity" value={search.newCity} onChange={handleChange} placeholder="Search City..." />
            </div>

            <div className="d-flex justify-content-center align-items-center inputField">
                <select name="unit" onChange={handleChange}>
                    <option value="metric">Celsius</option>
                    <option value="imperial">Fahrenheit</option>
                    <option>Kelvin</option>
                </select>
            </div>

            {!city ? (<h2 className="errorMsg">No such city found</h2>):
            (
                <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-md-8 col-sm-6">
                    <div className="card box">
                        <div className="card-body">
                        <h3 className="card-title">
                            {search.newCity}
                        </h3>
                        <div style={{textAlign: "center"}}>
                            <h1>
                                {city.temp}
                            </h1>
                            <h5>{weatherdetail.main}</h5>
                            <h6>Min Temp: {city.temp_min} | Max Temp: {city.temp_max}</h6>
                        </div>
                           
                            <WeatherImage id={weatherdetail.id} />
                            
                            <div style={{marginTop: "80px"}}>
                                <h5 >Humidity: {city.humidity}%</h5>
                                <h5 >Wind Speed: {wind} m/s</h5>
                            </div>
                            
                            <div className="wave -one"></div>
                            <div className="wave -two"></div>
                            <div className="wave -three"></div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
        </>
    )
}
export default MainApp;
