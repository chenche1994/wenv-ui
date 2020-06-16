// import uuidv1 from 'uuid/v1.js';

function createChildNodes(pNode, level, dest) {
  if (level === 0) {
    return;
  }
  for (let j = 0; j < 18; j += 1) {
    const child = {
      id: `${pNode.id ? pNode.id : 'root'}-${level}-${j}`,
      name: `${level}-${j}`,
      pid: pNode.id,
      disabled: j === 2,
    };
    dest.push(child);

    const nLevel = level - 1;
    createChildNodes(child, nLevel, dest);
  }
}

function create() {
  const result = [];
  createChildNodes({}, 3, result);
  return result;
}

export default create;
