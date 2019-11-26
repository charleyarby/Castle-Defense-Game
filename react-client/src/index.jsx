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
import Stats from './components/stats.jsx'
import UIFx from 'uifx';
import Laser from './SFX/laser.mp3';
import SFXSplatter from './SFX/splatter.mp3';
import SFXMissile from './SFX/missileImpact.mp3';
import './styles/index.css';
import Impact from './components/impact.jsx';
import grass from './pictures/grassNew.jpg'
const splatter = new UIFx(SFXSplatter);
const laserSFX = new UIFx(Laser);
const missileImpactSFX = new UIFx(SFXMissile);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPlants: plantsLocation,
      currentPlantSelected: [],
      zombieLocations: [],
      bulletLocations: [],
      allRounds: Rounds,
      currentRound: {},
      impactLocations: [],
      start: false,
      time: 0,
      killed: 0,
      startTime: 0,
      frame: 0,
      showPanel: false,
      plantExist: false,
      money: 7000,
      lost: 'Not Yet',
      win: 'TBD'
    }
    this.moveZombie = this.moveZombie.bind(this)
    this.addBullet = this.addBullet.bind(this)
    this.moveBullet = this.moveBullet.bind(this)
    this.addZombie = this.addZombie.bind(this)
    this.collision = this.collision.bind(this)
    this.showPanel = this.showPanel.bind(this)
    this.buyPlant = this.buyPlant.bind(this)
    this.stop = this.stop.bind(this)
    this.sellPlant = this.sellPlant.bind(this)
    this.impact = this.impact.bind(this)
    this.removeZombie = this.removeZombie.bind(this)
    this.rotateTower = this.rotateTower.bind(this)
  }

  componentDidMount() {
    this.setState({
      currentRound: this.state.allRounds[0]
    })

    this.interval = setInterval(() => {
      //console.log('hi')
      var frame = this.state.frame;

      var bulletLocations = this.state.bulletLocations;
      var zombieLocations = this.state.zombieLocations;
      if (this.state.start === true) {
        frame++;
        var now = Date.now()
        var seconds = 0
        var start = this.state.startTime
        seconds = Math.floor((now - start) / 1000)
        //console.log(seconds)
        this.setState({
          time: seconds,
          frame: frame
        })
      }

      if (this.state.start === true) {
        this.addZombie()
        this.moveBullet();
        this.addBullet(null, 150, zombieLocations)
        this.moveZombie();
        this.removeZombie()
        this.rotateTower();
      }

    }, 30)
  }

  rotateTower() {
    var allZombies = this.state.zombieLocations;
    var allPlants = this.state.allPlants;

    if (allZombies.length !== 0) {
      var closestZombie = allZombies[0]
      for (var k = 0; k < allZombies.length; k++) {
        if (allZombies[k][0] < closestZombie[0]) {
          closestZombie = allZombies[k]
        }
      }
    }
    if (allZombies.length !== 0) {
      for (var i = 0; i < allPlants.length; i++) {
        for (var j = 0; j < allPlants[i].length; j++) {
          if (allPlants[i][j][3] === "Missile") {
            var xDiff = closestZombie[0] - allPlants[i][j][0]
            var yDiff = closestZombie[1] - allPlants[i][j][1]
            var rotate = Math.atan(yDiff / xDiff) * 57.2958
            allPlants[i][j][5] = rotate
          }
        }
      }
    }
  }

  removeZombie() {
    var zombies = this.state.zombieLocations
    for (var k = 0; k < zombies.length; k++) {
      if (zombies[k][2] <= 0) {
        zombies.splice(k, 1)
        var kills = this.state.killed + 1
        var newIncome = 50
        var currentMoney = this.state.money;
        this.setState({
          killed: kills,
          money: currentMoney + newIncome,
          zombieLocations: zombies
        })
      }
    }
  }
  impact() {
    var frame = this.state.frame;
    var allImpact = this.state.impactLocations.slice()

    setTimeout(() => {
      //allImpact.shift()
      this.setState({
        impactLocations: []
      })
    }, 80)



  }

  sellPlant() {
    console.log('sell plant')
    var currentPlant = this.state.currentPlantSelected.slice()
    var allPlants = this.state.allPlants.slice()
    var moneyBack = 0;
    var currentMoney = this.state.money
    for (var i = 0; i < allPlants.length; i++) {

      for (var j = 0; j < allPlants[i].length; j++) {
        //  console.log(allPlants[i][j][0])
        if (currentPlant[0] === allPlants[i][j][0] && currentPlant[1] === allPlants[i][j][1]) {
          //   console.log('found plant')
          allPlants[i][j] = [currentPlant[0], currentPlant[1], false, '', 0]
          if (currentPlant[3] === 'Pea-Shooter') {
            moneyBack = 150
            currentMoney += moneyBack
          } else if (currentPlant[3] === 'Bomb') {
            moneyBack = 225
            currentMoney += moneyBack
          }
        }
      }
    }
    this.setState({
      currentPlantSelected: [],
      allPlants: allPlants,
      money: currentMoney
    })
  }
  buyPlant(plants, damage) {
    console.log(plants)
    var currentPlot = this.state.currentPlantSelected
    var currentPlant = this.state.currentPlantSelected
    var currentMoney = this.state.money
    var frame = this.state.frame
    currentPlant[3] = plants;
    currentPlant[4] = damage

    var cost = 0

    if (plants === 'Pea-Shooter') {
      //  console.log('buy peashooter')
      cost = 200
      currentPlant[7] = frame%50
      currentPlant[8] = 50
    }
    if (plants === 'Bomb') {
      //console.log('buy Bomb')
      cost = 300
      currentPlant[7] = frame%50
      currentPlant[8] = 80
    }
    if (plants === 'Laser') {
      //console.log('buy Bomb')
      cost = 400
      currentPlant[7] = frame%100
      currentPlant[8] = 100
    }
    if (plants === 'Missile') {
      //console.log('buy Bomb')
      cost = 500
      currentPlant[7] = frame%20
      currentPlant[8] = 20
    }


    if (currentMoney >= cost) {
      currentPlant[2] = true;
      currentMoney -= cost
      this.setState({
        currentPlantSelected: [],
        plantExist: true,
        money: currentMoney
      })
    } else if (currentMoney < cost) {
      currentPlant[2] = false;
      this.setState({
        plantExist: false,
        money: currentMoney,
        currentPlantSelected: currentPlot
      })
    }

  }

  showPanel(plant) {
    //console.log(plant)
    var newPlant = JSON.stringify([plant[0], plant[1]])
    var lastPlant = this.state.currentPlantSelected
    // console.log(lastPlant)
    lastPlant = JSON.stringify([lastPlant[0], lastPlant[1]])
    // console.log(lastPlant, 'current plant')

    //console.log(newPlant, 'this is new plant')
    if (this.state.showPanel === false || lastPlant !== newPlant) {
      // console.log('should show panel')
      //console.log(plant, 'this is plant')
      this.setState({
        showPanel: true,
        currentPlantSelected: plant,
        plantExist: plant[2]
      })
      // console.log(this.state)
    } else if (this.state.showPanel === true) {
      this.setState({
        showPanel: false,
        plantExist: plant[2],
        currentPlantSelected: []
      })
    }

  }

  collision() {
    //console.log('ni colli')
    var frame = this.state.frame;
    var bullets = this.state.bulletLocations.slice()
    var zombies = this.state.zombieLocations.slice();
    if (this.state.start === true) {
      if (zombies.length !== 0) {
        var impactL = this.state.impactLocations.slice();
        for (var i = 0; i < zombies.length; i++) {
          if (bullets.length !== 0) {
            for (var j = 0; j < bullets.length; j++) {
              if (zombies.length !== 0) {
                var zombieX = zombies[i][0]
                var zombieY = zombies[i][1]
              }
              var bX = bullets[j][0]
              var bY = bullets[j][1]


              if (bullets[j][3] === 'Laser' && frame % 5 == 0) {
                console.log('laser damage')
                for (var k = 0; k < zombies.length; k++) {//laser damage
                  var zombieRX = zombies[k][0]
                  var zombieRY = zombies[k][1]
                  if (bY >= zombieRY - 15 && bY <= zombieRY + 15) {
                    console.log('hit')
                    zombies[k][2] = zombies[k][2] - bullets[j][2];
                  }
                }
                bullets.splice(j, 1)

                this.setState({
                  bulletLocations: bullets,
                  impactLocations: impactL
                })
                this.removeZombie()
              }
              if (bX > zombieX - 15 && bX < zombieX + 15 && bY > zombieY - 15 && bY < zombieY + 15) {

                if (bullets[j][3] === 'Pea-Shooter' || bullets[j][3] === 'Missile' && zombies.length !== 0) {
                  zombies[i][2] = zombies[i][2] - bullets[j][2];
                  // bullets.splice(j,1)
                } else if (bullets[j][3] === 'Bomb') {
                  for (var k = 0; k < zombies.length; k++) {//splash damage Bomb
                    var zombieRX = zombies[k][0]
                    var zombieRY = zombies[k][1]
                    if (bX >= zombieRX - 100 && bX <= zombieRX + 100 && bY >= zombieRY - 100 && bY <= zombieRY + 100) {
                      console.log('hit')
                      zombies[k][2] = zombies[k][2] - bullets[j][2];
                    }
                  }
                }
                impactL.push(bullets[j])
                if (bullets[j][3] === 'Missile') {
                  missileImpactSFX.play()
                }


                if (bullets[j][3] === 'Pea-Shooter' || bullets[j][3] === 'Bomb') {
                  splatter.play();
                }
                bullets.splice(j, 1)
                this.setState({
                  bulletLocations: bullets,
                  impactLocations: impactL
                })
                this.impact()
                for (var k = 0; k < zombies.length; k++) {
                  if (zombies[k][2] <= 0) {
                    zombies.splice(k, 1)
                    var kills = this.state.killed + 1
                    var newIncome = 50
                    var currentMoney = this.state.money;
                    this.setState({
                      killed: kills,
                      money: currentMoney + newIncome,
                      zombieLocations: zombies
                    })
                  }
                }

              }
            }
          }
        }
      }
    }

  }
  moveBullet() {
    var allBullet = this.state.bulletLocations;
    var allZombies = this.state.zombieLocations;
    for (var i = 0; i < allBullet.length; i++) {
      if (allBullet[i][3] == 'Bomb' || allBullet[i][3] == 'Pea-Shooter') {
        var x = allBullet[i][0] + 10
        var y = allBullet[i][1]
        var damage = allBullet[i][2]
        var type = allBullet[i][3]
        allBullet[i] = [x, y, damage, type]
        if (allBullet[i][0] > 1000) {
          allBullet.splice(i, 1)
        }
      } else if (allBullet[i][3] == 'Missile') {

        var closestZombie = allZombies[0]
        var x = allBullet[i][0]
        var y = allBullet[i][1]
        var damage = allBullet[i][2]
        var type = allBullet[i][3]
        var moveY = 0;
        var xDiff = 0;
        var yDiff = 0;
        var xProp = 0;
        var yProp = 0;
        for (var k = 0; k < allZombies.length; k++) {
          if (allZombies[k][0] < closestZombie[0]) {
            closestZombie = allZombies[k]
          }
        }
        if (allZombies.length !== 0) {
          xDiff = closestZombie[0] - x;
          //console.log(xDiff, 'xdiff')
          xProp = xDiff / (1000 - x)
          //console.log(xProp, 'x Prop')
          yDiff = (1 - xProp) * Math.abs(closestZombie[1] - y) / 5;
          // console.log(closestZombie[1] - y, 'abs y dff')
          // console.log(yDiff, 'y diff')
          if (closestZombie[1] > y) {
            y = y + yDiff
            x = allBullet[i][0] + 10
          } else if (closestZombie[1] < y) {
            y = y - yDiff
            x = allBullet[i][0] + 10
          } else if (closestZombie[1] == y) {
            // console.log(allBullet)
            x = allBullet[i][0] + 10
          }
        } else {
          x = allBullet[i][0] + 10;
        }
        allBullet[i] = [x, y, damage, type]
        if (allZombies.length !== 0) {
          var xDiff = closestZombie[0] - allBullet[i][0]
          var yDiff = closestZombie[1] - allBullet[i][1]
          var rotate = Math.atan(yDiff / xDiff) * 57.2958
          if(xDiff>40) {
          allBullet[i][4] = rotate
          } else {
            allBullet[i][4] = 0
          }
        } else {
          allBullet[i][4] = 0
        }
        if (allBullet[i][0] > 1000) {
          allBullet.splice(i, 1)
        }

      }
    }
    this.collision()
  }

  addBullet(event, value, zLocation) {
    //console.log('in add bullet')
    var zombieInLane = [false, false, false, false, false]
    var allPlants = this.state.allPlants
    var frame = this.state.frame;
    //console.log(frame)

    for (var i = 0; i < zLocation.length; i++) {
      if (zLocation[i][1] === 50) {
        zombieInLane[0] = true;
      }
      if (zLocation[i][1] === 150) {
        zombieInLane[1] = true;
      }
      if (zLocation[i][1] === 250) {
        zombieInLane[2] = true;
      }
      if (zLocation[i][1] === 350) {
        zombieInLane[3] = true;
      }
      if (zLocation[i][1] === 450) {
        zombieInLane[4] = true;
      }

    }
    //console.log(zombieInLane)
    var newBullet = []
    for (var j = 0; j < 5; j++) {
      for (var i = 0; i < allPlants[j].length; i++) {
        var exist = allPlants[j][i][2]
        var type = allPlants[j][i][3]
        var damage = allPlants[j][i][4]
        var firerate = allPlants[j][i][8]
        //console.log(type)
        if (exist === true && zombieInLane[j] === true) {

          if (type == 'Pea-Shooter' && frame % firerate === allPlants[j][i][7]) {
            newBullet.push([allPlants[j][i][0] + 50, allPlants[j][i][1], damage, type])
          }
          if (type == 'Bomb' && frame % firerate === allPlants[j][i][7]) {
            newBullet.push([allPlants[j][i][0] + 50, allPlants[j][i][1], damage, type])
          }
          if (type == 'Laser' && frame % firerate === allPlants[j][i][7]) {
            newBullet.push([allPlants[j][i][0] + 50, allPlants[j][i][1], damage, type])
            laserSFX.play();
          }
          if (type == 'Missile' && frame % firerate === allPlants[j][i][7]) {
            // console.log('new missile')
            newBullet.push([allPlants[j][i][0] + 50, allPlants[j][i][1], damage, type, 0])
          }
        } else if (exist === true && this.state.zombieLocations.length !== 0) {
          if (type == 'Missile' && frame % firerate === allPlants[j][i][7]) {
            //console.log('new missile')
            newBullet.push([allPlants[j][i][0] + 50, allPlants[j][i][1], damage, type, 0])
          }
        }
      }
    }

    var allBullet = this.state.bulletLocations;
    for (var i = 0; i < newBullet.length; i++) {
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
    var speed = 1
    if (this.state.time % 10 === 0) {
      speed += 1
    }
    for (var i = 0; i < allZombie.length; i++) {
      var x = allZombie[i][0] - speed / 2
      var y = allZombie[i][1]
      var health = allZombie[i][2]
      var type = allZombie[i][3]
      allZombie[i] = [x, y, health, type]

      if (allZombie[i][0] < 0) {
        // console.log('should be gone')
        clearInterval(this.interval);
        this.setState({
          lost: 'true'
        })
        allZombie.splice(i, 1)
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
    this.setState({
      start: true,
    })
    if (roundZombies.regularZombies === 0 && roundZombies.hardenedZombies === 0 && roundZombies.badassZombies === 0 && roundZombies.superbadassZombies === 0 && this.state.zombieLocations.length === 0 && this.state.bulletLocations.length === 0 && this.state.start === true) {
      //  console.log('zombie 0')
      // console.log(count)
      if (count === allRounds.length) {
        // console.log(count,' inside if statement')
        //clearInterval(this.interval);
        this.setState({
          start: false,
          win: 'You won',
          lost: `You didn't lose`,
          currentRound: allRounds[count - 1]
        })
      } else {
        count = count + 1;
        this.setState({
          currentRound: allRounds[count - 1],
          start: false
        })
      }
    } else {
      //console.log('next round')
      var frame = this.state.frame;
      var loc = [1000, 50]
      var lanes = [50, 150, 250, 350, 450]


      var y = lanes[Math.floor(Math.random() * 5)]

      var health = 100;
      var type = 1;
      var allZombie = this.state.zombieLocations;

      if (frame % Math.floor(33 * (1 - (count / (this.state.allRounds.length + 1)))) === 0 && roundZombies.regularZombies > 0) {
        //console.log(roundZombies)
        roundZombies.regularZombies = roundZombies.regularZombies - 1
        allZombie.push([1000, y, 100, 'regularZombies']);
      }
      if (frame % Math.floor(110 * (1 - (count / (this.state.allRounds.length + 1)))) === 0 && roundZombies.hardenedZombies > 0) {
        // console.log(roundZombies.hardenedZombies)
        roundZombies.hardenedZombies = roundZombies.hardenedZombies - 1
        allZombie.push([1000, y, 200, 'hardenedZombies']);
      }
      this.setState({
        zombieLocations: allZombie,
        start: true,
        currentRound: roundZombies
      })

    }

  }

  stop() {
    this.state.start = false;
  }

  render() {
    return (
      <div>
        <svg
          id='lawn'
          style={style}
          width='1000'
          height='500'
        >
          <image href={grass} x="0" y="0" height="100%" width="100%" />
          <Grid />
          <Plant showPanel={this.showPanel} currentPlantSelected={this.state.currentPlantSelected} allPlants={this.state.allPlants} highlight={this.state.showPanel} />
          <Lawn zombieLocations={this.state.zombieLocations} bulletLocations={this.state.bulletLocations} />
          <Impact impactLocations={this.state.impactLocations} />

        </svg>
        <div>
          <Panel showPanel={this.state.showPanel} plantLocation={this.state.currentPlantSelected} plantExist={this.state.plantExist} buyPlant={this.buyPlant} sellPlant={this.sellPlant} />
          {/* <button onClick={this.stopZombie}> Stop</button> */}

        </div>
        <Stats round={this.state.currentRound.round} kills={this.state.killed} money={this.state.money} lost={this.state.lost} win={this.state.win} />

        <div className='menu-buttons'>
          <button className='menu-button' onClick={this.stop}>Pause </button>
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