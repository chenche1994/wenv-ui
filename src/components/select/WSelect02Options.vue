<template>
  <div>
    <div
      v-for="option in optionsFiltered"
      :key="option.id"
      class="wenv-select-02-option"
      :style="{ width: titleWidth }"
      :multiple="multiple"
      @click="itemSelect(option)"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <WCheckbox
        v-if="multiple"
        v-model="option.isSelected"
        :disabled="limited && !option.isSelected"
        class="wenv-select-02-option-checkbox"
        @on-change="onChange(option)"
      />
      <span>{{ option.name }}</span>
    </div>
  </div>
</template>
<script>
import '../../assets/fonts/wenvfont.js';
import WCheckbox from '../checkbox/WCheckbox.vue';

export default {
  name: 'WSelect02Options',
  components: {
    WCheckbox,
  },
  inject: ['getUpdateScrollbar', 'getDropdownScrollWidthHandle'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    query: {
      type: String,
      required: false,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    limited: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      titleWidth: undefined,
    };
  },
  computed: {
    optionsFiltered() {
      if (!this.query || this.query === '') {
        return this.options.filter((o) => !o.disabled);
      }
      return this.options.filter((o) => {
        const regexp = new RegExp(this.query, 'i');
        return !o.disabled && regexp.test(o.name);
      });
    },
  },
  mounted() {
    this.getUpdateScrollbar()();
  },
  methods: {
    onChange(option) {
      if (option.isSelected) {
        this.$emit('on-select', option);
      } else {
        this.$emit('on-unselect', option);
      }
    },
    itemSelect(option) {
      if (!this.multiple) {
        this.$emit('on-select', option);
      }
    },
    mouseEnter() {
      this.titleWidth = `${this.getDropdownScrollWidthHandle()()}px`;
    },
    mouseLeave() {
      this.titleWidth = undefined;
    },
  },
};
</script>
<style lang="less">
.wenv-select-02-option {
  display: flex;
  align-items: center;
  cursor: pointer;

  &[multiple] {
    cursor: auto;
  }

  &:hover {
    background-color: #f3f3f3;
  }

  .wenv-select-02-option-checkbox {
    flex-shrink: 0;
    margin-left: 10px;

    & + span {
      margin-left: 6px;
    }
  }

  & > span {
    display: inline-block;
    margin: 0 10px;
    height: 28px;
    line-height: 28px;
    white-space: nowrap;
  }
}
</style>
