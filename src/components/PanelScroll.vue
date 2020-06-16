<template>
  <div ref="container" :class="$style['container']">
    <div
      v-for="(item, i) in dataInternal"
      :key="i"
      :style="{
        height: itemHeight + 'px',
        marginTop: i === 0 ? marginTop + 'px' : undefined,
        marginBottom: i === dataInternal.length - 1 ? marginBottom + 'px' : undefined,
      }"
    >
      <slot name="item" :item="item" />
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';

export default {
  name: 'PanelScroll',
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
      containerClientHeight: 0,
      scrollTop: 0,
    };
  },
  computed: {
    firstVisibleItemIndex() {
      if (this.data.length <= this.visibleItemsCount) {
        return 0;
      }

      let index = Math.floor(this.scrollTop / this.itemHeight);
      if (this.data.length - index < this.visibleItemsCount) {
        index = this.data.length - this.visibleItemsCount;
      }
      return index;
    },
    lastVisibleItemIndex() {
      // not including
      return this.firstVisibleItemIndex + this.visibleItemsCount;
    },
    dataInternal() {
      return this.data.slice(this.firstVisibleItemIndex, this.lastVisibleItemIndex);
    },
    marginTop() {
      return this.itemHeight * this.firstVisibleItemIndex;
    },
    marginBottom() {
      return this.itemHeight * (this.data.length - this.lastVisibleItemIndex);
    },
    visibleItemsCount() {
      return Math.ceil(this.containerClientHeight / this.itemHeight + 1);
    },
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
    },
    onContainerClientHeight() {
      this.containerClientHeight = this.$refs.container.clientHeight;
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
