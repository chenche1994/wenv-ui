<template>
  <div :class="$style['container']" :style="{height:height+'px'}">
    <div :class="$style['title']" @click="isOpen=!isOpen">
      <img :src="arrowIcon">
      <span>{{ title }}</span>
    </div>
    <div :class="$style['content']" :style="{width:realWidth}">
      <slot />
    </div>
  </div>
</template>

<script>
const arrowLeftIcon = require('../assets/images/panel_toggle_arrow_left.png');
const arrowRightIcon = require('../assets/images/panel_toggle_arrow_right.png');

export default {
  name: 'PanelSlideRight',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    height: {
      type: Number,
      required: true,
    },
    contentWidth: {
      type: Number,
      required: true,
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
  box-shadow: @common-box-shadow;

  & > .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    width: 26px;
    background-color: @primary-color;
    border-radius: @common-border-radius 0px 0px @common-border-radius;
    cursor: pointer;
    user-select: none;

    & > span {
      color: #ffffff;
      font-size: 14px;
      line-height: 24px;
      margin-top: 11px;
      text-align: center;
    }
  }

  & > .content {
    background-color: #ffffff;
    border-radius: 0px @common-border-radius @common-border-radius 0px;
    transition: width 0.3s;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
