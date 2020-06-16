<template>
  <div :class="$style['container']">
    <div :class="[$style['jt'], $style['zjt']]" @click="previous">
      <img :src="zjtIcon">
    </div>
    <div :class="[$style['jt'], $style['yjt']]" @click="next">
      <img :src="yjtIcon">
    </div>
    <div :class="$style['buttons']">
      <img :src="fdIcon" @click="zoomin">
      <div :class="$style['split']" />
      <img :src="sxIcon" @click="zoomout">
      <div :class="$style['split']" />
      <img :src="xzIcon" @click="rotate">
    </div>
    <div ref="imagesContainer" :class="$style['images']">
      <div v-for="(s, i) in source" :key="i" :class="$style['image']">
        <div
          ref="imgWrapper"
          v-drag
          :class="$style['img-wrapper']"
          :style="{ transform: `scale(${s.scale}) rotate(-${s.rotateDeg}deg)` }"
        >
          <img :src="s.img">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const fdIcon = require('../../assets/images/imagebox_fd.png');
const sxIcon = require('../../assets/images/imagebox_sx.png');
const xzIcon = require('../../assets/images/imagebox_xz.png');
const fitIcon = require('../../assets/images/imagebox_fit.png');
const realsizeIcon = require('../../assets/images/imagebox_realsize.png');
const yjtIcon = require('../../assets/images/imagebox_yjt.png');
const zjtIcon = require('../../assets/images/imagebox_zjt.png');

export default {
  name: 'Imagebox',
  directives: {
    drag: {
      bind(el) {
        const odiv = el;
        odiv.onmousedown = (e) => {
          const startLeft = odiv.style.left;
          const startTop = odiv.style.top;
          e.preventDefault();

          document.onmousemove = (e2) => {
            const left = e2.clientX - e.clientX;
            const top = e2.clientY - e.clientY;
            const endLeft = (startLeft !== '' ? parseInt(startLeft, 10) : 0) + left;
            const endTop = (startTop !== '' ? parseInt(startTop, 10) : 0) + top;

            odiv.style.left = `${endLeft}px`;
            odiv.style.top = `${endTop}px`;
          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    const source = this.images.map((i) => ({
      img: i,
      scale: 1,
      rotateDeg: 0,
    }));

    return {
      fdIcon,
      sxIcon,
      xzIcon,
      fitIcon,
      realsizeIcon,
      yjtIcon,
      zjtIcon,
      source,
      currentIndex: this.index,
      isFit: true,
    };
  },
  watch: {
    images(newImgs) {
      this.source = newImgs.map((i) => ({
        img: i,
        scale: 1,
        rotateDeg: 0,
      }));
    },
  },
  mounted() {
    this.$refs.imagesContainer.scrollLeft
      += this.currentIndex * this.$refs.imagesContainer.clientWidth;
  },
  methods: {
    resetImage() {
      this.source[this.currentIndex].scale = 1;
      this.source[this.currentIndex].rotateDeg = 0;
      this.$refs.imgWrapper.forEach((i) => {
        /* eslint-disable-next-line no-param-reassign */
        i.style.left = '0px';
        /* eslint-disable-next-line no-param-reassign */
        i.style.top = '0px';
      });
    },
    previous() {
      if (this.currentIndex > 0) {
        this.resetImage();
        this.currentIndex -= 1;
        this.$refs.imagesContainer.scrollLeft -= this.$refs.imagesContainer.clientWidth;
      }
    },
    next() {
      if (this.currentIndex < this.images.length - 1) {
        this.resetImage();
        this.currentIndex += 1;
        this.$refs.imagesContainer.scrollLeft += this.$refs.imagesContainer.clientWidth;
      }
    },
    zoomin() {
      if (this.source[this.currentIndex]) {
        this.source[this.currentIndex].scale += 0.2;
      }
    },
    zoomout() {
      if (this.source[this.currentIndex] && this.source[this.currentIndex].scale > 0.21) {
        this.source[this.currentIndex].scale -= 0.2;
      }
    },
    rotate() {
      if (this.source[this.currentIndex]) {
        this.source[this.currentIndex].rotateDeg += 90;
      }
    },
    // checkBtn(btn) {
    //   return btn === 0;
    // },
    // handleMouseDown(e) {
    //   if (!this.checkBtn(e.button)) return;
    //   this.startX = e.clientX;
    //   this.startY = e.clientY;
    //   this.isDraging = true;
    //   e.stopPropagation();
    // },
    // handleMouseUp(e) {
    //   if (!this.checkBtn(e.button)) return;
    //   this.isDraging = false;
    //   this.startX = 0;
    //   this.startY = 0;
    // },
    // handleMouseMove(e) {
    //   if (!this.checkBtn(e.button)) return;
    //   if (this.isDraging) {
    //     const { top, left } = this.source[this.currentIndex];
    //     this.source[this.currentIndex].top = top + (e.clientY - this.startY);
    //     this.source[this.currentIndex].left = left + (e.clientX - this.startX);
    //     this.startX = e.clientX;
    //     this.startY = e.clientY;
    //   }
    //   e.stopPropagation();
    // },
  },
};
</script>
<style lang="less" module>
.container {
  position: relative;

  & > .jt {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    height: 70px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
    user-select: none;

    &:hover {
      & > img {
        transform: scale(1.1);
      }
    }
  }

  & > .zjt {
    left: 0;
    border-radius: 0 4px 4px 0;
  }

  & > .yjt {
    right: 0;
    border-radius: 4px 0 0 4px;
  }

  & > .buttons {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 4px 4px 0 0;
    z-index: 1;
    user-select: none;

    & > img {
      cursor: pointer;
      margin: 0 12px;

      &:hover {
        transform: scale(1.1);
      }
    }

    & > .split {
      height: 26px;
      width: 1px;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }

  & > .images {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    scroll-behavior: smooth;
    display: flex;

    & > .image {
      position: relative;
      cursor: move;
      flex: 0 0 100%;
      height: 100%;
      overflow: hidden;

      & > .img-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        & > img {
          position: relative;
          max-width: 100%;
          max-height: 100%;
          user-select: none;
        }
      }
    }
  }
}
</style>
