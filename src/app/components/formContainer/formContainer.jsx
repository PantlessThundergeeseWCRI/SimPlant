import React from 'react';
import FormSelect from './FormSelect';
import Checkbox from './Checkbox';
import './formContainerStyle.scss';

export default function FormContainer(props) {
  const { user, roomName, rooms, setRooms, selectedRoom, setSelectedRoom } = props;
  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  // On submit, send a POST request to the server with the form data
  const handleRoomSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    // Create room POST request body by accessing form data
    const newRoomBody = {
      username: user,
      room_name: data.get('roomName'),
      lighting: data.get('roomLighting'),
      temperature: data.get('roomTemperature'),
      humidity: data.get('roomHumidity'),
      plants: []
    };

    // Send POST request to server
    await fetch('http://localhost:3000/users/room/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoomBody),
      });

    // Reset form
    event.target.reset();

    // Reload rooms
    setRooms(rooms.concat([newRoomBody]));
    
    // Set selected room to newly created room
    setSelectedRoom(newRoomBody.room_name);
    };
  

  const handlePlantSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    // Create plant POST request body by accessing form data
    const newPlantBody = {
      username: user,
      room_name: roomName,
      species: data.get('plantSpecies'),
      lighting: data.get('plantLighting'),
      temperature: data.get('plantTemperature'),
      humidity: data.get('plantHumidity'),
      // watering: data.get('plantWatering'),
      monday: data.get('Mon') ? true : false,
      tuesday: data.get('Tue') ? true : false,
      wednesday: data.get('Wed') ? true : false,
      thursday: data.get('Thur') ? true : false,
      friday: data.get('Fri') ? true : false,
      saturday: data.get('Sat') ? true : false,
      sunday: data.get('Sun') ? true : false
    };    

    // Send POST request to server
    fetch('http://localhost:3000/users/plant/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(newPlantBody),
      });

    // Reload rooms
    const newRooms = rooms.map((room) => {
      if (room.room_name === roomName) {
        room.plants.push(newPlantBody);
      }
      return room;
    });

    // Clear form
    event.target.reset();

    // Update rooms state
    setRooms(newRooms);

  };

  // When a room is selected, set selectedRoom in state
  const handleSelection = (event) => {
    setSelectedRoom(event.target.value);
  };

  return (
    <div className="formContainer">
      <form className="roomForm" onSubmit={handleRoomSubmit}>
        <div className="formTitle">ADD ROOM</div>
        <input
          className="inputField"
          type="text"
          placeholder="Room Name"
          name="roomName"
        ></input>
        <FormSelect name="roomLighting" property="Lighting"/>
        <FormSelect name="roomTemperature" property="Temperature"/>
        <FormSelect name="roomHumidity" property="Humidity"/>
        <button type="submit">Submit</button>
      </form>
      <form className="plantForm" onSubmit={handlePlantSubmit}>
        <div className="formTitle">ADD PLANT</div>
        <input
          className="plantSpecies"
          type="text"
          placeholder="Plant Species"
          name="plantSpecies"
        ></input>
        <FormSelect name="plantLighting" property="Lighting"/>
        <FormSelect name="plantTemperature" property="Temperature"/>
        <FormSelect name="plantHumidity" property="Humidity"/>
        <p><u>Please select your watering schedule</u></p>
        <div className="schedule">
          {days.map(day => {
            return <Checkbox day={day} />
          })}
        </div>
        <select name="plant-rooms" value={selectedRoom} onChange={handleSelection}>
          {rooms.map((room) => {
            return <option value={room.room_name}>{room.room_name}</option>
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}