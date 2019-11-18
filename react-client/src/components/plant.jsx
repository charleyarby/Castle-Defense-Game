import React from 'react';
import '../styles/plant.css'

const Plant = (props) => {
  //console.log('in plants')
  //console.log(props.currentPlantSelected, 'plant selected')
  //console.log(props.allPlants)
  var currentPlant = props.curentPlantSelected;
  return (

    <svg height="600" width='53'>
      {props.allPlants.map((plant)=> {
        if(plant[0][2]===false) {
          return(
            <circle value='450' onClick={()=>props.showPanel(0,450 )} className='select noplant ' cx={plant[0][0]} cy={plant[0][1]} r="20"  />
          )
        } else if(plant[0][2] === 'peaShooter') {
          return(
          <circle value='450' onClick={()=>props.showPanel(0,450 )} className='select peaShooter' cx={plant[0][0]} cy={plant[0][1]} r="20"  />
          )
        }
      })}
    </svg>

)}




export default Plant;