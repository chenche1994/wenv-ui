<template>
  <div class="wenv-table-sort" :type="currentType" @click="sort">
    <svg class="wenv-svg-btn wenv-table-sort-btn-asc">
      <use xlink:href="#wenv-i-jiantou" />
    </svg>
    <svg class="wenv-svg-btn wenv-table-sort-btn-desc">
      <use xlink:href="#wenv-i-jiantou" />
    </svg>
  </div>
</template>
<script>
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

const SORT_TYPES = [undefined, 'asc', 'desc'];

export default {
  name: 'WTableHeadSort',
  props: {
    sortKey: {
      type: String,
      required: true,
    },
    sortType: {
      type: String,
      required: false,
      validator(value) {
        return SORT_TYPES.indexOf(value) !== -1;
      },
      default: SORT_TYPES[0],
    },
  },
  data() {
    return {
      currentType: this.sortType,
    };
  },
  watch: {
    sortType(newValue) {
      this.currentType = newValue;
    },
  },
  methods: {
    sort() {
      const index = SORT_TYPES.indexOf(this.currentType);
      this.currentType = SORT_TYPES[(index + 1) % SORT_TYPES.length];
      this.$emit('on-sort-change', { sortKey: this.sortKey, sortType: this.currentType });
    },
  },
};
</script>
<style lang="less">
.wenv-table-sort {
  cursor: pointer;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 10px;
  height: 12px;
  overflow: hidden;

  &[type='asc'] {
    .wenv-table-sort-btn-asc {
      color: #009bff;
    }
  }

  &[type='desc'] {
    .wenv-table-sort-btn-desc {
      color: #009bff;
    }
  }

  .wenv-table-sort-btn-desc {
    transform: rotate(180deg);
  }

  .wenv-table-sort-btn-asc,
  .wenv-table-sort-btn-desc {
    width: 6px;
    height: 6px;
  }
}
</style>
