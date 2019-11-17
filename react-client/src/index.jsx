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
      killed:0
    }
    this.moveZombie = this.moveZombie.bind(this)
    this.stopZombie = this.stopZombie.bind(this)
    this.addBullet = this.addBullet.bind(this)
    this.moveBullet = this.moveBullet.bind(this)
    this.addZombie = this.addZombie.bind(this)
    this.collision = this.collision.bind(this)

  }

  componentDidMount() {
    var start = Date.now()

    this.interval = setInterval(()=> {
      //console.log('hi')
      var now = Date.now()
      var seconds=0
      var bulletLocations = this.state.bulletLocations;
      var zombieLocations = this.state.zombieLocations;
      seconds=Math.floor((now-start)/1000)
      console.log(seconds)
      this.setState({
        time:seconds
      })
      this.moveBullet();
      if(this.state.start===true) {
        this.moveZombie();

      }
    }, 30)
  }

  collision(bulletLocations, bulleti, bulletX, bulletY) {
    //console.log('ni colli')
    var bullets = bulletLocations;
    var zombies = this.state.zombieLocations;
    if(this.state.start===true) {

        for(var i=0; i<zombies.length; i++) {

          var zombieX = zombies[i][0]
          var zombieY = zombies[i][1]

          if(bulletX>zombieX-15 && bulletX<zombieX+15 && bulletY>zombieY-15 && bulletY<zombieY+15) {
            console.log('collided')
            bullets.splice(bulleti,1)
            zombies.splice(i,1)
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
      allBullet[i] = [x,y]
      if(allBullet[i][0]>950) {
        console.log('should be gone')
        allBullet.splice(i,1)
      }
      this.collision(allBullet, i, x, y)
    }
    this.setState({
      bulletLocations: allBullet
    })
  }

  addBullet(event, value) {
    //console.log(value)
    var loc = [80,value]
    var allBullet = this.state.bulletLocations;
    allBullet.push(loc);

   this.setState({
      bulletLocations: allBullet
    })

  }
  moveZombie() {
    //console.log('in move zombie')
    var allZombie = this.state.zombieLocations;
    var speed=1
    if(this.state.time %10) {
      speed+=1
    }
    for(var i=0; i<allZombie.length; i++) {
      var x = allZombie[i][0] - speed
      var y = allZombie[i][1]
      allZombie[i] = [x,y]

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
    var loc = [1000,50]
    var lanes=[50,150,250,350,450]
    if(this.state.start===false) {
    this.interval = setInterval(()=> {
      var y = lanes[Math.floor(Math.random()*5)]
      //console.log(y)
      var allZombie = this.state.zombieLocations;
      allZombie.push([1000, y]);

     this.setState({
        zombieLocations: allZombie,
        start:true
      })

    }, 1000)
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
      <button onClick={this.moveZombie}> moveZombie</button>
      <button onClick={this.stopZombie}> stopZombie</button>
      <button onClick={this.addZombie}> Add Zombie</button>
      <div>{this.state.time}</div>
      <div>Kills: {this.state.killed}</div>
    </div>
    )
  }
}

const style = {
  border: '1px solid black'
}
ReactDOM.render(<App />, document.getElementById('app'));



