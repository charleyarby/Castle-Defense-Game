import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Plant from './components/plant.jsx';
import Canvas from './components/canvas.jsx';
import Lawn from './components/lawn.jsx';
import Grid from './components/grid.jsx'
//import collision from './functions/collision.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      zombieLocations: [],
      bulletLocations: [],
      start:false,
      time:0,
      killed:0,
      startTime:0,
      frame:0
    }
    this.moveZombie = this.moveZombie.bind(this)
    this.stopZombie = this.stopZombie.bind(this)
    this.addBullet = this.addBullet.bind(this)
    this.moveBullet = this.moveBullet.bind(this)
    this.addZombie = this.addZombie.bind(this)
    this.collision = this.collision.bind(this)

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
    }, 1000)
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
            console.log('collided')
            zombies[i][2] = zombies[i][2]-damage;
            bullets.splice(bulleti,1)
            console.log(zombies[i][2])
            if(zombies[i][2]<=0) {
            zombies.splice(i,1)
            }
            var kills = this.state.killed + 1
            this.setState({
              killed:kills
            })
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
      allBullet[i] = [x,y, damage]
      if(allBullet[i][0]>1000) {
       // console.log('should be gone')
        allBullet.splice(i,1)
      }
      this.collision(allBullet, i, x, y, damage)
    }
    this.setState({
      bulletLocations: allBullet
    })
  }

  addBullet(event, value) {

    var damage =10;
    //console.log(value)
    var loc = [80, value, 10]
    var allBullet = this.state.bulletLocations;
    allBullet.push(loc);
   // console.log(loc)
    //console.log(allBullet)
   this.setState({
      bulletLocations: allBullet
    })

    // event.disabled = true;
    // setTimeout(function() {
    //     event.disabled = false;
    // }, 2000);

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
        console.log('should be gone')
        allZombie.splice(i,1)
      }
    }
    this.setState({
      zombieLocations: allZombie
    })
  }

  addZombie() {
    var start = Date.now()
    this.setState({
      startTime:start
    })
    var loc = [1000,50]
    var lanes=[50,150,250,350,450]
    if(this.state.start===false) {
    this.interval = setInterval(()=> {
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

    }, 4000)
   }


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
      <Plant addBullet={this.addBullet}/>
      <Lawn  zombieLocations={this.state.zombieLocations} bulletLocations={this.state.bulletLocations}/>
    </svg>
    <div>
      <button onClick={this.moveZombie}> moveZombie</button>
      <button onClick={this.stopZombie}> stopZombie</button>
      <button onClick={this.addZombie}> Add Zombie</button>
      </div>
      <div>Time: {this.state.time} seconds</div>
      <div>Kills: {this.state.killed}</div>
    </div>
    )
  }
}

const style = {
  border: '1px solid black'
}
ReactDOM.render(<App />, document.getElementById('app'));



