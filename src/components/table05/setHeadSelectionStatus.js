import { BODY_SELECTION_CLASS } from './constants.js';

function setHeadSelectionStatus(wrapper, target, data) {
  const isSelected = target.getAttribute('data-selected');
  const status = isSelected !== 'true';
  target.setAttribute('data-selected', status);
  target.setAttribute('data-indeterminate', false);
  data.forEach((d) => {
    // eslint-disable-next-line no-param-reassign
    d.selected = status;
  });
  const els = wrapper.querySelectorAll(`.${BODY_SELECTION_CLASS}`);
  for (let i = 0; i < els.length; i += 1) {
    els[i].setAttribute('data-selected', status);
  }
}

export default setHeadSelectionStatus;
