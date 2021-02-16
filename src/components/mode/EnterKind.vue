<template>
  <div class="">
    <div class="d-flex align-items-center flex-wrap">
      <RadioGroup v-model="kindRadio">
        <Radio
          class="mb-0"
          :label="item"
          border
          v-for="(item, index) in kinds"
          :key="index"
        ></Radio>
      </RadioGroup>
      <Input
        v-model.trim="tagInput"
        :placeholder="$attrs.placeholder"
        clearable
        @keydown.enter.native="enterInput"
        @on-clear="enterInput"
        style="width: 7rem"
        placeholder="添加新分类"
      />
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
    kindlist: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    kindRadio() {
      this.$emit("input", this.kindRadio);
    },
    value: "init",
    kindlist: "init",
  },
  data() {
    return {
      tagInput: "",
      kindRadio: "",
      kinds: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.kinds = this.kindlist;
      this.kindRadio = this.value;
    },
    enterInput() {
      this.kinds.push(this.tagInput);
      this.tagInput = "";
    },
  },
};
</script>

<style lang="less"></style>
