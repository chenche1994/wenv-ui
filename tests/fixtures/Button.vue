<template>
  <WDatePicker v-model="date" @input="log(date)" />
</template>
<script>
import WDatePicker from '../../src/components/datepicker/WDatePicker.vue';

export default {
  name: 'Button',
  components: {
    WDatePicker,
  },
  props: {
    width: {
      type: Number,
      required: false,
      default: 154,
    },
    height: {
      type: Number,
      required: false,
      default: 128,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: 'white',
    },
    color: {
      type: String,
      required: false,
      default: 'black',
    },
    border: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      date: '2019-07-03',
    };
  },
  created() {
    console.log('created');
  },
  activated() {
    console.log('activated');
  },
  deactivated() {
    console.log('deactivated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  methods: {
    log(msg) {
      console.log(msg);
    },
  },
};
</script>
<style lang="less" module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: lightblue;
  color: #fefeff;

  &:hover {
    opacity: 0.9;
  }
}
</style>
