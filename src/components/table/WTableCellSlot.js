export default {
  name: 'WTableCellSlot',
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
  },
  render(h, ctx) {
    const { column, row } = ctx.props;
    const {
      slot, converter, key, tip,
    } = column;

    if (!slot) {
      const content = converter ? converter(row[key]) : row[key];
      return h(
        'div',
        {
          class: ['wenv-table-body-cell-text'],
          attrs: {
            tip,
            'data-tippy-content': content,
          },
        },
        content,
      );
    }

    return h('div', ctx.injections.tableRoot.$scopedSlots[slot]({ row }));
  },
};
