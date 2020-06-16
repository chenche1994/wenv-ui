<template>
  <li :class="$style['container']" @click.stop="onClick">
    <div :class="[$style['title'], menu.isSelected ? $style['title-selected'] : undefined]">
      <div v-if="menu.isSelected" :class="$style['selected-bar']" />
      <SvgIcon v-if="menu.icon" :name="menu.icon" :class="$style['icon']" />
      <div :class="$style['name']">
        {{ menu.label }}
      </div>
      <svg
        v-if="menu.children && menu.children.length > 0"
        width="9"
        height="5"
        viewBox="0 0 9 5"
        :class="$style['arrow']"
        :style="{ transform: menu.isOpen ? 'rotate(180deg)' : undefined }"
      >
        <path
          d="M4.5,5c0.1,0,0.3-0.1,0.4-0.2l3.9-3.9C9,0.7,9,0.4,8.8,0.2C8.6-0.1,
        8.2-0.1,8,0.2L4.5,3.7L1,0.2c-0.2-0.2-0.6-0.2-0.8,0C0,0.4,0,0.7,0.2,0.9l3.9,
        3.9C4.2,4.9,4.4,5,4.5,5L4.5,5z M4.5,5"
        />
      </svg>
    </div>
    <transition name="fade">
      <ul v-if="menu.isOpen" ref="submenu" :class="$style['submenu']">
        <SideMenuItem
          v-for="(subMenu, subMenuIndex) in menu.children"
          v-show="!subMenu.hidden"
          :key="subMenuIndex"
          :menu="subMenu"
        />
      </ul>
    </transition>
  </li>
</template>

<script>
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'SideMenuItem',
  components: {
    SvgIcon,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  inject: ['getOnMenuClickHandle'],
  data() {
    return {
      onMenuClickHandle: this.getOnMenuClickHandle(),
    };
  },
  methods: {
    onClick() {
      if (this.menu.children && this.menu.children.length > 0) {
        this.menu.isOpen = !this.menu.isOpen;
      } else {
        this.onMenuClickHandle(this.menu);
      }
    },
  },
};
</script>
<style lang="less" module>
@highlight-color: #faaf1f;

.container {
  display: flex;
  flex-flow: column;

  .highlight() {
    color: @highlight-color;
    fill: @highlight-color;
  }

  .title-selected {
    .highlight();
    font-weight: bold;
  }

  .title {
    display: flex;
    align-items: center;
    height: 56px;
    cursor: pointer;

    & > .selected-bar {
      height: 28px;
      width: 3px;
      background-color: @highlight-color;

      & + .icon {
        margin-left: 42px;
      }

      & + .name {
        margin-left: 76px;
      }
    }

    & > .icon {
      margin-left: 45px;

      & + .name {
        margin-left: 16px;
      }
    }

    & > .name {
      margin-left: 79px;
    }

    & > .arrow {
      margin-left: 10px;
    }

    &:hover {
      .highlight();
    }
  }

  .submenu {
    background-color: rgba(53, 167, 255, 0.25);
  }
}
</style>
