import { HEAD_SELECTION_CLASS } from './constants.js';
import { SELECTED, INDETERMINATE, UNSELECTED } from './selection-status.js';

function updateHeadSelectionStatus(tableWrapper, data) {
  const el = tableWrapper.querySelector(`.${HEAD_SELECTION_CLASS}`);
  if (!el) {
    return;
  }

  let selectionStatus;
  if (data.length === 0) {
    selectionStatus = UNSELECTED;
  } else if (data.every((d) => d.selected === true)) {
    selectionStatus = SELECTED;
  } else if (data.some((d) => d.selected === true)) {
    selectionStatus = INDETERMINATE;
  } else {
    selectionStatus = UNSELECTED;
  }
  el.setAttribute('data-selected', selectionStatus === SELECTED);
  el.setAttribute('data-indeterminate', selectionStatus === INDETERMINATE);
}

export default updateHeadSelectionStatus;
