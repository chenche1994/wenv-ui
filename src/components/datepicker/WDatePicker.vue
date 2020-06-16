<template>
  <div ref="wrapper" class="wenv-datepicker">
    <div class="wenv-datepicker-input-wrapper">
      <input
        :value="value"
        class="wenv-input"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="true"
        @focus="onFocus"
      >
      <svg class="wenv-svg-btn wenv-datepicker-btn" :disabled="disabled" @click="onIconClick">
        <use :xlink:href="`#${icon}`" />
      </svg>
    </div>
    <transition name="fade">
      <div v-if="isMenuOpen" class="wenv-datepicker-dd">
        <WDatePickerDay
          v-if="type === TYPES.day || type === TYPES.time"
          v-model="selectedDate"
          :start="start"
          :end="end"
          :disabled-date="disabledDate"
          class="wenv-datepicker-dd-day"
          @on-change="onChange"
        />
        <WDatePickerMonth
          v-else-if="type === TYPES.month"
          v-model="selectedDate"
          :start="start"
          :end="end"
          class="wenv-datepicker-dd-day"
          @on-change="onChange"
        />
        <WDatePickerYear
          v-else-if="type === TYPES.year"
          v-model="selectedDate"
          :start="start"
          :end="end"
          class="wenv-datepicker-dd-day"
          @on-change="onChange"
        />
        <div
          v-if="type === TYPES.day || type === TYPES.time"
          class="wenv-datepicker-dd-affix"
          :type="type"
        >
          <div
            v-if="type === TYPES.day"
            class="wenv-datepicker-dd-affix-today"
            :disabled="isTodayOutOfRange()"
            @click="selectToday"
          >
            今天
          </div>
          <WDatePickerTime
            v-else
            v-model="selectedDate"
            :start="start"
            :end="end"
            @input="onTimeChange"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';
import WDatePickerDay from './WDatePickerDay.vue';
import WDatePickerTime from './WDatePickerTime.vue';
import WDatePickerMonth from './WDatePickerMonth.vue';
import WDatePickerYear from './WDatePickerYear.vue';
import isOutOfRange from '../../common/isOutOfRange.js';
import '../../css/input.less';

const TYPES = {
  year: 'year',
  month: 'month',
  day: 'day',
  time: 'time',
};

const TIME_FORMATS = {
  [TYPES.year]: 'YYYY',
  [TYPES.month]: 'YYYY-MM',
  [TYPES.day]: 'YYYY-MM-DD',
  [TYPES.time]: 'YYYY-MM-DD HH:mm:ss',
};

export default {
  name: 'WDatePicker',
  components: {
    WDatePickerDay,
    WDatePickerTime,
    WDatePickerMonth,
    WDatePickerYear,
  },
  props: {
    value: {
      type: String,
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
    type: {
      type: String,
      required: false,
      validator(value) {
        return TYPES[value] !== undefined;
      },
      default: TYPES.day,
    },
    icon: {
      type: String,
      required: false,
      default: 'wenv-i-rili',
    },
    placeholder: {
      type: String,
      required: false,
      default: '选择时间',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      selectedDate: this.value ? dayjs(this.value) : '',
      TYPES,
    };
  },
  watch: {
    value(newDate) {
      this.selectedDate = newDate ? dayjs(newDate) : '';
    },
  },
  created() {
    document.addEventListener('click', this.handleClickOutside, false);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside, false);
  },
  methods: {
    onFocus() {
      this.isMenuOpen = true;
    },
    onIconClick() {
      if (!this.disabled) {
        this.isMenuOpen = !this.isMenuOpen;
      } else {
        this.isMenuOpen = false;
      }
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.isMenuOpen = false;
      }
    },
    onChange(item) {
      this.$emit('input', dayjs(item).format(TIME_FORMATS[this.type]));
      this.isMenuOpen = false;
    },
    selectToday() {
      this.onChange(dayjs());
    },
    onTimeChange(value) {
      this.$emit('input', dayjs(value).format(TIME_FORMATS[this.type]));
    },
    isTodayOutOfRange() {
      return isOutOfRange(dayjs(), { start: this.start, end: this.end, unit: 'day' });
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-datepicker {
  position: relative;
  display: inline-block;
  user-select: none;
  font-family: @font-family;
  font-size: 14px;
  color: @font-color-normal;

  .wenv-datepicker-input-wrapper {
    position: relative;
    vertical-align: middle;
    background-color: #fff;

    input {
      width: 100%;
    }

    .wenv-datepicker-btn {
      position: absolute;
      right: 8px;
      top: 7px;
    }
  }

  .wenv-datepicker-dd {
    position: absolute;
    top: 32px;
    z-index: 999999;
    box-shadow: @common-box-shadow;

    .wenv-datepicker-dd-day {
      border-radius: @common-border-radius @common-border-radius 0 0;
    }

    .wenv-datepicker-dd-affix {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-left: @common-border;
      border-right: @common-border;
      border-bottom: @common-border;
      height: 38px;
      border-radius: 0 0 @common-border-radius @common-border-radius;

      &[type='time'] {
        height: 48px;
      }

      .wenv-datepicker-dd-affix-today {
        cursor: pointer;
        color: @color-primary;
        font-weight: bold;
        height: 38px;
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        &[disabled] {
          pointer-events: none;
          color: @font-color-light;
        }
      }
    }
  }
}
</style>
