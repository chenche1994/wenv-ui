<template>
  <div class="wenv-timepicker">
    <WInputNumber
      v-model="hour"
      class="wenv-timepicker-input"
      :min="0"
      :max="23"
      @input="onInput"
    />
    <span class="wenv-timepicker-separate">:</span>
    <WInputNumber
      v-model="minute"
      class="wenv-timepicker-input"
      :min="0"
      :max="59"
      @input="onInput"
    />
    <span class="wenv-timepicker-separate">:</span>
    <WInputNumber
      v-model="second"
      class="wenv-timepicker-input"
      :min="0"
      :max="59"
      @input="onInput"
    />
  </div>
</template>
<script>
import dayjs, { Dayjs } from 'dayjs';
import WInputNumber from '../input/WInputNumber.vue';

export default {
  name: 'WDatePickerTime',
  components: {
    WInputNumber,
  },
  props: {
    value: {
      type: Dayjs,
      required: true,
    },
    start: {
      type: String,
      required: false,
      default: undefined,
    },
    end: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      hour: this.value ? this.value.hour() : 0,
      minute: this.value ? this.value.minute() : 0,
      second: this.value ? this.value.second() : 0,
    };
  },
  methods: {
    onInput() {
      const data = this.value ? dayjs(this.value) : dayjs();
      const datetime = data
        .hour(this.hour)
        .minute(this.minute)
        .second(this.second);

      if (this.isBefore(datetime)) {
        this.$emit('input', dayjs(this.start));
        return;
      }

      if (this.isAfter(datetime)) {
        this.$emit('input', dayjs(this.end));
        return;
      }

      this.$emit('input', datetime);
    },
    isBefore(date) {
      if (!this.start) {
        return false;
      }

      return dayjs(date).isBefore(dayjs(this.start), 'second');
    },
    isAfter(date) {
      if (!this.end) {
        return false;
      }

      return dayjs(date).isAfter(dayjs(this.end), 'second');
    },
  },
};
</script>
<style lang="less">
.wenv-timepicker {
  display: inline-flex;
  align-items: center;

  .wenv-timepicker-input {
    width: 50px;
  }

  .wenv-timepicker-separate {
    margin: 0 8px;
  }
}
</style>
