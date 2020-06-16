<template>
  <div
    ref="container"
    :class="$style['container']"
    :style="{ width: width ? `${width}px` : '100%' }"
  >
    <table>
      <thead ref="thead" :style="{ width: `${tableWidth}px` }">
        <tr>
          <th v-if="multiSelect">
            <div :style="selectAllStyle">
              <Checkbox2
                v-model="isSelectedAll"
                :indeterminate="isSelectedSome"
                @change="selecteAll"
              />
            </div>
          </th>
          <th v-for="(column, i) in columnsInternal" :key="i">
            <div :style="{ width: `${column.width}px`, height: `${headerHeight}px` }">
              <span :class="$style['title']">{{ column.title }}</span>
              <div v-if="column.sort" :class="$style['sort']">
                <svg viewBox="0 0 6 4" width="8" height="5" @click="sort(column, 'asc')">
                  <path :fill="getSortColor(column.currentSortOrder, 'asc')" d="M6,4H0l3-4L6,4z" />
                </svg>
                <svg
                  viewBox="0 0 6 4"
                  width="8"
                  height="5"
                  style="marginTop:2px;"
                  @click="sort(column, 'desc')"
                >
                  <path :fill="getSortColor(column.currentSortOrder, 'desc')" d="M3,4L0,0h6L3,4z" />
                </svg>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody ref="tbody" :style="{ width: `${tableWidth}px`, maxHeight: `${tbodyHeight}px` }">
        <tr v-for="(row, i) in source" :key="i" @click="$emit('on-row-click', row)">
          <td v-if="multiSelect">
            <div :style="selectAllStyle">
              <Checkbox2 v-model="row.isSelected" @change="selecteRow(row)" />
            </div>
          </td>
          <td v-for="(column, j) in columnsInternal" :key="j">
            <div :style="{ width: `${column.width}px` }">
              <span v-if="column.key">{{
                column.converter ? column.converter(row[column.key]) : row[column.key]
              }}</span>
              <slot v-else :name="column.slot" :row="row" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {
  cloneDeep, get, maxBy, orderBy,
} from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';
import Checkbox2 from './Checkbox2.vue';

const MULTI_SELECT_COLUMN_WIDTH = 50;

// columns参数说明
// title: 'Name',         必需,唯一
// key: 'name',           如果使用插槽，不需要设置;设置后插槽不起作用
// converter: function,   与key一起使用，对key对应的值进行转换
// slot: 'name',          插槽
// sort: 'name.xx',       根据指定的key对表格进行排序
// width: 150,            必需，pixel
// resize: false          如果表格宽度大于所有列的宽度之和时起作用，将超出的宽度平均分配给所有设置resize为true的列
export default {
  name: 'Table4',
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
    headerHeight: {
      type: Number,
      required: false,
      default: 56,
    },
    multiSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      tableWidth: undefined,
      tbodyHeight: undefined,
      columnsInternal: [],
      sortState: { sort: undefined, sortIdentity: undefined, order: undefined },
      isSelectedAll: false,
      isSelectedSome: false,
      source: [],
      selectAllStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${MULTI_SELECT_COLUMN_WIDTH}px`,
      },
    };
  },
  watch: {
    data(newData) {
      newData.forEach((r) => {
        this.$set(r, 'isSelected', false);
      });
      this.source = newData;
      this.isSelectedAll = false;
      this.isSelectedSome = false;
    },
  },
  mounted() {
    this.onSizeChange();
    this.resizeSensor = new ResizeSensor(this.$refs.container, this.onSizeChange);
    this.psContent = new PerfectScrollbar(this.$refs.tbody);
    this.$refs.tbody.addEventListener('ps-scroll-x', this.handleScrollx);
  },
  updated() {
    this.psContent.update();
  },
  beforeDestroy() {
    this.$refs.tbody.removeEventListener('ps-scroll-x', this.handleScrollx, false);
    this.psContent.destroy();
    this.psContent = null;

    this.resizeSensor.detach(this.onSizeChange);
    this.resizeSensor = null;
  },
  methods: {
    handleScrollx(e) {
      this.$refs.thead.scrollLeft = e.target.scrollLeft;
    },
    onSizeChange() {
      this.tableWidth = this.$refs.container.clientWidth;
      this.tbodyHeight = this.maxHeight ? this.maxHeight - this.headerHeight : undefined;

      const tempColumns = cloneDeep(this.columns);
      const totalColumnsWidth = tempColumns.reduce(
        (acc, c) => acc + c.width,
        this.multiSelect ? MULTI_SELECT_COLUMN_WIDTH : 0,
      );
      const columnsResize = tempColumns.filter((c) => c.resize === true);
      if (columnsResize.length > 0 && totalColumnsWidth < this.tableWidth) {
        const widthNeedToFill = this.tableWidth - totalColumnsWidth;
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
    sort(column, order) {
      this.columnsInternal.forEach((c) => {
        if (c.title === column.title) {
          this.$set(c, 'currentSortOrder', c.currentSortOrder === order ? undefined : order);
        } else {
          this.$set(c, 'currentSortOrder', undefined);
        }
      });

      if (column.currentSortOrder) {
        this.source = orderBy(this.data, (row) => get(row, column.sort), column.currentSortOrder);
      } else {
        this.source = this.data;
      }
    },
    getSortColor(currentSortOrder, order) {
      return currentSortOrder === order ? '#3f96ee' : '#c5c8ce';
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
  font-family: @font-family;
  font-size: 13px;

  & > table {
    box-sizing: content-box;
    border-collapse: collapse;

    & > thead {
      overflow: hidden;
      display: block;
      background-color: #f7f7f7;

      & > tr > th {
        padding: 0;
        text-align: center;

        & > div {
          display: flex;
          align-items: center;
          justify-content: center;

          & > .title {
            display: inline-block;
            white-space: pre;
          }

          & > .sort {
            display: inline-flex;
            flex-flow: column;
            margin-left: 4px;
          }
        }
      }
    }

    & > tbody {
      position: relative;
      overflow: hidden;
      display: block;

      & > tr {
        & > td {
          padding: 0;

          & > div {
            display: flex;
            align-items: center;
            justify-content: center;

            & > span {
              word-break: break-all;
              white-space: pre-wrap;
              text-align: left;
              display: inline-block;
              margin: 12px 8px;
            }
          }
        }

        &:nth-child(even) {
          background-color: #f2f6ff;
        }

        &:hover {
          background-color: #e2ebff;
        }
      }
    }
  }
}
</style>
