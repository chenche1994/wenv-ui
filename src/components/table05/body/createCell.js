import Vue from 'vue';
import getTextNode from './getTextNode.js';
import getSelectionNode from './getSelectionNode.js';
import toFlexAlign from '../toFlexAlign.js';
import { BODY_CELL_CLASS } from '../constants.js';
import CellSlot from './CellSlot.vue';

const CellSlotCtor = Vue.extend(CellSlot);

function create(column, rowData, lineHeight, isLastRow, slots) {
  const cell = document.createElement('div');
  cell.classList.add(BODY_CELL_CLASS);
  cell.style.height = `${lineHeight}px`;
  cell.style.width = `${column.width}px`;
  cell.style.borderBottom = isLastRow ? 'none' : undefined;
  cell.style.justifyContent = toFlexAlign(column.align);
  if (column.type === 'selection') {
    cell.style.justifyContent = 'center';
    const sel = getSelectionNode(rowData);
    cell.appendChild(sel);
    return cell;
  }

  if (column.slot) {
    const instance = new CellSlotCtor({
      propsData: {
        column,
        row: rowData,
        slots,
      },
    });
    instance.$mount();
    cell.appendChild(instance.$el);
    return cell;
  }

  const text = getTextNode(column, rowData);
  cell.appendChild(text);
  return cell;
}

export default create;
