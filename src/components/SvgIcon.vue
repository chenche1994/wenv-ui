<template>
  <svg
    version="1.1"
    :class="$style['icon']"
    :width="icon.width"
    :height="icon.height"
    :viewBox="icon.box"
  >
    <path :d="icon.path.d" :fill="icon.path.fill" />
  </svg>
</template>
<script>
/**
 * @deprecated
 */
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      /* eslint-disable-next-line */
      const xml = require(`!xml-loader!@/svg/${this.name}.svg`);
      const t = xml.svg.$.viewBox.split(' ');
      return {
        width: xml.svg.$.width || t[2],
        height: xml.svg.$.height || t[3],
        box: t,
        path: xml.svg.path[0].$,
      };
    },
  },
};
</script>
<style lang="less" module>
.icon {
  display: inline-block;
  fill: currentColor;
}
</style>
