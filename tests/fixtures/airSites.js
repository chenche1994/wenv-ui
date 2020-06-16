import uuidv1 from 'uuid/v1.js';

const data = {
  code: 0,
  msg: '',
  time: 1553497243261,
  data: [],
};

function generate() {
  data.data = [];
  data.data.push({
    index: 0,
    connectionState: '联网',
    latitude: 30.39837,
    name: '空气站first',
    updateTime: Date.now(),
    id: uuidv1(),
    state: '轻度污染',
    longitude: 118.22956,
  });
  data.data.push({
    index: 1,
    connectionState: '联网',
    latitude: 30.40837,
    name: '空气站',
    updateTime: Date.now(),
    id: uuidv1(),
    state: '严重污染',
    longitude: 118.23956,
  });
  for (let index = 0; index < 10000; index += 1) {
    data.data.push({
      index: index + 2,
      connectionState: '断网',
      latitude: 30.38837 + Math.random() * 2,
      name: '空气站',
      updateTime: Date.now(),
      id: uuidv1(),
      state: '优',
      longitude: 118.21956 + Math.random() * 2,
    });
  }
  data.data.push({
    connectionState: '联网',
    latitude: 30.40837,
    name: '空气站last',
    updateTime: Date.now(),
    id: uuidv1(),
    state: '严重污染',
    longitude: 118.23956,
  });

  return data;
}

export default generate;
