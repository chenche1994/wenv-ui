import { orderBy, pickBy, values } from 'lodash-es';
import { ASC, DESC } from './sort-types.js';

function sortData(data, sortBy, remoteSort) {
  if (remoteSort) {
    return data;
  }

  const sb = pickBy(sortBy, (v) => v === ASC || v === DESC);
  const keys = Object.keys(sb);
  if (keys.length === 0) {
    return data;
  }
  return orderBy(data, keys, values(sb));
}

export default sortData;
