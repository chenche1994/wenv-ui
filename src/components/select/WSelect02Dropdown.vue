<template>
  <div class="wenv-select-02-dropdown-wrapper" :placement="placement">
    <div ref="dropdown">
      <WSelect02Options
        v-if="isOpen && type === 'list'"
        :options="options"
        :multiple="multiple"
        :query="query"
        :limited="limited"
        @on-select="onSelect"
        @on-unselect="onUnselect"
      />
      <WSelect02OptionsTree
        v-if="isOpen && type === 'tree'"
        :options="options"
        :multiple="multiple"
        :query="query"
        :limited="limited"
        @on-select="onSelect"
        @on-unselect="onUnselect"
      />
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar';
import WSelect02Options from './WSelect02Options.vue';
import WSelect02OptionsTree from './WSelect02OptionsTree.vue';

export default {
  name: 'WSelect02Dropdown',
  components: {
    WSelect02Options,
    WSelect02OptionsTree,
  },
  provide() {
    return {
      getUpdateScrollbar: () => this.updateScrollbar,
      getDropdownScrollWidthHandle: () => this.getDropdownScrollWidth,
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
    limited: {
      type: Boolean,
      required: false,
    },
    placement: {
      type: String,
      required: false,
      validator(t) {
        return ['bottom', 'top'].indexOf(t) !== -1;
      },
      default: 'bottom',
    },
  },
  watch: {
    query() {
      this.updateScrollbar();
    },
  },
  mounted() {
    this.psContent = new PerfectScrollbar(this.$refs.dropdown, {
      wheelPropagation: false,
      minScrollbarLength: 20,
    });
  },
  beforeDestroy() {
    this.psContent.destroy();
    this.psContent = null;
  },
  methods: {
    updateScrollbar() {
      this.$nextTick(() => {
        this.psContent.update();
      });
    },
    getDropdownScrollWidth() {
      return this.$refs.dropdown.scrollWidth;
    },
    onSelect(item) {
      this.$emit('on-select', item);
    },
    onUnselect(item) {
      this.$emit('on-unselect', item);
    },
  },
};
</script>
<style lang="less">
.wenv-select-02-dropdown-wrapper {
  position: absolute;
  z-index: 999999;
  left: 0;
  min-width: 100%;
  max-width: 300px;
  font-size: 12px;
  color: #666;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 1px 1px 4px rgba(185, 175, 200, 0.5);

  &[placement='bottom'] {
    top: 32px;
  }

  &[placement='top'] {
    bottom: 32px;
  }

  & > div {
    position: relative;
    max-height: 200px;
  }
}
</style>
