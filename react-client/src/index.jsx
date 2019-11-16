import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Plant from './components/plant.jsx';
import Canvas from './components/canvas.jsx';
import Lawn from './components/lawn.jsx';
import Grid from './components/grid.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      zombieLocations: [200,50],
      bulletLocations: []
    }
    this.zombieMove = this.zombieMove.bind(this)
    this.zombieStop = this.zombieStop.bind(this)
    this.addBullet = this.addBullet.bind(this)
    this.moveBullet = this.moveBullet.bind(this)

  }

  componentDidMount() {
    this.interval = setInterval(()=> {
      console.log('hi')
      this.moveBullet();
    }, 1000)
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

  addBullet() {
    console.log('fire')
    var loc = [60,50]
    var allBullet = this.state.bulletLocations;
    allBullet.push(loc);

   this.setState({
      bulletLocations: allBullet
    })

  }
  zombieMove() {

        this.interval = setInterval(() => {
        var x = this.state.zombieLocations[0] -1
        var y = this.state.zombieLocations[1]
        this.setState({
          zombieLocations: [x,y]
        })
      }, 30);

  }

  zombieStop() {
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
      <button onClick={this.zombieMove}> zombieMove</button>
      <button onClick={this.zombieStop}> zombieStop</button>
    </div>
    )
  }
}

const style = {
  border: '1px solid black'
}
ReactDOM.render(<App />, document.getElementById('app'));