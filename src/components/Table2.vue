<template>
  <div ref="container" :class="$style['container']">
    <div ref="headers" :class="$style['headers']">
      <div
        ref="headersrow"
        :class="$style['headers-row']"
        :style="{ display: isRowInline ? 'inline-flex' : 'flex' }"
      >
        <div v-if="multiSelect" :class="[$style['header'], $style['header-select-all']]">
          <Checkbox2 v-model="isSelectedAll" :indeterminate="isSelectedSome" @change="selecteAll" />
        </div>
        <div
          v-for="(column, index) in columns"
          :key="index"
          :class="$style['header']"
          :style="{
            width: column.width,
            flex: column.width ? undefined : 1,
            height: headerHeight + 'px',
          }"
        >
          <span :style="{ marginLeft: !column.slot ? '12px' : undefined }">{{ column.title }}</span>
          <div v-if="!column.slot" :class="$style['sort']">
            <svg viewBox="0 0 6 4" width="8" height="5" @click="sort(column, 'asc')">
              <path
                :fill="column.sortState === 'asc' ? '#3f96ee' : '#c5c8ce'"
                d="M6,4H0l3-4L6,4z"
              />
            </svg>
            <div style="height:2px;" />
            <svg viewBox="0 0 6 4" width="8" height="5" @click="sort(column, 'desc')">
              <path
                :fill="column.sortState === 'desc' ? '#3f96ee' : '#c5c8ce'"
                d="M3,4L0,0h6L3,4z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="body"
      :class="$style['body']"
      :style="{ width: tableWidth + 'px', height: bodyHeight > 0 ? bodyHeight + 'px' : undefined }"
    >
      <div
        v-for="(row, index) in source"
        :key="index"
        :class="$style['row']"
        :style="{ display: isRowInline ? 'inline-flex' : 'flex' }"
        @click.stop="$emit('on-select', row)"
      >
        <div v-if="multiSelect" :class="[$style['cell'], $style['cell-select']]">
          <Checkbox2 v-model="row.isSelected" @change="selecteRow(row)" />
        </div>
        <div
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          :style="{
            width: column.width,
            flex: column.width ? undefined : 1,
            height: rowHeight + 'px',
          }"
          :class="$style['cell']"
        >
          <span v-if="column.key">{{
            column.converter ? column.converter(row[column.key]) : row[column.key]
          }}</span>
          <slot v-if="column.slot" :name="column.slot" :row="row" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderBy } from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';
import Checkbox2 from './Checkbox2.vue';

// title: 'Action',      required
// key: 'action',        or slot
// converter: function,
// slot: 'action',       or key
// width: '150px',
export default {
  name: 'Table2',
  components: {
    Checkbox2,
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
    headerHeight: {
      type: Number,
      required: false,
      default: 60,
    },
    rowHeight: {
      type: Number,
      required: false,
      default: 28,
    },
    multiSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      sortState: undefined,
      tableWidth: 0,
      bodyHeight: 0,
      isRowInline: true,
      isSelectedAll: false,
      isSelectedSome: false,
    };
  },
  computed: {
    source() {
      if (this.multiSelect) {
        this.data.forEach((r) => {
          if (r.isSelected === undefined) {
            this.$set(r, 'isSelected', false);
          }
        });
      }

      if (!this.sortState) {
        return this.data;
      }

      return orderBy(this.data, this.sortState.key, this.sortState.order);
    },
  },
  mounted() {
    this.tableWidth = this.$refs.container.clientWidth;
    this.bodyHeight = this.$refs.container.clientHeight - this.headerHeight;
    if (this.$refs.headersrow.clientWidth < this.$refs.container.clientWidth) {
      this.$refs.headersrow.style.display = 'flex';
      this.isRowInline = false;
    }

    this.psContent = new PerfectScrollbar(this.$refs.body);
    this.handleScrollx = this.$refs.body.addEventListener('ps-scroll-x', (e) => {
      this.$refs.headers.scrollLeft = e.target.scrollLeft;
    });
  },
  updated() {
    this.psContent.update();
  },
  beforeDestroy() {
    this.$refs.body.removeEventListener('ps-scroll-x', this.handleScrollx, false);
    this.handleScrollx = null;
    this.psContent.destroy();
    this.psContent = null;
  },
  methods: {
    sort(column, order) {
      if (column.sortState === order) {
        /* eslint-disable-next-line no-param-reassign */
        column.sortState = undefined;
        this.sortState = undefined;
      } else {
        this.columns.forEach((c) => {
          /* eslint-disable-next-line no-param-reassign */
          c.sortState = undefined;
        });
        /* eslint-disable-next-line no-param-reassign */
        column.sortState = order;
        this.sortState = { key: column.key, order };
      }
    },
    selecteAll(isSelectedAll) {
      this.source.forEach((r) => {
        /* eslint-disable-next-line no-param-reassign */
        r.isSelected = isSelectedAll;
      });
      this.isSelectedSome = false;
    },
    selecteRow() {
      if (this.source.every((r) => r.isSelected === true)) {
        this.isSelectedAll = true;
        this.isSelectedSome = false;
      } else if (this.source.some((r) => r.isSelected === true)) {
        this.isSelectedAll = false;
        this.isSelectedSome = true;
      } else {
        this.isSelectedAll = false;
        this.isSelectedSome = false;
      }
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';
.container {
  font-size: 12px;
  box-sizing: border-box;
  overflow: hidden;

  & > .headers {
    background-color: #f7f7f7;
    overflow: hidden;

    & > .headers-row {
      display: inline-flex;

      & > .header {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        & > span {
          text-align: center;
          white-space: pre;
        }

        & > .sort {
          display: inline-flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          margin-left: 4px;

          & > svg {
            cursor: pointer;

            &:hover > path {
              fill: #515a61;
            }
          }
        }
      }

      & > .header-select-all {
        width: 50px;
      }
    }
  }

  & > .body {
    position: relative;

    & > .row {
      &:nth-child(even) {
        background-color: #f2f6ff;
      }

      &:hover {
        background-color: @common-hover-color;
      }

      & > .cell {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        & > span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      & > .cell-select {
        width: 50px;
      }
    }
  }
}
</style>
