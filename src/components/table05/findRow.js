import { BODY_ROW_CLASS } from './constants.js';

function findRow(wrapper, id) {
  const els = wrapper.querySelectorAll(`.${BODY_ROW_CLASS}[data-rowid='${id}']`);
  return els;
}

export default findRow;
