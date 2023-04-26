import React from 'react';
import './formContainerStyle.scss';

export default function FormContainer() {
  // On submit, send a POST request to the server with the form data
  // TODO edit these
  const handleRoomSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    for (const value of data.values()) {
      console.log('value: ', value);
    }
  };

  const handlePlantSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    for (const value of data.values()) {
      console.log('value: ', value);
    }
  };

  return (
    <div className="formContainer">
      <form className="roomForm" onSubmit={handleRoomSubmit}>
        <div className="formTitle">ADD ROOM</div>
        <input
          className="inputField"
          type="text"
          placeholder="Room Name"
        ></input>
        <select name="roomLighting">
          <option>Please Choose a Lighting Level</option>
          <option value="High Light">High</option>
          <option value="Medium Light">Medium</option>
          <option value="Low Light">Low</option>
        </select>
        <select name="roomTemp">
          <option>Please Choose a Temperature Level</option>
          <option value="High Temp">High</option>
          <option value="Medium Temp">Medium</option>
          <option value="Low Temp">Low</option>
        </select>
        <select name="roomHumidity">
          <option>Please Choose a Humidity Level</option>
          <option value="High Humidity">High</option>
          <option value="Medium Humidity">Medium</option>
          <option value="Low Humidity">Low</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <form className="plantForm" onSubmit={handlePlantSubmit}>
        <div className="formTitle">ADD PLANT</div>
        <input
          name="plantSpecies"
          type="text"
          placeholder="Plant Species"
        ></input>
        <input
          name="plantLighting"
          type="text"
          placeholder="Lighting Needs"
        ></input>
        <input
          name="plantWatering"
          type="text"
          placeholder="Watering Needs"
        ></input>
        <input
          name="plantHumidity"
          type="text"
          placeholder="Humidity Needs"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}