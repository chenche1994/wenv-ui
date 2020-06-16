<template>
  <div :class="$style['container']">
    <div :class="$style['header']">
      <img :src="logo">
    </div>
    <div ref="menu" :class="$style['menu']">
      <ul ref="ul">
        <SideMenuItem
          v-for="(menu, index) in menus"
          v-show="!menu.hidden"
          :key="index"
          :menu="menu"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';
import SideMenuItem from './SideMenuItem.vue';

export default {
  name: 'SideMenu',
  components: {
    SideMenuItem,
  },
  model: {
    prop: 'value',
    event: 'on-click',
  },
  props: {
    logo: {
      type: String,
      required: true,
    },
    menus: {
      // icon, name, label, children
      type: Array,
      required: true,
    },
    value: {
      // selected item name
      type: String,
      required: true,
    },
  },
  provide() {
    return {
      getOnMenuClickHandle: () => this.onMenuClick,
    };
  },
  watch: {
    value(newValue) {
      this.selectByValue(this.menus, newValue);
    },
  },
  created() {
    this.initMenus(this.menus);
    this.selectByValue(this.menus, this.value);
  },
  mounted() {
    this.rs = new ResizeSensor(this.$refs.ul, this.onContentChanged);
    this.ps = new PerfectScrollbar(this.$refs.menu);
  },
  updated() {
    this.ps.update();
  },
  beforeDestroy() {
    this.rs.detach(this.onContentChanged);
    this.rs = null;

    this.ps.destroy();
    this.ps = null;
  },
  methods: {
    onContentChanged() {
      this.ps.update();
    },
    selectByValue(menus, value) {
      if (!value) {
        return;
      }

      menus.forEach((m) => {
        /* eslint-disable-next-line no-param-reassign */
        m.isSelected = m.name === value;

        if (m.children && m.children.length > 0) {
          this.selectByValue(m.children, value);
        }
      });
    },
    onMenuClick(menu) {
      this.resetSelectState(this.menus);
      /* eslint-disable-next-line no-param-reassign */
      menu.isSelected = true;
      if (menu.onClick) {
        menu.onClick();
      }

      this.$emit('on-click', menu.name);
    },
    initMenus(menus) {
      menus.forEach((m) => {
        if (m.isSelected === undefined) {
          this.$set(m, 'isSelected', false);
        }

        if (m.children && m.children.length > 0) {
          if (m.isOpen === undefined) {
            this.$set(m, 'isOpen', false);
          }

          this.initMenus(m.children);
        }
      });
    },
    resetSelectState(menus) {
      menus.forEach((m) => {
        /* eslint-disable-next-line no-param-reassign */
        m.isSelected = false;
        if (m.children && m.children.length > 0) {
          this.resetSelectState(m.children);
        }
      });
    },
  },
};
</script>
<style lang="less" module>
.container {
  user-select: none;
  width: 248px;
  box-sizing: border-box;
  position: relative;

  & > .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 86px;
    background: linear-gradient(to right, #0084ff, #00aeff);
  }

  & > .menu {
    position: relative;
    height: calc(100% - 106px);
    padding-top: 20px;
    background-color: #263238;
    font-size: 15px;
    color: #aaaaaa;
    fill: #aaaaaa;
    overflow: hidden;

    ul {
      list-style-type: none;
      padding: 0px;
      margin: 0px;
    }
  }
}
</style>
