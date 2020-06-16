<template>
  <div :class="$style['container']">
    <div :class="$style['content']">
      <span
        :class="[$style['type'], name ? undefined : $style['type-no-name']]"
        :style="{ backgroundColor: color }"
      >
        {{ type }}
      </span>
      <span v-if="name" :class="$style['name']">{{ name }}</span>
    </div>
    <div :class="$style['arrow']">
      <div>
        <svg viewBox="0 0 8 7" width="8" height="7">
          <path :fill="color" d="M8,0L4,7L0,0H8z" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureLabel',
  props: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: undefined,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: table;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  cursor: default;

  .content {
    font-size: 12px;
    height: 26px;
    display: table-row;
    box-shadow: @common-box-shadow;

    .cell() {
      display: table-cell;
      vertical-align: middle;
      padding: 0px 6px;
    }

    .type {
      .cell();
      color: #ffffff;
      border-radius: @common-border-radius 0px 0px @common-border-radius;
    }

    .type-no-name {
      border-radius: @common-border-radius;
    }

    .name {
      .cell();
      color: #333333;
      background-color: #ffffff;
      border-radius: 0px @common-border-radius @common-border-radius 0px;
    }
  }

  .arrow {
    display: table-row;
    line-height: 12px;
    box-sizing: border-box;

    & > div {
      display: table-cell;
      text-align: center;

      & > svg {
        vertical-align: top;
      }
    }
  }
}
</style>
