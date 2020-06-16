import { sumBy } from 'lodash-es';
import getAllEndpoints from './getAllEndpoints.js';
import cloneColumns from './cloneColumns.js';

function formatColumns(columns, tableWidth) {
  const columnsIn = cloneColumns(columns);
  const endpoints = getAllEndpoints(columnsIn);
  const resizableColumns = endpoints.filter((ep) => ep.minWidth !== undefined);
  if (resizableColumns.length === 0) {
    return columnsIn;
  }

  const totalWidth = sumBy(endpoints, 'width');
  if (totalWidth >= tableWidth) {
    return columnsIn;
  }

  const widthNeedToFill = tableWidth - totalWidth;
  // 如果不能除尽，将余数加到最后的列上
  const remainder = widthNeedToFill % resizableColumns.length;
  const extendWidth = (widthNeedToFill - remainder) / resizableColumns.length;
  for (let i = 0; i < resizableColumns.length; i += 1) {
    resizableColumns[i].width += extendWidth;

    if (i === resizableColumns.length - 1) {
      resizableColumns[i].width += remainder;
    }
  }

  return columnsIn;
}

export default formatColumns;
