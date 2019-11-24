import React from 'react';
import '../styles/zombie.css'

const Zombies = (props) => {
  //console.log(props.zombieLocations, 'this is zombie locations')
  var zombies = props.zombieLocations
  return (

    <svg>
      {zombies.map((zombie)=> {
        if(zombie[3]==='regularZombies') {
          var health = JSON.stringify((zombie[2]/100)*20)
          if(health<0) {
            health==0
          }
          return(
          <circle className='regularZombies' cx={Number(zombie[0])} cy={Number(zombie[1])} r={health}  />
          )
        }else if(zombie[3]==='hardenedZombies') {
          var health = JSON.stringify((zombie[2]/200)*25)
          if(health<0) {
            health==0
          }
          return(
            <circle className='hardenedZombies' cx={Number(zombie[0])} cy={Number(zombie[1])} r={health}  />
          )
        }
    })}
    </svg>


)}




export default Zombies;