import React from 'react';
import Bullets from './bullet.jsx'
import Zombies from './zombies.jsx'
import '../styles/lawn.css'

const Lawn = (props) => {
  console.log(props.zombieLocations[0] )

  return (
    <svg x='0' height="600" width="1920">
    {/* <circle cx={Number(props.zombieLocations[0])} cy={Number(props.zombieLocations[1])} r="20" style={circleStyle} /> */}
    <Zombies zombieLocations = {props.zombieLocations}/>
    <Bullets bulletLocations = {props.bulletLocations}/>

    </svg>
)}

const circleStyle = {
  fill: 'red',
  stroke: 'black',
}

export default Lawn;