import { Node } from "./node.js";
import { prepareArray, prettyPrint, getSuccessor } from "./util.js";
export class Tree {
  constructor(array) {
    this.array = prepareArray(array);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }

  insert(value) {
    let prevNode = null;
    let currentNode = this.root;

    while (currentNode !== null) {
      prevNode = currentNode;
      if (value < currentNode.data) {
        prevNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        {
          prevNode = currentNode;
          currentNode = currentNode.right;
        }
      } else {
        return;
      }
    }
    if (prevNode.data > value) {
      prevNode.left = new Node(value);
      return;
    } else if (prevNode.data < value) {
      prevNode.right = new Node(value);
      return;
    } else {
      return;
    }
  }

  delete(value, root = this.root, parentNode = null) {
    if (root === null) return;
    let direction = "right";
    let currentNode = root;
    while (currentNode.data !== value && currentNode !== null) {
      parentNode = currentNode;
      if (currentNode.data > value) {
        direction = "left";
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        direction = "right";
        currentNode = currentNode.right;
      }
    }
    if (currentNode === null) {
      return;
    } else if (!currentNode.left && !currentNode.right) {
      parentNode[direction] = null;
    } else if (currentNode.left && !currentNode.right) {
      parentNode[direction] = currentNode.left;
      currentNode = currentNode.left;
    } else if (currentNode.right && !currentNode.left) {
      parentNode[direction] = currentNode.right;
      currentNode = currentNode.right;
    } else {
      const succ = getSuccessor(currentNode);
      currentNode.data = succ.data;
      this.delete(currentNode.data, currentNode.right, currentNode);
    }
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode.data !== value && currentNode !== null) {
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return currentNode.data === value ? currentNode : "Not found";
  }

  levelOrderIterative(callback) {
    if (!callback) throw Error("Callback is required!");
    let queque = [this.root];
    while (queque.length > 0) {
      const currentNode = queque[0];
      callback(currentNode);
      if (currentNode.left) queque.push(currentNode.left);
      if (currentNode.right) queque.push(currentNode.right);
      queque.shift();
    }
  }

  levelOrderRecursive(callback, queque = [this.root]) {
    if (!callback) throw Error("Callback is required!");
    if (queque.length === 0) return;
    const currentNode = queque[0];
    callback(currentNode);
    if (currentNode.left) queque.push(currentNode.left);
    if (currentNode.right) queque.push(currentNode.right);
    queque.shift();
    this.levelOrderRecursive(callback, queque);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw Error('Callback is required');
    if (node === null) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(prettyPrint(test.root));
test.preOrder((node) => console.log(node.data));
