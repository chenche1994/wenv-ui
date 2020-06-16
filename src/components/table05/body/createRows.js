import getAllEndpoints from '../getAllEndpoints.js';
import getColumnsWidth from '../getColumnsWidth.js';
import createRow from './createRow.js';
import getNoDataRowNode from './getNoDataRowNode.js';

function createBodyRows(columns, data, rowLineHeight, noDataText, slots) {
  const rowWidth = getColumnsWidth(columns);
  if (!Array.isArray(data) || data.length === 0) {
    const row = getNoDataRowNode(rowLineHeight, rowWidth, noDataText);
    return [row];
  }

  const endpoints = getAllEndpoints(columns);
  const last = data.length - 1;
  return data.map((d, i) => createRow(endpoints, d, rowLineHeight, rowWidth, i, last, slots));
}

export default createBodyRows;
