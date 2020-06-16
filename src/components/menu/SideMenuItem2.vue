<template>
  <div
    :class="[$style['container'], menu.isSelected ? $style['is-selected'] : undefined]"
    @click.stop="$emit('on-click', menu)"
  >
    <div
      :style="{ visibility: menu.isSelected ? undefined : 'hidden' }"
      :class="$style['selected-bar']"
    />
    <div :class="$style['name']">
      {{ menu.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenuItem2',
  components: {},
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="less" module>
@import '../../main.less';

.highlight() {
  color: @primary-color;
  fill: @primary-color;
}

.is-selected {
  .highlight();
  font-weight: bold;
}

.container {
  display: flex;
  align-items: center;
  cursor: pointer;

  & > .selected-bar {
    height: 100%;
    width: 4px;
    background-color: @primary-color;
  }

  & > .name {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
  }

  &:hover {
    .highlight();
    background-color: @common-hover-color;
  }
}
</style>
