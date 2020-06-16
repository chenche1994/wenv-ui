<template>
  <div class="wenv-panel" :type="type">
    <div class="wenv-panel-title">
      <span class="wenv-panel-name">{{ title }}</span>
      <div class="wenv-panel-space" />
      <svg v-for="(item, index) in buttons" :key="index" class="wenv-svg-btn" @click="item.click">
        <use :xlink:href="`#${item.icon}`" />
      </svg>
      <svg v-if="canClose" class="wenv-svg-btn" @click="$emit('on-close')">
        <use xlink:href="#wenv-i-close" />
      </svg>
    </div>
    <div class="wenv-panel-content">
      <slot />
    </div>
  </div>
</template>

<script>
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WPanel',
  props: {
    type: {
      type: String,
      required: false,
      validator(value) {
        return ['default', 'error'].indexOf(value) !== -1;
      },
      default: 'default',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    buttons: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    canClose: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-panel {
  box-shadow: 0px 0px 30px rgba(201, 201, 201, 0.8);
  display: inline-block;

  &[type='error'] {
    box-shadow: 0px 0px 16px rgba(216, 30, 6, 0.3);

    .wenv-panel-title {
      background-color: #e8786a;
    }
  }

  .wenv-panel-title {
    @line-height: 32px;
    display: flex;
    align-items: center;
    height: @line-height;
    background-color: @primary-color;
    border-radius: @common-border-radius @common-border-radius 0px 0px;
    padding: 0px 12px;
    user-select: none;

    .wenv-panel-name {
      font-size: 14px;
      color: #fefeff;
      line-height: @line-height;
      overflow: hidden;
    }

    .wenv-panel-space {
      flex: 1;
    }

    .wenv-svg-btn {
      margin-left: 16px;
      color: #fefeff;
    }
  }

  .wenv-panel-content {
    background-color: #ffffff;
    border-radius: 0px 0px @common-border-radius @common-border-radius;
  }
}
</style>
