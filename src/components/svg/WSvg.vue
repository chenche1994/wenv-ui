<template>
  <svg version="1.1" class="wenv-svg" :width="icon.width" :height="icon.height" :viewBox="icon.box">
    <path :d="icon.path.d" :fill="icon.path.fill" />
  </svg>
</template>
<script>
/**
 * @deprecated since version 2.0
 */
export default {
  name: 'WSvg',
  props: {
    name: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  computed: {
    icon() {
      /* eslint-disable-next-line */
      const xml = require(`!xml-loader!@/assets/svg/${this.name}.svg`);
      const t = xml.svg.$.viewBox.split(' ');
      return {
        width: this.scale * Number(t[2]),
        height: this.scale * Number(t[3]),
        box: t,
        path: xml.svg.path[0].$,
      };
    },
  },
};
</script>
<style lang="less">
.wenv-svg {
  display: inline-block;
  fill: currentColor;
}
</style>
