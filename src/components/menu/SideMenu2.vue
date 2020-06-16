<template>
  <div :class="$style['container']" :style="{ width: width + 'px' }">
    <SideMenuItem2
      v-for="(menu, index) in menusInterval"
      :key="index"
      :style="{ height: lineHeight + 'px' }"
      :menu="menu"
      @on-click="onMenuClick"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import SideMenuItem2 from './SideMenuItem2.vue';

export default {
  name: 'SideMenu2',
  components: {
    SideMenuItem2,
  },
  props: {
    width: {
      type: Number,
      required: false,
      default: undefined,
    },
    lineHeight: {
      type: Number,
      required: false,
      default: 42,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
  data() {
    const menusInterval = cloneDeep(this.menus);
    this.initMenus(menusInterval);
    return {
      menusInterval,
    };
  },
  methods: {
    onMenuClick(menu) {
      this.resetSelectState(this.menusInterval);
      /* eslint-disable-next-line no-param-reassign */
      menu.isSelected = true;
      if (menu.onClick) {
        menu.onClick();
      }
    },
    initMenus(menus) {
      menus.forEach((m) => {
        if (m.isSelected === undefined) {
          /* eslint-disable-next-line no-param-reassign */
          m.isSelected = false;
        }
      });
    },
    resetSelectState(menus) {
      menus.forEach((m) => {
        /* eslint-disable-next-line no-param-reassign */
        m.isSelected = false;
      });
    },
  },
};
</script>
<style lang="less" module>
.container {
  user-select: none;
  background-color: #ffffff;
  font-size: 14px;
  color: #333333;
  fill: #666666;
}
</style>
