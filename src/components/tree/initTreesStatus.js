import initNodeStatusWhenSingle from './initNodeStatusWhenSingle.js';
import initNodeStatusWhenMultiple from './initNodeStatusWhenMultiple.js';

function initTreesStatus(trees, value, multiple, expandLevel, cascade) {
  if (multiple) {
    initNodeStatusWhenMultiple(trees, [...value], 0, expandLevel, cascade);
  } else {
    initNodeStatusWhenSingle(trees, value, 0, expandLevel);
  }
}

export default initTreesStatus;
