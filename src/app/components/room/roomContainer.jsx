import React from 'react';
import './roomContainerStyle.scss';
import Plant from '../plants/plant.jsx';

export default function Room(props) {
  const { roomInfo } = props;
  console.log('roomInfo in roomContainer: ', roomInfo);
  
  // Hook to set plants array
  const [plants, setPlants] = React.useState([]);

  // When roomInfo is set, set plants array
  React.useEffect (() => {
    if (!roomInfo) return;
    setPlants(roomInfo.plants);
  }, [roomInfo]);

  // delete plant from database upon clicking remove button
  const deletePlant = (username, room_name, species) => {
    fetch('http://localhost:3000/users/plant/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        room_name,
        species
      })
    })
  }

  // TODO add key prop to Plant components
  return (
    <div id="roomContainer">
      {plants.map((plant) => {
        return <Plant plant={plant} deletePlant={deletePlant} roomInfo={roomInfo} />
      })}
    </div>
  );
}
