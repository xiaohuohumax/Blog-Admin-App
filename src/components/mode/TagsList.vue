<template>
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
<!-- 已删除 -->
  <div class="tagsList">
    <div class="">
      <Tag
        size="large"
        v-for="(item, index) in tags"
        :key="index"
        closable
        @on-close="tagsRemove(index)"
        >{{ item }}</Tag
      >
      <Input
        v-if="tags.length < tagsMax"
        placeholder="标签"
        style="width: 8rem"
        v-model.trim="tagsInput"
        @on-enter="tagsAdd"
      />
      <span class="small ml-2">({{ tags.length }}/{{ tagsMax }})</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array,
    tagsMax: {
      type: Number,
      default: 10,
    },
  },
  model: {
    prop: "tags",
    event: "vmodel",
  },
  data() {
    return {
      //   tags: [],
      tagsInput: "",
    };
  },
  methods: {
    tagsAdd() {
      let tagTrim = this.tagsInput;
      if (tagTrim == "") {
        return this.$Message.error("标签不能为空呦!");
      }
      if (this.tags.length > this.tagsMax) {
        return this.$Message.error("标签数量到达上限了呦!");
      }
      if (this.tags.includes(tagTrim)) {
        this.tagsInput = "";
        return this.$Message.success("这个标签以及添加了呦!");
      }
      this.tagsInput = "";
      this.tags.push(tagTrim);
      this.$emit("vmodel", this.tags);
    },
    tagsRemove(index) {
      this.tags.splice(index, 1);
    },
  },
};
</script>

<style>
</style>