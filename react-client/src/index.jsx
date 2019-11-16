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
      bulletLocations: []
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
      this.moveBullet();
      this.moveZombie();
     // console.log(this.state.bulletLocationsm, 'this is bullet loc')
      var bulletLocations = this.state.bulletLocations;
      var zombieLocations = this.state.zombieLocations;
      this.collision(this.state.bulletLocations, this.state.zombieLocations)
    }, 40)
  }
  collision(bulletLocations, zombieLocations) {
    console.log('ni colli')
    var bullets = bulletLocations;
    var zombies = zombieLocations;
    for(var i=0; i<bulletLocations.length; i++) {

      for(var j=0; j<bullets.length; j++) {
        // var bulletString = JSON.stringify(bullets[i])
        // var zombieString = JSON.stringify(zombies[i])
        var bulletX = bullets[i][0]
        var zombieX = zombies[i][0]

        if(bulletX>zombieX-3 && bulletX<zombieX+3) {
          console.log('collided')
          bullets.splice(i,1)
          zombies.splice(j,1)
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
      var x = allBullet[i][0] + 2
      var y = allBullet[i][1]
      allBullet[i] = [x,y]
    }
    this.setState({
      bulletLocations: allBullet
    })
  }

  addBullet(event, value) {
    console.log(value)
    var loc = [80,value]
    var allBullet = this.state.bulletLocations;
    allBullet.push(loc);

   this.setState({
      bulletLocations: allBullet
    })

  }
  moveZombie() {

    var allZombie = this.state.zombieLocations;
    for(var i=0; i<allZombie.length; i++) {
      var x = allZombie[i][0] - 2
      var y = allZombie[i][1]
      allZombie[i] = [x,y]
    }
    this.setState({
      zombieLocations: allZombie
    })
  }

  addZombie() {
    var loc = [1000,50]
    var allZombie = this.state.zombieLocations;
    allZombie.push(loc);

   this.setState({
      zombieLocations: allZombie
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
      <Plant addBullet={this.addBullet}/>
      <Lawn  zombieLocations={this.state.zombieLocations} bulletLocations={this.state.bulletLocations}/>
    </svg>
      <button onClick={this.moveZombie}> moveZombie</button>
      <button onClick={this.stopZombie}> stopZombie</button>
      <button onClick={this.addZombie}> Add Zombie</button>
    </div>
    )
  }
}

const style = {
  border: '1px solid black'
}
ReactDOM.render(<App />, document.getElementById('app'));