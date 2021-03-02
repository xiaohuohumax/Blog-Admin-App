<template>
  <div
    class="add-dir my-1 py-2 border-top border-bottom flex-shrink-0 d-flex align-items-center small font-weight-bold"
  >
    <div class="d-flex align-items-center virtual-file-name">
      <Checkbox></Checkbox>
      <div class="add-dir-icon mr-2 d-inline-block"></div>
      <div class="d-flex align-items-center flex-grow-1">
        <Input
          v-model.trim="dirName"
          class="w-75 w-md-50"
          autofocus
          @keydown.enter.native="sure"
          placeholder="新建文件夹"
        ></Input>
        <Icon
          class="cursor-pointer ml-2 text-danger"
          type="md-close"
          size="20"
          @click="fail"
        />
        <Icon
          class="cursor-pointer ml-1 text-success"
          type="md-checkmark"
          size="20"
          @click="sure"
        />
      </div>
    </div>
    <div class="d-flex align-items-center virtual-file-tool">~~~</div>
    <div class="d-flex align-items-center virtual-file-size">~~~</div>
    <div class="d-flex align-items-center virtual-file-time">~~~</div>
  </div>
</template>

<script>
export default {
  props: {
    nowdirid: { type: String, default: "-1" },
  },
  data() {
    return { dirName: "新建文件夹" };
  },
  methods: {
    // 提交
    submit() {
      this.$request
        .virtualFileInsertDir(this.dirName, this.nowdirid)
        .then((result) => {
          if (result.flag) {
            this.$emit("success");
            this.$Message.success(`[${result.data.name}]创建成功`);
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => {
          this.$emit("fail");
          this.$Message.error("新建文件夹失败!");
        });
    },
    // 确认
    sure() {
      if (this.dirName == "") {
        return this.$Message.error("文件夹名字不能为空!");
      }
      this.submit();
    },
    fail() {
      this.$emit("fail");
    },
  },
};
</script>

<style lang="less">
.virtual-file-tool {
  & > * {
    visibility: hidden;
  }
  &:hover > * {
    visibility: visible;
  }
}
.add-dir {
  .add-dir-icon {
    width: 3rem;
    height: 3rem;
    background: url("/image/fileIcon/dir.png") center/ cover;
  }
}
</style>
