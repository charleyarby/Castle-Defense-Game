import React from 'react';


const Grid = (props) => {

  return (

    <svg>
    <line x1="0" x2="1000" y1="100" y2="100" stroke="black" strokeWidth="1"/>
    <line x1="0" x2="1000" y1="200" y2="200" stroke="black" strokeWidth="1"/>
    <line x1="0" x2="1000" y1="300" y2="300" stroke="black" strokeWidth="1"/>
    <line x1="0" x2="1000" y1="400" y2="400" stroke="black" strokeWidth="1"/>
    <line x1="0" x2="1000" y1="500" y2="500" stroke="black" strokeWidth="1"/>
    <line x1="100" x2="100" y1="0" y2="500" stroke="black" strokeWidth="1"/>
    <line x1="200" x2="200" y1="0" y2="500" stroke="black" strokeWidth="1"/>
    <line x1="300" x2="300" y1="0" y2="500" stroke="black" strokeWidth="1"/>
    <line x1="400" x2="400" y1="0" y2="500" stroke="black" strokeWidth="1"/>
    </svg>

)}




export default Grid;