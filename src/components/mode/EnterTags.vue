<template>
  <div class="">
    <div
      class="d-flex align-items-center flex-wrap"
      :class="tags.length > 0 ? 'mb-3' : ''"
    >
      <Tag
        size="large"
        @on-close="removeItem(index)"
        closable
        v-for="(item, index) in tags"
        :key="index"
        >{{ item }}</Tag
      >
      <div class="d-flex align-items-center">
        <Input
          v-if="!isOver"
          v-model.trim="tagInput"
          :placeholder="$attrs.placeholder"
          clearable
          @keydown.enter.native="enterInput"
          @on-clear="enterInput"
          style="width: 7rem"
        />
        <div v-show="tagmax != 1" class="ml-1 mb-1 h6">
          ({{ tags.length }}/{{ tagmax }})
        </div>
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
    tagmax: {
      type: Number,
      default: 10,
    },
  },
   watch: {
    value() {
      this.tags = this.value;
    },
  },
  data() {
    return {
      tagInput: "",
      tags: [],
    };
  },
  created() {
    this.tags = this.value;
  },
  computed: {
    isOver() {
      return this.tags.length >= this.tagmax;
    },
  },
  methods: {
    enterInput() {
      if (this.isOver) {
        return this.$Message.error("数量超出限制!");
      }

      let newInput = this.tagInput.split(/[ ]+/i).filter((val) => val != "");
      this.tagInput = "";

      this.tags = this.tags.concat(newInput);
      this.$emit("input", this.tags);
    },
    removeItem(index) {
      this.tags.splice(index, 1);
      this.$emit("input", this.tags);
    },
  },
};
</script>

<style lang="less">
</style>
