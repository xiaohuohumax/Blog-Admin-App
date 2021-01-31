<template>
  <div class="mt-2">
    <RadioGroup v-model="value.webTheme" vertical class="d-block">
      <Radio disabled>
        <span class="enter-style-item">
          <Input
            class="d-inline-block"
            style="width: 5rem"
            placeholder="主题名"
            v-model="name"
          ></Input>
          <Input
            class="mx-2"
            placeholder="样式文件.css"
            style="width: 15rem"
            v-model="url"
            @keydown.enter.native="themePush"
          ></Input>
          <Button
            class="flex-shrink-0"
            type="success"
            ghost
            size="small"
            shape="circle"
            icon="md-checkmark"
            @click="themePush"
          ></Button>
        </span>
      </Radio>
      <Radio :label="item.name" v-for="(item, index) in value.webThemeList" :key="index">
        <span class="enter-style-item">
          <Input
            class="d-inline-block"
            v-model="item.name"
            style="width: 5rem"
            placeholder="主题名"
          ></Input>
          <Input
            class="mx-2"
            style="width: 15rem"
            v-model="item.url"
            placeholder="样式文件.css"
          ></Input>
          <Button
            class="flex-shrink-0"
            type="error"
            ghost
            size="small"
            shape="circle"
            icon="md-close"
            @click="removeItem(index)"
          ></Button>
        </span>
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

<style lang="less"></style>
