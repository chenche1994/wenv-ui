<template>
  <div :class="$style['container']" :style="{ width: width + 'px' }">
    <div
      :class="$style['header']"
      :style="{ height: headerHeight + 'px', fontSize: fontSize + 'px' }"
      @click.stop="$emit('on-change', !isOpen)"
    >
      <slot name="header" />
      <div style="flex:1;" />
      <img :src="arrowIcon" :style="{ transform: isOpen ? 'rotate(180deg)' : undefined }">
    </div>
    <transition name="fade">
      <div v-if="isOpen" :class="$style['content']">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
const arrowIcon = require('../assets/images/panel_slide_down_arrow.png');

export default {
  name: 'PanelSlideDown',
  model: {
    prop: 'isOpen',
    event: 'on-change',
  },
  props: {
    width: {
      type: Number,
      required: false,
      default: 200,
    },
    headerHeight: {
      type: Number,
      required: false,
      default: 56,
    },
    fontSize: {
      type: Number,
      required: false,
      default: 16,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      arrowIcon,
    };
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  & > .header {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    color: #666666;
    box-sizing: border-box;

    & > .icon {
      margin-right: 16px;
    }

    & > img {
      margin-right: 20px;
    }
  }

  .content {
    overflow: hidden;
  }
}
</style>
