import { BODY_ROW_CLASS, BODY_CELL_CLASS } from '../constants.js';

function get(rowLineHeight, rowWidth, noDataText) {
  const row = document.createElement('div');
  row.classList.add(BODY_ROW_CLASS);

  const cell = document.createElement('div');
  cell.classList.add(BODY_CELL_CLASS);
  cell.style.height = `${rowLineHeight}px`;
  cell.style.width = `${rowWidth}px`;
  cell.style.borderBottom = 'none';
  cell.style.justifyContent = 'center';

  const span = document.createElement('span');
  const textNode = document.createTextNode(noDataText);
  span.appendChild(textNode);
  cell.appendChild(span);

  row.appendChild(cell);
  return row;
}

export default get;
