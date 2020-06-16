<template>
  <div class="wenv-sidemenu-03-menu-01">
    <div
      ref="menuitem"
      class="wenv-sidemenu-03-item wenv-sidemenu-03-menu-01-item"
      @click="onMenuClick"
    >
      <svg
        class="wenv-sidemenu-03-svg-icon"
        :selected="menu.isSelected"
        :anychildselected="anyChildSelected(menu)"
      >
        <use :xlink:href="`#${menu.icon}`" />
      </svg>
      <span
        v-if="!collapsed"
        :selected="menu.isSelected"
        :anychildselected="anyChildSelected(menu)"
      >{{ menu.label }}</span>
      <div v-if="!collapsed" class="wenv-sidemenu-03-separate" />
      <svg
        v-if="!collapsed && menu.children && menu.children.length > 0"
        class="wenv-sidemenu-03-svg-btn"
        :opened="menu.isOpen"
      >
        <use xlink:href="#wenv-i-youjiantou" />
      </svg>
    </div>
    <div
      v-if="collapsed && menu.children && menu.children.length > 0 && menu.isOpen"
      class="wenv-sidemenu-03-menu-01-children-right"
      :style="{ top, left }"
    >
      <SideMenu03Menu02Right
        v-for="(submenu, subindex) in menu.children"
        v-show="!submenu.hidden"
        :key="`${submenu.id}-${subindex}`"
        :menu="submenu"
      />
    </div>
    <div
      v-if="!collapsed && menu.children && menu.children.length > 0 && menu.isOpen"
      class="wenv-sidemenu-03-menu-01-children-bottom"
    >
      <SideMenu03Menu02Bottom
        v-for="(submenu, subindex) in menu.children"
        v-show="!submenu.hidden"
        :key="`${submenu.id}-${subindex}`"
        :menu="submenu"
      />
    </div>
  </div>
</template>

<script>
import SideMenu03Menu02Bottom from './SideMenu03Menu02Bottom.vue';
import SideMenu03Menu02Right from './SideMenu03Menu02Right.vue';

export default {
  name: 'SideMenu03Menu01',
  components: {
    SideMenu03Menu02Bottom,
    SideMenu03Menu02Right,
  },
  inject: ['getOnMenuClickHandle', 'getCloseOtherMenu'],
  props: {
    menus: {
      type: Array,
      required: true,
    },
    menu: {
      // icon, id, label, children
      type: Object,
      required: true,
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      top: undefined,
      left: undefined,
    };
  },
  methods: {
    onMenuClick() {
      const rect = this.$refs.menuitem.getBoundingClientRect();
      this.top = `${rect.top}px`;
      this.left = `${rect.right + 2}px`;

      if (this.collapsed) {
        const closeOtherMenu = this.getCloseOtherMenu();
        closeOtherMenu(this.menus, this.menu);
      }

      const handle = this.getOnMenuClickHandle();
      handle(this.menu);
    },
    anyChildSelected(menu) {
      if (!menu.children || menu.children.length === 0) {
        return false;
      }

      if (menu.children.some((m) => m.isSelected === true)) {
        return true;
      }

      let some = false;
      for (let index = 0; index < menu.children.length; index += 1) {
        if (this.anyChildSelected(menu.children[index])) {
          some = true;
          break;
        }
      }

      return some;
    },
  },
};
</script>
<style lang="less">
.wenv-sidemenu-03-menu-01 {
  @border-color: #bad5ee;

  .wenv-sidemenu-03-menu-01-item {
    padding: 0 24px;
    border-bottom: 1px dashed @border-color;

    span {
      margin-left: 16px;
      white-space: nowrap;
      text-overflow: hidden;

      &[anychildselected] {
        color: #000;
      }
    }
  }

  .wenv-sidemenu-03-menu-01-children-right {
    position: fixed;
    background-color: #d5e8fd;
    border: 1px solid @border-color;
    border-radius: 2px;
  }

  .wenv-sidemenu-03-menu-01-children-bottom {
    background-color: #d5e8fd;
    border-bottom: 1px dashed @border-color;
  }
}
</style>
