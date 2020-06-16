<template>
  <div :class="$style['container']">
    <div
      v-for="(button, index) in buttons"
      :key="index"
      :class="[$style['unselected'], button.isToggled ? $style['selected'] : undefined]"
      :style="{ width: width + 'px', height: height + 'px' }"
      @click.stop="buttonClick(button)"
    >
      <SvgIcon :name="button.icon" :class="$style['icon']" />
      <span>{{ button.name }}</span>
    </div>
  </div>
</template>
<script>
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'ButtonGroup2',
  components: {
    SvgIcon,
  },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: 84,
    },
    height: {
      type: Number,
      required: false,
      default: 60,
    },
  },
  methods: {
    buttonClick(button) {
      this.$set(button, 'isToggled', !button.isToggled);
      button.onClick(button.isToggled);
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border-radius: @common-border-radius;
  font-size: 12px;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: @common-box-shadow;

  .highlight() {
    border: @common-border-highlight;

    & > span,
    & > .icon {
      color: @primary-color2;
    }
  }

  & > .unselected {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
    margin-left: 12px;
    border: @common-border;
    border-radius: @common-border-radius;

    &:first-child {
      margin-left: 0px;
    }

    &:hover {
      .highlight();
      background-color: @common-hover-color;
    }

    & > span {
      margin-top: 8px;
      color: @font-color-normal;
    }

    & > .icon {
      color: @font-color-light;
    }
  }

  & > .selected {
    .highlight();
  }
}
</style>
