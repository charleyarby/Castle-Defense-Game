import React from 'react';
import '../styles/plant.css'

const Plant = (props) => {
  //console.log('in plants')
  //console.log(props.currentPlantSelected, 'plant selected')
  //console.log(props.allPlants)
  var currentPlant = props.curentPlantSelected;
  //console.log(props.currentPlantSelected)

  return (

    <svg height="600" width='53'>
      {props.allPlants.map((plant)=> {

        for(var i=0; i<plant.length; i++) {
          if(plant[i][2]===false) {
            return(
              <circle  onClick={()=>props.showPanel(plant[i] )} className='select noplant ' cx={plant[i][0]} cy={plant[i][1]} r="20"  />

            )
          } else if(plant[i][2] === true && plant[i][3]==='Pea-Shooter') {
            return(
            <circle  onClick={()=>props.showPanel(plant[i] )} className='select peaShooter' cx={plant[i][0]} cy={plant[i][1]} r="10"  />
            )
          } else if(plant[i][2] === true && plant[i][3]==='Cabbage') {
            return(
            <circle  onClick={()=>props.showPanel(plant[i] )} className='select Cabbage' cx={plant[i][0]} cy={plant[i][1]} r="20"  />
            )
          }

         }

      })}

    </svg>

)}




export default Plant;