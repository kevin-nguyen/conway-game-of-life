import React, { Component } from 'react';

function randomValue(maxValue) {
  return Math.floor(Math.random()*maxValue);
}

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.canvasRef;
    this.intervalKey;
    this.updateCanvas = this.updateCanvas.bind(this);
    this.state = {
      width: 300,
      height: 300
    };
  }

  updateCanvas() {
    const ctx = this.refs.myCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    ctx.save();
    // console.log("Colors:", "rgb("+red+", "+green+", "+blue+")");
    ctx.fillStyle = "teal";
    ctx.fillRect(randomValue(this.state.width), randomValue(this.state.height), 10, 10);
    
    ctx.restore();
    requestAnimationFrame(this.updateCanvas)
  }

  componentDidMount() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }

  componentDidUpdate(prevProps, prevState) {
    requestAnimationFrame(this.updateCanvas);
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
