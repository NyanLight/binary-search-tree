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
    if (!callback) throw Error("Callback is required");
    if (node === null) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw Error("Callback is required");
    if (node === null) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw Error("Callback is required");
    if (node === null) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const height = Math.max(leftHeight, rightHeight) + 1;
    return height;
  }

  depth(node) {
    let depth = 0;
    let current = this.root;
    while (current.data !== node.data && current !== null) {
      if (current.data < node.data) {
        current = current.right;
        ++depth;
      } else {
        current = current.left;
        ++depth;
      }
    }
    return current.data === node.data ? depth : "Node is not found";
  }

  isBalanced() {
    let isBalanced = true;
    this.levelOrderIterative((node) => {
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      console.log(rightHeight + ": " + leftHeight);
      const delta = Math.abs(rightHeight - leftHeight);
      if (delta > 1) isBalanced = false;
    }, this.root);
    return isBalanced;
  }

  rebalance() {
    let values = [];
    this.levelOrderIterative((node) => {
      values.push(node.data);
    });
    this.root = this.buildTree(values, 0, values.length - 1);
  }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.root.right.left.right.right = { data: 1, left: null, right: null };
test.root.right.left.right.right.right = { data: 2, left: null, right: null };
console.log(prettyPrint(test.root));
console.log(test.isBalanced());
test.rebalance();
console.log(test.isBalanced());
