<template>
  <div ref="wrapper" :class="$style['container']" :style="{ fontSize: fontSize + 'px' }">
    <div :class="$style['input-container']">
      <input
        ref="input"
        v-model="query"
        type="text"
        :placeholder="placeholderInternal"
        :style="{
          width: width + 'px',
          height: height + 'px',
          paddingRight: canClear && value && value.id ? '31px' : undefined,
        }"
        :class="{ [$style['input-null']]: !value || !value.name }"
        @keyup.esc="finishSelect"
        @blur.stop.prevent="inputBlur"
        @focus.stop.prevent="isMenuOpen = true"
      >
      <div :style="{ height: height + 'px' }">
        <div @click.stop="clearSelect">
          <img v-if="canClear && value && value.id" :src="closeIcon">
        </div>
        <div @click="onMenuButtonClick">
          <svg
            width="7"
            height="4"
            :style="{ transform: isMenuOpen ? 'rotate(180deg)' : undefined }"
          >
            <path
              d="M3.5,4c0.1,0,0.2,0,0.3-0.1l3.1-3.1C7,0.6,7,0.3,6.9,0.1C6.7,0,6.4,0,6.3,
                    0.1L3.5,2.9L0.7,0.1C0.6,0,0.3,0,0.1,0.1C0,0.3,0,0.6,0.1,0.8l3.1,3.1C3.3,
                    4,3.4,4,3.5,4L3.5,4z M3.5,4"
              fill="#999999"
            />
          </svg>
        </div>
      </div>
    </div>
    <div>
      <transition name="fade">
        <ul v-show="isMenuOpen" ref="menu" :class="$style['menu']" :style="{ width: width + 'px' }">
          <li v-for="option in optionsInternal" :key="option.id" @click="itemSelect(option)">
            {{ option.name }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
import { isEqual } from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';

const closeIcon = require('../assets/images/tree_select_close.png');

const MODEL_EVENT_ID = 'on-change';

export default {
  name: 'Select',
  model: {
    prop: 'value',
    event: MODEL_EVENT_ID,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Object, // id name
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default() {
        return 220;
      },
    },
    height: {
      type: Number,
      required: false,
      default() {
        return 28;
      },
    },
    fontSize: {
      type: Number,
      required: false,
      default: 12,
    },
    canClear: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isMenuOpen: false,
      query: undefined,
      closeIcon,
    };
  },
  computed: {
    placeholderInternal() {
      return this.value.name || this.placeholder;
    },
    optionsInternal() {
      if (this.isMenuOpen === false) {
        return [];
      }

      if (!this.query || this.query === '') {
        return this.options;
      }

      return this.options.filter((o) => {
        const regexp = new RegExp(this.query, 'i');
        return regexp.test(o.name);
      });
    },
  },
  created() {
    document.addEventListener('click', this.handleClickOutside, false);
  },
  mounted() {
    this.psContent = new PerfectScrollbar(this.$refs.menu);
  },
  updated() {
    this.psContent.update();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside, false);
    this.psContent.destroy();
    this.psContent = null;
  },
  methods: {
    inputBlur() {
      if (this.isMenuOpen) {
        this.$refs.input.focus();
      }
    },
    itemSelect(option) {
      if (!isEqual(option, this.value)) {
        this.$emit(MODEL_EVENT_ID, option);
      }

      this.finishSelect();
    },
    clearSelect() {
      this.$emit(MODEL_EVENT_ID, {});
    },
    finishSelect() {
      this.isMenuOpen = false;
      this.query = undefined;
      this.$refs.input.blur();
    },
    onMenuButtonClick() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.finishSelect();
      }
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: inline-flex;
  flex-direction: column;

  & > .input-container {
    display: inline-block;
    position: relative;
    color: #333333;

    & > input {
      outline: none;
      padding-left: 4px;
      padding-right: 15px;
      box-sizing: border-box;
      border-radius: @common-border-radius;
      border: @common-border;
      box-sizing: border-box;
      &::placeholder {
        color: #333333;
      }

      &:focus::placeholder {
        color: #eeeeee;
      }

      &:focus {
        border: @common-border-highlight;
      }
    }

    & > .input-null {
      &::placeholder {
        color: #eeeeee;
      }
    }

    & > div {
      position: absolute;
      right: 0px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;

      & > div {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 15px;

        &:first-child {
          margin-right: 8px;
        }
      }
    }
  }

  & > div {
    position: relative;

    & > .menu {
      position: absolute;
      box-shadow: @common-box-shadow;
      background-color: #ffffff;
      list-style-type: none;
      padding: 4px 0 4px 0;
      margin: 2px 0 0 0;
      overflow: hidden;
      max-height: 200px;
      user-select: none;
      z-index: 999999;

      & > li {
        padding-left: 4px;
        padding-top: 4px;
        padding-bottom: 4px;

        &:hover {
          background-color: @common-hover-color;
        }
      }
    }
  }
}
</style>
