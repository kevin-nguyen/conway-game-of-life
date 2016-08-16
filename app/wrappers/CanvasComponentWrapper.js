import React, {Component} from 'react'
import CanvasComponent from '../components/CanvasComponent'

export default class CanvasComponentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasHeight: 300,
      canvasWidth: 300,
    } 
  }

  componentWillMount() {
    var viewportWidth = document.documentElement.clientWidth;
    var viewportHeight = document.documentElement.clientHeight;
    //var gameWorld = new World(10, this.state.canvasWidth, this.state.canvasHeight);

    this.setState({
      canvasHeight: viewportHeight,
      canvasWidth: viewportWidth,
    })
  }

  handleResize(event) {
    console.log('Hello', "I'm resizing");
    this.setState({
      canvasHeight: document.documentElement.clientHeight,
      canvasWidth: document.documentElement.clientWidth
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  render() {
    return (
      <CanvasComponent 
        canvasHeight={this.state.canvasHeight} 
        canvasWidth={this.state.canvasWidth} 
        />
    );
  }
}

