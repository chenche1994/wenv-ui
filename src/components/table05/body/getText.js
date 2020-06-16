function get(column, rowData) {
  if (!column || !rowData || !column.key) {
    return '';
  }

  let text;
  if (column.converter) {
    text = column.converter(rowData[column.key]);
  } else {
    text = rowData[column.key];
  }
  return text;
}

export default get;
