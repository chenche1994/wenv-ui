<template>
  <input
    :class="$style['container']"
    :value="value"
    :placeholder="placeholder"
    type="text"
    :style="{ height: height + 'px', width: width ? width + 'px' : '100%' }"
    @input="$emit('input', $event.target.value)"
  >
</template>
<script>
/**
 * @deprecated
 */
export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: undefined,
    },
    height: {
      type: Number,
      required: false,
      default: 28,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  border-radius: @common-border-radius;
  border: @common-border;
  color: #333333;
  padding-left: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: @common-border-highlight;
  }
}
</style>
