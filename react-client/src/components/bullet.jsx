import React from 'react';
import '../styles/bullet.css'

const Bullets = (props) => {
  //console.log(props.bulletLocations)
  var bullets = props.bulletLocations
  return (

    <svg>
      {bullets.map((bullet)=> {
        return(
         <circle className='bullets' cx={Number(bullet[0])} cy={Number(bullet[1])} r="10"  />
         )
    })}
    </svg>
)}

export default Bullets;