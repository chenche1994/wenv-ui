function resetSelectedStates(options) {
  if (!options) {
    return;
  }

  options.forEach((o) => {
    // eslint-disable-next-line no-param-reassign
    o.isSelected = false;
    resetSelectedStates(o.children);
  });
}

function getSelectedItem(options, id) {
  if (!options || id === undefined) {
    return undefined;
  }

  let result;
  for (let i = 0; i < options.length; i += 1) {
    if (options[i].id === id) {
      // eslint-disable-next-line no-param-reassign
      options[i].isSelected = true;
      result = options[i];
      break;
    }

    const item = getSelectedItem(options[i].children, id);
    if (item) {
      result = item;
      break;
    }
  }

  return result;
}

function getSelectedItems(options, ids) {
  if (!options || !ids) {
    return [];
  }

  resetSelectedStates(options);

  const items = [];
  ids.forEach((id) => {
    const item = getSelectedItem(options, id);
    if (item) {
      items.push(item);
    }
  });
  return items;
}

function normalizeOptions(src, normalize) {
  const {
    id, name, disabled, children,
  } = normalize || {};
  const dest = [];
  src.forEach((opt) => {
    const dObj = {};
    dObj.id = id ? opt[id] : opt.id;
    dObj.name = name ? opt[name] : opt.name;
    dObj.disabled = !!(disabled ? opt[disabled] : opt.disabled);
    dObj.isSelected = false;
    dObj.unfold = opt.unfold || false;

    const childrenOpts = children ? opt[children] : opt.children;

    if (childrenOpts && childrenOpts.length > 0) {
      dObj.children = normalizeOptions(childrenOpts, normalize);
    }

    dest.push(dObj);
  });

  return dest;
}

function deleteItem(items, item) {
  const index = items.indexOf(item);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

export {
  getSelectedItem, getSelectedItems, normalizeOptions, deleteItem,
};
