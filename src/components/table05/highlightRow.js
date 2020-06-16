import findRow from './findRow.js';
import { BODY_ROW_HIGHLIGHT_CLASS, BODY_ROW_HIGHLIGHT_BAR_CLASS } from './constants.js';

function highlightRow(wrapper, index) {
  const els = findRow(wrapper, index);
  for (let i = 0; i < els.length; i += 1) {
    if (i === 0) {
      els[i].classList.add(BODY_ROW_HIGHLIGHT_BAR_CLASS);
    }
    els[i].classList.add(BODY_ROW_HIGHLIGHT_CLASS);
  }
}

export default highlightRow;
