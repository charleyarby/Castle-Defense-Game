import React from 'react';
import '../styles/plant.css'

const Plant = (props) => {
  //console.log('in plants')
  return (


    <svg height="600" width='53'>
    <circle value='50' onClick={()=>props.showPanel([0,0])} className='plant' cx='30' cy='50' r="20"  />
    <circle value='150' onClick={()=>props.showPanel([1,0])} className='plant' cx='30' cy='150' r="20"  />
    <circle value='250' onClick={()=>props.showPanel([2,0])} className='plant' cx='30' cy='250' r="20"  />
    <circle value='350' onClick={()=>props.showPanel([3,0])} className='plant' cx='30' cy='350' r="20"  />
    <circle value='450' onClick={()=>props.showPanel([4,0])} className='plant' cx='30' cy='450' r="20"  />
    </svg>

)}




export default Plant;