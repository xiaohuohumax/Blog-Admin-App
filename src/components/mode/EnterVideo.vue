<template>
  <div class="">
    <div class="d-flex align-items-center justify-content-center">
      <Input
        v-model.trim="imageInput"
        clearable
        @keydown.enter.native="enterInput"
        @on-clear="enterInput"
        v-if="!isOver"
        :placeholder="$attrs.placeholder"
      />
    </div>
    <div class="enter-video-item w-50" v-if="isOver">
      <Button
        class="enter-video-icon"
        size="small"
        type="error"
        shape="circle"
        icon="md-close"
        @click="removeItem"
      ></Button>
      <video controls :src="images" class="rounded border w-100"></video>
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
  watch: {
    value() {
      this.images = this.value;
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
.enter-video-item {
  position: relative;
  &:hover .enter-video-icon {
    visibility: visible;
  }
  .enter-video-icon {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    visibility: hidden;
    z-index: 10;
  }
}
</style>
