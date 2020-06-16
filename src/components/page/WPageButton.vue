<template>
  <div
    class="wenv-page-button"
    :selected="selected"
    :page="page"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <svg v-if="icon" class="wenv-svg-btn">
      <use :xlink:href="`#${icon}`" />
    </svg>
    <span v-if="page">{{ page }}</span>
  </div>
</template>
<script>
import '../../css/icon-btn.less';

export default {
  name: 'WPageButton',
  props: {
    icon: {
      type: String,
      required: false,
      default: undefined,
    },
    page: {
      type: Number,
      required: false,
      default: undefined,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style lang="less">
.wenv-page-button {
  height: 28px;
  line-height: 28px;
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 0 6px;

  &:hover {
    cursor: pointer;

    svg {
      color: #666;
    }
  }

  svg.wenv-svg-btn {
    width: 12px;
    height: 12px;
  }

  &[selected] {
    background-color: #009bff;
    border-color: #009bff;
    color: #fff !important;
  }

  &[page]:hover {
    color: #82c0ff;
  }

  &[disabled] {
    pointer-events: none;
    color: #cecece;
    background-color: #f7f7f7;
    border-color: #d9d9d9;
    pointer-events: none;
  }
}
</style>
