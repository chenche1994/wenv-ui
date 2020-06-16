function getParentTitleNode(titleDom) {
  return titleDom.parentNode.parentNode.parentNode.children[0];
}

export default getParentTitleNode;
