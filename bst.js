import { Node } from "./node.js";
import { prepareArray, prettyPrint } from "./util.js";
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
        console.log("Current node is" + currentNode.data);
        prevNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        {
          console.log("Current node is" + currentNode.data);
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
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(prettyPrint(test.root));
test.insert(2);
console.log(prettyPrint(test.root));
