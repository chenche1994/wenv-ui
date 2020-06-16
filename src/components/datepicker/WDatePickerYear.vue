<template>
  <div class="wenv-yearpicker">
    <div class="wenv-yearpicker-header">
      <svg class="wenv-svg-btn" style="transform: rotate(180deg);" @click="nextYear(-10)">
        <use xlink:href="#wenv-i-youjiantou1" />
      </svg>
      <div class="wenv-yearpicker-separate" />
      <span>{{ format(calendarDate) }}年</span>
      <div class="wenv-yearpicker-separate" />
      <svg class="wenv-svg-btn" @click="nextYear(10)">
        <use xlink:href="#wenv-i-youjiantou1" />
      </svg>
    </div>
    <div class="wenv-yearpicker-content">
      <span
        v-for="(item, index) in years"
        :key="index"
        class="wenv-yearpicker-cell"
        :isthisyear="isThisYear(item)"
        :isselected="isSameYear(item, selectedDate)"
        :disabled="isOutOfRange(item)"
        @click="onSelect(item)"
      >
        {{ format(item) }}
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
  name: 'WDatePickerYear',
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
    years() {
      const year = this.calendarDate.year();
      const years = [];
      for (let index = -9; index <= 0; index += 1) {
        years.push(dayjs(new Date(year + index, 0)));
      }
      return years;
    },
  },
  watch: {
    selectedDate(newDate) {
      if (!this.isSameYear(newDate, this.calendarDate)) {
        this.calendarDate = newDate ? dayjs(newDate) : dayjs();
      }
    },
  },
  methods: {
    format(date) {
      return dayjs(date).format('YYYY');
    },
    isSameYear(dateLeft, dateRight) {
      if (!dateLeft || !dateRight) return false;
      return dateLeft.year() === dateRight.year();
    },
    isThisYear(date) {
      return this.isSameYear(dayjs(), date);
    },
    nextYear(amount) {
      this.calendarDate = dayjs(this.calendarDate).add(amount, 'year');
    },
    onSelect(item) {
      this.$emit(EVENT_NAME, item);
    },
    isOutOfRange(date) {
      return isOutOfRange(date, { start: this.start, end: this.end, unit: 'year' });
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-yearpicker {
  border-radius: @common-border-radius;
  background-color: #ffffff;
  border: @common-border;
  width: 226px;
  user-select: none;
  font-family: @font-family;
  font-size: 14px;
  color: @font-color-normal;
  @padding: 0 8px;

  .wenv-yearpicker-header {
    display: flex;
    align-items: center;
    padding: @padding;
    border-bottom: @common-border;
    height: 38px;
    line-height: 38px;
    vertical-align: middle;

    .wenv-yearpicker-separate {
      flex: 1;
    }
  }

  .wenv-yearpicker-content {
    padding: @padding;

    .wenv-yearpicker-cell {
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

      &[isthisyear] {
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
