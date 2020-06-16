<template>
  <div :class="$style['container']" @click="$emit('on-click',!isToggled)">
    <SvgIcon :name="icon" :class="$style['icon']" :style="{color}" />
    <span :style="{color}">{{ name }}</span>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'NavbarToggleButton',
  components: {
    SvgIcon,
  },
  model: {
    prop: 'isToggled',
    event: 'on-click',
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
    isToggled: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    color() {
      return this.isToggled ? '#0f89f4' : undefined;
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
      color: #0f89f4;
    }
  }

  & > .icon {
    margin-left: @margin-before-after;
    color: #7D8196;
  }

  & > span {
    margin-left: 6px;
    margin-right: @margin-before-after;
  }
}
</style>
