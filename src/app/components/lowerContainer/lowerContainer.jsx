import React from 'react';
import './lowerContainerStyle.scss';
import FormContainer from '../formContainer/formContainer.jsx';
import Room from '../room/roomContainer.jsx';

export default function LowerContainer(props) {
  const { selectedRoom, setSelectedRoom, rooms, setRooms } = props;

  // get room object from rooms array, to pass to Room component
  const roomInfo = rooms.find((room) => room.room_name === selectedRoom);

  return (
    <div className="lowerContainer">
      <FormContainer user={props.user} rooms={rooms} roomName={selectedRoom} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} setRooms={setRooms}/>
      <Room user={props.user} roomInfo={roomInfo}/>
    </div>
  );
}
