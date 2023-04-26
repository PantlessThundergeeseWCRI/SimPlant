import React from 'react';
import FormSelect from './FormSelect';
import './formContainerStyle.scss';

export default function FormContainer(props) {
  const { user, roomName, rooms, setRooms, setSelectedRoom } = props;
  console.log('rooms', rooms);
  console.log('room name', roomName);
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
      thursday: data.get('Thu') ? true : false,
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
        <FormSelect name="plantWatering" property="Watering"/>
        <div className="schedule">
          <div>
            <label htmlFor="Mon">Mon</label>
            <input type="checkbox" id="Mon" name="Mon" value="Mon"></input>
          </div>
          <div>
            <label htmlFor="Tue">Tue</label>
            <input type="checkbox" id="Tue" name="Tue" value="Tue"></input>
          </div>
          <div>
            <label htmlFor="Wed">Wed</label>
            <input type="checkbox" id="Wed" name="Wed" value="Wed"></input>
          </div>
          <div>
            <label htmlFor="Thur">Thur</label>
            <input type="checkbox" id="Thur" name="Thur" value="Thur"></input>
          </div>
          <div>
            <label htmlFor="Fri">Fri</label>
            <input type="checkbox" id="Fri" name="Fri" value="Fri"></input>
          </div>
          <div>
            <label htmlFor="Sat">Sat</label>
            <input type="checkbox" id="Sat" name="Sat" value="Sat"></input>
          </div>
          <div>
            <label htmlFor="Sun">Sun</label>
            <input type="checkbox" id="Sun" name="Sun" value="Sun"></input>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}