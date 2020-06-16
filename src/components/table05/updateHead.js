import createHeadCells from './head/createHeadCells.js';
import { HEAD_CLASS } from './constants.js';

function updateHead(tableDom, columns, maxDepth, headLineHeight, sortBy) {
  if (!tableDom) {
    return;
  }

  const head = tableDom.querySelector(`.${HEAD_CLASS}`);
  if (columns.length > 0) {
    head.innerHTML = createHeadCells(columns, maxDepth, headLineHeight, sortBy);
  } else {
    head.innerHTML = '';
  }
}

export default updateHead;
