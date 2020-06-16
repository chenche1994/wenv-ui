<template>
  <div v-show="isOpen" :class="$style['container']">
    <div :class="$style['modal']">
      <div :class="$style['title']">
        <span>{{ title }}</span>
        <div>
          <img v-for="(item, index) in buttons" :key="index" :src="item.src" @click="item.click">
          <img :src="closeIcon" @click="$emit('on-close', false)">
        </div>
      </div>
      <div :class="$style['content']">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
const closeIcon = require('../assets/images/panel_close.png');

/**
 * @deprecated 新的实现在 src\components\modals\WModal.vue
 */
export default {
  name: 'Modal',
  model: {
    prop: 'isOpen',
    event: 'on-close',
  },
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
    isOpen: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      closeIcon,
    };
  },
  mounted() {
    document.body.appendChild(this.$el);
  },
};
</script>
<style lang="less" module>
@import '../main.less';
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999;

  .modal {
    display: inline-flex;
    flex-flow: column;
    box-shadow: @common-box-shadow;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

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
}
</style>
