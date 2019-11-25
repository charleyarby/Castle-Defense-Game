import React from 'react';
import '../styles/stats.css'

const Stats = (props) => {
  return (
    <div className='stats-container'>
      <div className='stats'>Round: {props.round}</div>
      <div className='stats'>Kills: {props.kills}</div>
      <div className='stats'>Money: ${props.money}</div>
      <div className='stats'>Lost: {props.lost}</div>
      <div className='stats'>Win: {props.win}</div>
    </div>
  )
}




export default Stats;