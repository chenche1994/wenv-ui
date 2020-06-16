<template>
  <div ref="trees" class="wenv-tree-02" />
</template>
<script>
import { isString, debounce } from 'lodash-es';
import { TITLE_CLASS } from './constants.js';
import toTree from './toTree.js';
import findTreeNodeById from './findTreeNodeById.js';
import createNode from './createNode.js';
import pushId from './pushId.js';
import removeId from './removeId.js';
import initTreesStatus from './initTreesStatus.js';
import initTreesQueryStatus from './initTreesQueryStatus.js';
import getParentTitleNode from './getParentTitleNode.js';
import cascadeParentStatus from './cascadeParentStatus.js';
import cascadeChildrenDomStatus from './cascadeChildrenDomStatus.js';
import cascadeChildrenNodeStatus from './cascadeChildrenNodeStatus.js';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WTree02',
  model: {
    prop: 'value',
    event: 'on-select-change',
  },
  props: {
    type: {
      type: String,
      required: false,
      validator(value) {
        return ['default', 'dropdown'].indexOf(value) !== -1;
      },
      default: 'default',
    },
    nodes: {
      type: Array,
      required: true,
    },
    query: {
      type: String,
      required: false,
      default: undefined,
    },
    icons: {
      type: Object,
      required: false,
      default() {
        return {
          toggle: 'wenv-i-youjiantou',
          fold: '',
          unfold: '',
          endpoint: '',
        };
      },
    },
    value: {
      type: [String, Number, Array],
      required: true,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    limit: {
      type: Number,
      required: false,
      default: -1, // no limit
    },
    expandLevel: {
      type: Number,
      required: false,
      default: -1, // no expand
    },
    cascade: {
      type: Boolean,
      required: false,
      default: false,
    },
    normalize: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      valueInternal: Array.isArray(this.value) ? [...this.value] : this.value,
      trees: toTree(this.nodes, this.normalize),
    };
  },
  watch: {
    nodes(newData) {
      this.trees = toTree(newData, this.normalize);
      initTreesStatus(
        this.trees,
        this.valueInternal,
        this.multiple,
        this.expandLevel,
        this.cascade,
      );
      this.$refs.trees.innerHTML = this.createDomTree(this.trees);
    },
    value(newValue) {
      if (
        newValue !== this.valueInternal
        || (Array.isArray(newValue) && newValue.length !== this.valueInternal.length)
      ) {
        this.valueInternal = Array.isArray(newValue) ? [...newValue] : newValue;
        initTreesStatus(
          this.trees,
          this.valueInternal,
          this.multiple,
          this.expandLevel,
          this.cascade,
        );
        this.$refs.trees.innerHTML = this.createDomTree(this.trees);
      }
    },
    query() {
      this.filterTree();
    },
  },
  mounted() {
    this.$refs.trees.setAttribute('data-type', this.type);
    this.$refs.trees.setAttribute('data-multiple', this.multiple);
    this.$refs.trees.addEventListener('click', this.onClick);
    initTreesStatus(this.trees, this.valueInternal, this.multiple, this.expandLevel, this.cascade);
    this.$refs.trees.innerHTML = this.createDomTree(this.trees);
  },
  beforeDestroy() {
    this.$refs.trees.removeEventListener('click', this.onClick);
  },
  methods: {
    onClick(event) {
      if (event.target.nodeName.match(/svg/i)) {
        this.onToggleClick(event.target.parentNode);
      } else if (event.target.nodeName.match(/label/i)) {
        this.onCheckboxClick(event.target.parentNode);
      } else if (event.target.nodeName.match(/span/i)) {
        this.onNameClick(event.target.parentNode);
      } else if (this.type === 'dropdown' && event.target.className === TITLE_CLASS) {
        this.onNameClick(event.target);
      }
    },
    onToggleClick(titleDom) {
      const id = this.getId(titleDom);
      const node = findTreeNodeById(this.trees, id);
      let expand;
      if (this.isQuerying()) {
        node.expandWhenQuery = !node.expandWhenQuery;
        expand = node.expandWhenQuery;
        titleDom.setAttribute('data-expand', node.expandWhenQuery);
      } else {
        node.expand = !node.expand;
        ({ expand } = node);
        titleDom.setAttribute('data-expand', node.expand);
      }

      const cDom = titleDom.nextElementSibling;
      cDom.innerHTML = expand ? this.createDomTree(node.children) : '';

      this.$emit('on-toggle-expand', node.expand);
    },
    onCheckboxClick(titleDom) {
      this.onSelectWhenMultiple(titleDom);
    },
    onNameClick(titleDom) {
      if (this.multiple) {
        this.onSelectWhenMultiple(titleDom);
        return;
      }

      const id = this.getId(titleDom);
      const node = findTreeNodeById(this.trees, id);
      if (!node.selected) {
        node.selected = true;

        const previousSelectedNode = findTreeNodeById(this.trees, this.valueInternal);
        if (previousSelectedNode) {
          previousSelectedNode.selected = false;
        }
        this.setDomAttribute(
          this.$refs.trees,
          `.${TITLE_CLASS}[data-selected="true"]`,
          'data-selected',
          false,
        );
        titleDom.setAttribute('data-selected', true);
        this.valueInternal = id;
      }
      this.$emit('on-select-change', id);
    },
    onSelectWhenMultiple(titleDom) {
      const id = this.getId(titleDom);
      const node = findTreeNodeById(this.trees, id);
      node.selected = !node.selected;
      titleDom.setAttribute('data-selected', node.selected);
      const previousSelectedCount = this.valueInternal.length;
      this.updateSelectedId(this.valueInternal, id, node.selected);
      const afterSelectedCount = this.valueInternal.length;
      if (previousSelectedCount >= this.limit || afterSelectedCount >= this.limit) {
        this.setLimitStatus(this.$refs.trees);
      }

      if (this.cascade) {
        node.indeterminate = false;
        titleDom.setAttribute('data-indeterminate', false);
        const { children } = node;
        cascadeChildrenNodeStatus(children, node.selected, this.valueInternal);
        cascadeChildrenDomStatus(titleDom.nextElementSibling, node.selected);
        const pTitleDom = getParentTitleNode(titleDom);
        cascadeParentStatus(node.pnode, pTitleDom, this.valueInternal);
      }

      this.$emit('on-select-change', this.valueInternal);
    },
    getId(titleDom) {
      const idStr = titleDom.getAttribute('data-id');
      return isString(this.trees[0].id) ? idStr : parseInt(idStr, 10);
    },
    updateSelectedId(ids, id, status) {
      if (status) {
        pushId(ids, id);
      } else {
        removeId(ids, id);
      }
    },
    setLimitStatus() {
      if (this.isLimitDisabled()) return;
      const isLimited = this.isLimited();
      this.$refs.trees.setAttribute('data-limited', isLimited);
    },
    isLimitDisabled() {
      return !this.multiple || this.limit === -1 || this.cascade;
    },
    isLimited() {
      return !this.isLimitDisabled() && this.valueInternal.length >= this.limit;
    },
    setDomAttribute(target, selector, attribute, status) {
      const el = target.querySelector(selector);
      if (el) {
        el.setAttribute(attribute, status);
      }
    },
    isQuerying() {
      return this.query !== undefined && this.query !== '';
    },
    filterTree: debounce(function ft() {
      initTreesQueryStatus(this.trees, this.query);
      this.$refs.trees.innerHTML = this.createDomTree(this.trees);
    }, 800),
    createDomTree(nodes) {
      return nodes.map((t) => createNode(t, this.icons, this.multiple, this.isQuerying())).join('');
    },
  },
};
</script>
<style lang="less">
.wenv-tree-02 {
  display: flex;
  flex-flow: column;
  font-size: 14px;
  color: #666;

  .wenv-tree-02-node-title {
    display: flex;
    align-items: center;
    user-select: none;
    position: relative;

    &[data-expand='true'] {
      .wenv-tree-02-node-toggle {
        transform: rotate(90deg);
      }

      .wenv-tree-02-node-icon-fold {
        display: none;
      }
    }

    &[data-expand='false'] {
      .wenv-tree-02-node-icon-unfold {
        display: none;
      }
    }

    &[data-selected='true'] {
      label {
        background-color: #108ee9;
        border-color: #377ff6;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 6px;
          left: 3px;
          border: 2px solid #ffffff;
          border-top: 0;
          border-left: 0;
          background-color: #108ee9;
          transform: rotate(45deg);
        }
      }
    }

    &[data-indeterminate='true'] {
      label {
        background-color: #108ee9;
        border-color: #377ff6;
        position: relative;

        &::after {
          content: '';
          width: 6px;
          border-top: 2px solid #ffffff;
          position: absolute;
          top: 4px;
          left: 2px;
        }
      }
    }

    &[disabled='true'] {
      label {
        pointer-events: none;
        border-color: #ddd;
        background-color: #f3f3f3;

        &::after {
          border-color: #ddd;
          background-color: #f3f3f3;
        }
      }

      span {
        pointer-events: none;
        color: #aaa;
      }
    }

    .wenv-tree-02-node-toggle {
      cursor: pointer;
      padding: 4px;
      width: 10px;
      height: 10px;
      transition: fill 0.2s ease-in-out, transform 0.2s ease-in-out;
      fill: #999;
      overflow: hidden;
      flex-shrink: 0;

      &:hover {
        fill: #666;
      }

      use {
        pointer-events: none;
      }
    }

    label {
      position: relative;
      margin: 0 2px 0 6px;
      height: 12px;
      width: 12px;
      box-sizing: border-box;
      background-color: #fff;
      border: 1px solid #bbb;
      border-radius: 2px;
      flex-shrink: 0;
      cursor: pointer;
      transition: border-color 0.2s ease-in-out;

      label:hover {
        border-color: #377ff6;
      }

      input {
        display: none;
      }

      &:hover {
        border-color: #377ff6;
      }
    }

    .wenv-tree-02-node-icon {
      width: 10px;
      height: 10px;
      pointer-events: none;
      flex-shrink: 0;
      margin: 0 2px 0 6px;
    }

    span {
      display: inline-block;
      white-space: nowrap;
      cursor: pointer;
      border-radius: 3px;
      padding: 0 6px;
      height: 20px;
      line-height: 20px;
      flex-shrink: 0;
    }
  }
}

.wenv-tree-02[data-type='dropdown'] {
  .wenv-tree-02-node-title {
    cursor: pointer;
    height: 28px;
    line-height: 28px;

    &:hover {
      background-color: #f3f3f3;
    }

    span {
      pointer-events: none;
    }

    .wenv-tree-02-node-toggle {
      margin-left: 4px;
    }

    &[disabled='true'] {
      pointer-events: none;

      .wenv-tree-02-node-toggle {
        pointer-events: all;
      }
    }
  }
}

.wenv-tree-02[data-type='default'][data-multiple='false'] {
  .wenv-tree-02-node-title {
    &[data-selected='true'] {
      span {
        background-color: #c3d7fc;
      }
    }

    &[data-selected='false'] {
      span:hover {
        color: #333;
        background-color: #ebf2fe;
      }
    }
  }
}

.wenv-tree-02[data-type='default'][data-multiple='true'] {
  .wenv-tree-02-node-title {
    span:hover {
      color: #333;
      background-color: #ebf2fe;
    }
  }
}

.wenv-tree-02[data-limited='true'] {
  .wenv-tree-02-node-title[data-selected='false'] {
    label {
      pointer-events: none;
      border-color: #ddd;
      background-color: #f3f3f3;

      &::after {
        border-color: #ddd;
        background-color: #f3f3f3;
      }
    }

    span {
      pointer-events: none;
      color: #aaa;
    }
  }
}

.wenv-tree-02[data-limited='true'][data-type='dropdown'] {
  .wenv-tree-02-node-title[data-selected='false'] {
    pointer-events: none;

    .wenv-tree-02-node-toggle {
      pointer-events: all;
    }
  }
}
</style>
