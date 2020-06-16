import { maxBy } from 'lodash-es';
import getAllEndpoints from './getAllEndpoints.js';

function getMaxDepth(columns) {
  const endpoints = getAllEndpoints(columns);
  const maxDepth = maxBy(endpoints, 'level').level + 1;
  return maxDepth;
}

export default getMaxDepth;
