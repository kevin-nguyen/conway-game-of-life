export default class Node {
  constructor(nodeSize, xPosition, yPosition) {
    this.width = nodeSize;
    this.alive = Math.random() < .3 ? true : false;
    this.willDie = false;
    this.xPos = xPosition;
    this.yPos = yPosition;
  }
}