import React from 'react';

export default function FormSelect(props) {
  return (
    <select name={props.name}>
      <option>Please Choose a {props.property} Level</option>
      <option value={2}>High</option>
      <option value={1}>Medium</option>
      <option value={0}>Low</option>
    </select>
  )
}