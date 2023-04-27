import React from 'react';
import './plantStyle.scss'

// TODO watering frequency per week? 

const Plant = (props) => {
  console.log('props', props);
  let { species, 
          humidity, 
          lighting, 
          temperature
        } = props.plant;

  // Create array of all of the days that the plant needs to be watered
  const wateringDays = [];
  if (props.plant.monday) wateringDays.push('Mon');
  if (props.plant.tuesday) wateringDays.push('Tues');
  if (props.plant.wednesday) wateringDays.push('Wed');
  if (props.plant.thursday) wateringDays.push('Thurs');
  if (props.plant.friday) wateringDays.push('Fri');
  if (props.plant.saturday) wateringDays.push('Sat');
  if (props.plant.sunday) wateringDays.push('Sun');

  // Convert array to string, with commas between each day but not after the last day
  let wateringStr = wateringDays.join(', ');

  // If plant needs to be watered today, add (water today) to the end of the string
  // Get today's day of the week (eg. 'Monday')
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  console.log('props.plant[today]', props.plant[today]);
  if (props.plant[today]) wateringStr += ' (water today!)';

  // Convert [0, 1, 2] values to low, medium, high

  lighting = lighting === 0 ? 'Low' : lighting === 1 ? 'Medium' : 'High';
  humidity = humidity === 0 ? 'Low' : humidity === 1 ? 'Medium' : 'High';
  temperature = temperature === 0 ? 'Low' : temperature === 1 ? 'Medium' : 'High';

  return(
    <div className='plant'>
      <p className="species">Species: {species}</p>
      <img className= "plant-img" src="https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"></img>
      <p>Water on: {wateringStr}</p>
      <p>Humidity: {humidity}</p>
      <p>Light: {lighting}</p>
      <p>Temperature: {temperature}</p>
      <button type="button" onClick={() => props.deletePlant(props.user, props.roomInfo.room_name, species)}>Remove</button>
    </div>
  );
}

export default Plant;