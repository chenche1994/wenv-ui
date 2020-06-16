import createBodyRows from './body/createRows.js';
import { BODY_ROWS_WRAPPER_CLASS } from './constants.js';

function updateBodyContent(tableDom, columns, data, slots, rowLineHeight, noDataText) {
  if (!tableDom) {
    return;
  }

  const rowsWrapper = tableDom.querySelector(`.${BODY_ROWS_WRAPPER_CLASS}`);
  while (rowsWrapper.firstChild) {
    rowsWrapper.removeChild(rowsWrapper.firstChild);
  }

  if (columns.length > 0) {
    const fragment = new DocumentFragment();
    const rows = createBodyRows(columns, data, rowLineHeight, noDataText, slots);
    rows.forEach((r) => {
      fragment.appendChild(r);
    });
    rowsWrapper.appendChild(fragment);
  }
}

export default updateBodyContent;
