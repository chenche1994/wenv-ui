<template>
  <div :class="$style['container']">
    <div v-for="(image, index) in images" :key="index" :class="$style['image']">
      <img :src="image" :class="$style['content']">
      <img :src="deleteIcon" :class="$style['delete']" @click="deleteImage(index)">
    </div>
    <label v-if="images.length < limit" :class="$style['upload']">
      <input ref="uploader" type="file" :accept="accept" @change="readAsDataURL">
      <img :src="uploadIcon">
    </label>
  </div>
</template>
<script>
const deleteIcon = require('../assets/images/image_uploader_delete.png');
const uploadIcon = require('../assets/images/image_uploader.png');

export default {
  name: 'WImageUploader',
  props: {
    limit: {
      type: Number,
      required: false,
      default: 1,
    },
    images: {
      type: Array,
      required: true,
    },
    accept: {
      type: String,
      required: false,
      default: '.jpg, .jpeg, .png',
    },
  },
  data() {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.addImage(e.target.result);
    };
    return {
      reader,
      deleteIcon,
      uploadIcon,
    };
  },
  beforeDestroy() {
    this.reader = null;
  },
  methods: {
    readAsDataURL() {
      const file = this.$refs.uploader.files[0];
      if (file) {
        this.reader.readAsDataURL(file);
      }
    },
    deleteImage(index) {
      const img = this.images[index];
      this.images.splice(index, 1);
      this.$emit('on-delete', img);
    },
    addImage(img) {
      this.images.push(img);
      this.$emit('on-add', img);
    },
  },
};
</script>
<style lang="less" module>
@import '../main.less';

.container {
  display: flex;

  .size() {
    width: 111px;
    height: 98px;
    box-sizing: border-box;
  }

  & > .image {
    .size();
    margin-right: 16px;
    position: relative;

    & > .content {
      width: 111px;
      height: 98px;
    }

    & > .delete {
      position: absolute;
      right: -6px;
      top: -6px;
      cursor: pointer;
    }
  }

  & > .upload {
    .size();
    border: @common-border;
    border-radius: @common-border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    cursor: pointer;

    & > input {
      display: none;
    }
  }
}
</style>
