import React from 'react';
import './roomContainerStyle.scss';
import Plant from '../plants/plant.jsx';

export default function Room(props) {
  const { roomInfo } = props;
  console.log('roomInfo', roomInfo);
  
  // Hook to set plants array
  const [plants, setPlants] = React.useState([]);

  // When roomInfo is set, set plants array
  React.useEffect (() => {
    if (!roomInfo) return;
    setPlants(roomInfo.plants);
  }, [roomInfo]);

  // TODO add key prop to Plant components
  return (
    <div id="roomContainer">
      {plants.map((plant) => {
        return <Plant plant={plant}/>
      })}
    </div>
  );
}
