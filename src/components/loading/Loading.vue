<template>
  <div v-show="show" class="wenv-loading">
    <div class="wenv-loading-ring">
      <div v-for="i in 4" :key="i" :style="{ borderTopColor: color }" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less">
.wenv-loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 9999999999;

  .wenv-loading-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .wenv-loading-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: wenv-loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: transparent;
  }

  .wenv-loading-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .wenv-loading-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .wenv-loading-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes wenv-loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
