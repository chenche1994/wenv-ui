function ge(count = 2) {
  const trees = [];
  for (let i = 0; i < count; i += 1) {
    const iobj = {
      id: i, label: `${i}_name`, children: [], unfold: true,
    };
    if (i === 2 || i === 3) {
      iobj.disabled = true;
    }
    trees.push(iobj);

    for (let j = 0; j < count; j += 1) {
      const jobj = { id: `${i}_${j}`, label: `${i}_${j}_name`, children: [] };
      if (j === 2 || j === 3) {
        jobj.disabled = true;
      }
      iobj.children.push(jobj);

      for (let k = 0; k < count; k += 1) {
        const kobj = {
          id: `${i}_${j}_${k}`,
          label: `${i}_${j}_${k}_name_ ${i}_${j}_${k}_name`,
          children: [],
        };
        jobj.children.push(kobj);
      }
    }
  }
  return trees;
}

export default ge;
