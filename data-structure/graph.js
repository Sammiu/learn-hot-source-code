const UNDISCOVERED = 1;
const DISCOVERED = 2;
const VISITED = 3;
const CROSS = 4;
const EDGE_STATUS = { UNDETERMINED: 1, TREE: 2, CROSS: 3, FORWARD: 4, BACKWARD: 5 };

function Vertex(data) {
  this.data = data;
  this.status = UNDISCOVERED;
  this.priority = Number.MAX_SAFE_INTEGER;
}

function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype.addVertex = function (vertex) {
  if (!this.vertices.some(a => a.data === vertex.data)) {
    this.vertices.push(vertex);
    this.edges.push([]);
  }
}

Graph.prototype.addEdge = function (v, e) {
  const index = this.vertices.findIndex(a => a.data === v.data);
  if (index > -1) {
    this.edges[index].push(e);
  }
}

Graph.prototype.print = function () {
  this.vertices.forEach((item, index) => {
    console.log(item.data, this.edges[index].map(e => e.data).join('，'))
  })
}

Graph.prototype.reset = function () {
  this.vertices.forEach((item, index) => {
    item.status = UNDISCOVERED;
    this.edges[i].forEach(e => e.status = UNDISCOVERED);
  })
}

Graph.prototype.BFS = function (vertex) {
  const queue = [vertex];

  while (queue.length > 0) {
    const v = queue.pop();

    if (v.status !== VISITED || v.status) {
      console.log(v.data)
    }

    const index = this.vertices.findIndex(a => a.data === v.data)
    for (let j = this.edges[index].length - 1; j >= 0; j--) {
      const u = this.edges[index][j];
      if (u.status === UNDISCOVERED) {
        u.status = DISCOVERED;
        queue.push(u)
      } else {
        u.status = CROSS;
      }
    }

    v.status = VISITED;
  }
}

Graph.prototype.shortestPath = function (vertex, dist) {
  const paths = {};
  const index = this.vertices.findIndex(a => a.data === vertex.data);
  this.edges[index].forEach(v => {
    paths[v.data] = [v];
    this.find(v, 'G', paths, v.data);
  })
  console.log(paths)
}

Graph.prototype.find = function (edge, dist, paths, key) {
  const index = this.vertices.findIndex(a => a.data === edge.data);
  let hasDist = false
  for (let i = 0; i < this.edges[index].length; i++) {
    const e = this.edges[index][i];
    if (e.data === dist) {
      break;
    } else {
      paths[key].push(e)
      this.find(e, dist, paths, key);
    }
  }
}

function createGraph() {
  const vertexA = new Vertex('A')
  const vertexB = new Vertex('B')
  const vertexC = new Vertex('C')
  const vertexD = new Vertex('D')
  const vertexE = new Vertex('E')
  const vertexF = new Vertex('F')
  const vertexG = new Vertex('G')
  const vertexH = new Vertex('H')
  const vertexI = new Vertex('I')
  const graph = new Graph();
  graph.addVertex(vertexA);
  graph.addVertex(vertexB);
  graph.addVertex(vertexC);
  graph.addVertex(vertexD);
  graph.addVertex(vertexE);
  graph.addVertex(vertexF);
  graph.addVertex(vertexG);
  graph.addVertex(vertexH);
  graph.addVertex(vertexI);
  graph.addEdge(vertexA, vertexB)
  graph.addEdge(vertexA, vertexC)
  graph.addEdge(vertexA, vertexD)
  graph.addEdge(vertexB, vertexA)
  graph.addEdge(vertexB, vertexE)
  graph.addEdge(vertexB, vertexF)
  graph.addEdge(vertexC, vertexA)
  graph.addEdge(vertexC, vertexD)
  graph.addEdge(vertexC, vertexG)
  graph.addEdge(vertexD, vertexA)
  graph.addEdge(vertexD, vertexC)
  graph.addEdge(vertexD, vertexG)
  graph.addEdge(vertexD, vertexH)
  graph.addEdge(vertexE, vertexB)
  graph.addEdge(vertexE, vertexI)
  graph.addEdge(vertexF, vertexB)
  graph.addEdge(vertexG, vertexC)
  graph.addEdge(vertexG, vertexD)
  graph.addEdge(vertexH, vertexD)
  graph.addEdge(vertexI, vertexE)
  graph.addEdge(vertexI, vertexG);

  return graph;
}

const graph = createGraph();
graph.shortestPath(new Vertex('A'), 'G')
// graph.print();
// graph.BFS(vertexA);