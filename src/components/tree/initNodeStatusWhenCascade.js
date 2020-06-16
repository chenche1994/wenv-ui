import { uniqBy } from 'lodash-es';

function initParentStatus(pNode) {
  if (!pNode) return;
  if (!pNode.selected && pNode.children.some((n) => n.selected || n.indeterminate)) {
    // eslint-disable-next-line no-param-reassign
    pNode.indeterminate = true;
  }

  initParentStatus(pNode.pnode);
}

function initNodeStatusWhenCascade(selectedNodes) {
  if (Array.isArray(selectedNodes) || selectedNodes.length === 0) {
    return;
  }

  // only one every level
  const uniqNodes = uniqBy(selectedNodes, 'pid');
  // only endpoint
  uniqNodes
    .filter((n) => !uniqNodes.some((un) => un.pid === n.id))
    .forEach((n) => {
      initParentStatus(n.pnode);
    });
}

export default initNodeStatusWhenCascade;
