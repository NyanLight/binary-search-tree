export class Tree {
  constructor(array) {
    this.array = array;
  }

  root = buildTree();

  buildTree(start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor(start + end / 2);
    const node = new Node (this.array[mid]);
    node.left = buildTree(start, mid - 1);
    node.right = this.buildTree(mid + 1, end);
    return node;
  }
}
