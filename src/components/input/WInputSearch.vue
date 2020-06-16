<template>
  <div class="wenv-input-search">
    <input
      :value="value"
      class="wenv-input"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
    >
    <WButton
      class="wenv-input-search-btn"
      icon="wenv-i-sousuo"
      :type="type"
      @on-click="$emit('on-search')"
    />
  </div>
</template>
<script>
import WButton from '../buttons/WButton.vue';
import '../../css/input.less';

const MODEL_EVENT_ID = 'on-input';

export default {
  name: 'WInputSearch',
  components: {
    WButton,
  },
  model: {
    prop: 'value',
    event: MODEL_EVENT_ID,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    type: {
      type: String,
      required: false,
      validator(value) {
        return ['default', 'primary'].indexOf(value) !== -1;
      },
      default: 'default',
    },
  },
  methods: {
    onInput(newValue) {
      this.$emit(MODEL_EVENT_ID, newValue);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-input-search {
  display: inline-flex;

  input {
    width: calc(100% - 31px);
    border-radius: 2px 0 0 2px;
    border-right: none;

    &:focus + .wenv-input-search-btn {
      border-color: @color-primary;
    }
  }

  .wenv-input-search-btn {
    border-radius: 0 2px 2px 0;
    transition: border-color 0.2s ease-in-out;
    border-left: none;
  }
}
</style>
