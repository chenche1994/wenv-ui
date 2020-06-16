<template>
  <div :class="$style['container']">
    <div :class="$style['header']">
      <img :src="logo">
    </div>
    <div :class="$style['buttons']">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    logo: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="less" module>
@import '../../main.less';

.container {
  height: 48px;
  box-shadow: @common-box-shadow2;
  display: inline-flex;
  align-items: stretch;
  font-size: 14px;
  color: @common-font-color;
  user-select: none;
  box-sizing: border-box;

  & > .header {
    display: flex;
    align-items: center;
    background: linear-gradient(to right, #0084ff, #00aeff);
    padding-left: 20px;
    padding-right: 20px;
    border-radius: @common-border-radius 0 0 @common-border-radius;
  }

  & > .buttons {
    display: flex;
    position: relative;
    align-items: stretch;
    background-color: white;
    border-radius: 0 @common-border-radius @common-border-radius 0;

    & > div:last-child {
      border-radius: 0 @common-border-radius @common-border-radius 0;
    }

    & > *::after {
      content: '';
      position: relative;
      width: 1px;
      height: 18px;
      margin-top: 3px;
      background-image: linear-gradient(to bottom, #dcdee3 0%, #dcdee3 50%, transparent);
      background-size: 1px 6px;
      background-repeat: repeat-y;
    }

    & > *:last-child::after {
      display: none;
    }
  }
}
</style>
