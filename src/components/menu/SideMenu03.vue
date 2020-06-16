<template>
  <div ref="container" class="wenv-sidemenu-03" :collapsed="collapsed">
    <img class="wenv-sidemenu-03-bg-image" :src="bg">
    <div class="wenv-sidemenu-03-bg-color" />
    <div class="wenv-sidemenu-03-collapse" @click="onCollapsed">
      <svg class="wenv-sidemenu-03-collapse-icon" :collapsed="collapsed">
        <use xlink:href="#wenv-i-jiantou" />
      </svg>
    </div>
    <div ref="sidemenu" class="wenv-sidemenu-03-menus" :style="{ maxHeight, height }">
      <Menu01
        v-for="(menu, index) in menus"
        v-show="!menu.hidden"
        :key="`${menu.id}-${index}`"
        :menu="menu"
        :menus="menus"
        :collapsed="collapsed"
      />
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';
import bg from '../../assets/images/sidemenu_03.png';
import Menu01 from './SideMenu03Menu01.vue';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'SideMenu03',
  components: {
    Menu01,
  },
  provide() {
    return {
      getOnMenuClickHandle: () => this.onMenuClick,
      getCloseOtherMenu: () => this.closeOtherMenu,
    };
  },
  model: {
    prop: 'value',
    event: 'on-click',
  },
  props: {
    menus: {
      // icon, id, label, children
      type: Array,
      required: true,
    },
    value: {
      // selected item id
      type: String,
      required: true,
    },
  },
  data() {
    this.initMenus(this.menus);
    this.selectByValue(this.menus, this.value);
    return {
      bg,
      collapsed: false,
      maxHeight: undefined,
      height: undefined,
    };
  },
  watch: {
    value(newValue) {
      this.selectByValue(this.menus, newValue);
    },
  },
  mounted() {
    const style = window.getComputedStyle(this.$refs.container);
    const containerMaxHeight = style.getPropertyValue('max-height');
    if (containerMaxHeight) {
      this.maxHeight = containerMaxHeight;
    }

    const containerHeight = style.getPropertyValue('height');
    if (containerHeight) {
      this.height = containerHeight;
    }

    this.rs = new ResizeSensor(this.$refs.sidemenu, this.onContentChanged);
    this.ps = new PerfectScrollbar(this.$refs.sidemenu);
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
      menus.forEach((m) => {
        if (m.children && m.children.length > 0) {
          this.selectByValue(m.children, value);
        } else {
          this.$set(m, 'isSelected', m.id === value);
        }
      });
    },
    onMenuClick(menu) {
      if (menu.onClick) {
        menu.onClick();
      }

      if (!this.collapsed) {
        if (menu.children && menu.children.length > 0) {
          this.$set(menu, 'isOpen', !menu.isOpen);
        } else {
          this.selectByValue(this.menus, menu.id);
        }
      } else if (menu.children && menu.children.length > 0) {
        this.$set(menu, 'isOpen', !menu.isOpen);
      } else {
        this.selectByValue(this.menus, menu.id);
        this.closeOtherMenu(this.menus, {});
      }

      this.$nextTick(() => {
        this.ps.update();
      });

      if (!menu.children || menu.children.length === 0) {
        this.$emit('click', menu.id);
      }
    },
    initMenus(menus) {
      menus.forEach((m) => {
        if (m.children && m.children.length > 0) {
          if (m.isOpen === undefined) {
            this.$set(m, 'isOpen', false);
          }

          this.initMenus(m.children);
        } else if (m.isSelected === undefined) {
          this.$set(m, 'isSelected', false);
        }
      });
    },
    closeOtherMenu(menus, menu) {
      menus.forEach((m) => {
        if (menu.id !== m.id) {
          this.$set(m, 'isOpen', false);
        }

        if (m.children && m.children.length > 0) {
          this.closeOtherMenu(m.children, menu);
        }
      });
    },
    onCollapsed() {
      this.collapsed = !this.collapsed;

      this.closeOtherMenu(this.menus, {});
    },
  },
};
</script>
<style lang="less">
.wenv-sidemenu-03 {
  @border-color: #bad5ee;
  position: relative;
  cursor: pointer;
  font-size: 14px;
  width: 200px;
  box-sizing: border-box;
  border-right: 1px solid @border-color;
  user-select: none;
  color: #3d5e70;
  transition: width 0.2s ease-in-out;

  &[collapsed] {
    width: 65px;
  }

  .wenv-sidemenu-03-bg-image {
    position: absolute;
    bottom: 0;
    z-index: -1;
    width: 100%;
  }

  .wenv-sidemenu-03-bg-color {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: #e2f1fe;
  }

  .wenv-sidemenu-03-collapse {
    position: absolute;
    width: 12px;
    height: 50px;
    right: -12px;
    top: 50%;
    margin-top: -25px;
    box-sizing: border-box;
    border: 1px solid #bad5ee;
    border-radius: 0 2px 2px 0;
    background-color: #e2f1fe;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .wenv-sidemenu-03-collapse-icon {
    width: 9px;
    height: 9px;
    transform: rotate(270deg);
    transition: transform 0.2s ease-in-out;
    fill: currentColor;
    color: #a3c2e0;

    &[collapsed] {
      transform: rotate(90deg);
    }
  }

  .wenv-sidemenu-03-menus {
    position: relative;
  }

  .wenv-sidemenu-03-separate {
    flex: 1;
  }

  .wenv-sidemenu-03-svg-btn {
    transition: transform 0.2s ease-in-out;
    width: 9px;
    height: 9px;
    fill: currentColor;
    color: #1c3441;
    transform: rotate(90deg);

    &[opened] {
      transform: rotate(270deg);
    }
  }

  .wenv-sidemenu-03-svg-icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
    color: #607683;
    flex-shrink: 0;

    &[selected] {
      color: #0090ff;
    }

    &[anychildselected] {
      color: #355365;
    }
  }

  .wenv-sidemenu-03-item {
    display: flex;
    align-items: center;
    box-sizing: content-box;
    height: 55px;

    span {
      &[selected] {
        color: #0085da;
      }
    }

    &:hover {
      & span {
        color: #0085da;
      }

      & .wenv-sidemenu-03-svg-icon,
      & .wenv-sidemenu-03-svg-btn {
        color: #0090ff;
      }
    }
  }
}
</style>
