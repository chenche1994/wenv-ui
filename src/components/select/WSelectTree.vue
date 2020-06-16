<template>
  <div v-show="isVisible" class="wenv-select-02-tree" :notroot="!isRoot">
    <div
      class="wenv-select-02-tree-title"
      :style="{ width: titleWidth }"
      :multiple="multiple"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      @click="onSelectChange(node)"
    >
      <div
        :haschild="anyChild(node)"
        :unfold="node.unfold"
        class="wenv-select-02-tree-toggle"
        :style="{ marginLeft }"
        @click.stop="onToggle(node)"
      >
        <svg class="wenv-svg-btn">
          <use xlink:href="#wenv-i-jiantou" />
        </svg>
      </div>
      <WCheckbox
        v-if="!node.disabled && multiple"
        v-model="node.isSelected"
        :disabled="limited && !node.isSelected"
        class="wenv-select-02-tree-checkbox"
        @on-change="onCheckChange(node)"
      />
      <div class="wenv-select-02-tree-name" :disabled="node.disabled">
        {{ node.name }}
      </div>
    </div>
    <div v-if="query || node.unfold">
      <WSelectTree
        v-for="child in node.children"
        :key="`${node.id}_${child.id}`"
        :node="child"
        :query="query"
        :is-root="false"
        :multiple="multiple"
        :limited="limited"
        @on-select="onSelect"
        @on-unselect="onUnselect"
      />
    </div>
  </div>
</template>
<script>
import WCheckbox from '../checkbox/WCheckbox.vue';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'WSelectTree',
  components: {
    WCheckbox,
  },
  inject: ['getUpdateScrollbar', 'getDropdownScrollWidthHandle'],
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
    query: {
      type: String,
      required: false,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    limited: {
      // 是否达到最大选择个数
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      titleWidth: undefined,
    };
  },
  computed: {
    marginLeft() {
      return `${this.node.level * 20 + 8}px`;
    },
    isVisible() {
      if (!this.query) {
        return true;
      }

      const regExp = new RegExp(this.query, 'i');
      if (regExp.test(this.node.name)) {
        return true;
      }

      return this.anyChildMatchQuery(this.node, regExp);
    },
  },
  created() {
    if (this.isRoot) {
      this.node.level = 0;
    }

    if (!this.node.children) {
      return;
    }

    this.node.children.forEach((c) => {
      // eslint-disable-next-line no-param-reassign
      c.level = this.node.level + 1;
    });
  },
  methods: {
    onToggle(node) {
      this.$set(node, 'unfold', !node.unfold);
      this.getUpdateScrollbar()();
      this.$nextTick(() => {
        this.titleWidth = `${this.getDropdownScrollWidthHandle()()}px`;
      });
    },
    onSelectChange(node) {
      if (!this.multiple) {
        this.onSelect(node);
      }
    },
    onCheckChange(node) {
      if (node.isSelected) {
        this.onSelect(node);
      } else {
        this.onUnselect(node);
      }
    },
    onSelect(node) {
      this.$emit('on-select', node);
    },
    onUnselect(node) {
      this.$emit('on-unselect', node);
    },
    anyChildMatchQuery(node, regExp) {
      if (!this.anyChild(node)) {
        return false;
      }

      return node.children.some((c) => {
        if (regExp.test(c.name)) {
          return true;
        }

        return this.anyChildMatchQuery(c, regExp);
      });
    },
    anyChild(node) {
      return Array.isArray(node.children) && node.children.length > 0;
    },
    mouseEnter() {
      this.titleWidth = `${this.getDropdownScrollWidthHandle()()}px`;
    },
    mouseLeave() {
      this.titleWidth = undefined;
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-select-02-tree {
  user-select: none;

  .wenv-select-02-tree-title {
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &[multiple] {
      cursor: auto;
    }

    &:hover {
      background-color: #f3f3f3;
    }

    .wenv-select-02-tree-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      visibility: hidden;
      flex-shrink: 0;
      transform: rotate(90deg);
      color: #999;
      transition: transform 0.2s ease-in-out;

      svg {
        width: 10px;
        height: 10px;
      }

      &:hover {
        color: #666;
      }

      &[unfold] {
        transform: rotate(180deg);
      }

      &[haschild] {
        visibility: visible;
      }
    }

    .wenv-select-02-tree-checkbox {
      flex-shrink: 0;
      margin-left: 6px;
    }

    .wenv-select-02-tree-name {
      margin: 0 10px 0 8px;
      white-space: nowrap;

      &[disabled] {
        pointer-events: none;
        color: #999;
      }
    }
  }
}
</style>
