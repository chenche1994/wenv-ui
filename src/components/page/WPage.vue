<template>
  <div class="wenv-page">
    <WPageButton
      icon="wenv-i-youjiantou-di"
      :disabled="optionInternal.current === 1"
      class="wenv-page-btn"
      style="transform: rotate(180deg);"
      @click="toFirstPage"
    />
    <WPageButton
      icon="wenv-i-youjiantou"
      :disabled="optionInternal.current === 1"
      class="wenv-page-btn"
      style="transform: rotate(180deg);"
      @click="previous"
    />
    <WPageButton
      v-for="p in getDisplayPages()"
      :key="p"
      :page="p"
      class="wenv-page-btn"
      :selected="optionInternal.current === p"
      @click="onChange(p)"
    />
    <WPageButton
      icon="wenv-i-youjiantou"
      class="wenv-page-btn"
      :disabled="optionInternal.current === getTotalPageNumbers(optionInternal)"
      @click="next"
    />
    <WPageButton
      icon="wenv-i-youjiantou-di"
      class="wenv-page-btn"
      :disabled="optionInternal.current === getTotalPageNumbers(optionInternal)"
      @click="toLastPage"
    />
    <WSelect02Single
      v-model="optionInternal.pageSize"
      :options="pageSizeOpts"
      :clearable="false"
      placement="top"
      class="wenv-page-size"
      @on-change="onPageSizeChange"
    />
    <span class="wenv-page-total">共{{ optionInternal.total }}条</span>
    <span>跳至</span>
    <input
      :value="optionInternal.current"
      class="wenv-input wenv-page-jumpto"
      @keyup.enter="jumpTo($event.target.value)"
    >
    <span>页</span>
  </div>
</template>

<script>
import WPageButton from './WPageButton.vue';
import WSelect02Single from '../select/WSelect02Single.vue';
import '../../assets/fonts/wenvfont.js';
import '../../css/input.less';

export default {
  name: 'WPage',
  components: {
    WSelect02Single,
    WPageButton,
  },
  model: {
    prop: 'options',
    event: 'on-change',
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    pageSizeOpts: {
      type: Array,
      required: false,
      default() {
        return [
          { id: 10, name: '10条/页' },
          { id: 20, name: '20条/页' },
          { id: 50, name: '50条/页' },
          { id: 100, name: '100条/页' },
        ];
      },
    },
  },
  data() {
    return {
      optionInternal: {
        current: this.getCurrent(this.options),
        pageSize: this.options.pageSize,
        total: this.options.total,
      },
    };
  },
  watch: {
    options(newOption) {
      if (newOption !== this.optionInternal) {
        this.optionInternal = {
          current: this.getCurrent(newOption),
          pageSize: newOption.pageSize,
          total: newOption.total,
        };
      }
    },
  },
  methods: {
    getCurrent(options) {
      const totalPageNumbers = this.getTotalPageNumbers(options);

      let { current } = options;
      if (this.options.current < 1) {
        current = 1;
      } else if (this.options.current > totalPageNumbers) {
        current = totalPageNumbers;
      }

      return current;
    },
    getTotalPageNumbers(option) {
      if (option.total === 0) {
        return 1;
      }
      return Math.ceil(option.total / option.pageSize);
    },
    getDisplayPages() {
      const pages = [];
      pages.push(this.optionInternal.current);
      while (pages[0] > 1 && pages.length < 3) {
        pages.unshift(pages[0] - 1);
      }

      while (
        pages[pages.length - 1] < this.getTotalPageNumbers(this.optionInternal)
        && pages.length < 5
      ) {
        pages.push(pages[pages.length - 1] + 1);
      }

      while (pages[0] > 1 && pages.length < 5) {
        pages.unshift(pages[0] - 1);
      }

      return pages;
    },
    toFirstPage() {
      if (this.optionInternal.current !== 1) {
        this.onChange(1);
      }
    },
    previous() {
      if (this.optionInternal.current !== 1) {
        this.onChange(this.optionInternal.current - 1);
      }
    },
    next() {
      if (this.optionInternal.current !== this.getTotalPageNumbers(this.optionInternal)) {
        this.onChange(this.optionInternal.current + 1);
      }
    },
    toLastPage() {
      if (this.optionInternal.current !== this.getTotalPageNumbers(this.optionInternal)) {
        this.onChange(this.getTotalPageNumbers(this.optionInternal));
      }
    },
    onChange(current) {
      this.optionInternal.current = current;
      this.$emit('on-change', this.optionInternal);
    },
    onPageSizeChange() {
      this.optionInternal.current = 1;
      this.$emit('on-change', this.optionInternal);
    },
    jumpTo(toPage) {
      this.optionInternal.current = -1;
      const value = parseInt(toPage, 10);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(value) || value < 1) {
        this.optionInternal.current = 1;
        this.$emit('on-change', this.optionInternal);
        return;
      }

      const totalPageNumbers = this.getTotalPageNumbers(this.optionInternal);
      if (value > totalPageNumbers) {
        this.optionInternal.current = totalPageNumbers;
        this.$emit('on-change', this.optionInternal);
        return;
      }

      this.optionInternal.current = value;
      this.$emit('on-change', this.optionInternal);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-page {
  font-family: @font-family;
  font-size: 14px;
  color: @font-color-normal;
  display: inline-flex;
  align-items: center;
  user-select: none;
  vertical-align: middle;

  .wenv-page-size {
    margin-left: 12px;
    width: 100px;

    & > .wenv-select-input-wrapper > {
      & > .wenv-input-wrapper > .wenv-input-o {
        height: 22px;
        line-height: 22px;
      }

      & > .wenv-icon-btn-open {
        top: 6px;
      }
    }
  }

  .wenv-page-total {
    margin-left: 4px;
    margin-right: 16px;
  }

  .wenv-page-btn {
    margin-right: 4px;
  }

  .wenv-page-jumpto {
    margin: 0 4px;
    width: 50px;
  }
}
</style>
