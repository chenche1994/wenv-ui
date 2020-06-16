<template>
  <div class="wenv-select-02-input">
    <input
      :value="query"
      :placeholder="selectedItems.length === 0 ? placeholder : ''"
      :disabled="disabled"
      @focus="onOpenChange(true)"
      @input="onQueryChange($event.target.value)"
    >
    <span v-show="!query">{{ selectedItems.map((item) => item.name).join(';') }}</span>
    <svg class="wenv-svg-btn" :open="isOpen" :disabled="disabled" @click="onOpenChange(!isOpen)">
      <use xlink:href="#wenv-i-youjiantou" />
    </svg>
  </div>
</template>
<script>
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WSelect02Input',
  props: {
    query: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    selectedItems: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onOpenChange(isOpen) {
      this.$emit('on-open-change', isOpen);
    },
    onQueryChange(query) {
      this.$emit('on-query-change', query);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-select-02-input {
  position: relative;
  display: flex;
  flex-flow: row;
  font-size: 14px;
  background-color: #fff;

  span {
    position: absolute;
    display: inline-block;
    pointer-events: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100% - 30px);
    color: #666;
    height: 28px;
    line-height: 28px;
    padding-left: 9px;
    left: 0;
  }

  input {
    flex: 1;
    height: 26px;
    padding: 0 26px 0 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 100%;

    &::placeholder {
      color: #999;
      font-size: 14px;
      font-family: @font-family;
    }

    &:focus {
      border-color: @color-primary;
    }

    &:disabled {
      border: @common-border-disabled;
      background-color: @color-disabled-background;
    }
  }

  input:focus + span,
  input:disabled + span {
    color: #999;
  }

  svg {
    position: absolute;
    top: 9px;
    width: 10px;
    height: 10px;
    right: 9px;
    transform: rotate(90deg);

    &[open] {
      transform: rotate(270deg);
    }
  }
}
</style>
