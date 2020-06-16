import pushId from './pushId.js';
import removeId from './removeId.js';

function cascadeChildrenNodeStatus(children, status, ids) {
  if (!Array.isArray(children) || children.length === 0) {
    return;
  }

  children.forEach((c) => {
    if (!c.disabled) {
      // eslint-disable-next-line no-param-reassign
      c.selected = status;
      // eslint-disable-next-line no-param-reassign
      c.indeterminate = false;

      if (status) {
        pushId(ids, c.id);
      } else {
        removeId(ids, c.id);
      }
    }
    cascadeChildrenNodeStatus(c.children, status, ids);
  });
}

export default cascadeChildrenNodeStatus;
