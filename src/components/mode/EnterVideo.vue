<template>
  <div class="">
    <div class="d-flex align-items-center justify-content-center">
      <Input
        v-model.trim="imageInput"
        placeholder=""
        clearable
        @keydown.enter.native="enterInput"
        @on-clear="enterInput"
        v-if="!isOver"
      />
    </div>
    <div class="enter-image-item" v-if="isOver">
      <Button
        class="enter-image-icon"
        size="small"
        type="error"
        shape="circle"
        icon="md-close"
        @click="removeItem"
      ></Button>
      <video :src="images" class="enter-image-img rounded border w-50"></video>
      <img />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    imagemax: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      imageInput: "",
      images: "",
    };
  },
  created() {
    this.images = this.value;
  },

  computed: {
    isOver() {
      return this.images != "";
    },
  },
  methods: {
    enterInput() {
      this.images = this.imageInput;
      this.imageInput = "";
      this.$emit("input", this.images);
    },
    removeItem() {
      this.imageInput = this.images;
      this.images = "";
      this.$emit("input", this.images);
    },
  },
};
</script>

<style lang="less">
.enter-image-item {
  position: relative;
  .enter-image-img {
    width: 6rem;
    height: 6rem;
  }
  &:hover .enter-image-icon {
    visibility: visible;
  }
  .enter-image-icon {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    visibility: hidden;
    z-index: 10;
  }
}
</style>
