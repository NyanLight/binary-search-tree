export function prepareArray(array) {
    array.sort((a, b) => a - b);
    const set = new Set (array);
    return Array.from(set);
}

export function prettyPrint  (node, prefix = "", isLeft = true)  {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export function getSuccessor(node) {
  let succ = node.right;
  while (succ !== null && succ.left !== null) {
    succ = succ.left;
  }
  return succ;
}