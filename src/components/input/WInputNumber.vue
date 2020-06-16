<template>
  <div class="wenv-input-number">
    <input
      ref="input"
      class="wenv-input"
      type="number"
      autocomplete="off"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput($event.target.value)"
    >
    <div v-if="!disabled && !readonly">
      <svg class="wenv-svg-btn" :disabled="value >= max" @click="add(step)">
        <use xlink:href="#wenv-i-jiantou" />
      </svg>
      <svg class="wenv-svg-btn" :disabled="value <= min" @click="add(-step)">
        <use xlink:href="#wenv-i-jiantou" />
      </svg>
    </div>
  </div>
</template>
<script>
import '../../css/input.less';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WInputNumber',
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: false,
      default: undefined,
    },
    max: {
      type: Number,
      required: false,
      default: undefined,
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
    fixed: {
      type: Number,
      required: false,
      default: 6,
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
  watch: {
    value(newValue) {
      this.$refs.input.value = newValue;
    },
  },
  mounted() {
    this.$refs.input.value = this.value;
  },
  methods: {
    onInput(value) {
      const v = Number(value);
      if (this.min && v < this.min) {
        this.$refs.input.value = this.min;
        this.$emit('input', this.min);
        return;
      }

      if (this.max && v > this.max) {
        this.$refs.input.value = this.max;
        this.$emit('input', this.max);
        return;
      }

      this.$refs.input.value = v;
      this.$emit('input', v);
    },
    add(amount) {
      let v = this.value + amount;
      const base = (10 ** this.fixed);
      v = v.toFixed(this.fixed) * base / base;
      this.$refs.input.value = v;
      this.$emit('input', v);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-input-number {
  display: inline-flex;
  position: relative;
  user-select: none;

  input {
    width: 100%;
  }

  div {
    position: absolute;
    top: 4px;
    right: 9px;
    display: flex;
    flex-direction: column;

    svg {
      width: 8px;
      height: 8px;
      padding: 2px 2px 0 2px;
    }

    svg:last-child {
      transform: rotate(180deg);
    }
  }
}
</style>
