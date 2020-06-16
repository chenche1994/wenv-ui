import findRow from './findRow.js';
import { BODY_ROW_HIGHLIGHT_CLASS, BODY_ROW_HIGHLIGHT_BAR_CLASS } from './constants.js';

function unhighlightRow(wrapper, index) {
  const els = findRow(wrapper, index);
  for (let i = 0; i < els.length; i += 1) {
    els[i].classList.remove(BODY_ROW_HIGHLIGHT_CLASS);
    els[i].classList.remove(BODY_ROW_HIGHLIGHT_BAR_CLASS);
  }
}

export default unhighlightRow;
