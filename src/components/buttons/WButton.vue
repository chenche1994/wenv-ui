<template>
  <div
    class="wenv-button"
    :type="type"
    :disabled="disabled"
    :style="{ padding: name ? '0 14px' : '0 8px' }"
    @click="onClick"
  >
    <svg v-if="icon" class="wenv-svg-btn">
      <use :xlink:href="`#${icon}`" />
    </svg>
    <span v-if="name" class="wenv-button-name">{{ name }}</span>
  </div>
</template>
<script>
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WButton',
  props: {
    icon: {
      type: String,
      required: false,
      default: undefined,
    },
    name: {
      type: [String, Number],
      required: false,
      default: undefined,
    },
    type: {
      type: String,
      required: false,
      validator(value) {
        return ['default', 'primary', 'success', 'error', 'light'].indexOf(value) !== -1;
      },
      default: 'default',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('on-click');
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-button {
  // default
  display: inline-flex;
  align-items: center;
  height: 26px;
  line-height: 26px;
  box-sizing: content-box;
  user-select: none;
  font-family: @font-family;
  font-size: 14px;
  cursor: pointer;
  border-radius: @common-border-radius;
  border: @common-border;
  color: @font-color-normal;
  background-color: @color-default;
  vertical-align: middle;

  &:hover {
    background-color: #fbfbfb;
    transition: background-color 0.2s ease-in-out;
  }

  &:active {
    background-color: #f1f1f1;
  }

  .wenv-svg-btn {
    & + .wenv-button-name {
      margin-left: 10px;
      vertical-align: middle;
    }
  }

  @media all and (-ms-high-contrast: none) {
    *::-ms-backdrop,
    .wenv-button-name {
      margin-top: -1px;
    } /* IE11 hack */
  }

  &[type='primary'] {
    .color(@color-primary, #23a9ff, #0091ee);
  }

  &[type='success'] {
    .color(@color-success, #17c751, #00a737);
  }

  &[type='error'] {
    .color(@color-error, #ff5854, #fa3632);
  }

  &[type='light'] {
    color: @font-color-normal;
    border-color: #dddddd;
    background-color: #f7f7f7;

    &:hover {
      background-color: #fbfbfb;
    }

    &:active {
      background-color: #e2e2e2;
    }
  }

  &[disabled] {
    color: #cecece;
    background-color: #f7f7f7;
    border-color: #d9d9d9;
    pointer-events: none;

    .wenv-svg-btn {
      color: #cecece;
    }
  }
}

.color(@bc, @hover, @active) {
  color: #fff;
  border-color: @bc;
  background-color: @bc;

  .wenv-svg-btn {
    color: #fff;
  }

  &:hover {
    border-color: @hover;
    background-color: @hover;
  }

  &:active {
    background-color: @active;
  }
}
</style>
