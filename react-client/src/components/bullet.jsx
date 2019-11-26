import React from 'react';
import '../styles/bullet.css'
import missile from '../pictures/missile.png'

const Bullets = (props) => {
  //console.log(props.bulletLocations)
  var bullets = props.bulletLocations
  //console.log(bullets)
  return (

    <svg>
      {bullets.map((bullet) => {
        var x = bullet[0]
        var y =bullet[1]
        var degree = bullet[4]
        var rotation = `rotate(${degree},${x},${y})`
        if (bullet[3] === 'Pea-Shooter') {
          return (
            <circle className='bullets' cx={Number(bullet[0])} cy={Number(bullet[1])} r="10" />
          )
        } else if (bullet[3] === 'Bomb') {
          return (
            <circle className='bomb' cx={Number(bullet[0])} cy={Number(bullet[1])} r="20" />
          )
        } else if (bullet[3] === 'Laser') {
          return (
            <rect className='laser' x={Number(bullet[0])} y={Number(bullet[1]) - 10} rx="20" ry="40" height='20' width='920'>
              <animate attributeName="width" from='100' to="1000" dur="1s" />
            </rect>
          )
        } else if (bullet[3] === 'Missile') {
          return (
            <image href={missile} className='missile' x={Number(bullet[0])-45} y={Number(bullet[1])-40} r="20" transform={rotation} width='70px' height='70px'/>
          )
        }
      })}
    </svg>
  )
}

export default Bullets;