export default {
  name: 'WTableCellSlot',
  functional: true,
  props: {
    row: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    slots: {
      type: Object,
      required: true,
    },
  },
  render(h, ctx) {
    const { column, row, slots } = ctx.props;
    const { slot } = column;
    return h('div', slots[slot]({ row }));
  },
};
