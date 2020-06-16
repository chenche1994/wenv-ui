<template>
  <div ref="wrapper" class="wenv-select-03">
    <div class="wenv-select-03-input" :clearvisible="clearvisible">
      <input
        ref="input"
        v-model="query"
        class="wenv-input"
        :disabled="disabled"
        :placeholder="names === undefined || names === '' ? placeholder : ''"
        @focus="onOpenChange(true)"
      >
      <span v-show="!query">{{ names }}</span>
      <svg v-if="clearvisible" class="wenv-svg-btn wenv-select-03-clear" @click="onClear">
        <use xlink:href="#wenv-i-guanbi" />
      </svg>
      <svg
        class="wenv-svg-btn wenv-select-03-open"
        :open="isOpen"
        :disabled="disabled"
        @click="onOpenChange(!isOpen)"
      >
        <use xlink:href="#wenv-i-youjiantou" />
      </svg>
    </div>
    <div v-show="isOpen" class="wenv-select-03-dropdown" :placement="placement">
      <div ref="dropdown">
        <WTree02
          type="dropdown"
          :value="value"
          :nodes="options"
          :multiple="multiple"
          :limit="limit"
          :icons="icons"
          :expand-level="expandLevel"
          :cascade="cascade"
          :query="query"
          @on-select-change="onSelectChange"
          @on-toggle-expand="onToggleExpand"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { find } from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';
import '../../css/input.less';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';
import WTree02 from '../tree/WTree02.vue';

const MODEL_EVENT_ID = 'on-select-change';

export default {
  name: 'WSelectTree03',
  components: {
    WTree02,
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
      type: [String, Number, Array],
      required: true,
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    limit: {
      type: Number,
      required: false,
      default: -1, // no limit
    },
    expandLevel: {
      type: Number,
      required: false,
      default: -1, // no expand
    },
    cascade: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    icons: {
      type: Object,
      required: false,
      default() {
        return {
          toggle: 'wenv-i-youjiantou1',
        };
      },
    },
    normalize: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    placement: {
      type: String,
      required: false,
      validator(t) {
        return ['bottom', 'top'].indexOf(t) !== -1;
      },
      default: 'bottom',
    },
  },
  data() {
    return {
      isOpen: false,
      query: '',
    };
  },
  computed: {
    clearvisible() {
      return (
        !this.disabled
        && !this.multiple
        && this.clearable
        && !this.isOpen
        && this.value !== undefined
        && this.value !== ''
      );
    },
    names() {
      if (this.multiple) {
        const names = this.value.reduce((acc, v) => {
          const node = find(this.options, (o) => o[this.normalize.id || 'id'] === v);
          if (node) {
            acc.push(node[this.normalize.name || 'name']);
          }
          return acc;
        }, []);
        return names.join(';');
      }

      const node = find(this.options, (o) => o[this.normalize.id || 'id'] === this.value);
      return node ? node[this.normalize.name || 'name'] : '';
    },
  },
  watch: {
    isOpen(newValue) {
      if (!newValue) {
        this.$refs.input.blur();
      } else {
        this.$nextTick(() => {
          this.psContent.update();
        });
      }
    },
  },
  created() {
    document.addEventListener('click', this.handleClickOutside, false);
  },
  mounted() {
    this.psContent = new PerfectScrollbar(this.$refs.dropdown, {
      wheelPropagation: false,
      minScrollbarLength: 20,
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside, false);
    this.psContent.destroy();
    this.psContent = null;
  },
  methods: {
    finishSelect() {
      this.isOpen = false;
      this.query = '';
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.finishSelect();
      }
    },
    onOpenChange(isOpen) {
      this.isOpen = isOpen;
    },
    onClear() {
      this.$emit(MODEL_EVENT_ID, '');
    },
    onSelectChange(item) {
      if (!this.multiple) {
        this.finishSelect();
      }

      this.$emit(MODEL_EVENT_ID, item);
    },
    onToggleExpand() {
      this.$nextTick(() => {
        this.psContent.update();
      });
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-select-03 {
  display: inline-block;
  position: relative;
  user-select: none;
  font-family: @font-family;

  .wenv-select-03-input {
    position: relative;

    input {
      width: 100%;
      background-color: #fff;
    }

    input:focus + span,
    input:disabled + span {
      color: #999;
    }

    span {
      position: absolute;
      display: inline-block;
      pointer-events: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: calc(100% - 30px);
      color: #666;
      height: 28px;
      line-height: 28px;
      padding-left: 9px;
      left: 0;
    }

    &[clearvisible] {
      span {
        width: calc(100% - 48px);
      }
    }

    .wenv-select-03-clear {
      position: absolute;
      top: 5px;
      right: 23px;
      width: 10px;
      height: 10px;
      padding: 4px;
    }

    .wenv-select-03-open {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 10px;
      height: 10px;
      padding: 4px;
      transform: rotate(90deg);

      &[open] {
        transform: rotate(270deg);
      }
    }
  }

  .wenv-select-03-dropdown {
    position: absolute;
    z-index: 999999;
    left: 0;
    min-width: 100%;
    max-width: 320px;
    font-size: 12px;
    color: #666;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 1px 1px 4px rgba(185, 175, 200, 0.5);

    &[placement='bottom'] {
      top: 32px;
    }

    &[placement='top'] {
      bottom: 32px;
    }

    & > div {
      position: relative;
      max-height: 200px;
      padding: 4px 0;
    }
  }
}
</style>
