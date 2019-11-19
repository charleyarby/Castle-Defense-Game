import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Plant from './components/plant.jsx';
import Canvas from './components/canvas.jsx';
import Lawn from './components/lawn.jsx';
import Grid from './components/grid.jsx';
import Panel from './components/panel.jsx';
import plantsLocation from './components/plantConfig.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPlants: plantsLocation,
      currentPlantSelected:[],
      zombieLocations: [],
      bulletLocations: [],
      start:false,
      time:0,
      killed:0,
      startTime:0,
      frame:0,
      showPanel: false,
      plantExist:false,
      money:500
    }
    this.moveZombie = this.moveZombie.bind(this)
    this.stopZombie = this.stopZombie.bind(this)
    this.addBullet = this.addBullet.bind(this)
    this.moveBullet = this.moveBullet.bind(this)
    this.addZombie = this.addZombie.bind(this)
    this.collision = this.collision.bind(this)
    this.showPanel = this.showPanel.bind(this)
    this.buyPlant = this.buyPlant.bind(this)

  }

  componentDidMount() {


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
      this.moveBullet();
      if(this.state.start===true) {
        this.moveZombie();

      }
      //if(frame % 20 ===0 && this.state.start===true) {
     //   console.log('should add bullet')
        this.addBullet(null, 150, zombieLocations)
     // }

      if(frame % 50 ===0 && this.state.start===true) {
        this.addZombie()
      }
    }, 30)
  }

  buyPlant(plants, damage) {
    console.log('in buy')
    var currentPlant = this.state.currentPlantSelected
    currentPlant[2] = true;
    currentPlant[3] = plants;
    currentPlant[4] = damage
    this.setState({
      currentPlantSelected: currentPlant,
      plantExist:true
    })
  }

  showPanel(plant) {
    var newPlant = JSON.stringify([plant[0],plant[1]])
    var lastPlant = this.state.currentPlantSelected
    lastPlant = JSON.stringify([lastPlant[0],lastPlant[1]])
    console.log(lastPlant, 'current plant')

    console.log(newPlant, 'this is new plant')
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
        plantExist:plant[2]
      })
    }

  }

  collision(bulletLocations, bulleti, bulletX, bulletY, damage) {
    //console.log('ni colli')
    var bullets = bulletLocations;
    var zombies = this.state.zombieLocations;
    if(this.state.start===true) {

        for(var i=0; i<zombies.length; i++) {

          var zombieX = zombies[i][0]
          var zombieY = zombies[i][1]

          if(bulletX>zombieX-15 && bulletX<zombieX+15 && bulletY>zombieY-15 && bulletY<zombieY+15) {
           // console.log('collided')
            zombies[i][2] = zombies[i][2]-damage;
            bullets.splice(bulleti,1)
            //console.log(zombies[i][2])
            if(zombies[i][2]<=0) {
            zombies.splice(i,1)
            var kills = this.state.killed + 1
            this.setState({
              killed:kills
            })
            }


          }
        }

    }
    this.setState({
      bulletLocations: bullets,
      zombieLocations: zombies
    })
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
      this.collision(allBullet, i, x, y, damage)
    }
    this.setState({
      bulletLocations: allBullet
    })
  }

  addBullet(event, value, zLocation) {
    //console.log('in add bullet')
    var zombieInLane =[false, false, false, false, false]
    var allPlants = this.state.allPlants
    var frame = this.state.frame;
    console.log(frame)

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
    var newBullet = []
    for(var j=0; j<5; j++) {
      for(var i=0; i<allPlants[j].length; i++) {
        var damage=allPlants[j][i][4]
        var type=allPlants[j][i][3]
        if(allPlants[j][i][2] === true) {
          if(type=='Pea-Shooter' && frame % 10 ===0)
          newBullet.push([80,allPlants[j][i][1],damage, type])
          }
          if(type == 'Cabbage' && frame % 20 ===0) {
            newBullet.push([80,allPlants[j][i][1],damage, type])
          }
      }
    }



    var allBullet = this.state.bulletLocations;
    for(var i=0; i<newBullet.length; i++) {
      allBullet.push(newBullet[i])
    }



   this.setState({
      bulletLocations: allBullet
    })

  }
  moveZombie() {
    //console.log('in move zombie')
    var allZombie = this.state.zombieLocations;
    var speed=1
    if(this.state.time %10 ===0) {
      speed+=1
    }
    for(var i=0; i<allZombie.length; i++) {
      var x = allZombie[i][0] - speed
      var y = allZombie[i][1]
      var health = allZombie[i][2]
      allZombie[i] = [x,y, health]

      if(allZombie[i][0]<50) {
       // console.log('should be gone')
        allZombie.splice(i,1)
      }
    }
    this.setState({
      zombieLocations: allZombie
    })
  }

  addZombie() {
    // var start = Date.now()
    // this.setState({
    //   startTime:start
    // })
    var loc = [1000,50]
    var lanes=[50,150,250,350,450]


      var y = lanes[Math.floor(Math.random()*5)]
      //console.log(y)
      var health = 100;
      var type = 1;
      var allZombie = this.state.zombieLocations;
      allZombie.push([1000, y, health]);

     this.setState({
        zombieLocations: allZombie,
        start:true
      })



  }

  stopZombie() {
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
      <button onClick={this.stopZombie}> Stop</button>
      <button onClick={this.addZombie}> Start</button>
      </div>
      <div>Time: {this.state.time} seconds</div>
      <div>Kills: {this.state.killed}</div>
      <div>Money: ${this.state.money}</div>
    </div>
    )
  }
}

const style = {
  border: '1px solid black'
}
ReactDOM.render(<App />, document.getElementById('app'));