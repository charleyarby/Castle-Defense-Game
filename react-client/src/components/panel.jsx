import React from 'react';

const Panel = (props) => {
  console.log(props.showPanel)
  if(props.showPanel === true) {
    return (
      <div>panel
        <div>Current Tower: </div>
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