import React from 'react';
import '../styles/panel.css'
const Panel = (props) => {
  //console.log(props)
  var curr = props.plantLocation;
  if(props.plantExist ===false) {
    if(props.showPanel === true) {
      return (

          <div className='panel-buttons'>
          <button className='panel-button' onClick={()=>props.buyPlant('Pea-Shooter', 10)}>Buy Pea Shooter $200</button>
          <button className='panel-button' onClick={()=>props.buyPlant('Cabbage', 20)}>Buy Cabbage $300</button>
          <button className='panel-button' onClick={()=>props.buyPlant('Laser', 20)}>Buy Laser $400</button>
          </div>

      )
    }

    if(props.showPanel === false) {
      return (
        <div></div>
      )
    }
  } else if(props.plantExist ===true && curr.length !=0) {
    if(props.showPanel === true) {
      return(
        <div className='panel-buttons'>
          <div className='panel-text' >Plant Name: {props.plantLocation[3]} </div>
          <div className='panel-text' >Damage: {props.plantLocation[4]}</div>
          <button className='panel-button' onClick={props.sellPlant}>Sell</button>
          <button className='panel-button' >Upgrade</button>
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