<template>
  <WTableCellSlot :column="column" :row="row" :slots="slots" />
</template>
<script>
import WTableCellSlot from './WTableCellSlot.js';

export default {
  name: 'CellSlot',
  components: {
    WTableCellSlot,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
    slots: {
      type: Object,
      required: true,
    },
  },
};
</script>
