import updateHead from './updateHead.js';
import updateBodyContent from './updateBodyContent.js';
import updateBodySize from './updateBodySize.js';
import updateHeadSelectionStatus from './updateHeadSelectionStatus.js';
import getColumnsWidth from './getColumnsWidth.js';
import getMaxDepth from './getMaxDepth.js';
import getBodyMaxHeight from './getBodyMaxHeight.js';
import { LEFT, MAIN, RIGHT } from './fixed-types.js';
import { LEFT_CLASS, MAIN_CLASS, RIGHT_CLASS } from './constants.js';

function updateTable(target, columns, data, slots, layoutChanged, options) {
  const leftCols = columns.filter((c) => c.fixed === LEFT);
  const leftColsWidth = getColumnsWidth(leftCols);
  const mainCols = columns.filter((c) => c.fixed === MAIN);
  const rightCols = columns.filter((c) => c.fixed === RIGHT);
  const rightColsWidth = getColumnsWidth(rightCols);
  let mainTableWidth = target.clientWidth - leftColsWidth - rightColsWidth;
  if (mainTableWidth < 0) {
    mainTableWidth = 0;
  }
  const maxDepth = getMaxDepth(columns);

  const {
    headLineHeight, sortBy, rowLineHeight, noDataText,
  } = options;

  const bodyMaxHeight = getBodyMaxHeight(target, maxDepth * headLineHeight);

  const leftTable = target.querySelector(`.${LEFT_CLASS}`);
  const mainTable = target.querySelector(`.${MAIN_CLASS}`);
  const rightTable = target.querySelector(`.${RIGHT_CLASS}`);
  if (layoutChanged) {
    if (leftTable) {
      leftTable.style.width = `${leftColsWidth}px`;
    }
    if (mainTable) {
      mainTable.style.width = `${mainTableWidth}px`;
    }
    if (rightTable) {
      rightTable.style.width = `${rightColsWidth}px`;
    }
    updateHead(leftTable, leftCols, maxDepth, headLineHeight, sortBy);
    updateHead(mainTable, mainCols, maxDepth, headLineHeight, sortBy);
    updateHead(rightTable, rightCols, maxDepth, headLineHeight, sortBy);
    updateBodySize(leftTable, leftColsWidth, bodyMaxHeight);
    updateBodySize(mainTable, mainTableWidth, bodyMaxHeight);
    updateBodySize(rightTable, rightColsWidth, bodyMaxHeight);
  }

  updateBodyContent(leftTable, leftCols, data, slots, rowLineHeight, '');
  updateBodyContent(mainTable, mainCols, data, slots, rowLineHeight, noDataText);
  updateBodyContent(rightTable, rightCols, data, slots, rowLineHeight, '');

  updateHeadSelectionStatus(target, data);
}

export default updateTable;
