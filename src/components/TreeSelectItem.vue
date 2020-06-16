<template>
  <li v-show="isVisible" :class="$style['container']" @click.stop="select">
    <div :style="{paddingLeft}">
      <div v-if="anyChild(child)" @click.stop="toggle($event)">
        <img v-if="!open" :src="arrow">
        <img v-else :src="arrowDown">
      </div>
      <span>{{ child.name }}</span>
    </div>
    <ul v-show="open" v-if="anyChild(child)">
      <TreeSelectItem v-for="(c, i) in child.children" :key="i" :child="c" :query="query" />
    </ul>
  </li>
</template>
<script>
const arrow = require('../assets/images/tree_select_arrow.png');
const arrowDown = require('../assets/images/tree_select_arrow2.png');

export default {
  name: 'TreeSelectItem',
  props: {
    child: {
      type: Object, // { id:'', name:'', children: [] }
      required: true,
    },
    query: {
      type: String,
      required: true,
      default: '',
    },
  },
  inject: ['getInput', 'getMenu', 'getSelectEventHandle'],
  data() {
    return {
      open: true,
      arrow,
      arrowDown,
    };
  },
  computed: {
    isVisible() {
      if (!this.query) {
        return true;
      }

      const regExp = new RegExp(this.query, 'i');
      if (regExp.test(this.child.name)) {
        return true;
      }

      return this.anyChildMatchQuery(this.child, regExp);
    },
    paddingLeft() {
      return `${this.child.level * 24}px`;
    },
  },
  methods: {
    anyChild(child) {
      return child.children && Array.isArray(child.children) && child.children.length > 0;
    },
    anyChildMatchQuery(child, regExp) {
      if (!this.anyChild(child)) {
        return false;
      }
      return child.children.some((c) => {
        if (regExp.test(c.name)) {
          return true;
        }

        return this.anyChildMatchQuery(c, regExp);
      });
    },
    toggle() {
      this.open = !this.open;
    },
    select() {
      const selectEventHandle = this.getSelectEventHandle();
      selectEventHandle({ id: this.child.id, name: this.child.name });
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  user-select: none;

  & > div {
    display: flex;
    align-items: center;
    padding: 4px 0px 4px 0px;

    &:hover {
      background-color: @common-hover-color;
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 12px;
    }

    & > span:first-child {
      margin-left: 15px;
    }
  }
}
</style>
