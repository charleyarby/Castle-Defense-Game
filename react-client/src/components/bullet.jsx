import React from 'react';


const Bullets = (props) => {
  console.log(props.bulletLocations)
  var bullets = props.bulletLocations
  return (

    <svg>
      {bullets.map((bullet)=> {

        return(
         <circle cx={Number(bullet[0])} cy={Number(bullet[1])} r="20"  />
         )
    })}
    </svg>


)}




export default Bullets;