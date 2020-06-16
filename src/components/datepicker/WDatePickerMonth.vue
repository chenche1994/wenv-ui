<template>
  <div class="wenv-monthpicker">
    <div class="wenv-monthpicker-header">
      <svg class="wenv-svg-btn" style="transform: rotate(180deg);" @click="nextYear(-1)">
        <use xlink:href="#wenv-i-youjiantou1" />
      </svg>
      <div class="wenv-monthpicker-separate" />
      <span>{{ format(calendarDate, 'YYYY') }}年</span>
      <div class="wenv-monthpicker-separate" />
      <svg class="wenv-svg-btn" @click="nextYear(1)">
        <use xlink:href="#wenv-i-youjiantou1" />
      </svg>
    </div>
    <div class="wenv-monthpicker-content">
      <span
        v-for="(item, index) in months"
        :key="index"
        class="wenv-monthpicker-cell"
        :isthismonth="isThisMonth(item)"
        :isselected="isSameMonth(item, selectedDate)"
        :disabled="isOutOfRange(item)"
        @click="onSelect(item)"
      >
        {{ format(item, 'M') }}月
      </span>
    </div>
  </div>
</template>
<script>
import dayjs, { Dayjs } from 'dayjs';
import isOutOfRange from '../../common/isOutOfRange.js';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

const EVENT_NAME = 'on-change';

export default {
  name: 'WDatePickerMonth',
  model: {
    prop: 'selectedDate',
    event: EVENT_NAME,
  },
  props: {
    selectedDate: {
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
      calendarDate: this.selectedDate ? dayjs(this.selectedDate) : dayjs(),
    };
  },
  computed: {
    months() {
      const year = this.calendarDate.year();
      const months = [];
      for (let index = 0; index < 12; index += 1) {
        months.push(dayjs(new Date(year, index)));
      }
      return months;
    },
  },
  watch: {
    selectedDate(newDate) {
      if (!this.isSameMonth(newDate, this.calendarDate)) {
        this.calendarDate = newDate ? dayjs(newDate) : dayjs();
      }
    },
  },
  methods: {
    format(date, formatString) {
      return dayjs(date).format(formatString);
    },
    isSameMonth(date1, date2) {
      if (!date1 || !date2) return false;
      return dayjs(date1).isSame(dayjs(date2), 'month');
    },
    isThisMonth(date) {
      return this.isSameMonth(date, Date.now());
    },
    nextYear(amount) {
      this.calendarDate = dayjs(this.calendarDate).add(amount, 'year');
    },
    onSelect(item) {
      this.$emit(EVENT_NAME, item);
    },
    isOutOfRange(date) {
      return isOutOfRange(date, { start: this.start, end: this.end, unit: 'month' });
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-monthpicker {
  border-radius: @common-border-radius;
  background-color: #ffffff;
  border: @common-border;
  width: 226px;
  user-select: none;
  font-family: @font-family;
  font-size: 14px;
  color: @font-color-normal;
  @padding: 0 8px;

  .wenv-monthpicker-header {
    display: flex;
    align-items: center;
    padding: @padding;
    border-bottom: @common-border;
    height: 38px;
    line-height: 38px;
    vertical-align: middle;

    .wenv-monthpicker-separate {
      flex: 1;
    }
  }

  .wenv-monthpicker-content {
    padding: @padding;

    .wenv-monthpicker-cell {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 28px;
      line-height: 28px;
      border-radius: @common-border-radius;
      box-sizing: border-box;
      margin: 8px 15px;
      cursor: pointer;

      &[disabled] {
        pointer-events: none;
        color: @font-color-light;
      }

      &[isselected] {
        color: #ffffff !important;
        background-color: @color-primary;

        &:hover {
          background-color: @color-primary;
        }
      }

      &[isthismonth] {
        border: 1px solid @color-primary;
        color: @color-primary;
      }

      &:hover {
        background-color: #ebf2fe;
        transition: all 0.2s ease-in-out;
      }
    }
  }
}
</style>
