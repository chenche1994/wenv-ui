function toTree(nodes, normalize = {}) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return [];
  }

  const {
    pid = 'pid',
    id = 'id',
    name = 'name',
    disabled = 'disabled',
    expand = 'expand',
  } = normalize;
  const rootItems = [];
  const lookup = {};

  nodes.forEach((item) => {
    const idValue = item[id];
    const parentIdValue = item[pid];

    if (!Object.prototype.hasOwnProperty.call(lookup, idValue)) {
      lookup[idValue] = { children: [] };
    }

    lookup[idValue] = {
      pid: parentIdValue,
      id: idValue,
      name: item[name],
      expand: !!item[expand],
      disabled: !!item[disabled],
      visible: true,
      children: lookup[idValue].children,
    };

    const node = lookup[idValue];

    if (parentIdValue === undefined || parentIdValue === '') {
      rootItems.push(node);
    } else {
      if (!Object.prototype.hasOwnProperty.call(lookup, parentIdValue)) {
        lookup[parentIdValue] = { children: [] };
      }
      const pnode = lookup[parentIdValue];
      node.pnode = pnode;
      pnode.children.push(node);
    }
  });

  return rootItems;
}

export default toTree;
