<template>
  <div :class="$style['container']" :style="{ paddingTop: headHeight - 1 + 'px' }">
    <div ref="heads" :class="$style['heads']">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="[
          $style['head'],
          tab.name === selectedTab.name ? $style['head-selected'] : undefined,
          headClass,
        ]"
        :style="{ width: tab.width ? tab.width + 'px' : undefined }"
        @click="selectedTab = tab"
      >
        <span>{{ tab.name }}</span>
      </div>
    </div>
    <div :class="[$style['content'], contentClass]">
      <transition name="component-fade" mode="out-in">
        <keep-alive v-if="keepAlive">
          <component :is="selectedTab.component" />
        </keep-alive>
        <component :is="selectedTab.component" v-else />
      </transition>
    </div>
  </div>
</template>

<script>
import { find } from 'lodash-es';

export default {
  name: 'Tabs2',
  props: {
    tabs: {
      type: Array, // name,width,component
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: undefined,
    },
    keepAlive: {
      type: Boolean,
      required: false,
      default: false,
    },
    headClass: {
      type: String,
      required: false,
      default: undefined,
    },
    contentClass: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    const selectedTab = this.value ? find(this.tabs, { name: this.value }) : this.tabs[0];
    return {
      selectedTab,
      headHeight: 0,
    };
  },
  mounted() {
    this.headHeight = this.$refs.heads.clientHeight;
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  position: relative;
  box-sizing: border-box;

  & > .heads {
    position: absolute;
    top: 0;
    left: 0;

    & > .head {
      cursor: pointer;
      user-select: none;
      border: @common-border;
      background-color: #f4f5f6;
      box-sizing: border-box;
      margin-left: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      border-radius: 4px 4px 0px 0px;
      height: 40px;
      font-size: 16px;

      &:first-child {
        margin-left: 0px;
      }

      &:hover {
        color: #0f89f4;
      }
    }

    & > .head-selected {
      background-color: #ffffff;
      color: #0f89f4;
      border-bottom: 1px solid #ffffff;
    }
  }

  & > .content {
    border: @common-border;
    background-color: #ffffff;
    border-radius: 0 0 4px 4px;
    box-shadow: @common-box-shadow;
    box-sizing: border-box;
  }
}
</style>
