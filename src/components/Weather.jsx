import React from "react";
import clouds from "./photos/clouds.png";
import rain from "./photos/heavyrain.png";
import snow from "./photos/snow.png";
import clear from "./photos/clear.png";
import thunderstorm from "./photos/thunderstorm.png";
import atmosphere from "./photos/atmosphere.png";
import drizzle from "./photos/drizzle.png";

function WeatherImage(props)
{
    const id = props.id;

    if(id >= 200 && id < 300)
    {
        return <img className = "image" src={thunderstorm}/>
    }

    else if(id >= 300 && id < 400)
    {
        return <img className = "image" src={drizzle}/>
    }

    else if(id >= 500 && id < 600)
    {
        return <img className = "image" src={rain}/>
    }

    else if(id >= 600 && id < 700)
    {
        return <img className = "image" src={snow}/>
    }
    
    else if(id >= 700 && id < 800)
    {
        return <img className = "image" src={atmosphere}/>
    }
    
    else if(id === 800)
    {
        return <img className = "image" src={clear}/>
    }
    else if(id > 800 && id < 900)
    {
        return <img className = "image" src={clouds}/>
    }
    
}

export default WeatherImage;