<template>
  <div :class="$style['container']">
    每页显示
    <Select
      v-model="pageSize"
      :options="pageSizes"
      :width="40"
      :height="24"
      :class="$style['page-size']"
      @on-change="onPageSizeChange"
    />
    条, 共{{ total }}条
    <div
      :class="[
        $style['button'],
        $style['button-first'],
        current === 1 ? $style['button-disable'] : undefined,
      ]"
      @click="toFirstPage"
    >
      <svg version="1.1" viewBox="0 0 6 9" width="6" height="9">
        <path
          d="M2.3,4.5L5.8,1c0.2-0.2,0.2-0.6,0-0.8C5.6,0,5.3,0,5.1,0.2L1.2,
        4.1C1.1,4.2,1,4.4,1,4.5V0H0v9h1V4.5c0,0.1,0.1,0.3,0.2,0.4l3.9,3.9C5.3,
        9,5.6,9,5.8,8.8c0.2-0.2,0.2-0.6,0-0.8L2.3,4.5z"
        />
      </svg>
    </div>
    <div
      :class="[$style['button'], current === 1 ? $style['button-disable'] : undefined]"
      @click="previous"
    >
      <svg version="1.1" viewBox="0 0 5 9" width="5" height="9">
        <path
          d="M0,4.5c0-0.1,0.1-0.3,0.2-0.4l3.9-3.9C4.3,0,4.6,0,4.8,0.2c0.2,0.2,
          0.2,0.6,0,0.8L1.3,4.5L4.8,8c0.2,0.2,0.2,0.6,0,0.8C4.6,9,4.3,9,4.1,
          8.8L0.2,4.9C0.1,4.8,0,4.6,0,4.5L0,4.5z M0,4.5"
        />
      </svg>
    </div>
    <div
      v-for="p in displayPages"
      :key="p"
      :class="[$style['page'], current === p ? $style['page-selected'] : undefined]"
      @click="onChange(p)"
    >
      {{ p }}
    </div>
    <div
      :class="[
        $style['button'],
        current === totalPageNumbers ? $style['button-disable'] : undefined,
      ]"
      @click="next"
    >
      <svg version="1.1" viewBox="0 0 5 9" width="5" height="9" style="transform: rotate(180deg)">
        <path
          d="M0,4.5c0-0.1,0.1-0.3,0.2-0.4l3.9-3.9C4.3,0,4.6,0,4.8,0.2c0.2,0.2,
          0.2,0.6,0,0.8L1.3,4.5L4.8,8c0.2,0.2,0.2,0.6,0,0.8C4.6,9,4.3,9,4.1,
          8.8L0.2,4.9C0.1,4.8,0,4.6,0,4.5L0,4.5z M0,4.5"
        />
      </svg>
    </div>
    <div
      :class="[
        $style['button'],
        current === totalPageNumbers ? $style['button-disable'] : undefined,
      ]"
      @click="toLastPage"
    >
      <svg version="1.1" viewBox="0 0 6 9" width="6" height="9" style="transform: rotate(180deg)">
        <path
          d="M2.3,4.5L5.8,1c0.2-0.2,0.2-0.6,0-0.8C5.6,0,5.3,0,5.1,0.2L1.2,
        4.1C1.1,4.2,1,4.4,1,4.5V0H0v9h1V4.5c0,0.1,0.1,0.3,0.2,0.4l3.9,3.9C5.3,
        9,5.6,9,5.8,8.8c0.2-0.2,0.2-0.6,0-0.8L2.3,4.5z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import Select from './Select.vue';

export default {
  name: 'Page',
  components: {
    Select,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pageSizes: [
        { id: 10, name: 10 },
        { id: 20, name: 20 },
        { id: 30, name: 30 },
        { id: 40, name: 40 },
        { id: 50, name: 50 },
      ],
      pageSize: { id: 10, name: 10 },
      current: 1,
    };
  },
  computed: {
    totalPageNumbers() {
      const result = Math.ceil(this.total / this.pageSize.id);
      return result === 0 ? 1 : result;
    },
    displayPages() {
      const pages = [];
      pages.push(this.current);
      while (pages[0] > 1 && pages.length < 3) {
        pages.unshift(pages[0] - 1);
      }

      while (pages[pages.length - 1] < this.totalPageNumbers && pages.length < 5) {
        pages.push(pages[pages.length - 1] + 1);
      }

      while (pages[0] > 1 && pages.length < 5) {
        pages.unshift(pages[0] - 1);
      }

      return pages;
    },
  },
  watch: {
    total() {
      this.current = 1;
    },
  },
  methods: {
    toFirstPage() {
      if (this.current !== 1) {
        this.onChange(1);
      }
    },
    previous() {
      if (this.current !== 1) {
        this.onChange(this.current - 1);
      }
    },
    next() {
      if (this.current !== this.totalPageNumbers) {
        this.onChange(this.current + 1);
      }
    },
    toLastPage() {
      if (this.current !== this.totalPageNumbers) {
        this.onChange(this.totalPageNumbers);
      }
    },
    onChange(page) {
      this.current = page;
      this.$emit('on-change', { page, pageSize: this.pageSize.id });
    },
    onPageSizeChange() {
      this.current = 1;
      this.$emit('on-page-size-change', this.pageSize.id);
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';
.container {
  height: 24px;
  font-size: 14px;
  color: #333333;
  display: flex;
  align-items: center;
  user-select: none;

  & > .page-size {
    margin-left: 4px;
    margin-right: 4px;
  }

  & > .button {
    width: 24px;
    height: 24px;
    border: @common-border;
    border-radius: @common-border-radius;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: #333333;
    margin-left: 4px;
    cursor: pointer;

    &:hover {
      fill: #82c0ff;
    }
  }

  & > .button-first {
    margin-left: 24px;
  }

  & > .button-disable {
    fill: #cccccc;
    cursor: auto;

    &:hover {
      fill: #cccccc;
    }
  }

  & > .page {
    width: 24px;
    height: 24px;
    border: @common-border;
    border-radius: @common-border-radius;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    cursor: pointer;

    &:hover {
      color: #82c0ff;
    }
  }

  & > .page-selected {
    background-color: #82c0ff;
    color: #ffffff;
    cursor: auto;

    &:hover {
      color: #ffffff;
    }
  }
}
</style>
