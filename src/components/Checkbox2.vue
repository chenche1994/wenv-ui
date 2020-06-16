<template>
  <div :class="$style['container']" @click.stop="$emit('change', !checked)">
    <div
      :class="[$style['unchecked'], indeterminate || checked ? $style['checked'] : undefined]"
      :style="{ height: size + 'px', width: size + 'px' }"
    >
      <img v-if="checked && !indeterminate" :src="checkedIcon">
      <img v-if="indeterminate" :src="indeterminateIcon">
    </div>
    <img v-if="icon" :src="icon">
    <span v-if="name">{{ name }}</span>
  </div>
</template>
<script>
const checkedIcon = require('../assets/images/checkbox2.png');
const indeterminateIcon = require('../assets/images/checkbox_indeterminate.png');

export default {
  name: 'Checkbox2',
  model: {
    prop: 'checked',
    event: 'change',
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
    name: {
      type: String,
      required: false,
      default: undefined,
    },
    icon: {
      type: String,
      required: false,
      default: undefined,
    },
    size: {
      type: Number,
      required: false,
      default: 12,
    },
  },
  data() {
    return {
      checkedIcon,
      indeterminateIcon,
    };
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: flex;
  align-items: center;
  font-size: @common-font-size;
  user-select: none;
  cursor: pointer;

  & > .unchecked {
    border: @common-border;
    border-radius: @common-border-radius;
    background-color: #e8e8e8;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
  }

  & > .checked {
    border: 1px solid #0f89f4;
    background-color: #00a2ff;
  }

  & > img {
    margin-left: 4px;

    & + span {
      margin-left: 2px;
    }
  }

  & > span {
    white-space: nowrap;
    overflow: hidden;
    margin-left: 4px;
    cursor: pointer;
  }
}
</style>
