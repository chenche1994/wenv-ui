<template>
  <div v-show="isOpen" class="wenv-modal-full-wrapper">
    <div class="wenv-modal-full">
      <slot />
      <svg class="wenv-svg-btn wenv-modal-full-btn-close" @click="onClose">
        <use xlink:href="#wenv-i-close" />
      </svg>
    </div>
  </div>
</template>

<script>
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WModalFull',
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
<style lang="less">
@import '../../main.less';
.wenv-modal-full-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999999;
  background-color: rgba(0, 0, 0, 0.65);

  .wenv-modal-full {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .wenv-modal-full-btn-close {
      position: absolute;
      right: -16px;
      top: -16px;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
