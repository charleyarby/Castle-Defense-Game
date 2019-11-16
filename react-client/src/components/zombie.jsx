import React from 'react';


const Zombie = (props) => {
  console.log(props.zombieLocations[0] )
  console.log(props.bulletLocations[0])
  return (
    <svg x='0' height="600" width="1920">
    <circle cx={Number(props.zombieLocations[0])} cy={Number(props.zombieLocations[1])} r="20" style={circleStyle} />
    <circle cx={Number(props.bulletLocations[0])} cy={Number(props.bulletLocations[1])} r="20" style={circleStyle} />
    </svg>
)}

const circleStyle = {
  fill: 'red',
  stroke: 'black',
}

export default Zombie;