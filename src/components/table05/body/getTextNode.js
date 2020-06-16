import getText from './getText.js';
import { BODY_CELL_TEXT_CLASS } from '../constants.js';

function get(column, rowData) {
  const node = document.createElement('span');
  node.classList.add(BODY_CELL_TEXT_CLASS);

  const text = getText(column, rowData);
  if (text) {
    if (column.tip) {
      node.setAttribute('title', text);
    }
    const textNode = document.createTextNode(text);
    node.appendChild(textNode);
  }

  return node;
}

export default get;
