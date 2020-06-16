<template>
  <div
    class="wenv-table-cell"
    :type="column.type"
    :style="{ width: `${column.width}px` }"
  >
    <WCheckbox
      v-if="column.type === 'selection'"
      :checked="isSelectedAll"
      :indeterminate="isSelectedSome"
      @on-change="onSelectAll"
    />
    <span v-else class="wenv-table-head-cell">
      {{ column.title }}
      <WTableHeadSort
        v-if="column.sortKey"
        :sort-key="column.sortKey"
        :sort-type="column.sortType"
        style="marginLeft: 8px;"
        @on-sort-change="onSortChange"
      />
    </span>
  </div>
</template>
<script>
import WCheckbox from '../checkbox/WCheckbox.vue';
import WTableHeadSort from './WTableHeadSort.vue';

export default {
  name: 'WTableHeadCell',
  components: {
    WCheckbox,
    WTableHeadSort,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    isSelectedAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSelectedSome: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onSortChange(sortOpt) {
      this.$emit('on-sort-change', sortOpt);
    },
    onSelectAll(checked) {
      this.$emit('on-select-all', checked);
    },
  },
};
</script>
<style lang="less">
.wenv-table-head-cell {
  position: relative;
  color: #7f868c;

  .wenv-table-sort {
    position: absolute;
    top: 2px;
    right: -16px;
  }
}
</style>
