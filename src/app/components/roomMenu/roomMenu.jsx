import React from 'react';
import './roomMenuStyle.scss';
import { useState, useEffect } from 'react';

export default function RoomMenu(props) {
  const { rooms } = props;
  // When a room is selected, set selectedRoom in state
  const handleSelection = (event) => {
    props.setSelectedRoom(event.target.value);
  };

  // TODO add key prop to option elements
  return (
    <nav id="roomMenu">
      <select name="rooms" value={props.selectedRoom} onChange={handleSelection}>
        {rooms.map((room) => {
          return <option value={room.room_name}>{room.room_name}</option>
        })}
      </select>
    </nav>
  );
}