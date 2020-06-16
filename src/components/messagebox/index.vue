<template>
  <div v-show="isShowMessageBox" class="wenv-message-box">
    <div class="wenv-messagebox-mask" @click="cancel" />
    <div class="wenv-messagebox-message-content">
      <div class="wenv-messagebox-content">
        <div>
          <svg class="wenv-messagebox-img-icon" aria-hidden="true">
            <use xlink:href="#iconquerentixing" />
          </svg>
        </div>
        <div>
          <div class="wenv-messagebox-title">
            {{ title }}
          </div>
          <div class="wenv-messagebox-inner">
            {{ content }}
          </div>
        </div>
      </div>
      <div class="wenv-messagebox-modal-btn wenv-messagebox-btn-group">
        <button v-show="isShowCancelBtn" class="wenv-messagebox-cancel-btn" @click="cancel">
          {{ cancelBtnText }}
        </button>
        <button v-show="isShowConfimrBtn"
                class="wenv-messagebox-search-btn wenv-messagebox-btn-confirm" @click="confirm"
        >
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '这是弹框内容',
    },
    inputValue: {
      type: String,
      default: '',
    },
    isShowCancelBtn: {
      type: Boolean,
      default: true,
    },
    isShowConfimrBtn: {
      type: Boolean,
      default: true,
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    confirmBtnText: {
      type: String,
      default: '确定',
    },
  },
  data() {
    return {
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '',
    };
  },
  methods: {
    confirm() {
      this.isShowMessageBox = false;
      this.resolve('confirm');
      this.remove();
    },
    cancel() {
      this.isShowMessageBox = false;
      this.reject('cancel');
      this.remove();
    },
    showMsgBox() {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    remove() {
      setTimeout(() => {
        this.destroy();
      }, 300);
    },
    destroy() {
      this.$destroy();
      document.body.removeChild(this.$el);
    },
  },
};
</script>
<style lang="less">
.wenv-message-box {
  position: relative;
  // 蒙版
  .wenv-messagebox-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100000;
    background: rgba(0, 0, 0, 0.5);
  }
  // 按钮
  .wenv-messagebox-jg-btn {
    outline: none;
    display: inline-block;
    cursor: pointer;
    margin: 0;
    width: 60px;
    height: 28px;
    text-align: center;
    box-sizing: border-box;
    line-height: 1;
    border: none;
    color: #ffffff;
    border-radius: 2px;
  }
  .wenv-messagebox-cancel-btn {
    .wenv-messagebox-jg-btn();
    background-color: #f4f4f4;
    color: #000;
    border: 1px solid #dddddd;
  }
  .wenv-messagebox-search-btn {
    .wenv-messagebox-jg-btn();
    background-color: #009bff;
  }
  .wenv-messagebox-message-content {
    position: fixed;
    box-sizing: border-box;
    padding: 30px;
    min-width: 25em;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 1000000;
    border-radius: 2px;
    height: 150px;
    .wenv-messagebox-icon {
      position: absolute;
      top: 1em;
      right: 1em;
      width: 0.9em;
      height: 0.9em;
      cursor: pointer;
    }
    .wenv-messagebox-content {
      display: flex;
      font-size: 14px;
      align-items: center;
      > div:nth-of-type(2) {
        margin-left: 15px;
      }
      .wenv-messagebox-img-icon {
        width: 16px;
        height: 16px;
        fill: #f0b547;
        margin-top: 5px;
      }
    }
    .wenv-messagebox-title {
      color: #333333;
      line-height: 20px;
    }
    .wenv-messagebox-inner {
      color: #666666;
      line-height: 25px;
    }
    .wenv-messagebox-btn-group {
      margin-top: 35px;
      text-align: right;
      > button {
        font-family: @font-family;
      }
      .wenv-messagebox-btn-confirm {
        margin-left: 1em;
      }
    }
  }
}
</style>
