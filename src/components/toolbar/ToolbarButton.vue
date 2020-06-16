<template>
  <div :class="$style['container']" @click="$emit('on-click')">
    <SvgIcon :name="icon" :class="$style['icon']" />
    <span>{{ name }}</span>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'ToolbarButton',
  components: {
    SvgIcon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="less" module>
@import '../../main.less';

.container {
  @margin-before-after: 12px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  height: 34px;
  &:hover {
    background-color: @common-hover-color;
    color: #006fe1;
  }

  &:hover > .icon {
    color: #006fe1;
  }

  & > .icon {
    margin-left: @margin-before-after;
    margin-right: 8px;
    color: #999999;
  }

  & > span {
    margin-right: @margin-before-after;
  }
}
</style>
