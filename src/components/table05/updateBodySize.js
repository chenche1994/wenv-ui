import { BODY_CLASS } from './constants.js';

function updateBodySize(tableDom, tableWidth, maxHeight) {
  if (!tableDom) {
    return;
  }
  const body = tableDom.querySelector(`.${BODY_CLASS}`);
  body.style.width = `${tableWidth}px`;
  body.style.maxHeight = maxHeight !== undefined ? `${maxHeight}px` : undefined;
}

export default updateBodySize;
