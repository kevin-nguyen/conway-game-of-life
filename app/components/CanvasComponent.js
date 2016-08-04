import React, { Component } from 'react';

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.canvasRef;
    this.intervalKey;
    //this.updateCanvas = this.updateCanvas.bind(this, this.refs.myCanvas);
    this.state = {
      width: 300,
      height: 300
    };
  }

  updateCanvas(canvasElement) {
    const ctx = canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.state.width, this.state.height);

    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
    console.log("Colors:", "rgb("+red+", "+green+", "+blue+")");
    ctx.fillStyle = "rgb("+red+", "+green+", "+blue+")";
    ctx.fillRect(0, 0, this.state.width-1, this.state.height-1);
    
  }

  componentDidMount() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.intervalKey = setInterval(this.updateCanvas.bind(this, this.refs.myCanvas), 1000);
  }

  refCallback(canvasRef) {
    this.canvasRef = canvasRef
  }

  render() {
    return (
      <canvas ref="myCanvas" width={this.state.width} height={this.state.height} />
    );
  }
}
