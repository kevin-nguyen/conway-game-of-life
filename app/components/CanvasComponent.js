import React, { Component } from 'react';
import World from '../logic/World'

function randomValue(minValue, maxValue) {
  return Math.floor(Math.random()*(maxValue - minValue) + minValue);
}

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.canvasRef;
    this.intervalKey;
    this.gameEnvironment;
    this.updateNode = this.updateNode.bind(this);
    this.updateWorld = this.updateWorld.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.state = {
      width: 300,
      height: 300,
    };
  }

  updateNode(node, ctx) {
    if (node.alive) {
      ctx.fillStyle = "teal";
      ctx.fillRect(node.xPos, node.yPos, node.width, node.width);
    }
  }

  updateWorld(nodeArray, ctx) {
    for (let i=0; i < nodeArray.length; i++) {
      this.updateNode(nodeArray[i], ctx);
    }
  }

  updateCanvas() {
    const nodeArray = this.gameEnvironment.nodeArray;
    const ctx = this.refs.myCanvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    ctx.save();
    // console.log("Colors:", "rgb("+red+", "+green+", "+blue+")");
    
    //ctx.fillRect(randomValue(this.state.width), randomValue(this.state.height), 10, 10);
    this.updateWorld(nodeArray, ctx);

    ctx.restore();
    //console.log("requestAnimationFrame", "called");
    this.gameEnvironment.update();
    requestAnimationFrame(this.updateCanvas)
  }

  componentWillMount() {
    this.gameEnvironment = new World(10, this.props.canvasWidth, this.props.canvasWidth);
    this.gameEnvironment.init();
    console.log(this.gameEnvironment);
  }

  componentDidMount() {
    requestAnimationFrame(this.updateCanvas);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      this.props.gameEnvironment.rescale(nextProps.width, nextProps.height);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.width !== this.props.width || nextProps.height !== this.props.height);
  }

  componentDidUpdate(prevProps, prevState) {
    requestAnimationFrame(this.updateCanvas);
    //this.props.gameEnvironment.update();
  }

  refCallback(canvasRef) {
    this.canvasRef = canvasRef
  }

  render() {
    return (
      <canvas ref="myCanvas" width={this.props.canvasWidth} height={this.props.canvasHeight} />
    );
  }
}
