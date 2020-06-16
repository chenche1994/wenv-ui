<template>
  <div class="wenv-tree" :notroot="!isRoot" :disabled="node.disabled">
    <div class="wenv-tree-title">
      <svg
        class="wenv-svg-btn wenv-tree-btn-toggle"
        :haschild="hasChild"
        :unfold="node.unfold"
        :disabled="node.disabled"
        @click="onToggle(node)"
      >
        <use :xlink:href="`#${icons && icons.toggle ? icons.toggle : 'wenv-i-youjiantou'}`" />
      </svg>
      <WCheckbox
        v-if="multiSelect"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="node.disabled"
        class="wenv-tree-checkbox"
        @on-change="onCheckChange(node)"
      />
      <svg
        v-if="icon"
        class="wenv-svg-btn wenv-tree-icon"
        :disabled="node.disabled"
        @click="onSelectChange(node)"
      >
        <use :xlink:href="`#${icon}`" />
      </svg>
      <div
        class="wenv-tree-label"
        :selected="node.selected"
        :disabled="node.disabled"
        @click="onSelectChange(node)"
      >
        {{ node.label }}
      </div>
    </div>
    <div v-if="!node.disabled && node.unfold">
      <WTree
        v-for="(child, i) in node.children"
        :key="`${node.label}_${child.label}_${i}`"
        :node="child"
        :is-root="false"
        :multi-select="multiSelect"
        :cascade="cascade"
        :icons="icons"
        :normalize="normalize"
        @on-select-change="onSelectChange"
        @on-check-change="onCheckChangeBubble"
      />
    </div>
  </div>
</template>
<script>
/**
 * @deprecated since version 2.0
 */
import WCheckbox from '../checkbox/WCheckbox.vue';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WTree',
  components: {
    WCheckbox,
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      required: false,
      default: true,
    },
    multiSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    cascade: {
      type: Boolean,
      required: false,
      default: true,
    },
    icons: {
      type: Object,
      required: false,
      default() {
        return undefined; // {toggle,fold,unfold,endpoint}}
      },
    },
    normalize: {
      type: Object,
      required: false,
      default() {
        return undefined;
      },
    },
  },
  computed: {
    hasChild() {
      return this.anyChild(this.node);
    },
    icon() {
      if (!this.icons) {
        return undefined;
      }

      if (!this.hasChild) {
        return this.icons.endpoint;
      }

      if (this.node.unfold) {
        return this.icons.unfold;
      }

      return this.icons.fold;
    },
  },
  watch: {
    node(newNode) {
      this.initNode(newNode);
    },
  },
  created() {
    this.initNode(this.node);
  },
  methods: {
    initNode(node) {
      if (this.multiSelect && node.checked === undefined) {
        this.$set(node, 'checked', false);
      }

      if (this.normalize) {
        const { label, children } = this.normalize;
        if (!node.label && label) {
          node.label = node[label]; /* eslint-disable-line no-param-reassign */
        }

        if (!node.children && children) {
          node.children = node[children]; /* eslint-disable-line no-param-reassign */
        }
      }
    },
    onToggle(node) {
      this.$set(node, 'unfold', !node.unfold);
    },
    onSelectChange(node) {
      if (this.isRoot) {
        this.resetSelectState(this.node);
        this.$set(node, 'selected', true);
      }

      this.$emit('on-select-change', node);
    },
    onCheckChange(node) {
      if (this.cascade) {
        this.resetChildCheckState(node, node.checked);
      }

      this.$emit('on-check-change', node);
    },
    onCheckChangeBubble(node) {
      if (this.cascade) {
        this.resetCheckState();
      }

      this.onCheckChange(node);
    },
    resetCheckState() {
      let checked = false;
      let indeterminate = false;
      if (this.node.children.every((n) => n.disabled || n.checked)) {
        checked = true;
        indeterminate = false;
      } else if (this.node.children.some((n) => n.checked || n.indeterminate)) {
        checked = false;
        indeterminate = true;
      }

      this.$set(this.node, 'checked', checked);
      this.$set(this.node, 'indeterminate', indeterminate);
    },
    resetChildCheckState(node, state) {
      if (node.disabled) return;

      this.$set(node, 'checked', state);
      this.$set(node, 'indeterminate', false);

      if (this.anyChild(node)) {
        node.children.forEach((n) => {
          this.resetChildCheckState(n, state);
        });
      }
    },
    resetSelectState(node) {
      this.$set(node, 'selected', false);
      if (this.anyChild(node)) {
        node.children.forEach((n) => {
          this.resetSelectState(n);
        });
      }
    },
    anyChild(node) {
      return Array.isArray(node.children) && node.children.length > 0;
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-tree {
  user-select: none;
  font-size: 14px;
  font-family: @font-family;

  &[notroot] {
    margin-left: 20px;
  }

  .wenv-tree-title {
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 6px;

    .wenv-tree-btn-toggle {
      width: 12px;
      height: 12px;
      visibility: hidden;
      flex-shrink: 0;

      &[unfold] {
        transform: rotate(90deg);
      }

      &[haschild] {
        visibility: visible;
      }
    }

    .wenv-tree-checkbox {
      flex-shrink: 0;
      margin-left: 6px;
    }

    .wenv-tree-icon {
      flex-shrink: 0;
      margin-left: 10px;
    }

    .wenv-tree-label {
      cursor: pointer;
      margin-left: 2px;
      padding: 0 6px;
      border-radius: @common-border-radius;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &[selected] {
        background-color: #c3d7fc;

        &:hover {
          background-color: #c3d7fc;
        }
      }

      &[disabled] {
        color: @font-color-light;
        pointer-events: none;
      }

      &:hover {
        background-color: #ebf2fe;
      }
    }
  }
}
</style>
