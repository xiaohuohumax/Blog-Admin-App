<template>
  <div class="">
    <div
      class="d-flex align-items-center"
      v-if="!isOver"
      :class="{ 'mb-3': images.length > 0 }"
    >
      <Input
        v-model.trim="imageInput"
        :placeholder="$attrs.placeholder"
        clearable
        @keydown.enter.native="enterInput"
        @on-clear="enterInput"
      />
      <div v-show="imagemax != 1" class="ml-1 mb-1 h6">
        ({{ images.length }}/{{ imagemax }})
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <div class="enter-image-item" v-for="(item, index) in images" :key="index">
        <Button
          class="enter-image-icon"
          size="small"
          type="error"
          shape="circle"
          icon="md-close"
          @click="removeItem(index)"
        ></Button>
        <div
          class="enter-image-img rounded border mr-2 mb-2"
          :style="imgStyle(item)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
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
      images: [],
      timout: null,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    isOver() {
      return this.images.length >= this.imagemax;
    },
  },
  methods: {
    init() {
      this.images = [];
      let index = 0;
      this.timout = window.setInterval(() => {
        if (index >= this.value.length) {
          return window.clearInterval(this.timout);
        }
        this.images.push(this.value[index++]);
      }, 100);
    },
    imgStyle(item) {
      return `background:url('${item}') center / cover;`;
    },
    enterInput() {
      if (this.isOver) {
        return this.$Message.error("数量超出限制!");
      }

      let newInput = this.imageInput.split(/[ ]+/i).filter((val) => val != "");
      this.imageInput = "";

      // 限制数量
      this.images = this.images.concat(newInput).splice(0, this.imagemax);
      this.$emit("input", this.images);
    },
    removeItem(index) {
      this.images.splice(index, 1);
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
  }
}
</style>
