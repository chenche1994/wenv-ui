<template>
  <div class="wenv-input-wrapper">
    <input
      autocomplete="off"
      class="wenv-input"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput($event.target.value)"
      @change="onChange($event.target.value)"
      @focus="onFocus"
    >
  </div>
</template>
<script>
/**
 * @deprecated since version 2.0
 */
import '../../css/input.less';

export default {
  name: 'WInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: [String, Number],
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onFocus() {
      this.$emit('focus');
    },
    onInput(value) {
      this.$emit('input', value);
    },
    onChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-input-wrapper {
  display: inline-block;

  input {
    width: 100%;
  }
}
</style>
