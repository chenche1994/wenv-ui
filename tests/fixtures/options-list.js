function ge(count = 10) {
  const options = [];
  for (let i = 0; i < count; i += 1) {
    const iobj = { id: i, test: `${i}_name_${i} _name` };
    if (i === 2 || i === 3) {
      iobj.disabled = true;
    }
    options.push(iobj);
  }
  return options;
}

export default ge;
