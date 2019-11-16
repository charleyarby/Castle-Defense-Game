import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Plant from './components/plant.jsx';
import Canvas from './components/canvas.jsx';
import Lawn from './components/lawn.jsx';
import Grid from './components/grid.jsx'
import collision from './functions/collision.js'

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

  }

  componentDidMount() {
    this.interval = setInterval(()=> {
      console.log('hi')
      this.moveBullet();
      this.moveZombie();
      collision()
    }, 100)
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

  addBullet(event) {
    var target = event.target;
    var value = target.value;
    console.log(target, 'this is target')
    console.log(name, 'this is name')
    console.log('fire')
    var loc = [80,50]
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