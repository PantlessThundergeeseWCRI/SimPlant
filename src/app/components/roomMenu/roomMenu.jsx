import React from 'react';
import './roomMenuStyle.scss';
import { useState, useEffect } from 'react';

export default function RoomMenu(props) {
  const { rooms, selectedRoom, setSelectedRoom } = props;
  // const [lighting, setLighting] = useState('');
  // const [humidity, setHumidity] = useState('');

  let lightLevel = "";
  let humidityLevel = "";
  let temperature = "";

  // Get lighting and humidity levels from selected room
  if (selectedRoom) {
    console.log(rooms);
    console.log('room.room_name: ', rooms[0].room_name);
    console.log('selectedRoom: ', selectedRoom);
    lightLevel = rooms.find((room) => room.room_name === selectedRoom).lighting;
    humidityLevel = rooms.find((room) => room.room_name === selectedRoom).humidity;
    temperature = rooms.find((room) => room.room_name === selectedRoom).temperature;

    // Convert lighting and humidity levels from [0,1,2] to ['low', 'medium', 'high']
    lightLevel = ['low', 'medium', 'high'][lightLevel];
    humidityLevel = ['low', 'medium', 'high'][humidityLevel];
    temperature = ['low', 'medium', 'high'][temperature];
  }


    
  // When a room is selected, set selectedRoom in state
  const handleSelection = (event) => {
    setSelectedRoom(event.target.value);
  };

  // // When a room is selected, set lighting and humidity in state
  // useEffect(() => {
  //   const lightLevel = rooms.find((room) => room.room_name === selectedRoom).lighting;
  //   const humidityLevel = rooms.find((room) => room.room_name === selectedRoom).humidity;
  //   setLighting(lightLevel);
  //   setHumidity(humidityLevel);
  // }, [selectedRoom]);

  // TODO add key prop to option elements
  return (
    <nav id="roomMenu">
      <div id="roomSelection">
      <select name="rooms" value={selectedRoom} onChange={handleSelection}>
        {rooms.map((room) => {
          return <option value={room.room_name}>{room.room_name}</option>
        })}
      </select>
      <h2>{selectedRoom}: {humidityLevel} humidity, {lightLevel} light, {temperature} temperature </h2>
      </div>
    </nav>
  );
}