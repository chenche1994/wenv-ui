<template>
  <div :class="$style['container']"
       :style="{width: width + 'px', height: height + 'px', backgroundColor, color, border}"
       @click="$emit('on-click')"
  >
    <span>测试2</span>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    width: {
      type: Number,
      required: false,
      default: 54,
    },
    height: {
      type: Number,
      required: false,
      default: 28,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: 'white',
    },
    color: {
      type: String,
      required: false,
      default: 'black',
    },
    border: {
      type: String,
      required: false,
      default: undefined,
    },
  },
};
</script>
<style lang="less" module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: lightblue;
  color: #fefeff;

  &:hover {
    opacity: 0.9;
  }
}
</style>
