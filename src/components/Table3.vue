<template>
  <div :class="$style['container']">
    <div :class="$style['headers-row']">
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
            <path :fill="column.sortState === 'asc' ? '#3f96ee' : '#c5c8ce'" d="M6,4H0l3-4L6,4z" />
          </svg>
          <div style="height:2px;" />
          <svg viewBox="0 0 6 4" width="8" height="5" @click="sort(column, 'desc')">
            <path :fill="column.sortState === 'desc' ? '#3f96ee' : '#c5c8ce'" d="M3,4L0,0h6L3,4z" />
          </svg>
        </div>
      </div>
    </div>
    <div :class="$style['body']">
      <div
        v-for="(row, index) in source"
        :key="index"
        :class="$style['row']"
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
import Checkbox2 from './Checkbox2.vue';

// title: 'Action',      required
// key: 'action',        or slot
// converter: function,
// slot: 'action',       or key
// width: '150px',
export default {
  name: 'Table3',
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
    this.initData(this.data);

    return {
      sortState: undefined,
      isSelectedAll: false,
      isSelectedSome: false,
    };
  },
  computed: {
    source() {
      if (!this.sortState) {
        return this.data;
      }

      return orderBy(this.data, this.sortState.key, this.sortState.order);
    },
  },
  watch: {
    data(newData) {
      this.initData(newData);
    },
  },
  methods: {
    initData(data) {
      if (this.multiSelect) {
        data.forEach((d) => {
          if (d.isSelected === undefined) {
            this.$set(d, 'isSelected', false);
          }
        });
      }
    },
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
  display: inline-flex;
  flex-flow: column;
  font-size: 12px;
  box-sizing: border-box;

  & > .headers-row {
    display: inline-flex;
    align-items: center;
    background-color: #f7f7f7;

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

  & > .body {
    display: inline-flex;
    flex-flow: column;

    & > .row {
      display: inline-flex;
      align-items: center;

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
        }
      }

      & > .cell-select {
        width: 50px;
      }
    }
  }
}
</style>
