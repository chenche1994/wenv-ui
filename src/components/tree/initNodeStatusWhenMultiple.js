import removeId from './removeId.js';
import initNodeStatusWhenCascade from './initNodeStatusWhenCascade.js';

function initNodeStatus(nodes, selectedIds, level, expandLevel, selectedNodes) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return;
  }

  nodes.forEach((n) => {
    if (selectedIds.some((id) => id === n.id)) {
      // eslint-disable-next-line no-param-reassign
      n.selected = true;
      removeId(selectedIds, n.id);
      selectedNodes.push(n);
    } else {
      // eslint-disable-next-line no-param-reassign
      n.selected = false;
    }
    // eslint-disable-next-line no-param-reassign
    n.indeterminate = false;
    // eslint-disable-next-line no-param-reassign
    n.level = level;
    if (level <= expandLevel) {
      // eslint-disable-next-line no-param-reassign
      n.expand = true;
    }

    initNodeStatus(n.children, selectedIds, level + 1, expandLevel, selectedNodes);
  });
}

function initNodeStatusWhenMultiple(nodes, selectedIds, level, expandLevel, cascade) {
  const selectedNodes = [];
  initNodeStatus(nodes, selectedIds, level, expandLevel, selectedNodes);

  if (cascade) {
    initNodeStatusWhenCascade(selectedNodes);
  }
}


export default initNodeStatusWhenMultiple;
