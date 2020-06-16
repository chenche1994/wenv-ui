<template>
  <div class="wenv-radio" :checked="groupValue === value" :disabled="disabled" @click="onChange">
    <span class="wenv-radio-point wenv-radio-point-l" />
    <span class="wenv-radio-label">{{ label || value }}</span>
  </div>
</template>
<script>
import 'animate.css/source/zooming_entrances/zoomIn.css';
import '../../css/radio.less';

export default {
  name: 'WRadio',
  model: {
    prop: 'groupValue',
    event: 'on-change',
  },
  props: {
    groupValue: {
      type: String,
      required: true,
    },
    value: {
      // 选择的值
      type: String,
      required: true,
    },
    label: {
      // 显示的值
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
      this.$emit('on-change', this.value);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

@selected-color: @color-primary;

.wenv-radio {
  .wenv-radio-point-l {
    border-radius: 7px;
    background-color: #ffffff;
  }

  &[checked] .wenv-radio-point-l {
    &::after {
      content: ' ';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      left: 2px;
      top: 2px;
      background-color: @selected-color;
      animation: 'zoomIn' 0.2s ease-in;
    }
  }

  &[disabled] .wenv-radio-point-l {
    &::after {
      background-color: @common-border-color;
    }
  }
}
</style>
