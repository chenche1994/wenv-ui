<template>
  <div :class="$style['container']">
    <div :class="$style['title']">
      <span>{{ title }}</span>
      <div>
        <img v-for="(item,index) in buttons" :key="index" :src="item.src" @click="item.click">
        <img v-if="canClose" :src="closeIcon" @click="onClose">
      </div>
    </div>
    <div :class="$style['content']">
      <slot />
    </div>
  </div>
</template>

<script>
const closeIcon = require('../assets/images/panel_close.png');

/**
 * @deprecated 新的实现在 src\components\panels\WPanel.vue
 */
export default {
  name: 'Panel',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    buttons: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    canClose: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      closeIcon,
    };
  },
  methods: {
    onClose() {
      this.$emit('on-close');
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  cursor: default;
  display: inline-flex;
  flex-flow: column;
  box-shadow: @common-box-shadow;

  & > .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    background-color: @primary-color;
    border-radius: @common-border-radius @common-border-radius 0px 0px;
    padding: 0px 10px 0px 13px;
    white-space: nowrap;
    overflow: hidden;

    & > span {
      font-size: 14px;
      color: #fefeff;
    }

    & > div {
      display: flex;
      align-items: center;
      user-select: none;

      & > img {
        margin-left: 16px;
        cursor: pointer;
      }
    }
  }

  & > .content {
    background-color: #ffffff;
    border-radius: 0px 0px @common-border-radius @common-border-radius;
  }
}
</style>
