<template>
  <div class="wenv-banner-03">
    <img class="wenv-banner-03-bg" :src="bg">
    <img class="wenv-banner-03-logo" :src="logo">
    <span class="wenv-banner-03-welcome">欢迎使用{{ title }}!</span>
    <div class="wenv-banner-03-space" />
    <div v-if="systems" class="wenv-banner-03-system-switch">
      <svg>
        <use xlink:href="#wenv-i-shijian1" />
      </svg>
      <div class="wenv-banner-03-systems">
        <div v-for="s in systems" :key="s.name" @click="openSystem(s.url)">
          <svg>
            <use :xlink:href="`#${s.icon}`" />
          </svg>
          <span>{{ s.name }}</span>
        </div>
      </div>
    </div>
    <img class="wenv-banner-03-avatar" :src="avatar">
    <span class="wenv-banner-03-user">你好, {{ username }}!</span>
    <div class="wenv-banner-03-separate" />
    <div class="wenv-banner-03-logout" @click="onLogout">
      <svg>
        <use xlink:href="#wenv-i-tuichu" />
      </svg>
      <span>退出</span>
    </div>
  </div>
</template>

<script>
import bg from '../../assets/images/sidemenu_03_head.png';
import avatar from '../../assets/images/banner_03_avatar.png';
import '../../assets/fonts/wenvfont.js';

export default {
  name: 'Banner03',
  props: {
    logo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    systems: {
      type: Array,
      required: true,
      default: undefined,
    },
    avatar: {
      type: String,
      required: false,
      default: avatar,
    },
    username: {
      type: String,
      required: false,
      default: '管理员',
    },
  },
  data() {
    return {
      bg,
    };
  },
  methods: {
    onLogout() {
      this.$emit('on-logout');
    },
    openSystem(url) {
      window.open(`http://${window.location.host}${url}`);
    },
  },
};
</script>
<style lang="less">
@import '../../main.less';

.wenv-banner-03 {
  position: relative;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 14px;
  background: linear-gradient(#0e5acd, #2095f3);

  .wenv-banner-03-bg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .wenv-banner-03-logo {
    margin-left: 11px;
    z-index: 1;
  }

  .wenv-banner-03-welcome {
    margin-left: 32px;
    color: #ebf1fd;
    z-index: 1;
  }

  .wenv-banner-03-system-switch {
    position: relative;
    cursor: pointer;
    margin-right: 20px;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #0e5acd;

      .wenv-banner-03-systems {
        visibility: visible;
      }
    }

    svg {
      width: 16px;
      height: 16px;
      fill: #ebf1fd;
    }

    .wenv-banner-03-systems {
      z-index: 100;
      visibility: hidden;
      color: #666;
      position: absolute;
      top: 49px;
      left: 0;
      background-color: #fff;
      box-shadow: 0px 0px 4px rgba(185, 175, 200, 0.5);
      padding: 7px 14px;
      transition: visibility 0.2s ease-in-out;
      border-radius: 2px;

      div {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        height: 28px;
        line-height: 28px;

        &:hover {
          color: #009bff;

          svg {
            fill: #009bff;
          }
        }
      }

      svg {
        margin-right: 8px;
        fill: #999;
      }

      span {
        white-space: nowrap;
        font-size: 14px;
      }
    }
  }

  .wenv-banner-03-space {
    flex: 1;
  }

  .wenv-banner-03-avatar {
    width: 28px;
    height: 28px;
    z-index: 1;
  }

  .wenv-banner-03-user {
    margin-left: 8px;
    color: #d6e1f5;
    z-index: 1;
  }

  .wenv-banner-03-separate {
    width: 1px;
    background-color: #d6e1f5;
    height: 20px;
    margin-left: 32px;
  }

  .wenv-banner-03-logout {
    cursor: pointer;
    color: #d6e1f5;
    z-index: 1;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 86px;
    height: 48px;

    &:hover {
      background-color: #0e5acd;
    }

    svg {
      cursor: pointer;
      width: 18px;
      height: 18px;
      fill: #d6e1f5;
      margin-right: 8px;
    }
  }
}
</style>
