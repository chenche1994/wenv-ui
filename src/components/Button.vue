<template>
  <button :class="$style['container']" :style="styleObject" @click="onClick">
    <span>{{ name }}</span>
  </button>
</template>
<script>
/**
 * @deprecated 新的实现在 src\components\buttons\WButton.vue
 */
export default {
  name: 'Button',
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: 58,
    },
    height: {
      type: Number,
      required: false,
      default: 28,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: undefined,
    },
    color: {
      type: String,
      required: false,
      default: undefined,
    },
    border: {
      type: String,
      required: false,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    styleObject() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        backgroundColor: this.disabled ? '#F7F7F7' : this.backgroundColor,
        color: this.disabled ? '#999999' : this.color,
        border: this.disabled ? '1px solid #cccccc' : this.border,
        cursor: this.disabled ? 'not-allowed' : 'pointer',
      };
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('on-click');
        console.log(222);
      }
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border-radius: @common-border-radius;
  font-size: 14px;
  box-sizing: border-box;
  background-color: @primary-color;
  color: #fefeff;
  outline: 0;
  border: 0;

  &:hover {
    opacity: 0.9;
  }
}
</style>
