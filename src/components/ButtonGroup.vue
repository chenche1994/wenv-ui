<template>
  <div :class="$style['container']">
    <div
      v-for="(button, index) in buttons"
      :key="index"
      :class="[button.isToggled?$style['selected']:$style['unselected']]"
      :style="{width: width + 'px', height: height + 'px',}"
      @click.stop="buttonClick(button)"
    >
      {{ button.name }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ButtonGroup',
  props: {
    buttons: {
      type: Array,
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
  },
  methods: {
    buttonClick(button) {
      if (button.isToggled === true) {
        return;
      }

      this.buttons.forEach((b) => {
        this.$set(b, 'isToggled', b === button);
      });
      button.click();
    },
  },
};
</script>
<style lang="less" module>
@import "../main.less";

.container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  border-radius: @common-border-radius;
  font-size: 14px;
  background-color: #ffffff;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid @primary-color;
    margin-left: -1px;
  }

  & > div:first-child {
    border-radius: @common-border-radius 0 0 @common-border-radius;
    margin-left: 0px;
  }

  & > div:last-child {
    border-radius: 0 @common-border-radius @common-border-radius 0;
  }

  .selected {
    background-color: @primary-color;
    color: #ffffff;
  }

  .unselected {
    background-color: #ffffff;
  }
}
</style>
