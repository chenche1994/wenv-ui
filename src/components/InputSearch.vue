<template>
  <div :class="$style['container']" :style="{height:height+'px',width:width+'px'}">
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      :style="{height:height+'px',width:(width-height)+'px'}"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('on-search')"
    >
    <div :style="{height:height+'px',width:height+'px'}"
         @click="$emit('on-search')"
    >
      <img :src="searchIcon">
    </div>
  </div>
</template>
<script>
const searchIcon = require('../assets/images/input_search.png');

/**
 * @deprecated
 */
export default {
  name: 'InputSearch',
  props: {
    value: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: 200,
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
  data() {
    return {
      searchIcon,
    };
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;

  & > input {
    border-radius: @common-border-radius 0px 0px @common-border-radius;
    border-width: 1px 0px 1px 1px;
    border-style: solid;
    border-color: #cccccc;
    color: #333333;
    padding-left: 4px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-width: 1px 0px 1px 1px;
      border-style: solid;
      border-color: @primary-color;
    }
  }

  & > div {
    background-color: @primary-color;
    border: 0px;
    border-radius: 0px @common-border-radius @common-border-radius 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
      background-color: lighten(@primary-color, 10%);
    }
  }
}
</style>
