<template>
  <div ref="wrapper" :class="$style['container']">
    <div :class="$style['input']">
      <input
        ref="input"
        :value="value"
        type="text"
        readonly
        :style="{ width: width + 'px' }"
        @input="onManualInputDate($event.target.value)"
        @blur.stop.prevent="inputBlur"
        @focus.stop.prevent="inputFocus"
      >
      <div :class="$style['img-container']">
        <img :src="icon" @click="isMenuOpen = !isMenuOpen">
      </div>
    </div>
    <transition name="fade">
      <div v-if="isMenuOpen" :class="$style['panel']">
        <div :class="$style['head']">
          <div>
            <svg viewBox="0 0 20 14" width="18" height="12" @click="nextYear(-1)">
              <path
                d="M2.3,6.4C2.1,6.6,2.1,6.8,2.1,7c0,0.2,0.1,0.4,0.2,0.5l6.3,6.3C8.7,13.9,8.9,
            14,9.1,14c0.2,0,0.4-0.1,0.5-0.2c0.1-0.1,0.2-0.3,0.2-0.5s-0.1-0.4-0.2-0.5L3.9,
            7l5.7-5.7C9.7,1.2,9.8,1,9.8,0.8c0-0.2-0.1-0.4-0.2-0.5C9.4,0.1,9.3,0,9.1,0C8.8,0,
            8.7,0.1,8.5,0.2L2.3,6.4L2.3,6.4z M10.4,6.4c-0.1,0.1-0.2,0.3-0.2,0.5c0,0.2,0.1,0.4,
            0.2,0.5l6.3,6.3c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2c0.1-0.1,0.2-0.3,
            0.2-0.5s-0.1-0.4-0.2-0.5L12,7l5.7-5.7C18,1,18,0.5,17.7,0.2C17.5,0.1,17.3,0,17.1,
            0c-0.2,0-0.4,0.1-0.5,0.2L10.4,6.4z M16.6,0.2"
              />
            </svg>
          </div>
          <span>{{ calendarWeek[0] + '年' }}</span>
          <div>
            <svg viewBox="0 0 20 14" width="18" height="12" @click="nextYear(1)">
              <path
                d="M17.7,6.4l-6.2-6.2C11.3,0.1,11.2,0,10.9,0c-0.2,0-0.4,0.1-0.5,0.2c-0.1,0.1-0.2,
            0.3-0.2,0.5c0,0.2,0.1,0.4,0.2,0.5L16.1,7l-5.7,5.7c-0.1,0.1-0.2,0.3-0.2,0.5s0.1,0.4,0.2,
            0.5c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2l6.3-6.3c0.1-0.1,0.2-0.3,0.2-0.5C17.9,
            6.8,17.9,6.6,17.7,6.4L17.7,6.4z M3.4,0.2C3.3,0.1,3.1,0,2.9,0C2.7,0,2.5,0.1,2.3,0.2C2,
            0.5,2,1,2.3,1.3L8,7l-5.7,5.7c-0.1,0.1-0.2,0.3-0.2,0.5s0.1,0.4,0.2,0.5C2.4,13.9,2.6,14,
            2.8,14c0.2,0,0.4-0.1,0.5-0.2l6.3-6.3C9.8,7.4,9.8,7.2,9.8,7c0-0.2-0.1-0.4-0.2-0.5L3.4,
            0.2z M3.4,0.2"
              />
            </svg>
          </div>
        </div>
        <div :class="$style['content']">
          <div :class="$style['weeks']">
            <span
              v-for="n in weeks"
              :key="n"
              :class="{ [$style['selected']]: isSameWeek([calendarWeek[0], n], selectedWeek) }"
              @click.stop="onSelect([calendarWeek[0], n])"
            >
              {{ '第' + n + '周' }}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { toNumber } from 'lodash-es';
import dayjs from 'dayjs';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear.js';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';

dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);

const calendarIcon = require('../../assets/images/date_picker_calendar.png');

export default {
  name: 'WeekPicker',
  props: {
    value: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: 164,
    },
    icon: {
      type: String,
      required: false,
      default: calendarIcon,
    },
  },
  data() {
    const selectedWeek = this.value
      ? this.parseDate(this.value)
      : [dayjs().year(), dayjs().week()]; // YYYY年第W周
    return {
      isMenuOpen: false,
      selectedWeek,
      calendarWeek: [...selectedWeek],
    };
  },
  computed: {
    weeks() {
      const w = dayjs(new Date(this.calendarWeek[0], 10, 10)).isoWeeksInYear();
      return w;
    },
  },
  watch: {
    value(newDate) {
      const now = new Date();
      this.selectedWeek = newDate ? this.parseDate(newDate) : [now.getFullYear(), dayjs().week()];
      this.calendarWeek = [...this.selectedWeek];
    },
  },
  created() {
    document.addEventListener('click', this.handleClickOutside, false);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside, false);
  },
  methods: {
    parseDate(dateString) {
      return dateString
        .split(/[^\d]+/g)
        .slice(0, 2)
        .map((i) => toNumber(i));
    },
    isSameWeek(w1, w2) {
      return w1[0] === w2[0] && w1[1] === w2[1];
    },
    inputBlur() {
      if (this.isMenuOpen) {
        this.$refs.input.focus();
      }
    },
    inputFocus() {
      this.isMenuOpen = true;
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.finishSelect();
      }
    },
    finishSelect() {
      this.isMenuOpen = false;
      this.$refs.input.blur();
    },
    nextYear(amount) {
      this.calendarWeek = [this.calendarWeek[0] + amount, this.calendarWeek[1]];
    },
    onSelect(item) {
      this.selectedWeek = item;
      this.$emit('input', `${item[0]}年第${item[1]}周`);
      this.finishSelect();
    },
    onManualInputDate(value) {
      this.selectedWeek = this.parseDate(value);
      this.$emit('input', `${this.selectedWeek[0]}年第${this.selectedWeek[1]}周`);
      this.finishSelect();
    },
  },
};
</script>
<style lang="less" module>
@import '../../main.less';

.container {
  display: inline-block;
  user-select: none;
  font-size: 14px;

  .input {
    position: relative;
    display: flex;
    align-items: center;

    & > input {
      border-radius: @common-border-radius;
      border: @common-border;
      box-sizing: border-box;
      padding: 0 0 0 4px;
      color: #333333;
      height: 28px;

      &:focus {
        outline: none;
        border: @common-border-highlight;
      }
    }

    input::-ms-clear {
      display: none;
    }

    & > .img-container {
      height: 28px;
      display: flex;
      align-items: center;
      position: absolute;
      right: 4px;
      top: 0;

      & > img {
        cursor: pointer;
      }
    }
  }

  .panel {
    position: absolute;
    margin-top: 2px;
    border-radius: @common-border-radius;
    background-color: #ffffff;
    box-sizing: border-box;
    border: @common-border;
    z-index: 999999;
    width: 290px;

    & > .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 0 10px;
      border-bottom: @common-border;
      height: 28px;
      box-sizing: border-box;

      & svg {
        fill: #cccccc;
        cursor: pointer;

        &:hover {
          fill: @primary-color;
        }
      }
    }

    & > .content {
      & > .weeks {
        padding-top: 3px;
        padding-bottom: 3px;
        display: flex;
        flex-flow: wrap;

        & > span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 30px;
          margin: 1px 11px;
          border-radius: @common-border-radius;
          cursor: pointer;

          &:hover {
            background-color: lighten(@primary-color, 35%);
          }
        }

        .selected {
          background-color: @primary-color;
          color: #ffffff;

          &:hover {
            background-color: @primary-color;
          }
        }
      }
    }
  }
}
</style>
