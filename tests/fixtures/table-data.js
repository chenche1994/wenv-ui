function ge(count = 10) {
  const data = [];
  for (let i = 0; i < count; i += 1) {
    const row = {
      name: `name-${i}`,
      desc: `desc-${i}`,
      date: new Date(),
    };
    data.push(row);
  }
  return data;
}

export default ge();
