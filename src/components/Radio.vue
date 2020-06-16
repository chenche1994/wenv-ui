<template>
  <div :class="$style['container']" @click.stop="$emit('on-select', value)">
    <div :class="[$style['unselected'], groupValue === value ? $style['selected'] : undefined]">
      <div />
    </div>
    <img v-if="icon" :src="icon">
    <span v-if="label">{{ label }}</span>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  model: {
    prop: 'groupValue',
    event: 'on-select',
  },
  props: {
    groupValue: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: inline-flex;
  align-items: center;
  user-select: none;

  & > .unselected {
    height: 12px;
    width: 12px;
    border: @common-border;
    border-radius: 6px;
    background-color: #e8e8e8;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
  }

  & > .selected {
    border: @common-border-highlight;
    background-color: #ffffff;

    & > div {
      height: 6px;
      width: 6px;
      border-radius: 3px;
      background-color: @primary-color;
    }
  }

  & > img {
    margin-left: 4px;
    cursor: pointer;

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
