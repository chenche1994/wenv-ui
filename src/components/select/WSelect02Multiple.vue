<template>
  <div ref="wrapper" class="wenv-select-02-m">
    <WSelect02Input
      :query="query"
      :is-open="isOpen"
      :selected-items="selectedItems"
      :placeholder="placeholder"
      :disabled="disabled"
      @on-open-change="onOpenChange"
      @on-query-change="onQueryChange"
    />
    <WSelect02Dropdown
      :options="optionsNormalized"
      :type="type"
      :query="query"
      :is-open="isOpen"
      :multiple="true"
      :limited="limited"
      :placement="placement"
      @on-select="onSelect"
      @on-unselect="onDelete"
    />
  </div>
</template>
<script>
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';
import WSelect02Input from './WSelect02Input.vue';
import WSelect02Dropdown from './WSelect02Dropdown.vue';
import { getSelectedItems, normalizeOptions, deleteItem } from './functions.js';

const MODEL_EVENT_ID = 'on-change';

export default {
  name: 'WSelect02Multiple',
  components: {
    WSelect02Input,
    WSelect02Dropdown,
  },
  model: {
    prop: 'values',
    event: MODEL_EVENT_ID,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
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
    limit: {
      type: Number,
      required: false,
      default: -1, // multiple 为 true 时， 限制选择个数; -1 为没有限制
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
    const selectedItems = getSelectedItems(optionsNormalized, this.values);
    const limited = this.limit === -1 ? false : this.values.length >= this.limit;

    return {
      isOpen: false,
      query: '',
      selectedItems,
      optionsNormalized,
      limited,
    };
  },
  watch: {
    options(newValue) {
      this.optionsNormalized = normalizeOptions(newValue, this.normalize);
      this.selectedItems = getSelectedItems(this.optionsNormalized, this.values);
    },
    values(newValue) {
      this.selectedItems = getSelectedItems(this.optionsNormalized, newValue);
      this.limited = this.limit === -1 ? false : newValue.length >= this.limit;
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
    onDelete(item) {
      deleteItem(this.values, item.id);
      this.$emit(MODEL_EVENT_ID, this.values);
    },
    onSelect(item) {
      this.values.push(item.id);
      this.$emit(MODEL_EVENT_ID, this.values);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-select-02-m {
  display: inline-block;
  position: relative;
  user-select: none;
  background-color: #fff;
  font-family: @font-family;
}
</style>
