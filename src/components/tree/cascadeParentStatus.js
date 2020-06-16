import getParentTitleNode from './getParentTitleNode.js';
import pushId from './pushId.js';
import removeId from './removeId.js';

function setCascadeAttributeStatus(node, titleDom, selected, indeterminate, ids) {
  if (node.selected !== selected) {
    // eslint-disable-next-line no-param-reassign
    node.selected = selected;
    if (selected) {
      pushId(ids, node.id);
    } else {
      removeId(ids, node.id);
    }
    titleDom.setAttribute('data-selected', selected);
  }

  if (node.indeterminate !== indeterminate) {
    // eslint-disable-next-line no-param-reassign
    node.indeterminate = indeterminate;
    titleDom.setAttribute('data-indeterminate', indeterminate);
  }
}

function setNodeCascadeStatus(node, titleDom, ids) {
  if (node.disabled) return;

  let allCount = 0;
  let selectedCount = 0;
  let indeterminateCount = 0;
  node.children.forEach((c) => {
    if (!c.disabled) {
      allCount += 1;

      if (c.indeterminate) {
        indeterminateCount += 1;
      }

      if (c.selected) {
        selectedCount += 1;
      }
    }
  });

  if (allCount === selectedCount) {
    setCascadeAttributeStatus(node, titleDom, true, false, ids);
  } else if (selectedCount === 0 && indeterminateCount === 0) {
    setCascadeAttributeStatus(node, titleDom, false, false, ids);
  } else {
    setCascadeAttributeStatus(node, titleDom, false, true, ids);
  }
}

function setCascadeParentStatus(pNode, pTitleDom, ids) {
  if (!pNode || !pTitleDom) return;

  setNodeCascadeStatus(pNode, pTitleDom, ids);
  const ppTitleDom = pTitleDom ? getParentTitleNode(pTitleDom) : undefined;
  setCascadeParentStatus(pNode.pnode, ppTitleDom, ids);
}

export default setCascadeParentStatus;
