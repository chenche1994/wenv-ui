<template>
  <div :class="$style['container']" :style="{height:height+'px'}">
    <div :class="$style['content']" :style="{width:realWidth}">
      <slot />
    </div>
    <div :class="$style['button']">
      <div @click="isOpen=!isOpen">
        <img :src="arrowIcon">
      </div>
    </div>
  </div>
</template>

<script>
const arrowLeftIcon = require('../assets/images/panel_toggle_arrow_left.png');
const arrowRightIcon = require('../assets/images/panel_toggle_arrow_right.png');

export default {
  name: 'PanelSlideLeft',
  props: {
    contentWidth: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: undefined,
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
      return this.isOpen ? arrowLeftIcon : arrowRightIcon;
    },
    realWidth() {
      return this.isOpen ? `${this.contentWidth}px` : '0px';
    },
  },
};
</script>
<style lang="less" module>
@import "../main.less";

.container {
  cursor: default;
  display: inline-flex;
  min-height: 70px;
  pointer-events: none;

  & > .button {
    display: flex;
    align-items: center;
    pointer-events: none;
    user-select: none;

    & > div {
      width: 10px;
      height: 68px;
      border-radius: 0px @common-border-radius @common-border-radius 0px;
      background-color: #cbd5ec;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      pointer-events: auto;
    }
  }

  & > .content {
    background-color: #ffffff;
    border-radius: @common-border-radius;
    box-shadow: @common-box-shadow;
    transition: width 0.3s;
    overflow: hidden;
    pointer-events: auto;
  }
}
</style>
