<template>
  <div ref="wrapper" :class="$style['container']" :style="{ width: width + 'px' }">
    <div :class="$style['input-container']" :style="{ height: height + 'px' }">
      <div :class="$style['input']">
        <input
          ref="input"
          v-model="query"
          type="text"
          :placeholder="placeholder"
          @keyup.esc="finishSelect"
          @blur.stop.prevent="inputBlur"
          @focus.stop.prevent="inputFocus"
        >
      </div>
      <div :class="$style['buttons']">
        <img v-if="value" :src="closeIcon" @click.stop="clearSelect">
        <div @click="isMenuOpen = !isMenuOpen">
          <svg width="7" height="4">
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
    <transition name="fade">
      <div
        v-show="isMenuOpen"
        ref="dropdown"
        :class="$style['scrollbar']"
        :style="{ width: width + 'px' }"
      >
        <ul ref="menu" :class="$style['menu']">
          <TreeSelectItem
            v-for="(child, index) in internalOptions"
            :key="index"
            :child="child"
            :query="query"
          />
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import { cloneDeep, isEqual, isObject } from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';
import TreeSelectItem from './TreeSelectItem.vue';

const closeIcon = require('../assets/images/tree_select_close.png');

const MODEL_EVENT_ID = 'on-select';
const PLACEHOLDER = '全部';

export default {
  name: 'TreeSelect',
  components: {
    TreeSelectItem,
  },
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
      type: Object,
      required: false,
      default() {
        return undefined;
      },
    },
    normalize: {
      type: Object,
      required: false,
      default() {
        return undefined;
      },
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
  },
  provide() {
    return {
      getInput: this.getInput,
      getMenu: this.getMenu,
      getSelectEventHandle: () => this.itemSelect,
    };
  },
  data() {
    return {
      isMenuOpen: false,
      query: this.value ? this.value.name : '',
      placeholder: PLACEHOLDER,
      closeIcon,
    };
  },
  computed: {
    internalOptions() {
      return this.normalizeOptions(this.options);
    },
  },
  created() {
    document.addEventListener('click', this.handleClickOutside, false);
  },
  mounted() {
    this.psContent = new PerfectScrollbar(this.$refs.dropdown);
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
    inputFocus() {
      this.isMenuOpen = true;
    },
    getInput() {
      return this.$refs.input;
    },
    getMenu() {
      return this.$refs.menu;
    },
    itemSelect(child) {
      if (!isEqual(child, this.value)) {
        if (!child) {
          this.$emit(MODEL_EVENT_ID, undefined);
          this.placeholder = PLACEHOLDER;
        } else {
          this.$emit(MODEL_EVENT_ID, child);
          this.placeholder = child.name;
        }
      }

      this.finishSelect();
    },
    clearSelect() {
      this.$emit(MODEL_EVENT_ID, undefined);
      this.placeholder = PLACEHOLDER;
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.finishSelect();
      }
    },
    finishSelect() {
      this.query = '';
      this.isMenuOpen = false;
      this.$refs.input.blur();
    },
    normalizeOptions(options) {
      const result = cloneDeep(options);
      result.forEach((option) => {
        this.normalizeOption(option, { level: 0 });
      });

      return result;
    },
    normalizeOption(option, opt) {
      if (!isObject(option)) {
        return;
      }

      if (this.normalize) {
        const { id, name, children } = this.normalize;
        if (id) {
          const idValue = option[id];
          option.id = idValue; /* eslint-disable-line no-param-reassign */
        }

        if (name) {
          const nameValue = option[name];
          option.name = nameValue; /* eslint-disable-line no-param-reassign */
        }

        if (children) {
          const childrenValue = option[children];
          option.children = childrenValue; /* eslint-disable-line no-param-reassign */
        }
      }
      option.level = opt.level; /* eslint-disable-line no-param-reassign */

      if (Array.isArray(option.children)) {
        option.children.forEach((o) => {
          this.normalizeOption(o, { level: opt.level + 1 });
        });
      }
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  & > .input-container {
    display: flex;
    align-items: center;
    border-radius: @common-border-radius;
    border: @common-border;
    color: #333333;
    box-sizing: border-box;

    & > .input {
      flex: 1;

      & > input {
        border: 0;
        outline: none;
        margin-left: 4px;
        box-sizing: border-box;
        box-shadow: none;
        width: 100%;

        &::placeholder {
          color: #333333;
        }

        &:focus::placeholder {
          color: #eeeeee;
        }
      }
    }

    & > .buttons {
      display: flex;
      align-items: center;
      margin-right: 8px;
      margin-left: 8px;

      & > img {
        cursor: pointer;
      }

      & > div {
        display: inline-flex;
        align-items: center;
        margin-left: 8px;
        cursor: pointer;
      }
    }
  }

  .scrollbar {
    position: absolute;
    background-color: #ffffff;
    box-shadow: @common-box-shadow;
    border-radius: @common-border-radius;
    z-index: 999999;
    margin-top: 2px;
    max-height: 200px;

    ul {
      list-style-type: none;
      padding: 0px;
      margin: 0px;
      font-size: 12px;
    }
  }
}
</style>
