import { TABLE_WRAPPER_CLASS, BODY_ROW_CLASS } from './constants.js';

function getRowId(target) {
  if (target.classList.contains(BODY_ROW_CLASS)) {
    const id = target.getAttribute('data-rowid');
    return id;
  }

  if (target.classList.contains(TABLE_WRAPPER_CLASS)) {
    return undefined;
  }

  return getRowId(target.parentNode);
}

export default getRowId;
