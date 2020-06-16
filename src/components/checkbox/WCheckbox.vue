<template>
  <div
    class="wenv-radio"
    :checked="!indeterminate && checked"
    :indeterminate="indeterminate"
    :disabled="disabled"
    @click="onChange"
  >
    <span class="wenv-radio-point wenv-checkbox-point" />
    <span v-if="label" class="wenv-radio-label">{{ label }}</span>
  </div>
</template>
<script>
import 'animate.css/source/fading_entrances/fadeIn.css';
import '../../css/radio.less';

export default {
  name: 'WCheckbox',
  model: {
    prop: 'checked',
    event: 'on-change',
  },
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    indeterminate: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
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
  methods: {
    onChange() {
      this.$emit('on-change', !this.checked);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

@selected-color: @color-primary;

.wenv-radio {
  .wenv-checkbox-point {
    border-radius: 2px;
  }

  &[checked] .wenv-checkbox-point {
    background-color: @selected-color;

    &::after {
      content: '';
      position: absolute;
      width: 4px;
      height: 8px;
      left: 3px;
      border: 2px solid #ffffff;
      border-top: 0;
      border-left: 0;
      background-color: @selected-color;
      transform: rotate(45deg);
      animation: 'fadeIn' 0.2s ease-in;
    }
  }

  &[indeterminate] .wenv-checkbox-point {
    border-color: @selected-color;
    background-color: @selected-color;

    &::after {
      content: '';
      width: 8px;
      border-top: 2px solid #ffffff;
      position: absolute;
      top: 5px;
      left: 2px;
      border-color: #ffffff;
    }
  }

  &[disabled] .wenv-checkbox-point {
    &::after {
      border-color: @common-border-color;
      background-color: #f7f7f7;
    }
  }
}
</style>
