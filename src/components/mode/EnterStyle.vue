<template>
  <div class="enter-style mt-2">
    <RadioGroup v-model="value.webTheme" vertical class="d-block">
      <Radio class="d-flex align-items-center" disabled>
        <Input
          class="d-inline-block flex-shrink-0"
          style="width: 5rem"
          placeholder="主题名"
          v-model="name"
        ></Input>
        <Button
          class="flex-shrink-0 mx-2"
          type="success"
          ghost
          size="small"
          shape="circle"
          icon="md-checkmark"
          title="添加"
          @click="themePush"
        ></Button>
        <Input
          class="flex-grow-1"
          placeholder="样式文件.css"
          v-model="url"
          @keydown.enter.native="themePush"
        ></Input>
      </Radio>
      <Radio
        class="d-flex align-items-center"
        :label="item.name"
        v-for="(item, index) in value.webThemeList"
        :key="index"
      >
        <Input
          class="d-inline-block flex-shrink-0"
          style="width: 5rem"
          placeholder="主题名"
          v-model="item.name"
        ></Input>
        <Button
          class="flex-shrink-0 mx-2"
          type="error"
          ghost
          size="small"
          shape="circle"
          icon="md-close"
          title="删除"
          @click="removeItem(index)"
        ></Button>
        <Input
          class="flex-grow-1"
          placeholder="样式文件.css"
          v-model="item.url"
          @keydown.enter.native="themePush"
        ></Input>
      </Radio>
      <Radio disabled v-show="value.webThemeList.length == 0"> 啥主题都没有~~~ </Radio>
    </RadioGroup>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: "",
      url: "",
    };
  },
  computed: {
    isInList() {
      return this.value.webThemeList.map((val) => val.name).includes(this.name);
    },
    isRight() {
      return this.name == "" || this.url == "";
    },
  },
  methods: {
    themePush() {
      if (this.isInList) {
        return this.$Message.error("主题名字重复了呦!");
      }
      if (this.isRight) {
        return this.$Message.error("参数不完整!");
      }
      this.value.webThemeList.push({ name: this.name, url: this.url });
      this.name = "";
      this.url = "";
    },
    removeItem(index) {
      this.value.webThemeList.splice(index, 1);
      let webThemeList = this.value.webThemeList;
      this.value.webTheme = webThemeList.length > 0 ? webThemeList[0].name : "";
    },
  },
};
</script>

<style lang="less">
.enter-style {
  label {
    height: auto !important;
    margin-right: 0 !important;
  }
}
</style>
