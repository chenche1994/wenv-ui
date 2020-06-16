<template>
  <div class="wenv-sidemenu-03-menu-02-bottom">
    <div
      class="wenv-sidemenu-03-item wenv-sidemenu-03-menu-02-bottom-item"
      @click="onMenuClick(menu)"
    >
      <span :selected="menu.isSelected">{{ menu.label }}</span>
      <div class="wenv-sidemenu-03-separate" />
      <svg
        v-if="menu.children && menu.children.length > 0"
        class="wenv-sidemenu-03-svg-btn"
        :opened="menu.isOpen"
      >
        <use xlink:href="#wenv-i-youjiantou" />
      </svg>
    </div>
    <div v-if="menu.children && menu.children.length > 0 && menu.isOpen">
      <div
        v-for="(submenu, subindex) in menu.children"
        v-show="!submenu.hidden"
        :key="`${submenu.id}-${subindex}`"
        class="wenv-sidemenu-03-item wenv-sidemenu-03-menu-03-bottom-item"
        @click="onMenuClick(submenu)"
      >
        <span :selected="submenu.isSelected">{{ submenu.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu03Menu02Bottom',
  inject: ['getOnMenuClickHandle'],
  props: {
    menu: {
      // icon, id, label, children
      type: Object,
      required: true,
    },
  },
  methods: {
    onMenuClick(menu) {
      const handle = this.getOnMenuClickHandle();
      handle(menu);
    },
  },
};
</script>
<style lang="less">
.wenv-sidemenu-03-menu-02-bottom {
  .wenv-sidemenu-03-menu-02-bottom-item {
    padding: 0 24px 0 72px;

    &:hover {
      background-color: #c9e1fc;
    }
  }

  .wenv-sidemenu-03-menu-03-bottom-item {
    padding-left: 86px;
  }
}
</style>
