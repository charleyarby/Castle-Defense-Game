import React from 'react';
import '../styles/plant.css'
import bombTower from '../pictures/bombTower.png'
import bombTowerSelected from '../pictures/bombTowerSelected.png'
import peaShooter from '../pictures/peaShooter.gif'
import peaShooterSelected from '../pictures/peaShooterSelected.gif'
import missileTower from '../pictures/missileTower.png'
import missileTowerSelected from '../pictures/missileSelected.png'
import laserTower from '../pictures/laserTower.png'
import laserTowerSelected from '../pictures/laserTowerSelected.png'


const Plant = (props) => {
  //console.log('in plants')
  //console.log(props.currentPlantSelected, 'plant selected')
  //console.log(props.allPlants)
  var currentPlant = props.curentPlantSelected;
  //console.log(props.currentPlantSelected)

  return (

    <svg height="600" width='400'>

      {props.allPlants.map((row) => {
        //console.log(row)
        // for(var i=0; i<plant.length; i++) {
        return (
          <svg>
            {row.map((column) => {
              var strCol = JSON.stringify(column)
              var strCurr = JSON.stringify(props.currentPlantSelected)
              if (strCol == strCurr) {
                if (props.currentPlantSelected[3] === 'Pea-Shooter') {
                  return (
                    <image href={peaShooterSelected} onClick={() => props.showPanel(column)} className='select peaShooter' x={column[0] - 45} y={column[1] - 40} width='100px' height='100px' />
                  )
                } else if (props.currentPlantSelected[3] === 'Bomb') {
                  return (
                    <image href={bombTowerSelected} onClick={() => props.showPanel(column)} className='select Bomb' x={column[0] - 45} y={column[1] - 40} />
                  )
                } else if (props.currentPlantSelected[3] === 'Laser') {
                  return (
                    <image href={laserTowerSelected} onClick={() => props.showPanel(column)} className='select Laser' x={column[0] - 45} y={column[1] - 40} width="90" height='90'/>
                  )
                } else if (props.currentPlantSelected[3] === 'Missile') {
                  var x = column[0]
                  var y =column[1]
                  var degree = column[5]
                  var rotation = `rotate(${degree},${x},${y})`
                  return (
                    <image href={missileTowerSelected} onClick={() => props.showPanel(column)} className='select Missile'  x={column[0] - 45} y={column[1] - 40} transform={rotation}/>
                  )
                } else if (props.currentPlantSelected[3] === '') {
                  return (
                    <circle onClick={() => props.showPanel(column)} className='selected ' cx={column[0]} cy={column[1]} r="20" />
                  )
                }
              }
              else if (column[2] === false) {
                // console.log('should have blank', column)
                return (
                  <circle onClick={() => props.showPanel(column)} className='select noplant ' cx={column[0]} cy={column[1]} r="20" />
                )
              } else if (column[2] === true && column[3] === 'Pea-Shooter') {
                return (
                  <image href={peaShooter} onClick={() => props.showPanel(column)} className='select peaShooter' x={column[0] - 45} y={column[1] - 40} width='100px' height='100px' />
                )
              } else if (column[2] === true && column[3] === 'Bomb') {
                return (
                  <image href={bombTower} onClick={() => props.showPanel(column)} className='select Bomb' x={column[0] - 45} y={column[1] - 40} />
                )
              } else if (column[2] === true && column[3] === 'Laser') {
                return (
                  <image href={laserTower} onClick={() => props.showPanel(column)} className='select Laser' x={column[0] - 45} y={column[1] - 40} width="90" height='90' />
                )
              } else if (column[2] === true && column[3] === 'Missile') {
                var x = column[0]
                var y =column[1]
                var degree = column[5]
                var rotation = `rotate(${degree},${x},${y})`
                return (
                  <image href={missileTower} onClick={() => props.showPanel(column)} className='select Missile' x={column[0] - 45} y={column[1] - 40} transform={rotation}/>
                )
              }


            })}

          </svg>

        )
        //}

      })}

    </svg>

  )
}




export default Plant;