function anyChild(node) {
  return node && Array.isArray(node.children) && node.children.length > 0;
}

export default anyChild;
