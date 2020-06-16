import { uniqBy } from 'lodash-es';

function initNodeVisible(nodes, queryReg, visibleNodes) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return;
  }

  nodes.forEach((n) => {
    if (!queryReg) {
      // eslint-disable-next-line no-param-reassign
      n.visible = true;
    } else if (queryReg.test(n.name)) {
      // eslint-disable-next-line no-param-reassign
      n.visible = true;
      // eslint-disable-next-line no-param-reassign
      n.expandWhenQuery = true;
      if (visibleNodes) visibleNodes.push(n);
    } else {
      // eslint-disable-next-line no-param-reassign
      n.visible = false;
    }

    initNodeVisible(n.children, queryReg, visibleNodes);
  });
}

function initParentNodeVisible(pnode) {
  if (!pnode) return;
  // eslint-disable-next-line no-param-reassign
  pnode.visible = true;
  // eslint-disable-next-line no-param-reassign
  pnode.expandWhenQuery = true;
  initParentNodeVisible(pnode.pnode);
}

function initTreesQueryStatus(trees, query) {
  if (query === undefined || query === '') {
    initNodeVisible(trees);
  } else {
    // set all matched node
    const queryReg = new RegExp(query, 'i');
    const visibleNodes = [];
    initNodeVisible(trees, queryReg, visibleNodes);
    const uniqNodes = uniqBy(visibleNodes, 'pid');
    // set parent node
    uniqNodes.forEach((n) => {
      initParentNodeVisible(n.pnode);
    });
  }
}

export default initTreesQueryStatus;
