import createCell from './createCell.js';
import { BODY_ROW_CLASS } from '../constants.js';

function create(columns, rowData, lineHeight, rowWidth, index, last, slots) {
  const isLastRow = index === last;
  const row = document.createElement('div');
  row.classList.add(BODY_ROW_CLASS);
  row.style.width = `${rowWidth}px`; // highlight whole line when scroll x
  row.setAttribute('data-rowid', rowData.internalId);
  columns
    .map((c) => createCell(c, rowData, lineHeight, isLastRow, slots))
    .forEach((c) => {
      row.appendChild(c);
    });
  return row;
}

export default create;
