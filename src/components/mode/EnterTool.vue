<template>
  <Card class="text-center">
    <label>
      <Icon type="md-cloud-upload" color="tomato" size="60" />
      <div class="">选择文件[限制:{{ maxSize }}]</div>
      <input
        ref="fileinput"
        type="file"
        class="d-none"
        @input="enterInput($event)"
        accept="application/x-zip-compressed"
      />
    </label>
    <div class="font-weight-bold">
      <div class="mb-2">{{ name }}</div>
      <div>{{ path }}</div>
    </div>
  </Card>
</template>

<script>
import tools from "@/script/tools";
export default {
  data() {
    return {
      toolInput: {},
      name: "",
      path: "",
      max: 1024 * 1024 * 1024, // 文件大小限制
    };
  },
  computed: {
    maxSize() {
      return tools.byteFormat(this.max);
    },
  },

  methods: {
    enterInput(that) {
      this.changeInput(that.target);
    },
    changeInput(that) {
      this.toolInput = that.files;
      let file = this.toolInput[0];

      if (this.toolInput.length > 0) {
        if (file.size > this.max) {
          this.$Message.success("文件大小超出限制!");
          return this.clearFile();
        }
        this.path = file.path;
        this.name = file.name;
      } else {
        this.path = "";
        this.name = "";
      }
      this.$emit("input", file);
    },
    clearFile() {
      this.$refs.fileinput.value = "";
      this.changeInput(this.$refs.fileinput);
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
