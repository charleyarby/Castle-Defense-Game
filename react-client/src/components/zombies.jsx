import React from 'react';
import '../styles/zombie.css'
import zombiePic from '../pictures/zombie.png'
import zombieHardened from '../pictures/zombieHardened.png'
const Zombies = (props) => {
  //console.log(props.zombieLocations, 'this is zombie locations')
  var zombies = props.zombieLocations
  return (

    <svg>
      {zombies.map((zombie) => {
        if (zombie[3] === 'regularZombies') {
          var health = JSON.stringify((zombie[2] / 100) * 20)
          if (health < 0) {
            health == 0
          }
          return (
            // <circle className='regularZombies' cx={Number(zombie[0])} cy={Number(zombie[1])} r={health} />
            <image href={zombiePic} x={Number(zombie[0])} y={Number(zombie[1])-40} height="80px" width="80px"/>
          )
        } else if (zombie[3] === 'hardenedZombies') {
          var health = JSON.stringify((zombie[2] / 200) * 25)
          if (health < 0) {
            health == 0
          }
          return (
            <image href={zombieHardened} x={Number(zombie[0])} y={Number(zombie[1])-40} height="80px" width="80px"/>
          )
        }
      })}
    </svg>


  )
}




export default Zombies;