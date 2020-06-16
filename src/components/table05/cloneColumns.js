import { MAIN } from './fixed-types.js';

function cloneColumns(columns, level = 0) {
  if (!Array.isArray(columns) || columns.length === 0) {
    return undefined;
  }

  const columnsClone = [];
  columns.forEach((c) => {
    const newC = {
      level,
      type: c.type || 'text', // type: 'selection'，即可自动开启多选功能
      title: c.title, // 列头显示文字
      key: c.key, // 对应列内容的字段名
      converter: c.converter, // function, 对key对应的值进行转换, 只有key设置时起作用
      tip: c.tip || false, // 表示是否显示tip， 默认false, 只有key设置时起作用
      slot: c.slot, // 插槽名, 设置后key不起作用
      fixed: c.fixed || MAIN, // 固定列, left 或 right
      align: c.align || 'left', // 对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐
      sortable: c.sortable || false, // 对应列是否可以排序
      width: c.width, // 列宽
      minWidth: c.minWidth, // 最小列宽, 设置后width不起作用, 根据表格宽度自适应
    };
    if (c.type === 'selection') {
      newC.width = 50;
      newC.minWidth = undefined;
    }
    if (c.minWidth !== undefined) {
      newC.width = c.minWidth;
    }
    const cc = cloneColumns(c.children, level + 1);
    if (cc) {
      newC.children = cc;
    }
    columnsClone.push(newC);
  });
  return columnsClone;
}

export default cloneColumns;
