<template>
  <div :class="$style['container']">
    <span :class="$style['title']">欢迎使用{{ title }}！</span>
    <div :class="$style['space']" />
    <img :src="avatar">
    <span :class="$style['user']">你好，{{ username }}！</span>
    <div :class="$style['split']" />
    <div :class="$style['logout']" @click="$emit('on-logout')">
      <img :src="quitIcon">
      <span>退出</span>
    </div>
  </div>
</template>
<script>
const avatarIcon = require('../assets/images/baner_avatar.png');
const quitIcon = require('../assets/images/banner_quit.png');

export default {
  name: 'Banner',
  props: {
    title: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: avatarIcon,
    },
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quitIcon,
    };
  },
};
</script>
<style lang="less" module>
.container {
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: white;
  user-select: none;
  height: 42px;
  box-shadow: 0px 1px 4px rgba(185, 175, 200, 0.2);
  color: #333333;

  & > .title {
    margin-left: 27px;
    color: #666666;
  }

  & > .space {
    flex: 1;
  }

  & > .user {
    margin: 0 30px 0 10px;
  }

  & > .split {
    width: 1px;
    height: 18px;
    background-color: #dcdee3;
  }

  & > .logout {
    margin: 0 22px;
    display: flex;
    align-items: center;
    cursor: pointer;

    & > span {
      margin-left: 8px;
    }
  }
}
</style>
