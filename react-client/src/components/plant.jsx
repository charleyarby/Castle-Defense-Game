import React from 'react';
import '../styles/plant.css'
import ReactDOM from 'react-dom';

const Plant = (props) => {
  console.log('in plants')
  return (


    <svg height="600" width='53'>
    <circle onClick={props.fireWeapon} className='plant' cx='30' cy='50' r="20"  />
    <circle className='plant' cx='30' cy='150' r="20"  />
    <circle className='plant' cx='30' cy='250' r="20"  />
    <circle className='plant' cx='30' cy='350' r="20"  />
    <circle className='plant' cx='30' cy='450' r="20"  />
    </svg>

)}

// const node = ReactDOM.findDOMNode(this);

// // Get child nodes
// if (node instanceof HTMLElement) {
//     const child = node.querySelector('.plant');
//     child.addEventListener('click', function(e) {
//       console.log('plant clicked - firing');
//       //myPlant.setAttributeNS(null, 'r', 60);
//     }, false);
// }



export default Plant;