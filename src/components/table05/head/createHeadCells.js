import toFlexAlign from '../toFlexAlign.js';
import {
  HEAD_CELL_CLASS,
  HEAD_SELECTION_CLASS,
  HEAD_TITLE_CLASS,
  HEAD_SORT_CLASS,
  HEAD_CHILDREN_CLASS,
} from '../constants.js';
import { NONE_SORT_TYPE } from '../sort-types.js';
import '../../../assets/fonts/wenvfont.js';

function createSort(column, sortBy) {
  if (!column.sortable || !column.key) {
    return '';
  }

  const sortType = sortBy[column.key] || NONE_SORT_TYPE;
  return `<div class="${HEAD_SORT_CLASS}" data-key="${column.key}" data-type="${sortType}">
            <svg data-type="asc">
              <use xlink:href="#wenv-i-jiantou"></use>
            </svg>
            <svg data-type="desc" style="transform: rotate(180deg);">
              <use xlink:href="#wenv-i-jiantou"></use>
            </svg>
          </div>`;
}

function getSize(column, height) {
  const style = `height:${height}px;justify-content:${toFlexAlign(column.align)};`;
  if (!Array.isArray(column.children) || column.children.length === 0) {
    return `style="${style}width:${column.width}px;"`;
  }

  return `style="${style}"`;
}

function createTitle(column, height, sortBy) {
  return `<div class="${HEAD_TITLE_CLASS}" ${getSize(column, height)}>
              <span>${column.title}</span>${createSort(column, sortBy)}
          </div>`;
}

function createSelectionCell(height, width) {
  const style = `width:${width}px;height:${height}px;justify-content:center;`;
  return `<div class="${HEAD_CELL_CLASS}">
            <div class="${HEAD_TITLE_CLASS}" style="${style}">
              <label 
                class="wenv-checkbox ${HEAD_SELECTION_CLASS}" 
                data-selected="false"
                data-indeterminate="false">
              </label>
            </div>
          </div>`;
}

function createCell(column, lineHeight, maxDepth, sortBy) {
  const height = lineHeight * (maxDepth - column.level);
  if (column.type === 'selection') {
    return createSelectionCell(height, column.width);
  }
  if (!Array.isArray(column.children) || column.children.length === 0) {
    return `<div class="${HEAD_CELL_CLASS}">
              ${createTitle(column, height, sortBy)}
            </div>`;
  }

  return `<div class="${HEAD_CELL_CLASS}">
            ${createTitle(column, lineHeight, sortBy)}
            <div class="${HEAD_CHILDREN_CLASS}">
              ${column.children.map((c) => createCell(c, lineHeight, maxDepth, sortBy)).join('')}
            </div>
          </div>`;
}

function createInner(columns, maxDepth, headLineHeight, sortBy) {
  const cells = columns.map((c) => createCell(c, headLineHeight, maxDepth, sortBy)).join('');
  return cells;
}

export default createInner;
