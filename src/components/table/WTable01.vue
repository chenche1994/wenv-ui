<template>
  <div ref="container" class="wenv-table-01">
    <WTable
      v-if="fixedColumnsLeft.length > 0"
      class="wenv-table-fixed-left"
      :columns="fixedColumnsLeft"
      :data="data"
      :sort-opt="sortOpt"
      :style="{ maxHeight, width: `${leftWidth}px` }"
      :scroll-handlers="[]"
      :wheel-propagation="wheelPropagation"
      @mouse-enter-row="mouseEnter"
      @mouse-leave-row="mouseLeave"
      @on-sort-change="onSortChange"
    />
    <WTable
      class="wenv-table-not-fixed"
      :columns="otherColumns"
      :data="data"
      :sort-opt="sortOpt"
      :style="{
        maxHeight,
        width: `${contentWidth}px`,
        borderLeft: fixedColumnsLeft.length > 0 ? 'none' : undefined,
        borderRight: fixedColumnsRight.length > 0 ? 'none' : undefined,
      }"
      :wheel-propagation="wheelPropagation"
      @mouse-enter-row="mouseEnter"
      @mouse-leave-row="mouseLeave"
      @on-sort-change="onSortChange"
      @ps-scroll-y="handleScrolly"
    />
    <WTable
      v-if="fixedColumnsRight.length > 0"
      class="wenv-table-fixed-right"
      :columns="fixedColumnsRight"
      :data="data"
      :sort-opt="sortOpt"
      :style="{ maxHeight, width: `${rightWidth}px` }"
      :scroll-handlers="[]"
      :wheel-propagation="wheelPropagation"
      @mouse-enter-row="mouseEnter"
      @mouse-leave-row="mouseLeave"
      @on-sort-change="onSortChange"
    />
  </div>
</template>
<script>
/**
 * @deprecated since version 2.0
 */
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';
import WTable from './WTable.vue';

export default {
  name: 'WTable01',
  components: {
    WTable,
  },
  provide() {
    return {
      tableRoot: this,
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    wheelPropagation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      fixedColumnsLeft: this.columns.filter((c) => c.fixed === 'left'),
      otherColumns: this.columns.filter((c) => c.fixed === undefined),
      fixedColumnsRight: this.columns.filter((c) => c.fixed === 'right'),
      maxHeight: undefined,
      leftWidth: 0,
      contentWidth: undefined,
      rightWidth: 0,
      sortOpt: {},
    };
  },
  mounted() {
    const style = window.getComputedStyle(this.$refs.container);
    const containerMaxHeight = style.getPropertyValue('max-height');
    if (containerMaxHeight) {
      this.maxHeight = containerMaxHeight;
    }

    this.resizeSensor = new ResizeSensor(this.$refs.container, this.onSizeChange);
  },
  beforeDestroy() {
    this.resizeSensor.detach(this.onSizeChange);
    this.resizeSensor = null;
  },
  methods: {
    onSizeChange() {
      this.leftWidth = this.getFixedColumnsWidth(this.fixedColumnsLeft);
      this.rightWidth = this.getFixedColumnsWidth(this.fixedColumnsRight);
      this.contentWidth = this.$refs.container.clientWidth - this.leftWidth - this.rightWidth;
    },
    getFixedColumnsWidth(columns) {
      const width = columns.reduce(
        (accumulator, currentValue) => accumulator + currentValue.width,
        0,
      );
      return width;
    },
    handleScrolly(scrollTop) {
      this.scrolly('left', scrollTop);
      this.scrolly('right', scrollTop);
    },
    scrolly(tableClass, scrollTop) {
      const tableBody = this.$el.querySelector(`.wenv-table-fixed-${tableClass} .wenv-table-body`);
      if (tableBody) {
        tableBody.scrollTop = scrollTop;
      }
    },
    mouseEnter(rowId) {
      const rows = this.rowsSelector('.wenv-table', rowId);

      Array.prototype.forEach.call(rows, (r) => {
        r.classList.add('wenv-table-01-row-hover');
      });

      if (this.fixedColumnsLeft.length > 0) {
        const rowInFixedLeft = this.rowsSelector('.wenv-table-fixed-left', rowId)[0];
        if (rowInFixedLeft) {
          rowInFixedLeft.classList.add('wenv-table-01-row-hover-before');
        }
      } else {
        const rowInNotFixed = this.rowsSelector('.wenv-table-not-fixed', rowId)[0];
        if (rowInNotFixed) {
          rowInNotFixed.classList.add('wenv-table-01-row-hover-before');
        }
      }
    },
    mouseLeave(rowId) {
      const rows = this.rowsSelector('.wenv-table', rowId);

      Array.prototype.forEach.call(rows, (r) => {
        r.classList.remove('wenv-table-01-row-hover');
        r.classList.remove('wenv-table-01-row-hover-before');
      });
    },
    rowsSelector(tableClass, rowId) {
      return this.$el.querySelectorAll(`${tableClass} .wenv-table-body-row[md5='${rowId}']`);
    },
    onSortChange(sortOpt) {
      this.sortOpt = sortOpt;
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-table-01 {
  @border-color: #e2e2e4;
  outline: 1px solid @border-color;
  display: flex;

  .wenv-table {
    .wenv-table-head {
      background-color: #eaeef1;
      color: @font-color-normal;
    }

    .wenv-table-cell {
      padding-left: 10px;
      border-right: 1px solid @border-color;
      border-bottom: 1px solid @border-color;

      &:last-child {
        border-right: none;
      }
    }

    .wenv-table-body-row:last-child {
      .wenv-table-cell {
        border-bottom: none;
      }
    }
  }

  .wenv-table-fixed-left {
    box-shadow: 2px 0 0 rgba(185, 175, 200, 0.15);
    z-index: 1;
  }

  .wenv-table-fixed-right {
    box-shadow: -2px 0 0 rgba(185, 175, 200, 0.15);
  }

  .wenv-table-fixed-left .ps__rail-y,
  .wenv-table-fixed-right .ps__rail-y {
    display: none;
  }

  .wenv-table-01-row-hover {
    background-color: #dcf2ff;
  }

  .wenv-table-01-row-hover-before:before {
    content: '';
    display: block !important;
    position: absolute;
    width: 3px;
    height: 38px;
    background-color: #41bf56;
  }
}
</style>
