<template>
  <div ref="container" :class="$style['container']" @mousewheel="onScroll">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FullPage',
  methods: {
    onScroll(e) {
      this.$refs.container.scrollTop
        += e.deltaY > 0 ? document.body.clientHeight : -document.body.clientHeight;
    },
  },
};
</script>
<style lang="less" module>
.container {
  overflow: hidden;
  height: 100vh;
  scroll-behavior: smooth;

  & > * {
    height: 100vh;
  }
}
</style>
