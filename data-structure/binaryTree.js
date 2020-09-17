function BinaryTree(data) {
  this.size = 0;
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
}


BinaryTree.prototype.insertLC = function (data) {
  const lChildNode = new BinaryTree(data);
  this.leftChild = lChildNode;
  return lChildNode;
}

BinaryTree.prototype.insertRC = function (data) {
  const rChildNode = new BinaryTree(data)
  this.rightChild = rChildNode;
  return rChildNode;
}

BinaryTree.prototype.traverse = function () {
  const stack = [this];
  while (stack.length > 0) {
    const binNode = stack.shift()

    if (binNode.leftChild) {
      stack.unshift(binNode.leftChild)
    }
    this.visit(binNode);
    if (binNode.rightChild) {
      stack.unshift(binNode.rightChild)
    }
  }
}

BinaryTree.prototype.recursionTraverse = function (node) {
  const stack = [node];
  let binNode;
  while (stack.length > 0) {
    if (!binNode.leftChild) {
      binNode = stack.pop();
 
    }
    this.visit(binNode)

    binNode = binNode.leftChild;

    if (binNode.rightChild) {
      stack.push(binNode.rightChild)
    }
  }
}

BinaryTree.prototype.visit = function (node) {
  console.log(node.data)
}

function createBinaryTreeNode(array, index) {
  if (index < array.length) {
    const node = new BinaryTree(array[index]);
    node.leftChild = createBinaryTreeNode(array, index * 2 + 1);
    node.rightChild = createBinaryTreeNode(array, index * 2 + 2);
    return node;
  }
  return null;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const binNode = createBinaryTreeNode(array, 0);
binNode.recursionTraverse(binNode);




