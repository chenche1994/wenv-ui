<template>
  <div ref="wrapper" class="wenv-select-02-s">
    <div class="wenv-select-02-s-input-wrapper" :clearvisible="clearvisible">
      <WSelect02Input
        :query="query"
        :is-open="isOpen"
        :selected-items="selectedItems"
        :placeholder="placeholder"
        :disabled="disabled"
        @on-open-change="onOpenChange"
        @on-query-change="onQueryChange"
      />
      <svg v-if="clearvisible" class="wenv-svg-btn" :disabled="disabled" @click="onClear">
        <use xlink:href="#wenv-i-guanbi" />
      </svg>
    </div>
    <WSelect02Dropdown
      :options="optionsNormalized"
      :type="type"
      :query="query"
      :is-open="isOpen"
      :multiple="false"
      :placement="placement"
      @on-select="onSelect"
    />
  </div>
</template>
<script>
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';
import WSelect02Input from './WSelect02Input.vue';
import WSelect02Dropdown from './WSelect02Dropdown.vue';
import { getSelectedItem, normalizeOptions } from './functions.js';

const MODEL_EVENT_ID = 'on-change';

export default {
  name: 'WSelect02Single',
  components: {
    WSelect02Input,
    WSelect02Dropdown,
  },
  model: {
    prop: 'value',
    event: MODEL_EVENT_ID,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      required: false,
      validator(t) {
        return ['list', 'tree'].indexOf(t) !== -1;
      },
      default: 'list',
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true,
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
    placement: {
      type: String,
      required: false,
      validator(t) {
        return ['bottom', 'top'].indexOf(t) !== -1;
      },
      default: 'bottom',
    },
    normalize: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  data() {
    const optionsNormalized = normalizeOptions(this.options, this.normalize);
    const selectedItem = getSelectedItem(optionsNormalized, this.value);
    return {
      isOpen: false,
      query: '',
      selectedItem: selectedItem || {},
      selectedItems: selectedItem ? [selectedItem] : [],
      optionsNormalized,
    };
  },
  computed: {
    clearvisible() {
      return !this.disabled && this.clearable && !this.isOpen && this.selectedItem.id !== undefined;
    },
  },
  watch: {
    options(newValue) {
      this.optionsNormalized = normalizeOptions(newValue, this.normalize);
      const selectedItem = getSelectedItem(this.optionsNormalized, this.value);
      this.selectedItem = selectedItem || {};
      this.selectedItems = selectedItem ? [selectedItem] : [];
    },
    value(newValue) {
      const selectedItem = getSelectedItem(this.optionsNormalized, newValue);
      this.selectedItem = selectedItem || {};
      this.selectedItems = selectedItem ? [selectedItem] : [];
    },
  },
  created() {
    document.addEventListener('click', this.handleClickOutside, false);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside, false);
  },
  methods: {
    finishSelect() {
      this.isOpen = false;
      this.query = '';
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.finishSelect();
      }
    },
    onOpenChange(isOpen) {
      this.isOpen = isOpen;
    },
    onQueryChange(query) {
      this.query = query;
    },
    onClear() {
      this.$emit(MODEL_EVENT_ID, '');
    },
    onSelect(item) {
      this.finishSelect();
      this.$emit(MODEL_EVENT_ID, item.id);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-select-02-s {
  display: inline-block;
  position: relative;
  user-select: none;
  background-color: #fff;
  font-family: @font-family;

  .wenv-select-02-s-input-wrapper {
    position: relative;

    &[clearvisible] {
      span {
        width: calc(100% - 48px);
      }
    }

    & > svg {
      position: absolute;
      top: 9px;
      width: 10px;
      height: 10px;
      right: 27px;
    }
  }
}
</style>
