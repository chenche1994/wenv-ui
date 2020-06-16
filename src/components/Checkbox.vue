<template>
  <label :class="$style['container']">
    <input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)">
    <div>
      <img v-if="checked" :src="checkedIcon">
    </div>
    <img v-if="icon" :src="icon">
    <span v-if="name">{{ name }}</span>
  </label>
</template>
<script>
const checkedIcon = require('../assets/images/checkbox_checked.png');

export default {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      required: true,
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
  },
  data() {
    return {
      checkedIcon,
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

  & > input {
    display: none;
    box-sizing: border-box;
  }

  & > div {
    height: 14px;
    width: 14px;
    border: @common-border;
    border-radius: @common-border-radius;
    background-color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
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
