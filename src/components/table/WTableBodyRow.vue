<template>
  <div
    class="wenv-table-body-row"
    :md5="md5"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @click="onRowClick"
  >
    <div
      v-for="(column, i) in columns"
      :key="i"
      class="wenv-table-cell"
      :type="column.type"
      :style="{ width: `${column.width}px` }"
    >
      <WCheckbox
        v-if="column.type === 'selection'"
        v-model="row.isSelected"
        @on-change="onSelect"
      />
      <WTableCellSlot v-else :column="column" :row="row" />
    </div>
  </div>
</template>
<script>
import tippy from 'tippy.js';
import md5 from 'blueimp-md5/js/md5.js';
import WTableCellSlot from './WTableCellSlot.js';
import WCheckbox from '../checkbox/WCheckbox.vue';

export default {
  name: 'WTableBodyRow',
  components: {
    WCheckbox,
    WTableCellSlot,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
  },
  computed: {
    md5() {
      return md5(JSON.stringify(this.row));
    },
  },
  watch: {
    columns() {
      this.$nextTick(() => {
        tippy(".wenv-table-body-cell-text[tip='true']", {
          arrow: true,
          animation: 'fade',
          theme: 'tomato',
        });
      });
    },
  },
  methods: {
    onRowClick() {
      this.$emit('on-row-click', this.row);
    },
    onSelect() {
      this.$emit('on-select', this.row);
    },
    mouseEnter() {
      this.$emit('mouse-enter', this.md5);
    },
    mouseLeave() {
      this.$emit('mouse-leave', this.md5);
    },
  },
};
</script>
<style lang="less">
.wenv-table-body-row {
  display: inline-flex;
}

.wenv-table-body-cell-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none;
}
</style>
