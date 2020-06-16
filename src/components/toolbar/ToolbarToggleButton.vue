<template>
  <div :class="$style['container']" @click="onClick">
    <SvgIcon :name="icon" :class="$style['icon']" :style="{color}" />
    <span :style="{color}">{{ name }}</span>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'ToolbarToggleButton',
  components: {
    SvgIcon,
  },
  model: {
    prop: 'isToggled',
    event: 'on-click',
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isToggled: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    color() {
      return this.isToggled ? '#006fe1' : undefined;
    },
  },
  methods: {
    onClick() {
      this.$emit('on-click', !this.isToggled);
    },
  },
};
</script>
<style lang="less" module>
@import '../../main.less';

.container {
  @margin-before-after: 12px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  height: 34px;
  &:hover {
    background-color: @common-hover-color;
    color: #006fe1;
  }

  &:hover > .icon {
    color: #006fe1;
  }

  & > .icon {
    margin-left: @margin-before-after;
    margin-right: 8px;
    color: #999999;
  }

  & > span {
    margin-right: @margin-before-after;
  }
}
</style>
