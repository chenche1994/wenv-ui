<template>
  <div ref="container" :class="$style['container']">
    <div :style="{ marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }">
      <div v-for="(item, i) in dataInternal" :key="i">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';

export default {
  name: 'VirtualScrollList',
  props: {
    itemHeight: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scrollTop: 0,
      visibleItemsCount: 0,
      dataInternal: [],
      marginTop: 0,
      marginBottom: 0,
    };
  },
  mounted() {
    this.onContainerClientHeight();
    this.rs = new ResizeSensor(this.$refs.container, this.onContainerClientHeight);
    this.$refs.container.addEventListener('ps-scroll-y', this.handleScrolly, false);
    this.ps = new PerfectScrollbar(this.$refs.container, {
      minScrollbarLength: 30,
    });
  },
  activated() {
    this.$refs.container.scrollTop = this.scrollTop;
    this.onContainerClientHeight();
    this.ps.update();
  },
  updated() {
    this.ps.update();
  },
  beforeDestroy() {
    if (this.rs) {
      this.rs.detach(this.onContainerClientHeight);
      this.rs = null;
    }
    this.$refs.container.removeEventListener('ps-scroll-y', this.handleScrolly, false);
    this.ps.destroy();
    this.ps = null;
  },
  methods: {
    handleScrolly() {
      this.scrollTop = this.$refs.container.scrollTop;
      this.fitDisplay(this.scrollTop, this.visibleItemsCount);
    },
    onContainerClientHeight() {
      this.visibleItemsCount = this.getVisibleItemsCount(this.$refs.container.clientHeight);
      this.fitDisplay(this.scrollTop, this.visibleItemsCount);
    },
    fitDisplay(scrollTop, visibleItemsCount) {
      const firstVisibleItemIndex = this.getFirstVisibleItemIndex(scrollTop, visibleItemsCount);
      const lastVisibleItemIndex = firstVisibleItemIndex + visibleItemsCount;
      this.dataInternal = this.data.slice(firstVisibleItemIndex, lastVisibleItemIndex);
      this.marginTop = this.itemHeight * firstVisibleItemIndex;
      this.marginBottom = this.itemHeight * (this.data.length - lastVisibleItemIndex);
    },
    getVisibleItemsCount(containerClientHeight) {
      return Math.ceil(containerClientHeight / this.itemHeight + 1);
    },
    getFirstVisibleItemIndex(scrollTop, visibleItemsCount) {
      if (this.data.length <= visibleItemsCount) {
        return 0;
      }

      let index = Math.floor(scrollTop / this.itemHeight);
      if (this.data.length - index < visibleItemsCount) {
        index = this.data.length - visibleItemsCount;
      }
      return index;
    },
  },
};
</script>
<style lang="less" module>
.container {
  position: relative;
  height: 50px;
}
</style>
