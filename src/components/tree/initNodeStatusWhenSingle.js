function initNodeStatusWhenSingle(nodes, selectedId, level, expandLevel) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return;
  }

  nodes.forEach((n) => {
    // eslint-disable-next-line no-param-reassign
    n.selected = selectedId === n.id;
    // eslint-disable-next-line no-param-reassign
    n.level = level;
    if (level <= expandLevel) {
      // eslint-disable-next-line no-param-reassign
      n.expand = true;
    }
    initNodeStatusWhenSingle(n.children, selectedId, level + 1, expandLevel);
  });
}

export default initNodeStatusWhenSingle;
