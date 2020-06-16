function findTreeNodeById(nodes, id) {
  if (id === undefined || id === '' || !Array.isArray(nodes) || nodes.length === 0) {
    return undefined;
  }

  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].id === id) {
      return nodes[i];
    }

    const result = findTreeNodeById(nodes[i].children, id);
    if (result) {
      return result;
    }
  }

  return undefined;
}

export default findTreeNodeById;
