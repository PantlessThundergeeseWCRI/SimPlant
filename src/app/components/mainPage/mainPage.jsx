import React, { useEffect } from 'react';
import './mainPageStyle.scss';
import RoomMenu from '../roomMenu/roomMenu.jsx';
import LowerContainer from '../lowerContainer/lowerContainer.jsx';

//main container page acts as parent component

//render drop down menu to navigate btwn rooms -roomMenu
//render lowerContainer to hold room and input forms
//render room component
//render form container componenet

function MainPage(props) {
  const { user } = props;
  const [rooms, setRooms] = React.useState([]);
  console.log('rooms', rooms);

  // Fetch rooms from database
  async function fetchData() {
    const response = await fetch(`http://localhost:3000/users/${user}`);
    const data = await response.json();
    return data;
  }

  async function loadRooms() {
    const data = await fetchData();
    setRooms(data.rooms);
  }

  // Load rooms on page load
  useEffect( () => {
    loadRooms();
  }, []);
  
  // Keep track of selected room in state to pass to room component
  const [selectedRoom, setSelectedRoom] = React.useState('');

  return (
    <div className="page">
      <RoomMenu rooms={rooms} setSelectedRoom={setSelectedRoom} />
      <LowerContainer user={user} rooms={rooms} selectedRoom={selectedRoom} setRooms={setRooms}/>
    </div>
  );
}

export default MainPage;
