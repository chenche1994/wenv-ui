<template>
  <div ref="wrapper" :class="TABLE_WRAPPER_CLASS">
    <div :class="[TABLE_CLASS, LEFT_CLASS]">
      <div :class="HEAD_CLASS" />
      <div ref="leftBody" :class="BODY_CLASS">
        <div :class="BODY_ROWS_WRAPPER_CLASS" />
      </div>
    </div>
    <div :class="[TABLE_CLASS, MAIN_CLASS]">
      <div ref="mainHead" :class="HEAD_CLASS" />
      <div ref="mainBody" :class="BODY_CLASS">
        <div :class="BODY_ROWS_WRAPPER_CLASS" />
      </div>
    </div>
    <div :class="[TABLE_CLASS, RIGHT_CLASS]">
      <div :class="HEAD_CLASS" />
      <div ref="rightBody" :class="BODY_CLASS">
        <div :class="BODY_ROWS_WRAPPER_CLASS" />
      </div>
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar';
import { pickBy, debounce, find } from 'lodash-es';
import { ResizeSensor } from 'css-element-queries';
import updateTable from './updateTable.js';
import getNextSortType from './getNextSortType.js';
import getRowId from './getRowId.js';
import highlightRow from './highlightRow.js';
import unhighlightRow from './unhighlightRow.js';
import setHeadSelectionStatus from './setHeadSelectionStatus.js';
import setRowSelectionStatus from './setRowSelectionStatus.js';
import formatColumns from './formatColumns.js';
import sortData from './sortData.js';
import addIdToData from './addIdToData.js';
import {
  TABLE_WRAPPER_CLASS,
  TABLE_CLASS,
  LEFT_CLASS,
  MAIN_CLASS,
  RIGHT_CLASS,
  HEAD_CLASS,
  HEAD_SORT_CLASS,
  HEAD_SELECTION_CLASS,
  BODY_CLASS,
  BODY_SELECTION_CLASS,
  BODY_ROWS_WRAPPER_CLASS,
} from './constants.js';
import { ASC, DESC, NONE_SORT_TYPE } from './sort-types.js';
import '../../css/perfect-scrollbar.css';

export default {
  name: 'WTable',
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
    headLineHeight: {
      type: Number,
      required: false,
      default: 38,
    },
    rowLineHeight: {
      type: Number,
      required: false,
      default: 38,
    },
    remoteSort: {
      type: Boolean, // 服务端排序,需要监听 on-sort-change 事件
      required: false,
      default: true,
    },
    multipleSort: {
      type: Boolean, // 是否多个字段排序
      required: false,
      default: false,
    },
    sortBy: {
      type: Object,
      required: false,
      default() {
        return {}; // {name:'asc',age:'desc'}
      },
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
    noDataText: {
      type: String,
      required: false,
      default: '没有数据!',
    },
  },
  data() {
    addIdToData(this.data);

    return {
      TABLE_WRAPPER_CLASS,
      TABLE_CLASS,
      LEFT_CLASS,
      MAIN_CLASS,
      RIGHT_CLASS,
      HEAD_CLASS,
      BODY_CLASS,
      BODY_ROWS_WRAPPER_CLASS,
      previousWidth: undefined,
      sortedData: sortData(this.data, this.sortBy, this.remoteSort),
      formattedColumns: [],
    };
  },
  watch: {
    columns(newCols) {
      this.formattedColumns = formatColumns(newCols, this.$refs.wrapper.clientWidth);
      this.refresh(true);
    },
    data(newData) {
      addIdToData(newData);
      this.sortedData = sortData(newData, this.sortBy, this.remoteSort);
      this.refresh(false);
    },
  },
  mounted() {
    this.$refs.wrapper.addEventListener('click', this.onClick);
    this.$refs.wrapper.addEventListener('mouseover', this.onMouseEnter);
    this.$refs.wrapper.addEventListener('mouseout', this.onMouseLeave);
    this.$refs.mainBody.addEventListener('ps-scroll-x', this.handleScrollx);
    this.$refs.mainBody.addEventListener('ps-scroll-y', this.handleScrolly);
    this.previousWidth = this.$refs.wrapper.clientWidth;

    this.ps = new PerfectScrollbar(this.$refs.mainBody, {
      minScrollbarLength: 40,
      handlers: this.scrollHandlers,
      wheelPropagation: this.wheelPropagation,
    });

    this.formattedColumns = formatColumns(this.columns, this.$refs.wrapper.clientWidth);
    this.refresh(true);
    this.resizeSensor = new ResizeSensor(this.$refs.wrapper, this.onSizeChange);
  },
  beforeDestroy() {
    this.$refs.wrapper.removeEventListener('click', this.onClick);
    this.$refs.wrapper.removeEventListener('mouseover', this.onMouseEnter);
    this.$refs.wrapper.removeEventListener('mouseout', this.onMouseLeave);
    this.$refs.mainBody.removeEventListener('ps-scroll-x', this.handleScrollx);
    this.$refs.mainBody.removeEventListener('ps-scroll-y', this.handleScrolly);
    this.ps.destroy();
    this.ps = null;
    this.resizeSensor.detach(this.onSizeChange);
    this.resizeSensor = null;
  },
  methods: {
    handleScrollx(e) {
      this.$refs.mainHead.scrollLeft = e.target.scrollLeft;
    },
    handleScrolly(e) {
      if (this.$refs.leftBody) {
        this.$refs.leftBody.scrollTop = e.target.scrollTop;
      }
      if (this.$refs.rightBody) {
        this.$refs.rightBody.scrollTop = e.target.scrollTop;
      }
    },
    onMouseEnter(e) {
      const id = getRowId(e.target);
      if (!id) {
        return;
      }
      highlightRow(this.$refs.wrapper, id);
    },
    onMouseLeave(e) {
      const id = getRowId(e.target);
      if (!id) {
        return;
      }
      unhighlightRow(this.$refs.wrapper, id);
    },
    onSizeChange: debounce(function ft() {
      if (this.previousWidth === this.$refs.wrapper.clientWidth) {
        return;
      }
      this.previousWidth = this.$refs.wrapper.clientWidth;
      this.formattedColumns = formatColumns(this.columns, this.$refs.wrapper.clientWidth);
      this.refresh(true);
      console.log(`table 05 refresh - ${new Date()}`);
    }, 100),
    refresh(layoutChanged) {
      updateTable(
        this.$refs.wrapper,
        this.formattedColumns,
        this.sortedData,
        this.$scopedSlots,
        layoutChanged,
        {
          headLineHeight: this.headLineHeight,
          rowLineHeight: this.rowLineHeight,
          remoteSort: this.remoteSort,
          multipleSort: this.multipleSort,
          sortBy: this.sortBy,
          noDataText: this.noDataText,
        },
      );
      this.ps.update();
    },
    onClick(e) {
      if (e.target.classList.contains(HEAD_SORT_CLASS)) {
        this.onSortChange(e);
      } else if (e.target.classList.contains(HEAD_SELECTION_CLASS)) {
        setHeadSelectionStatus(this.$refs.wrapper, e.target, this.data);
        this.$emit('on-selection-change');
      } else if (e.target.classList.contains(BODY_SELECTION_CLASS)) {
        setRowSelectionStatus(this.$refs.wrapper, e.target, this.data);
        this.$emit('on-selection-change');
      } else {
        const id = getRowId(e.target);
        if (id) {
          const row = find(this.data, (d) => d.internalId === id);
          this.$emit('on-row-click', row);
        }
      }
    },
    onSortChange(e) {
      const key = e.target.getAttribute('data-key');
      const type = e.target.getAttribute('data-type');
      if (!this.multipleSort) {
        Object.keys(this.sortBy).forEach((k) => {
          delete this.sortBy[k];
        });
        const els = this.$refs.wrapper.querySelectorAll(`.${HEAD_SORT_CLASS}`);
        for (let i = 0; i < els.length; i += 1) {
          els[i].setAttribute('data-type', NONE_SORT_TYPE);
        }
      }
      const nextType = getNextSortType(type);
      this.sortBy[key] = nextType;
      e.target.setAttribute('data-type', nextType);
      if (!this.remoteSort) {
        this.sortedData = sortData(this.data, this.sortBy, false);
        this.refresh(false);
      }
      this.$emit(
        'on-sort-change',
        pickBy(this.sortBy, (v) => v === ASC || v === DESC),
      );
    },
  },
};
</script>
<style lang="less">
@import './head.less';
@import './body.less';
@import '../../css/checkbox.less';

.wenv-table-05-wrapper {
  @border-color: #e2e2e4;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  border-left: 1px solid @border-color;
  border-top: 1px solid @border-color;
  border-bottom: 1px solid @border-color;

  .wenv-table-05 {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
  }

  .wenv-table-05-left {
    box-shadow: 2px 0 6px -2px rgba(0, 0, 0, 0.8);
    z-index: 1;
  }

  .wenv-table-05-right {
    box-shadow: -2px 0 6px -2px rgba(0, 0, 0, 0.8);
    z-index: 1;
  }

  .wenv-table-05-row-highlight {
    background-color: #dcf2ff;
  }

  .wenv-table-05-row-highlight-bar:before {
    content: '';
    display: block;
    position: absolute;
    width: 3px;
    height: 100%;
    background-color: #41bf56;
  }
}
</style>
