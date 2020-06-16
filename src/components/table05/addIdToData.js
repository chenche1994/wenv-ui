import uuidv1 from 'uuid/v1.js';

function addId(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  data.forEach((d) => {
    // eslint-disable-next-line no-param-reassign
    d.internalId = uuidv1();
  });
}

export default addId;
