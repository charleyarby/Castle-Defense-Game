import React from 'react';

const Panel = (props) => {
  //console.log(props.plantLocation)
  if(props.showPanel === true) {
    return (
      <div>panel
        <div>Current Plant: {props.plantLocation[0]}, {props.plantLocation[1]}</div>
      </div>
    )
  }

  if(props.showPanel === false) {
    return (
      <div>no panel</div>
    )
  }
}




export default Panel;