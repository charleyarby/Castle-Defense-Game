import React from 'react';
import '../styles/plant.css'

const Plant = (props) => {
  console.log('in plants')
  return (


    <svg height="600" width='53'>
    <circle onClick={props.addBullet} className='plant' cx='30' cy='50' r="20"  />
    <circle className='plant' cx='30' cy='150' r="20"  />
    <circle className='plant' cx='30' cy='250' r="20"  />
    <circle className='plant' cx='30' cy='350' r="20"  />
    <circle className='plant' cx='30' cy='450' r="20"  />
    </svg>

)}




export default Plant;