import React from 'react';

export default function Checkbox(props) {
  const { day } = props;
  return (
    <div>
      <label htmlFor={day}>{day}</label>
      <input type="checkbox" id={day} name={day} value={day}></input>
    </div>
  )
}