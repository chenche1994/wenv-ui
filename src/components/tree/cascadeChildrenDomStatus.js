function cascadeChildrenDomStatus(cDom, status) {
  if (!cDom || cDom.children.length === 0) {
    return;
  }

  for (let i = 0; i < cDom.children.length; i += 1) {
    const tDom = cDom.children[i].children[0];
    const disabled = tDom.getAttribute('disabled');
    if (disabled === 'false') {
      tDom.setAttribute('data-selected', status);
      tDom.setAttribute('data-indeterminate', false);
    }

    cascadeChildrenDomStatus(tDom.nextElementSibling, status);
  }
}

export default cascadeChildrenDomStatus;
