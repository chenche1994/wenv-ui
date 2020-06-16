<template>
  <div>
    <WSelectTree
      v-for="option in options"
      :key="option.id"
      :node="option"
      :query="query"
      :multiple="multiple"
      :limited="limited"
      @on-select="onSelect"
      @on-unselect="onUnselect"
    />
  </div>
</template>
<script>
import WSelectTree from './WSelectTree.vue';

export default {
  name: 'WSelect02OptionsTree',
  components: {
    WSelectTree,
  },
  inject: ['getUpdateScrollbar'],
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
  mounted() {
    this.getUpdateScrollbar()();
  },
  methods: {
    onSelect(option) {
      this.$emit('on-select', option);
    },
    onUnselect(option) {
      this.$emit('on-unselect', option);
    },
  },
};
</script>
