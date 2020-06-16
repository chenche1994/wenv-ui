<template>
  <div :class="$style['container']">
    <div :class="$style['title']">
      <div v-if="!isRoot" :class="$style['line-horizontal']" />
      <img v-if="hasChild" :src="toggleIcon" :class="$style['toggle']" @click.stop="toggleNode">
      <Checkbox2
        v-if="multiSelect"
        v-model="node.isSelect"
        :indeterminate="node.indeterminate"
        :size="15"
        :class="$style['checkbox']"
        @change="
          onSelectLocal(node);
          onSelect(node);
        "
      />
      <img v-if="hasChild" :src="folderIcon" :class="$style['node']" @click.stop="toggleNode">
      <img v-else :src="nodeIcon" :class="$style['node']">
      <span
        v-if="hasChild && multiSelect"
        :class="$style['label']"
        @click.stop="toggleNode(node)"
      >{{ node.label }}</span>
      <span
        v-if="hasChild && !multiSelect"
        :class="[$style['label'], node.isSelect ? $style['label-selected'] : undefined]"
        @click.stop="
          toggleNode(node);
          node.isSelect = true;
          onSelectLocal(node);
          onSelect(node);
        "
      >{{ node.label }}</span>
      <span
        v-if="!hasChild"
        :class="[
          $style['label'],
          node.isSelect && !multiSelect ? $style['label-selected'] : undefined,
        ]"
        @click.stop="
          node.isSelect = multiSelect ? !node.isSelect : true;
          onSelectLocal(node);
          onSelect(node);
        "
      >{{ node.label }}</span>
    </div>
    <transition name="fade">
      <div
        v-show="node.isOpen === true"
        ref="slide"
        :class="[$style['slide'], isRoot ? $style['slide-root'] : undefined]"
      >
        <div v-if="hasChild" ref="lineVertical" :class="$style['line-vertical']" />
        <div v-if="hasChild" ref="children" :class="$style['children']">
          <Tree
            v-for="(child, i) in node.children"
            :key="i"
            :node="child"
            :is-root="false"
            :multi-select="multiSelect"
            :normalize="normalize"
            @on-select="onSelect"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import uuidv1 from 'uuid/v1.js';
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';
import Checkbox2 from './Checkbox2.vue';

const isCollapseIcon = require('../assets/images/tree_collapse.png');
const isOpenIcon = require('../assets/images/tree_open.png');
const isOpenFolderIcon = require('../assets/images/tree_folder1.png');
const isCollapseFolderIcon = require('../assets/images/tree_folder2.png');
const nodeIcon = require('../assets/images/tree_node.png');

export default {
  name: 'Tree',
  components: {
    Checkbox2,
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
    normalize: {
      type: Object,
      required: false,
      default() {
        return undefined;
      },
    },
  },
  data() {
    this.initNode(this.node);

    return {
      nodeIcon,
    };
  },
  computed: {
    hasChild() {
      return this.anyChild(this.node);
    },
    toggleIcon() {
      return this.node.isOpen ? isOpenIcon : isCollapseIcon;
    },
    folderIcon() {
      return this.node.isOpen ? isOpenFolderIcon : isCollapseFolderIcon;
    },
  },
  watch: {
    node(newNode) {
      this.initNode(newNode);
      this.attachResizeSensor();
    },
  },
  mounted() {
    this.attachResizeSensor();
  },
  beforeDestroy() {
    if (this.resizeSensor) {
      this.resizeSensor.detach(this.onContainerClientHeightChange);
      this.resizeSensor = null;
    }
  },
  methods: {
    attachResizeSensor() {
      if (!this.resizeSensor && this.$refs.slide) {
        this.resizeSensor = new ResizeSensor(this.$refs.slide, this.onContainerClientHeightChange);
      }
    },
    initNode(node) {
      if (!node.internalId) {
        node.internalId = uuidv1(); /* eslint-disable-line no-param-reassign */
      }

      if (node.isSelect === undefined) {
        this.$set(node, 'isSelect', false);
      }

      if (node.indeterminate === undefined) {
        this.$set(node, 'indeterminate', false);
      }

      if (node.isOpen === undefined) {
        this.$set(node, 'isOpen', false);
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
    toggleNode() {
      this.node.isOpen = !this.node.isOpen;
    },
    onContainerClientHeightChange() {
      this.$refs.lineVertical.style.height = `${this.$refs.slide.clientHeight
        - this.$refs.children.lastChild.clientHeight
        + 13}px`;
    },
    onSelectLocal(node) {
      /* eslint-disable-next-line no-param-reassign */
      node.indeterminate = false;
      if (this.multiSelect) {
        this.resetChildSelectState(node);
      }
    },
    onSelect(node) {
      if (this.multiSelect && this.node.internalId !== node.internalId) {
        if (this.node.children.every((n) => n.isSelect === true)) {
          this.node.isSelect = true;
          this.node.indeterminate = false;
        } else if (
          this.node.children.some((n) => n.isSelect === true || n.indeterminate === true)
        ) {
          this.node.isSelect = false;
          this.node.indeterminate = true;
        } else {
          this.node.isSelect = false;
          this.node.indeterminate = false;
        }
      }

      this.$emit('on-select', node);

      if (this.isRoot) {
        if (node.isSelect === false) {
          return;
        }

        if (!this.multiSelect) {
          this.resetTreeSelectState(this.node, node.internalId);
        }
      }
    },
    resetTreeSelectState(node, id) {
      if (node.internalId !== id) {
        /* eslint-disable-next-line no-param-reassign */
        node.isSelect = false;
        /* eslint-disable-next-line no-param-reassign */
        node.indeterminate = false;
      }

      if (this.anyChild(node)) {
        node.children.forEach((n) => {
          this.resetTreeSelectState(n, id);
        });
      }
    },
    resetChildSelectState(node) {
      if (this.anyChild(node)) {
        node.children.forEach((n) => {
          /* eslint-disable-next-line no-param-reassign */
          n.isSelect = node.isSelect;
          /* eslint-disable-next-line no-param-reassign */
          n.indeterminate = false;
          this.resetChildSelectState(n);
        });
      }
    },
    anyChild(node) {
      return Array.isArray(node.children) && node.children.length > 0;
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  @line-color: #cccccc;
  user-select: none;
  font-size: 14px;

  & > .title {
    height: 24px;
    display: flex;
    align-items: center;

    & > .line-horizontal {
      width: 14px;
      height: 1px;
      background-color: @line-color;
    }

    & > .toggle {
      cursor: pointer;
    }

    & > .node {
      cursor: pointer;
      margin-left: 6px;

      &:first-child {
        margin-left: 0;
      }
    }

    & > .checkbox,
    & > .label {
      margin-left: 6px;
    }

    & > .label {
      cursor: pointer;
      padding: 0 4px 0 4px;
    }

    & > .label-selected {
      background-color: #d4eeff;
      border-radius: @common-border-radius;
    }
  }

  & > .slide {
    display: flex;
    align-items: flex-start;
    margin-left: 21px;

    & > .line-vertical {
      width: 1px;
      background-color: @line-color;
    }

    & > .children {
      display: flex;
      flex-flow: column;
    }
  }

  & > .slide-root {
    margin-left: 7px;
  }
}
</style>
