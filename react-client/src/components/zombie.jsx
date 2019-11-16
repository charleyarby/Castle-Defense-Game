import React from 'react';


const List = (props) => {
  console.log(props.location[0])
  return (

  <div>
    <div>
    <svg height="1080" width="1920">
    <circle cx={Number(props.location[0])} cy={Number(props.location[1])} r="20" style={circleStyle} />
    </svg>
    </div>
  </div>
)}

const circleStyle = {
  fill: 'blue',
  stroke: 'black',
}

export default List;