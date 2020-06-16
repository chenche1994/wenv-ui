<template>
  <table :class="$style['container']">
    <thead ref="head" :style="{ width: widthNoBorder, maxWidth: maxWidthNoBorder }">
      <tr>
        <th v-for="(column, index) in columns" :key="index">
          <div :style="{ width: column.width, lineHeight: '12px', height: rowHeight + 'px' }">
            <span>{{ column.title }}</span>
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
        </th>
      </tr>
    </thead>
    <tbody
      ref="body"
      :style="{ maxHeight: bodyMaxHeight, width: widthNoBorder, maxWidth: maxWidthNoBorder }"
    >
      <tr v-for="(row, index) in source" :key="index" @click.stop="$emit('on-row-select', row)">
        <td v-for="(column, columnIndex) in columns" :key="columnIndex">
          <div :style="{ width: column.width, height: rowHeight + 'px' }">
            <span v-if="column.key">{{
              column.converter ? column.converter(row[column.key]) : row[column.key]
            }}</span>
            <slot v-if="column.slot" :name="column.slot" :row="row" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { orderBy } from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';

// title: 'Action',      required
// key: 'action',        or slot
// converter: function,
// slot: 'action',       or key
// width: '150px',
export default {
  name: 'Table',
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    rowHeight: {
      type: Number,
      required: false,
      default: 28,
    },
    maxHeight: {
      type: Number,
      required: false,
      default: undefined,
    },
    width: {
      type: Number,
      required: false,
      default: undefined,
    },
    maxWidth: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      sortState: undefined,
    };
  },
  computed: {
    source() {
      if (!this.sortState) {
        return this.data;
      }

      return orderBy(this.data, this.sortState.key, this.sortState.order);
    },
    bodyMaxHeight() {
      // 1px thead border bottom
      // 2px table border
      return `${this.maxHeight - this.rowHeight - 1 - 2}px`;
    },
    widthNoBorder() {
      return this.width ? `${this.width - 2}px` : undefined;
    },
    maxWidthNoBorder() {
      return this.maxWidth ? `${this.maxWidth - 2}px` : undefined;
    },
  },
  mounted() {
    this.psContent = new PerfectScrollbar(this.$refs.body);
    this.handleScrollx = this.$refs.body.addEventListener('ps-scroll-x', (e) => {
      this.$refs.head.scrollLeft = e.target.scrollLeft;
    });
  },
  updated() {
    this.psContent.update();
  },
  beforeDestroy() {
    this.$refs.body.removeEventListener('ps-scroll-x', this.handleScrollx, false);
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
  },
};
</script>
<style lang="less" module>
@import '../main.less';
.container {
  border: @common-border;
  border-radius: @common-border-radius;
  font-size: 12px;
  box-sizing: border-box;
  border-spacing: 0;

  & > thead {
    display: block;
    overflow: hidden;
    border-bottom: @common-border;
    box-sizing: border-box;

    & > tr {
      background-color: #f7f7f7;
      display: inline-flex;
      flex-flow: nowrap;
      align-items: center;

      & > th {
        padding: 0px;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        & > div {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;

          & > span {
            margin-left: 12px;
            white-space: pre;
          }

          & > .sort {
            margin-left: 4px;
            display: inline-flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;

            & > svg {
              cursor: pointer;

              &:hover > path {
                fill: #515a61;
              }
            }
          }
        }
      }
    }
  }

  & > tbody {
    display: block;
    overflow-y: auto;
    overflow-x: auto;
    position: relative;

    & > tr {
      &:nth-child(even) {
        background-color: #f2f6ff;
      }

      &:hover {
        background-color: @common-hover-color;
      }

      & > td {
        padding: 0px;

        & > div {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;

          & > span {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
