<template>
  <div
    class="my-1 py-2 flex-shrink-0 align-items-center small font-weight-bold"
    :class="!viewmodel ? 'd-flex' : 'virtiual-file-view-block'"
  >
    <div class="d-flex align-items-center virtual-file-name">
      <Checkbox
        :value="isChoose"
        @input="chooseChange"
        :disabled="checkcanchange"
        class="virtual-file-check"
      ></Checkbox>
      <FileIcon
        @intodir="intoDir"
        class="virtual-file-item-icon mr-2"
        :kind="file.kind"
        :name="file.name"
        :url="file.virtualUrl"
      />
      <div class="d-flex align-items-center flex-grow-1" v-if="renameOpen">
        <Input
          v-model.trim="renameName"
          @keydown.enter.native="renameSure"
          class="w-75 w-md-50"
          placeholder="新名字"
        ></Input>
        <Icon
          class="cursor-pointer ml-2 text-danger"
          type="md-close"
          size="20"
          @click="renameOpen = false"
        />
        <Icon
          class="cursor-pointer ml-1 text-success"
          type="md-checkmark"
          size="20"
          @click="renameSure"
        />
      </div>
      <div class="cursor-pointer virtual-file-name-real" v-else @click="intoDir">
        {{ file.name }}
      </div>
    </div>
    <div class="d-flex align-items-center virtual-file-tool">
      <Icon
        type="ios-link"
        v-if="file.kind != 'dir'"
        class="cursor-pointer mr-1 text-success"
        size="20"
        title="复制链接"
        @click="copyText(file.virtualUrl)"
      />
      <Icon
        type="ios-trash"
        class="cursor-pointer mr-1 text-danger"
        size="20"
        title="删除"
        @click="deleteDirOrFile"
      />
      <Icon
        type="md-create"
        class="cursor-pointer mr-1 text-primary"
        size="20"
        title="重命名"
        @click="renameOpen = true"
      />
    </div>
    <div class="d-flex align-items-center virtual-file-size">
      <span v-if="file.kind != 'dir'">{{ fileSize(file.size) }}</span>
      <span v-else>~~~</span>
    </div>
    <div class="d-flex align-items-center virtual-file-time">
      <Time :time="file.uploadTime" type="datetime" />
    </div>
  </div>
</template>

<script>
import tools from "@/script/tools";
export default {
  props: {
    file: { type: Object, default: () => ({}) },
    viewmodel: {
      type: Boolean,
      default: false, // false 列表 true 方块
    },
    chooselist: { type: Array, default: () => [] },
    checkcanchange: {
      //能否点击checkbox
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      renameOpen: false,
      renameName: "", // 新名字
      iconBaseUrl: "/image/fileIcon/",
      imageRule: ["png", "jpg", "jpeg", "jif", "svg"],
    };
  },
  created() {
    this.renameName = this.file.name;
  },
  methods: {
    // 复制文字
    copyText(text) {
      let input = document.createElement("input");
      document.body.prepend(input);
      input.value = text;
      input.select();
      document.execCommand("copy");
      this.$Message.success("复制成功!");
      document.body.removeChild(input);
    },
    // 选择改变
    chooseChange() {
      this.$emit("choosechange", this.file);
    },
    // 是否是图片
    isImage(suffix) {
      return this.imageRule.includes(suffix);
    },
    // 字节转换
    fileSize(size) {
      return tools.byteFormat(size);
    },

    intoDir() {
      if (this.file.kind == "dir") {
        this.$emit("intodir", this.file);
      }
    },
    renameSure() {
      if (this.renameName == this.file.name) {
        // 未改名
        return;
      }
      if (this.renameName == "") {
        return this.$Message.error("新名字不能为空!");
      }
      this.$request
        .virtualFileUpdateName(this.file._id, this.renameName)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("文件夹改名成功!");
            this.file.name = this.renameName;
          } else {
            this.$Message.error(result.mag);
          }
          this.renameOpen = false;
        })
        .catch(() => {
          this.$Message.error("文件夹改名失败!");
          this.renameOpen = false;
        });
    },
    deleteDirOrFile() {
      this.$request
        .virtualFileDeleteById(this.file._id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("文件夹删除成功!");
            this.$emit("deletesuccess", this.file);
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("文件夹删除失败!"));
    },
  },
  computed: {
    // 是否被选中
    isChoose() {
      return this.chooselist.map((val) => val._id).includes(this.file._id);
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
.virtual-file-item-icon {
  width: 3rem;
  height: 3rem;
}

.virtiual-file-view-block {
  display: inline-block;
  position: relative;
  text-align: center;
  margin: 0 0.5rem 0.5rem 0 !important;
  padding: 0 0 0.25rem 0 !important;

  .virtual-file-name-real {
    width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .virtual-file-name {
    display: block !important;
    width: auto !important;
  }
  .virtual-file-item-icon {
    width: 8rem;
    height: 8rem;
    padding: 0 0.5rem !important;
  }
  .virtual-file-check {
    position: absolute;
    top: 0rem;
    left: 0rem;
  }
  .virtual-file-tool,
  .virtual-file-time,
  .virtual-file-size {
    display: none !important;
  }
}
</style>
