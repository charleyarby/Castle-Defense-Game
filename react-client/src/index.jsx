import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Plant from './components/plant.jsx';
import Canvas from './components/canvas.jsx';
import Lawn from './components/lawn.jsx';
import Grid from './components/grid.jsx';
import Panel from './components/panel.jsx';
import plantsLocation from './components/plantConfig.js';
import Rounds from './components/roundsConfig.js';
import UIFx from 'uifx';
import SFXSplatter from './SFX/splatter.mp3'
import './styles/index.css'
const splatter = new UIFx( SFXSplatter);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPlants: plantsLocation,
      currentPlantSelected:[],
      zombieLocations: [],
      bulletLocations: [],
      allRounds:Rounds,
      currentRound:{},
      start:false,
      time:0,
      killed:0,
      startTime:0,
      frame:0,
      showPanel: false,
      plantExist:false,
      money:1500,
      lost:'Not Yet',
      win: 'TBD'
    }
    this.moveZombie = this.moveZombie.bind(this)
    //this.stopZombie = this.stopZombie.bind(this)
    this.addBullet = this.addBullet.bind(this)
    this.moveBullet = this.moveBullet.bind(this)
    this.addZombie = this.addZombie.bind(this)
    this.collision = this.collision.bind(this)
    this.showPanel = this.showPanel.bind(this)
    this.buyPlant = this.buyPlant.bind(this)
    this.stop = this.stop.bind(this)

  }

  componentDidMount() {
    this.setState({
      currentRound: this.state.allRounds[0]
    })

    this.interval = setInterval(()=> {
      //console.log('hi')
      var frame = this.state.frame;

      var bulletLocations = this.state.bulletLocations;
      var zombieLocations = this.state.zombieLocations;
      if(this.state.start===true) {
        frame++;
        var now = Date.now()
        var seconds=0
        var start = this.state.startTime
        seconds=Math.floor((now-start)/1000)
        //console.log(seconds)
        this.setState({
          time:seconds,
          frame: frame
        })
      }

      if(this.state.start===true) {
        this.addZombie()
        this.moveBullet();
        this.addBullet(null, 150, zombieLocations)

        this.moveZombie();



      }




      // if(frame % 50 ===0 && this.state.start===true) {

      // }
    }, 30)
  }

  buyPlant(plants, damage) {
    console.log(plants)
    var currentPlot = this.state.currentPlantSelected
    var currentPlant = this.state.currentPlantSelected
    var currentMoney = this.state.money

    currentPlant[3] = plants;
    currentPlant[4] = damage
    var cost=0

    if(plants==='Pea-Shooter') {
    //  console.log('buy peashooter')
      cost=200
    }
    if(plants==='Cabbage') {
      //console.log('buy cabbage')
      cost=300
    }


    if(currentMoney >= cost) {
      currentPlant[2] = true;
      currentMoney -= cost
      this.setState({
        currentPlantSelected: currentPlant,
        plantExist:true,
        money: currentMoney
      })
    } else if(currentMoney<cost){
      currentPlant[2] = false;
      this.setState({
        plantExist:false,
        money:currentMoney,
        currentPlantSelected: currentPlot
      })
    }

  }

  showPanel(plant) {
    var newPlant = JSON.stringify([plant[0],plant[1]])
    var lastPlant = this.state.currentPlantSelected
    lastPlant = JSON.stringify([lastPlant[0],lastPlant[1]])
   // console.log(lastPlant, 'current plant')

    //console.log(newPlant, 'this is new plant')
    if(this.state.showPanel===false || lastPlant !== newPlant) {
     // console.log('should show panel')
      this.setState({
        showPanel: true,
        currentPlantSelected:plant,
        plantExist:plant[2]
      })
    }else if(this.state.showPanel===true) {
      this.setState({
        showPanel: false,
        plantExist:plant[2],
        currentPlantSelected:[]
      })
    }

  }

  collision() {
    //console.log('ni colli')
    var bullets = this.state.bulletLocations.slice()
    var zombies = this.state.zombieLocations.slice();
    if(this.state.start===true) {

        for(var i=0; i<zombies.length; i++) {
          if(bullets.length!==0) {
          for(var j=0; j<bullets.length; j++) {
          var zombieX = zombies[i][0]
          var zombieY = zombies[i][1]
          var bX = bullets[j][0]
          var bY = bullets[j][1]

          if(bX>zombieX-15 && bX<zombieX+15 && bY>zombieY-15 && bY<zombieY+15) {
            console.log(zombies[i], 'zombie')
            console.log(bullets[j], 'bullet')
            zombies[i][2] = zombies[i][2]-bullets[j][2];
            bullets.splice(j,1)

            splatter.play();


            this.setState({
              bulletLocations: bullets
            })

            if(zombies[i][2]<=0) {
              zombies.splice(i,1)
              var kills = this.state.killed + 1
              var newIncome = 100
              var currentMoney = this.state.money;
              this.setState({
                killed:kills,
                money:currentMoney+newIncome,
                zombieLocations: zombies
              })
            }
          }
        }
      }
    }
    }

  }
  moveBullet() {
    var allBullet = this.state.bulletLocations;
    for(var i=0; i<allBullet.length; i++) {
      var x = allBullet[i][0] + 10
      var y = allBullet[i][1]
      var damage = allBullet[i][2]
      var type = allBullet[i][3]
      allBullet[i] = [x,y, damage, type]
      if(allBullet[i][0]>1000) {
        allBullet.splice(i,1)
      }

    }
    this.collision()
  }

  addBullet(event, value, zLocation) {
    //console.log('in add bullet')
    var zombieInLane =[false, false, false, false, false]
    var allPlants = this.state.allPlants
    var frame = this.state.frame;
    //console.log(frame)

    for(var i=0; i<zLocation.length; i++) {
      if(zLocation[i][1] === 50) {
        zombieInLane[0]= true;
      }
      if(zLocation[i][1] === 150) {
        zombieInLane[1]= true;
      }
      if(zLocation[i][1] === 250) {
        zombieInLane[2]= true;
      }
      if(zLocation[i][1] === 350) {
        zombieInLane[3]= true;
      }
      if(zLocation[i][1] === 450) {
        zombieInLane[4]= true;
      }

    }
    //console.log(zombieInLane)
    var newBullet = []
    for(var j=0; j<5; j++) {
      for(var i=0; i<allPlants[j].length; i++) {
        var exist = allPlants[j][i][2]
        var type=allPlants[j][i][3]
        var damage=allPlants[j][i][4]
        //console.log(zombieInLane[j])
        if(exist === true && zombieInLane[j] === true) {

          if(type=='Pea-Shooter' && frame % 10 ===0 ){
           newBullet.push([allPlants[j][i][0]+50,allPlants[j][i][1],damage, type])
          }
          if(type == 'Cabbage' && frame % 40 ===0 ) {
            newBullet.push([allPlants[j][i][0]+50,allPlants[j][i][1],damage, type])
          }
        }
      }
    }

    var allBullet = this.state.bulletLocations;
    for(var i=0; i<newBullet.length; i++) {
      allBullet.push(newBullet[i])
    }
   // console.log(allBullet, 'this is allBullet')
   this.setState({
      bulletLocations: allBullet
    })
   // this.moveBullet();
  }
  moveZombie() {
    //console.log('in move zombie')
    var allZombie = this.state.zombieLocations;
    var speed=1
    if(this.state.time %10 ===0) {
      speed+=1
    }
    for(var i=0; i<allZombie.length; i++) {
      var x = allZombie[i][0] - speed/2
      var y = allZombie[i][1]
      var health = allZombie[i][2]
     var type = allZombie[i][3]
      allZombie[i] = [x,y, health, type]

      if(allZombie[i][0]<0) {
       // console.log('should be gone')
       clearInterval(this.interval);
       this.setState({
         lost:'true'
       })
        allZombie.splice(i,1)
      }
    }
    this.setState({
      zombieLocations: allZombie
    })
  }

  addZombie() {
    var roundZombies = this.state.currentRound
    var allRounds = this.state.allRounds
    var count = roundZombies.round

    if(roundZombies.regularZombies===0 && roundZombies.hardenedZombies===0 &&roundZombies.badassZombies===0 && roundZombies.superbadassZombies===0 && this.state.zombieLocations.length===0 && this.state.bulletLocations.length===0) {

      if(count===allRounds.length) {
       // console.log(count,' inside if statement')
        clearInterval(this.interval);
        this.setState({
          start:false,
          win:'true',
          currentRound: allRounds[count-1]
        })
      } else{
      count = count+1;
      this.setState({
        currentRound: allRounds[count-1],
        start:false
      })
    }
    } else{

      var frame = this.state.frame;
      var loc = [1000,50]
      var lanes=[50,150,250,350,450]


      var y = lanes[Math.floor(Math.random()*5)]

      var health = 100;
      var type = 1;
      var allZombie = this.state.zombieLocations;

      if(frame%33===0 && roundZombies.regularZombies >0) {
        //console.log(roundZombies)
        roundZombies.regularZombies = roundZombies.regularZombies -1
        allZombie.push([1000, y, 100, 'regularZombies']);
      }
      if(frame%110===0 && roundZombies.hardenedZombies >0) {
      // console.log(roundZombies.hardenedZombies)
        roundZombies.hardenedZombies = roundZombies.hardenedZombies -1
        allZombie.push([1000, y, 200, 'hardenedZombies']);
      }
      this.setState({
        zombieLocations: allZombie,
        start:true,
        currentRound: roundZombies
      })

    }

  }

  stop() {
    clearInterval(this.interval);
  }

  render () {
    return (
      <div>
    <svg
      id='lawn'
      style={style}
      width='1000'
      height='500'
    >
      <Grid/>
      <Plant showPanel={this.showPanel} currentPlantSelected={this.state.currentPlantSelected} allPlants={this.state.allPlants} highlight = {this.state.showPanel}/>
      <Lawn  zombieLocations={this.state.zombieLocations} bulletLocations={this.state.bulletLocations}/>

    </svg>
    <div>
    <Panel showPanel={this.state.showPanel} plantLocation={this.state.currentPlantSelected} plantExist = {this.state.plantExist} buyPlant={this.buyPlant}/>
      {/* <button onClick={this.stopZombie}> Stop</button> */}

      </div>
      <div className='stats-container'>
        <div className='stats'>Round: {this.state.currentRound.round}</div>
        <div className='stats'>Kills: {this.state.killed}</div>
        <div className='stats'>Money: ${this.state.money}</div>
        <div className='stats'>Lost: {this.state.lost}</div>
        <div className='stats'>Win: {this.state.win}</div>
      </div>
      <div className='menu-buttons'>
      <button className='menu-button'onClick={this.stop}>Quit </button>
      <button className='menu-button' onClick={this.addZombie}> Start</button>

      </div>
    </div>
    )
  }
}

const style = {
  border: '1px solid black'
}
ReactDOM.render(<App />, document.getElementById('app'));