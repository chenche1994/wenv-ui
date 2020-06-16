import { SORT_TYPES } from './sort-types.js';

function getNextSortType(currentType) {
  const currentIndex = SORT_TYPES.indexOf(currentType);
  if (currentIndex === -1) {
    return SORT_TYPES[0];
  }

  const nextIndex = (currentIndex + 1) % SORT_TYPES.length;
  return SORT_TYPES[nextIndex];
}


export default getNextSortType;
