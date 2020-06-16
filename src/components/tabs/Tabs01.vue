<template>
  <div ref="container" class="wenv-tabs">
    <div class="wenv-tabs-nav">
      <svg
        v-if="isScroll"
        class="wenv-svg-btn"
        style="transform: rotate(180deg);"
        :disabled="currentIndex <= 0"
        @click="previous()"
      >
        <use :xlink:href="`#${scrollIcon}`" />
      </svg>
      <div ref="tabs" class="wenv-tabs-tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.id"
          :class="['wenv-tabs-tab', type === '02' ? 'wenv-tabs-02-tab' : undefined]"
          :active="active === tab.id"
          :disabled="tab.disabled"
          @click="switchTab(index)"
        >
          <svg v-if="tab.icon" class="wenv-tabs-tab-icon">
            <use :xlink:href="`#${tab.icon}`" />
          </svg>
          <span>{{ tab.name }}</span>
          <span v-if="tab.count" class="wenv-tabs-tab-count">{{
            tab.count > 99 ? '99+' : tab.count
          }}</span>
        </div>
        <div
          :class="`wenv-tabs-${type}-ink-bar`"
          :style="{
            left: `${inkBarLeft}px`,
            width: `${inkBarWidth}px`,
          }"
        />
      </div>
      <svg
        v-if="isScroll"
        class="wenv-svg-btn"
        :disabled="currentIndex >= tabs.length - 1"
        @click="next()"
      >
        <use :xlink:href="`#${scrollIcon}`" />
      </svg>
    </div>
    <slot />
  </div>
</template>
<script>
import ResizeSensor from 'css-element-queries/src/ResizeSensor.js';
import '../../css/icon-btn.less';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'Tabs01',
  model: {
    prop: 'active',
    event: 'on-switch',
  },
  props: {
    active: {
      type: String,
      required: true,
    },
    scrollIcon: {
      type: String,
      required: false,
      default: 'wenv-i-youjiantou',
    },
    tabs: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: false,
      validator(value) {
        return ['01', '02'].indexOf(value) !== -1;
      },
      default: '01',
    },
  },
  data() {
    return {
      inkBarLeft: undefined,
      inkBarWidth: undefined,
      isScroll: false,
      currentIndex: undefined,
    };
  },
  watch: {
    tabs() {
      this.switchTab();
    },
    active() {
      this.switchTab();
    },
  },
  mounted() {
    this.resizeSensor = new ResizeSensor(this.$refs.container, this.onSizeChange);
    this.isNeedScroll();
    this.switchTab();
  },
  beforeDestroy() {
    this.resizeSensor.detach(this.onSizeChange);
    this.resizeSensor = null;
  },
  methods: {
    isNeedScroll() {
      this.isScroll = this.$refs.tabs.offsetWidth < this.$refs.tabs.scrollWidth;
    },
    onSizeChange() {
      this.isNeedScroll();
    },
    getCurrentIndex(tabs, active) {
      if (tabs.length === 0 || active === undefined || active === '') {
        return undefined;
      }

      for (let i = 0; i < tabs.length; i += 1) {
        if (active === tabs[i].id) {
          return i;
        }
      }

      return undefined;
    },
    setInkBar(index) {
      let left = 0;
      for (let i = 0; i < index; i += 1) {
        left += this.$refs.tabs.children[i].offsetWidth;
        if (this.type === '02') {
          left += 8;
        }
      }
      this.inkBarWidth = this.$refs.tabs.children[index].offsetWidth;
      this.inkBarLeft = left;
    },
    switchTab(i) {
      let index = i;
      if (index === undefined) {
        index = this.getCurrentIndex(this.tabs, this.active);
      }

      if (this.currentIndex === index) return;
      this.currentIndex = index;
      if (index === undefined) return;
      this.$nextTick(() => {
        this.setInkBar(index);
        setTimeout(() => {
          this.$refs.tabs.scrollLeft = this.$refs.tabs.children[index].offsetLeft;
        }, 0);
        this.$emit('on-switch', this.tabs[index].id);
      });
    },
    previous() {
      let pIndex = this.currentIndex;
      for (let i = this.currentIndex - 1; i >= 0; i -= 1) {
        if (!this.tabs[i].disabled) {
          pIndex = i;
          break;
        }
      }

      this.switchTab(pIndex);
    },
    next() {
      let nIndex = this.currentIndex;
      for (let i = this.currentIndex + 1; i < this.tabs.length; i += 1) {
        if (!this.tabs[i].disabled) {
          nIndex = i;
          break;
        }
      }

      this.switchTab(nIndex);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-tabs {
  display: inline-block;
  user-select: none;

  .wenv-tabs-nav {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;

    & > svg {
      flex-shrink: 0;
      padding: 4px;
    }

    .wenv-tabs-tabs {
      position: relative;
      display: flex;
      overflow: hidden;
      scroll-behavior: smooth;
      margin-bottom: -1px;

      .wenv-tabs-tab {
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 18px;
        height: 32px;
        line-height: 32px;
        white-space: nowrap;
        box-sizing: border-box;
        color: #999;
        flex-shrink: 0;
        background-color: #fff;
        border-bottom: 1px solid #ddd;

        svg {
          fill: #999;
        }

        &[active] {
          color: @color-primary;

          svg {
            fill: @color-primary;
          }

          .wenv-tabs-tab-count {
            color: @color-primary;
            border-color: @color-primary;
          }
        }

        &[disabled] {
          pointer-events: none;
          color: @color-disabled;

          svg {
            fill: @color-disabled;
          }

          .wenv-tabs-tab-count {
            color: @color-disabled;
            border-color: @color-disabled;
          }
        }

        .wenv-tabs-tab-icon {
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }

        .wenv-tabs-tab-count {
          display: inline-block;
          border: 1px solid #ddd;
          border-radius: 8px;
          color: #999;
          padding: 0 4px;
          height: 16px;
          line-height: 16px;
          margin-left: 4px;
          font-size: 12px;
        }
      }

      .wenv-tabs-02-tab {
        margin-right: 8px;
        border: 1px solid #ddd;
        border-radius: 4px 4px 0 0;
        background-color: @color-disabled-background;

        &[active] {
          background-color: #fff;
        }

        &[disabled] {
          background-color: @color-disabled-background;
        }
      }
    }

    .wenv-tabs-01-ink-bar {
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: @color-primary;
      transition: left 0.2s ease-in-out;
    }

    .wenv-tabs-02-ink-bar {
      position: absolute;
      bottom: 0;
      height: 1px;
      background-color: #fff;
    }
  }
}
</style>
