import React from 'react';
import './roomContainerStyle.scss';
import Plant from '../plants/plant.jsx';

export default function Room(props) {
  const { user, roomInfo, forceUpdate } = props;
  console.log('roomInfo in roomContainer: ', roomInfo);
  
  // Hook to set plants array
  const [plants, setPlants] = React.useState([]);

  // When roomInfo is set, set plants array
  React.useEffect (() => {
    if (!roomInfo) return;
    setPlants(roomInfo.plants);
  }, [roomInfo]);

  // delete plant from database upon clicking remove button in plant component
  const deletePlant = async (username, room_name, species) => {
    console.log('roomContainer room_name: ', room_name);
    const result = await fetch('http://localhost:3000/users/plant/delete', {
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
    if (result) {
      const deletedPlant = roomInfo.plants.find(plant => plant.species === species);
      const index = roomInfo.plants.indexOf(deletedPlant);
      if (index !== -1) roomInfo.plants.splice(index, 1);
      forceUpdate();
    }
  }

  // TODO add key prop to Plant components
  return (
    <div id="roomContainer">
      {plants.map((plant) => {
        return <Plant user={user} plant={plant} deletePlant={deletePlant} roomInfo={roomInfo} />
      })}
    </div>
  );
}
