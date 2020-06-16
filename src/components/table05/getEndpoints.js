function getEndpoints(column) {
  if (!column) {
    return [];
  }

  if (!Array.isArray(column.children) || column.children.length === 0) {
    return [column];
  }

  const endpoints = [];
  column.children.forEach((c) => {
    const eps = getEndpoints(c);
    endpoints.push(...eps);
  });
  return endpoints;
}

export default getEndpoints;
