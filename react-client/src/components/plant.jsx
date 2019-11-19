import React from 'react';
import '../styles/plant.css'

const Plant = (props) => {
  //console.log('in plants')
  //console.log(props.currentPlantSelected, 'plant selected')
  //console.log(props.allPlants)
  var currentPlant = props.curentPlantSelected;
  //console.log(props.currentPlantSelected)

  return (

    <svg height="600" width='180'>

       {props.allPlants.map((row)=> {
         //console.log(row)
       // for(var i=0; i<plant.length; i++) {
         return(
         <svg>
        {row.map((column)=> {
            var strCol=JSON.stringify(column)
            var strCurr=JSON.stringify(props.currentPlantSelected)
            if(strCol == strCurr) {
              return(
                <circle  onClick={()=>props.showPanel(column )} className='selected ' cx={column[0]} cy={column[1]} r="20"  />
              )
            }
            else if(column[2]===false) {
             // console.log('should have blank', column)
              return(
                <circle  onClick={()=>props.showPanel(column )} className='select noplant ' cx={column[0]} cy={column[1]} r="20"  />
              )
            } else if(column[2] === true && column[3]==='Pea-Shooter') {
              return(
              <circle  onClick={()=>props.showPanel(column )} className='select peaShooter' cx={column[0]} cy={column[1]} r="10"  />
              )
            } else if(column[2] === true && column[3]==='Cabbage') {
              return(
              <circle  onClick={()=>props.showPanel(column )} className='select Cabbage' cx={column[0]} cy={column[1]} r="20"  />
              )
            }

          })}

          </svg>

         )
         //}

      })}

    </svg>

)}




export default Plant;