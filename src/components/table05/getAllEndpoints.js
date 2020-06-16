import getEndpoints from './getEndpoints.js';

function getAllEndpoints(columns) {
  if (!Array.isArray(columns) || columns.length === 0) {
    return [];
  }

  const endpoints = [];
  columns.forEach((c) => {
    const eps = getEndpoints(c);
    endpoints.push(...eps);
  });

  return endpoints;
}

export default getAllEndpoints;
