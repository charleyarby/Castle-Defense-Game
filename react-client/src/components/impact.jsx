import React from 'react';
import '../styles/impact.css'

const Impact = (props) => {
  //console.log(props.zombieLocations, 'this is zombie locations')
 // var zombies = props.zombieLocations
 //console.log(props)

 if(props.impactLocations.length!==0) {
    return (
      <svg>
        {props.impactLocations.map((impact)=> {
         // console.log(impact)
          if(impact[3]==='Pea-Shooter') {
            return(
              <circle className='pea-impact' cx={Number(impact[0])} cy={Number(impact[1])} r="20">
                <animate attributeName="r" from="0" to="30" dur="0.5s"/>
              </circle>
            )
          } else if(impact[3]==='Cabbage') {
            return(
              <rect className='cabbage-impact' x={Number(impact[0])-100} y={Number(impact[1])-150} rx="20" rx="40" width='200' height='300'>
                <animate attributeName="r" from="0" to="30" dur="0.5s"/>
              </rect>
            )
          }
        })}
      </svg>
    )
  } else {
    return(
      <svg></svg>
    )
  }

}




export default Impact;