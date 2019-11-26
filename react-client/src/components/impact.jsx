import React from 'react';
import '../styles/impact.css'
import explosion from '../pictures/explosion.png'

const Impact = (props) => {
  //console.log(props.zombieLocations, 'this is zombie locations')
  // var zombies = props.zombieLocations
  //console.log(props)

  if (props.impactLocations.length !== 0) {
    return (
      <svg>
        {props.impactLocations.map((impact) => {
          // console.log(impact)
          if (impact[3] === 'Pea-Shooter') {
            return (
              <circle className='pea-impact' cx={Number(impact[0])} cy={Number(impact[1])} r="20">
                <animate attributeName="r" from="0" to="30" dur="0.5s" />
              </circle>
            )
          } else if (impact[3] === 'Bomb') {
            return (
              <image href={explosion} className='bomb-impact' x={Number(impact[0]) - 100} y={Number(impact[1]) - 150} width='200' height='300'>
              </image>
            )
          } else if (impact[3] === 'Missile') {
            return (
              <image href={explosion} className='missile-impact' x={Number(impact[0])} y={Number(impact[1]) - 20} width='40' height='40'>
              </image>
            )
          }
        })}
      </svg>
    )
  } else {
    return (
      <svg></svg>
    )
  }

}




export default Impact;