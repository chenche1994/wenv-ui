import { BODY_SELECTION_CLASS } from '../constants.js';

function get(rowData) {
  const cell = document.createElement('label');
  cell.classList.add('wenv-checkbox');
  cell.classList.add(BODY_SELECTION_CLASS);
  cell.setAttribute('data-selected', rowData.selected || false);
  cell.setAttribute('data-id', rowData.internalId);
  return cell;
}

export default get;
