import React from 'react';
import '../styles/zombie.css'

const Zombies = (props) => {
  console.log(props.zombieLocations, 'this is zombie locations')
  var zombies = props.zombieLocations
  return (

    <svg>
      {zombies.map((zombie)=> {

        return(
         <circle className='zombie' cx={Number(zombie[0])} cy={Number(zombie[1])} r="30"  />
         )
    })}
    </svg>


)}




export default Zombies;