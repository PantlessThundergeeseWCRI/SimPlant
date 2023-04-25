import React from 'react';
import './roomMenuStyle.scss';
import { useState, useEffect } from 'react';

export default function RoomMenu(props) {
  // Hook to set rooms array
  const [rooms, setRooms] = useState([]);

  // TODO change dummy data to fetch from database
  useEffect(() => {
    setRooms(['room1', 'room2', 'room3']);
  }, []);

  // When a room is selected, set selectedRoom in state
  const handleSelection = (event) => {
    props.setSelectedRoom(event.target.value);
  };

  // TODO add key prop to option elements
  return (
    <nav id="roomMenu">
      <select name="rooms" value={props.selectedRoom} onChange={handleSelection}>
        {rooms.map((room) => {
          return <option value={room}>{room}</option>
        })}
      </select>
    </nav>
  );
}