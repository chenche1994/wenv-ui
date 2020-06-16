<template>
  <div ref="wrapper" :class="$style['container']">
    <div :class="$style['button']" @click="onButtonClick">
      <SvgIcon :name="icon" :class="$style['icon']" :style="{color}" />
      <span :style="{color}">{{ name }}</span>
      <svg viewBox="0 0 7 4" width="7" height="4" :class="$style['dropdown']">
        <path
          :fill="color"
          d="M3.5,4c0.1,0,0.2,0,0.3-0.1l3.1-3.1C7,0.6,7,0.3,6.9,0.1C6.7,0,6.4,0,6.3,0.1L3.5,
          2.9L0.7,0.1C0.6,0,0.3,0,0.1,0.1C0,0.3,0,0.6,0.1,0.8l3.1,3.1C3.3,4,3.4,4,3.5,4L3.5,
          4z M3.5,4"
        />
      </svg>
    </div>
    <transition name="fade">
      <ul v-if="isMenuOpen" :class="$style['menu']">
        <slot />
      </ul>
    </transition>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'ToolbarDropdownButton',
  components: {
    SvgIcon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    color() {
      return this.isMenuOpen ? '#006fe1' : undefined;
    },
  },
  created() {
    document.addEventListener('click', this.handleClickOutside, false);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside, false);
  },
  methods: {
    onButtonClick() {
      this.isMenuOpen = !this.isMenuOpen;
      this.$emit('on-click', this.isMenuOpen);
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.isMenuOpen = false;
      }
    },
  },
};
</script>
<style lang="less" module>
@import '../../main.less';

.container {
  & > .button {
    @margin-before-after: 12px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    height: 34px;
    &:hover {
      background-color: @common-hover-color;
      color: #006fe1;
    }

    &:hover > .icon {
      color: #006fe1;
    }

    &:hover > .dropdown {
      fill: #006fe1;
    }

    & > .icon {
      margin-left: @margin-before-after;
      margin-right: 8px;
      color: #999999;
    }

    & > .dropdown {
      margin-left: 6px;
      margin-right: @margin-before-after;
    }
  }

  & > .menu {
    position: absolute;
    margin-top: 2px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: @common-border-radius;
    box-shadow: @common-box-shadow;
    list-style-type: none;
    padding: 0px;
    overflow: hidden;

    & > li {
      padding: 7px 16px;
      display: flex;

      &:hover {
        background-color: @common-hover-color;
      }
    }
  }
}
</style>
