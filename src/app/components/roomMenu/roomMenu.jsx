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

  return (
    <nav id="roomMenu">
      <select name="rooms">
        {rooms.map((room) => {
          return <option value={room}>{room}</option>
        })}
      </select>
    </nav>
  );
}