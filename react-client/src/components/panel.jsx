import React from 'react';

const Panel = (props) => {
  //console.log(props)
  if(props.plantExist ===false) {
    if(props.showPanel === true) {
      return (
        <p1>
          <div>Selected Location: {props.plantLocation[0]}, {props.plantLocation[1]}</div>

          <button onClick={()=>props.buyPlant('Pea-Shooter', 10)}>Buy Pea Shooter</button>
          <button onClick={()=>props.buyPlant('Cabbage', 20)}>Buy Cabbage</button>
          <button onClick={()=>props.buyPlant('Laser', 5)}>Buy Laser</button>

        </p1>
      )
    }

    if(props.showPanel === false) {
      return (
        <div></div>
      )
    }
  } else if(props.plantExist ===true) {
    if(props.showPanel === true) {
      return(
        <div>
          <div>Plant Name: {props.plantLocation[3]} </div>
          <div>Damage: {props.plantLocation[4]}</div>
          <button>Upgrade</button>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
 } else{
   return(
     <div></div>
   )
 }

}




export default Panel;