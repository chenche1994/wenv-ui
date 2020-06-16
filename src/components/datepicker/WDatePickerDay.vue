<template>
  <div class="wenv-daypicker">
    <div class="wenv-daypicker-header">
      <svg
        class="wenv-svg-btn"
        style="transform: rotate(180deg);marginRight:20px;"
        @click="nextYear(-1)"
      >
        <use xlink:href="#wenv-i-youjiantou1" />
      </svg>
      <svg class="wenv-svg-btn" style="transform: rotate(180deg);" @click="nextMonth(-1)">
        <use xlink:href="#wenv-i-youjiantou" />
      </svg>
      <div class="wenv-daypicker-separate" />
      <span>{{ format(calendarDate, 'YYYY年 M月') }}</span>
      <div class="wenv-daypicker-separate" />
      <svg class="wenv-svg-btn" style="marginRight:20px;" @click="nextMonth(1)">
        <use xlink:href="#wenv-i-youjiantou" />
      </svg>
      <svg class="wenv-svg-btn" @click="nextYear(1)">
        <use xlink:href="#wenv-i-youjiantou1" />
      </svg>
    </div>
    <div class="wenv-daypicker-content">
      <div v-for="(week, index) in weeks" :key="`weekday-${index}`" class="wenv-daypicker-cell">
        {{ week }}
      </div>
      <div
        v-for="(item, index) in daysPreMonth"
        :key="`daysPreMonth-${index}`"
        :disabled="isDateDisabled(item) || isOutOfRange(item)"
        class="wenv-daypicker-cell wenv-daypicker-day wenv-daypicker-day-pad"
        @click="onSelect(item)"
      >
        {{ format(item, 'D') }}
      </div>
      <div
        v-for="(item, index) in monthDays"
        :key="index"
        :disabled="isDateDisabled(item) || isOutOfRange(item)"
        class="wenv-daypicker-cell wenv-daypicker-day"
        :istoday="isToday(item)"
        :isselected="isSameDay(item, selectedDate)"
        @click="onSelect(item)"
      >
        {{ format(item, 'D') }}
      </div>
      <div
        v-for="(item, index) in daysNextMonth"
        :key="`daysNextMonth-${index}`"
        :disabled="isDateDisabled(item) || isOutOfRange(item)"
        class="wenv-daypicker-cell wenv-daypicker-day wenv-daypicker-day-pad"
        @click="onSelect(item)"
      >
        {{ format(item, 'D') }}
      </div>
    </div>
  </div>
</template>
<script>
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday.js';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';
import eachDayOfInterval from '../../common/eachDayOfInterval.js';
import isOutOfRange from '../../common/isOutOfRange.js';

dayjs.extend(weekday);

const EVENT_NAME = 'on-change';

export default {
  name: 'WDatePickerDay',
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
    disabledDate: {
      // 不可选择的日期
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      calendarDate: this.selectedDate ? dayjs(this.selectedDate) : dayjs(),
    };
  },
  computed: {
    monthDays() {
      return this.getMonthDays(this.calendarDate);
    },
    daysPreMonth() {
      const weekDay = dayjs(this.calendarDate)
        .startOf('month')
        .weekday();
      if (weekDay !== 1) {
        const preMonth = dayjs(this.calendarDate).add(-1, 'month');
        const preMonthDays = this.getMonthDays(preMonth);
        const start = weekDay === 0 ? -6 : 1 - weekDay;
        return preMonthDays.slice(start);
      }

      return [];
    },
    daysNextMonth() {
      const weekDay = dayjs(this.calendarDate)
        .endOf('month')
        .weekday();
      if (weekDay !== 0) {
        const nextMonth = dayjs(this.calendarDate).add(1, 'month');
        const nextMonthDays = this.getMonthDays(nextMonth);
        return nextMonthDays.slice(0, 7 - weekDay);
      }

      return [];
    },
  },
  watch: {
    selectedDate(newDate) {
      this.calendarDate = newDate ? dayjs(newDate) : '';
    },
  },
  methods: {
    format(date, formatString) {
      return dayjs(date).format(formatString);
    },
    isSameDay(date1, date2) {
      if (!date1 || !date2) return false;
      return dayjs(date1).isSame(dayjs(date2), 'day');
    },
    isToday(date) {
      return this.isSameDay(date, dayjs());
    },
    isOutOfRange(date) {
      return isOutOfRange(date, { start: this.start, end: this.end, unit: 'day' });
    },
    nextYear(amount) {
      this.calendarDate = dayjs(this.calendarDate).add(amount, 'year');
    },
    nextMonth(amount) {
      this.calendarDate = dayjs(this.calendarDate).add(amount, 'month');
    },
    onSelect(item) {
      this.$emit(EVENT_NAME, item);
    },
    getMonthDays(date) {
      const start = dayjs(date)
        .startOf('month')
        .hour(date.hour())
        .minute(date.minute())
        .second(date.second());
      const end = dayjs(date).endOf('month');
      return eachDayOfInterval(start, end);
    },
    isDateDisabled(date) {
      return this.disabledDate.some((d) => dayjs(d).isSame(dayjs(date), 'day'));
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-daypicker {
  border-radius: @common-border-radius;
  background-color: #ffffff;
  border: @common-border;
  width: 226px;
  user-select: none;
  font-family: @font-family;
  font-size: 14px;
  color: @font-color-normal;
  @padding: 8px;

  .wenv-daypicker-header {
    display: flex;
    align-items: center;
    padding: 0 @padding;
    border-bottom: @common-border;
    height: 38px;
    line-height: 38px;
    vertical-align: middle;
    .wenv-daypicker-separate {
      flex: 1;
    }
  }

  .wenv-daypicker-content {
    padding: @padding;

    .wenv-daypicker-cell {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: @common-border-radius;
      box-sizing: border-box;
      margin: 1px;

      &[disabled] {
        pointer-events: none;
        color: @font-color-light;
        background-color: #f5f5f5;
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin: 0;
        border-radius: 0;
      }
    }

    .wenv-daypicker-day {
      cursor: pointer;

      &[isselected] {
        color: #ffffff !important;
        background-color: @color-primary;

        &:hover {
          background-color: @color-primary;
        }
      }

      &[istoday] {
        border: 1px solid @color-primary;
        color: @color-primary;
      }

      &:hover {
        background-color: #ebf2fe;
        transition: all 0.2s ease-in-out;
      }
    }

    .wenv-daypicker-day-pad {
      color: @font-color-light;
    }
  }
}
</style>
