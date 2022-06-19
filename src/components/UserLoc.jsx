import React, { useEffect, useState } from "react";

function UserLoc(props) {
    const [userLoc, setUserLoc] = useState({
        locname: null,
        loctemp: null,
        weatherType: null
    });
    const[coord,setCoord] = useState({lat:null,long:null});
    
    useEffect(() => {
            navigator.geolocation.getCurrentPosition((position) => {
            setCoord({lat: position.coords.latitude,long: position.coords.longitude}); 
            });

            async function fetchAPI(){
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.long}&units=${props.unit}&appid=${process.env.REACT_APP_MY_API_KEY}`;
                const response = await fetch(url);
                const resJSON = await response.json();
                setUserLoc({locname: resJSON.name, loctemp: resJSON.main.temp, weatherType: resJSON.weather[0].main});
            }
            fetchAPI();
         
    },[coord.lat,coord.long,props.unit]);

    
    return (
        <div>
            <h3>Your current location: {userLoc.locname}</h3>
            <h4>Temperature: {userLoc.loctemp} | {userLoc.weatherType}</h4>
        </div>
    );
}
export default UserLoc;