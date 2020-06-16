<template>
  <div :class="$style['container']" @click="$emit('on-click')">
    <SvgIcon :name="icon" :class="$style['icon']" />
    <span>{{ name }}</span>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'NavbarButton',
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
  @margin-before-after: 18px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: @common-hover-color;
    color: #0f89f4;

    & > .icon {
      fill: #0f89f4;
    }
  }

  & > .icon {
    margin-left: @margin-before-after;
    fill: #7D8196;
  }

  & > span {
    margin-left: 6px;
    margin-right: @margin-before-after;
  }
}
</style>
