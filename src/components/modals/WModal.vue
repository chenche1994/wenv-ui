<template>
  <div v-show="isOpen" class="wenv-modal">
    <WPanel
      class="wenv-modal-panel"
      :title="title"
      :type="type"
      :buttons="buttons"
      @on-close="$emit('on-close', false)"
    >
      <slot />
    </WPanel>
  </div>
</template>

<script>
import WPanel from '../panels/WPanel.vue';

export default {
  name: 'WModal',
  components: {
    WPanel,
  },
  model: {
    prop: 'isOpen',
    event: 'on-close',
  },
  props: {
    type: {
      type: String,
      required: false,
      validator(value) {
        return ['default', 'error'].indexOf(value) !== -1;
      },
      default: 'default',
    },
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
  mounted() {
    document.body.appendChild(this.$el);
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999999;

  .wenv-modal-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
