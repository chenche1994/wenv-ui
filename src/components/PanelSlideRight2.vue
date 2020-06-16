<template>
  <div :class="$style['container']">
    <div :class="$style['title']" @click="isOpen = !isOpen">
      <img :src="arrowIcon">
      <div>{{ title }}</div>
    </div>
    <transition name="fade-right">
      <div v-if="isOpen" :class="$style['content']">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
const arrowLeftIcon = require('../assets/images/panel_toggle_arrow_left.png');
const arrowRightIcon = require('../assets/images/panel_toggle_arrow_right.png');

export default {
  name: 'PanelSlideRight2',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isOpen: true,
      arrowLeftIcon,
      arrowRightIcon,
    };
  },
  computed: {
    arrowIcon() {
      return this.isOpen ? arrowRightIcon : arrowLeftIcon;
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: inline-flex;
  border-radius: @common-border-radius;
  box-shadow: @common-box-shadow;

  & > .title {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    width: 26px;
    background-color: @primary-color;
    border-radius: @common-border-radius 0px 0px @common-border-radius;
    cursor: pointer;
    user-select: none;

    & > div {
      color: #ffffff;
      font-size: 14px;
      margin-top: 11px;
      text-align: center;
      white-space: pre-wrap;
      word-break: break-all;
      width: 20px;
      word-wrap: break-word;
    }
  }

  & > .content {
    background-color: #ffffff;
    border-radius: 0px @common-border-radius @common-border-radius 0px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
