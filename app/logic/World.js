import Node from './Node'

export default class World {
  constructor(nodeSize, viewportWidth, viewportHeight) {
    this.nodeArray = [];
    this.nodeSize = nodeSize;
    this.cycles = 0;
    this.rows = Math.floor(viewportHeight / nodeSize);
    this.columns = Math.floor(viewportWidth / nodeSize);
    this.totalNumOfNodes = 0;
    this.numOfLiveCells = 0;
    this.totalNumOfCells = 0;
  }

  init() {
    this.totalNumOfNodes = this.rows * this.columns;

    for (let i = 0; i < this.totalNumOfNodes; i++) {
      const xPos = (i % this.columns) * this.nodeSize;
      const yPos = Math.floor(i / this.columns) * this.nodeSize;
      const cell = new Node(this.nodeSize, xPos, yPos);
      this.nodeArray.push(cell);
      this.numOfLiveCells += cell.alive ? 1 : 0;
      this.totalNumOfCells = this.numOfLiveCells;
    }
    console.log("init():", "Hello");
  }

  restart() {
    this.init(); // Need to fix: does not factor in window resize
  }

  checkForNeighbors(node, index) {
    const DIRECTIONS = [index-1, index+1, 
                        index-(this.columns + 1), index-this.columns, index-(this.columns-1), 
                        index+(this.columns - 1), index+this.columns, index+(this.columns+1)];
    const [LEFT, RIGHT, TOP_LEFT, TOP, TOP_RIGHT, BOTTOM_LEFT, BOTTOM, BOTTOM_RIGHT] = DIRECTIONS;
    var liveNeighbors = 0;

    DIRECTIONS.forEach((cellIndex) => {
      if (cellIndex >=0 && cellIndex < this.totalNumOfNodes) {
        liveNeighbors += this.nodeArray[cellIndex].alive ? 1 : 0;
      }
    });

    if (node.alive) {
      // Cell dies if neighbors < 2 || neighbors > 3
      node.alive = liveNeighbors < 2 || liveNeighbors > 3 ? false : true;
    } else {
      // Conceive new cell if 3 neighbors
      node.alive = liveNeighbors === 3 ? true : false;
    }
  }

  update() {
    for (let i = 0; i < this.totalNumOfNodes; i++) {
      this.checkForNeighbors(this.nodeArray[i], i);
    }
  }
}