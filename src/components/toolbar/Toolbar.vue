<template>
  <div :class="$style['container']">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
};
</script>
<style lang="less" module>
@import '../../main.less';

.container {
  height: 34px;
  background-color: #ffffff;
  border-radius: @common-border-radius;
  box-shadow: @common-box-shadow2;
  display: inline-flex;
  align-items: center;
  font-size: @common-font-size;
  color: #4c4c4c;
  user-select: none;

  & > div:first-child {
    border-radius: @common-border-radius 0 0 @common-border-radius;
  }

  & > div:last-child {
    border-radius: 0 @common-border-radius @common-border-radius 0;
  }
}
</style>
