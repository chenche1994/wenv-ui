import getAllEndpoints from './getAllEndpoints.js';

function getColumnsWidth(columns) {
  const endpoints = getAllEndpoints(columns);
  return endpoints.reduce((acc, c) => acc + c.width, 0);
}

export default getColumnsWidth;
