import React from 'react';
import './roomContainerStyle.scss';
import Plant from '../plants/plant.jsx';

// TODO delete once database is set up
const plant1 = {
  species: 'Testera exampliosa',
  watering_frequency_per_week: 1, 
  humidity: 70, 
  lighting: 5
}

const plant2 = {
  species: 'Testera2 exampliosa',
  watering_frequency_per_week: 3, 
  humidity: 40, 
  lighting: 8
}

const plant3 = {
  species: 'Testera3 exampliosa',
  watering_frequency_per_week: 2, 
  humidity: 10, 
  lighting: 3
}

const testPlants = [plant1, plant2, plant3];

export default function Room(props) {
  const { roomInfo } = props;
  console.log('roomInfo', roomInfo);
  
  // Hook to set plants array
  const [plants, setPlants] = React.useState([testPlants]);

  React.useEffect (() => {
    if (!roomInfo) return;
    setPlants(roomInfo.plants);
  }, [roomInfo]);

  // TODO fetch plants from database
  React.useEffect(() => {
    setPlants([plant1, plant2, plant3]);
  }, []);

  // TODO add key prop to Plant components
  return (
    <div id="roomContainer">
      {plants.map((plant) => {
        return <Plant plant={plant}/>
      })}
    </div>
  );
}
