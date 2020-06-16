import { find } from 'lodash-es';
import { HEAD_SELECTION_CLASS } from './constants.js';

function setRowSelectionStatus(wrapper, target, data) {
  const id = target.getAttribute('data-id');
  const isSelected = target.getAttribute('data-selected');
  const status = isSelected !== 'true';
  target.setAttribute('data-selected', status);
  const row = find(data, (d) => d.internalId === id);
  row.selected = status;

  const headSelection = wrapper.querySelector(`.${HEAD_SELECTION_CLASS}`);
  if (data.every((d) => d.selected === true)) {
    headSelection.setAttribute('data-selected', true);
    headSelection.setAttribute('data-indeterminate', false);
  } else if (data.some((d) => d.selected === true)) {
    headSelection.setAttribute('data-selected', false);
    headSelection.setAttribute('data-indeterminate', true);
  } else {
    headSelection.setAttribute('data-selected', false);
    headSelection.setAttribute('data-indeterminate', false);
  }
}

export default setRowSelectionStatus;
