import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Zombie from './components/zombie.jsx';
import Plant from './components/plant.jsx';
import Canvas from './components/canvas.jsx';

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
    this.fireWeapon = this.fireWeapon.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(()=> {
      console.log('hi')
      this.fireWeapon();
    }, 1000)
  }
  pauseGame() {

  }
  fireWeapon() {
    console.log('fire')
    var loc = [0,50]
    var allBullet = this.state.bulletLocations;
    allBullet.push(loc);


      this.setState({
        bulletLocations: allBullet
      })



    // this.setState({
    //   bulletLocations: allBullet
    // })
    // var allBullet = this.state.bulletLocations;

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





      <Plant fireWeapon={this.fireWeapon}/>
      <Zombie  zombieLocations={this.state.zombieLocations} bulletLocations={this.state.bulletLocations}/>
    </svg>
      <button onClick={this.zombieMove}> zombieMove</button>
      <button onClick={this.zombieStop}> zombieStop</button>
    </div>
    )
  }
}

//const board={position:absolute}
const style = {
  border: '1px solid black'
}
ReactDOM.render(<App />, document.getElementById('app'));