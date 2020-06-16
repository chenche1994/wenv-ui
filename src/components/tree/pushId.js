function pushId(data, id) {
  const index = data.indexOf(id);
  if (index === -1) {
    data.push(id);
  }
}

export default pushId;
