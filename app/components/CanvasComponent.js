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
      ctx.fillStyle = "#0FF";
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
    this.setState({
      width: this.props.canvasWidth, 
      height: this.props.canvasHeight
    });
    
  }

  componentDidMount() {
    this.gameEnvironment = new World(15, this.state.width, this.state.height);
    this.gameEnvironment.init();
    console.log(this.gameEnvironment);
    requestAnimationFrame(this.updateCanvas);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.canvasWidth !== this.props.canvasWidth || nextProps.canvasHeight !== this.props.canvasHeight) {
      this.setState({width: nextProps.canvasWidth, 
                     height: nextProps.canvsHeight});
      this.gameEnvironment.rescale(nextProps.canvsWidth, nextProps.canvsHeight);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.canvasWidth !== this.props.canvasWidth || nextProps.canvasHeight !== this.props.canvasHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    //requestAnimationFrame(this.updateCanvas);
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
