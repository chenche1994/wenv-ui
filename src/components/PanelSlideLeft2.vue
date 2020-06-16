<template>
  <div :class="$style['container']" :style="{ height: height + 'px' }">
    <div :class="$style['content']" :style="{ width: realWidth }">
      <slot />
    </div>
    <div :class="$style['toggle-button-container']">
      <div
        :class="[
          $style['toggle-button'],
          isOpen === false ? $style['toggle-button-collapsed'] : undefined,
        ]"
        @click="isOpen = !isOpen"
      >
        <img
          :src="arrowLeftIcon"
          :style="{ transform: isOpen === false ? 'rotate(180deg)' : undefined }"
        >
      </div>
    </div>
  </div>
</template>

<script>
const arrowLeftIcon = require('../assets/images/panel_toggle_arrow_left2.png');

export default {
  name: 'PanelSlideLeft2',
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
    };
  },
  computed: {
    realWidth() {
      return this.isOpen ? `${this.contentWidth}px` : '0px';
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  @toggle-button-border: 1px solid #cccccc;

  display: inline-flex;
  pointer-events: none;

  & > .toggle-button-container {
    display: flex;
    align-items: center;

    & > .toggle-button {
      width: 22px;
      height: 50px;
      border-radius: 0px @common-border-radius @common-border-radius 0px;
      border-top: @toggle-button-border;
      border-right: @toggle-button-border;
      border-bottom: @toggle-button-border;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      pointer-events: auto;
      user-select: none;
    }

    & > .toggle-button-collapsed {
      border-left: @toggle-button-border;
    }
  }

  & > .content {
    transition: width 0.3s;
    overflow: hidden;
    pointer-events: auto;
    display: flex;
  }
}
</style>
