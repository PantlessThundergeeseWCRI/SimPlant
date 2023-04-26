import React from 'react';
import FormSelect from './FormSelect';
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
        <FormSelect name="roomLighting" property="Lighting"/>
        <FormSelect name="roomTemperature" property="Temperature"/>
        <FormSelect name="roomHumidity" property="Humidity"/>
        <button type="submit">Submit</button>
      </form>
      <form className="plantForm" onSubmit={handlePlantSubmit}>
        <div className="formTitle">ADD PLANT</div>
        <input
          name="plantSpecies"
          type="text"
          placeholder="Plant Species"
        ></input>
        <FormSelect name="plantLighting" property="Lighting"/>
        <FormSelect name="plantTemperature" property="Temperature"/>
        <FormSelect name="plantHumidity" property="Humidity"/>
        <FormSelect name="plantWatering" property="Watering"/>
        <div className="schedule">
          <div>
            <label htmlFor="">Mon</label>
            <input type="checkbox" name="Mon" value="Mon"></input>
          </div>
          <div>
            <label htmlFor="">Tue</label>
            <input type="checkbox" name="Tue" value="Tue"></input>
          </div>
          <div>
            <label htmlFor="">Wed</label>
            <input type="checkbox" name="Wed" value="Wed"></input>
          </div>
          <div>
            <label htmlFor="">Thur</label>
            <input type="checkbox" name="Thur" value="Thur"></input>
          </div>
          <div>
            <label htmlFor="">Fri</label>
            <input type="checkbox" name="Fri" value="Fri"></input>
          </div>
          <div>
            <label htmlFor="">Sat</label>
            <input type="checkbox" name="Sat" value="Sat"></input>
          </div>
          <div>
            <label htmlFor="">Sun</label>
            <input type="checkbox" name="Sun" value="Sun"></input>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}