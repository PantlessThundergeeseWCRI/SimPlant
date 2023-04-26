import React from 'react';
import './plantStyle.scss'

// TODO watering frequency per week? 

const Plant = (props) => {
  const { species, 
          humidity, 
          lighting 
        } = props.plant;
  return(
    <div className='plant'>
      <p className="species">Species: {species}</p>
      <img className= "plant-img" src="https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"></img>
      <p>Water PLACEHOLDER per week</p>
      <p>Humidity: {humidity}%</p>
      <p>Light: {lighting}/10</p>
    </div>
  );
}

export default Plant;