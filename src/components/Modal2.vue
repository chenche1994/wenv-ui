<template>
  <div v-show="isOpen" :class="$style['container']">
    <div :class="$style['modal']">
      <slot />
      <img :src="closeIcon" @click="onClose">
    </div>
  </div>
</template>

<script>
const closeIcon = require('../assets/images/modal2_close.png');

/**
 * @deprecated 新的实现在 src\components\modals\WModalFull.vue
 */
export default {
  name: 'Modal2',
  model: {
    prop: 'isOpen',
    event: 'on-close',
  },
  props: {
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
  methods: {
    onClose() {
      this.$emit('on-close', false);
    },
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
  background-color: rgba(0, 0, 0, 0.65);

  & > .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    & > img {
      position: absolute;
      right: -36px;
      top: -36px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
