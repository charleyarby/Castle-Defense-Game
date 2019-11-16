import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Zombie from './components/Zombie.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      location: [1000,200]
    }
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  start() {

        this.interval = setInterval(() => {
        var x = this.state.location[0] -1
        var y = this.state.location[1]
        this.setState({
          location: [x,y]
        })
      }, 30);

  }

  stop() {
    clearInterval(this.interval);
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <button onClick={this.start}> Start</button>
      <button onClick={this.stop}> Stop</button>
      <Zombie items={this.state.items} location={this.state.location}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));