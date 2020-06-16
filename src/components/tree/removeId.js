function removeId(data, id) {
  const index = data.indexOf(id);
  if (index !== -1) {
    data.splice(index, 1);
  }
}

export default removeId;
