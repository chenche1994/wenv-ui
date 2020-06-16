<template>
  <div ref="container" class="wenv-table">
    <div ref="thead" class="wenv-table-head">
      <WTableHeadCell
        v-for="(column, i) in columnsInternal"
        :key="i"
        :column="column"
        :is-selected-all="isSelectedAll"
        :is-selected-some="isSelectedSome"
        @on-sort-change="onSortChange"
        @on-select-all="onSelectAll"
      />
    </div>
    <div ref="tbody" class="wenv-table-body" :style="{ maxHeight: `${tbodyMaxHeight}px` }">
      <WTableBodyRow
        v-for="(row, i) in source"
        :key="i"
        :columns="columnsInternal"
        :row="row"
        @on-row-click="onRowClick"
        @on-select="onSelect"
        @mouse-enter="mouseEnter"
        @mouse-leave="mouseLeave"
      />
    </div>
  </div>
</template>
<script>
/**
 * @deprecated since version 2.0
 */
import {
  cloneDeep, get, maxBy, orderBy,
} from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';
import WTableHeadCell from './WTableHeadCell.vue';
import WTableBodyRow from './WTableBodyRow.vue';

const CELL_HEIGHT = 38;

// columns参数说明
// type: 'selection'      通过给 columns 数据设置一项，指定 type: 'selection'，即可自动开启多选功能
// title: 'Name',         必需,唯一
// key: 'name',           如果使用插槽，不需要设置;设置后插槽不起作用
// converter: function,   与key一起使用，对key对应的值进行转换
// slot: 'name',          插槽
// sortType: 'asc'        asc, desc
// sortKey: 'name.xx',    根据指定的key对表格进行排序，设置 key，即可对该列数据进行排序
// width: 150,            必需，pixel
// resize: false          如果表格宽度大于所有列的宽度之和时起作用，将超出的宽度平均分配给所有设置resize为true的列
// fixed: 'left'          固定列, left 或 right
// tip: false             是否显示tip， 默认false
export default {
  name: 'WTable',
  components: {
    WTableHeadCell,
    WTableBodyRow,
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
    sortOpt: {
      type: Object,
      required: false,
      default: undefined,
    },
    scrollHandlers: {
      type: Array,
      required: false,
      default() {
        return ['click-rail', 'drag-thumb', 'keyboard', 'wheel'];
      },
    },
    wheelPropagation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    this.initData(this.data);
    return {
      tbodyMaxHeight: undefined,
      source: this.data || [],
      isSelectedAll: false,
      isSelectedSome: false,
      columnsInternal: [],
    };
  },
  watch: {
    data(newData) {
      this.initData(newData);
      this.source = newData;
    },
    sortOpt(newData) {
      this.onSortChange(newData || {});
    },
  },
  mounted() {
    this.resizeSensor = new ResizeSensor(this.$refs.container, this.onSizeChange);
    this.psContent = new PerfectScrollbar(this.$refs.tbody, {
      minScrollbarLength: 20,
      handlers: this.scrollHandlers,
      wheelPropagation: this.wheelPropagation,
    });
    this.$refs.tbody.addEventListener('ps-scroll-x', this.handleScrollx);
    this.$refs.tbody.addEventListener('ps-scroll-y', this.handleScrolly);
  },
  beforeDestroy() {
    this.$refs.tbody.removeEventListener('ps-scroll-x', this.handleScrollx, false);
    this.$refs.tbody.removeEventListener('ps-scroll-y', this.handleScrolly, false);
    this.psContent.destroy();
    this.psContent = null;

    this.resizeSensor.detach(this.onSizeChange);
    this.resizeSensor = null;
  },
  methods: {
    initData(data) {
      if (!data || data.length === 0) return;

      data.forEach((r, index) => {
        if (r.isSelected === undefined) {
          this.$set(r, 'isSelected', false);
        }

        /* eslint-disable-next-line no-param-reassign */
        r.index = index;
      });
      this.initSelectStates(data);
    },
    initSelectStates(data) {
      if (data.every((r) => r.isSelected === true)) {
        this.isSelectedAll = true;
        this.isSelectedSome = false;
      } else if (data.some((r) => r.isSelected === true)) {
        this.isSelectedAll = false;
        this.isSelectedSome = true;
      } else {
        this.isSelectedAll = false;
        this.isSelectedSome = false;
      }
    },
    handleScrollx(e) {
      this.$refs.thead.scrollLeft = e.target.scrollLeft;
    },
    handleScrolly(e) {
      this.$emit('ps-scroll-y', e.target.scrollTop);
    },
    onSizeChange() {
      this.setVerticalScroll();
      this.setHorizontalScroll();
      this.psContent.update();
    },
    setVerticalScroll() {
      const style = window.getComputedStyle(this.$refs.container);
      const containerMaxHeight = style.getPropertyValue('max-height');
      if (containerMaxHeight) {
        this.tbodyMaxHeight = parseInt(containerMaxHeight, 10) - CELL_HEIGHT;
      }
    },
    setHorizontalScroll() {
      const containerWidth = this.$refs.container.clientWidth;

      const tempColumns = cloneDeep(this.columns);
      const totalColumnsWidth = tempColumns.reduce((acc, c) => acc + c.width, 0);
      const columnsResize = tempColumns.filter((c) => c.resize === true);
      if (columnsResize.length > 0 && totalColumnsWidth < containerWidth) {
        const widthNeedToFill = containerWidth - totalColumnsWidth;
        // 如果不能除尽，将余数加到宽度最大的列上
        const remainder = widthNeedToFill % columnsResize.length;
        const extendWidth = (widthNeedToFill - remainder) / columnsResize.length;
        const resizeColumnWithMaxWidth = maxBy(columnsResize, 'width');
        resizeColumnWithMaxWidth.width += remainder;
        columnsResize.forEach((c) => {
          /* eslint-disable-next-line no-param-reassign */
          c.width += extendWidth;
        });
      }
      this.columnsInternal = tempColumns;
    },
    onSortChange(sortOpt) {
      this.columnsInternal.forEach((c) => {
        /* eslint-disable-next-line no-param-reassign */
        c.sortType = c.sortKey === sortOpt.sortKey ? sortOpt.sortType : undefined;
      });

      if (sortOpt.sortType) {
        this.source = orderBy(this.data, (row) => get(row, sortOpt.sortKey), sortOpt.sortType);
      } else {
        this.source = this.data;
      }

      this.$emit('on-sort-change', sortOpt);
    },
    onSelectAll(checked) {
      this.isSelectedAll = checked;
      this.source.forEach((r) => {
        this.$set(r, 'isSelected', checked);
      });
      this.isSelectedSome = false;
      this.$emit('on-select-all', checked);
    },
    onSelect(row) {
      this.initSelectStates(this.source);
      this.$emit('on-select', row);
    },
    onRowClick(row) {
      this.$emit('on-row-click', row);
    },
    mouseEnter(row) {
      this.$emit('mouse-enter-row', row);
    },
    mouseLeave(row) {
      this.$emit('mouse-leave-row', row);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-table {
  font-family: @font-family;
  font-size: 13px;
  color: @font-color-strong;
  box-sizing: border-box;
  background-color: #fff;

  .wenv-table-head {
    display: flex;
    overflow: hidden;
  }

  .wenv-table-body {
    position: relative;
  }

  .wenv-table-cell {
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    flex-shrink: 0;
    vertical-align: middle;
    overflow: hidden;

    &[type='selection'] {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 !important;
    }
  }
}
</style>
