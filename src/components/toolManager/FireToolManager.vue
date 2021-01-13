<template>
  <Content>
    <template #head>
      <Button type="success">提交</Button>
    </template>
    <input
      type="text"
      class="w-100 h3 py-3 border-0"
      placeholder="请输入游戏标题(30字)"
    />
    <input
      type="text"
      class="w-100 h5 py-3 border-0"
      placeholder="请输入游戏副标题(100字)"
    />
    <div class="py-3">
      <p class="small mr-2">设置关键字:</p>
      <EnterTags />
    </div>
    <div class="pb-3">
      <p class="small mr-2">添加封面:</p>
      <EnterImage />
    </div>
  </Content>
</template>

<script>
let { dialog } = window.require("electron").remote;

let { ipcRenderer } = window.require("electron");

let path = window.require("path");

let fs = window.require("fs");

let mime = window.require("mime");

import compress from "../../script/compress";

import enumData from "../../script/enumData";

import tools from "../../script/tools";

export default {
  data() {
    return {
      codePath: "",
      compressPathAdd: "gameZipCache",
      stepNumber: 0,
      stepError: "process",
      file: "",
      title: "",
      subTitle: "",
      tags: [],
    };
  },
  methods: {
    chooseCode() {
      this.codePath = dialog.showOpenDialogSync({
        properties: ["openDirectory", "multiSelections"],
      });
      if (!this.codePath) return;
      this.codePath = this.codePath.toString(); // object -> string

      if (!fs.existsSync(path.join(this.codePath, "index.html"))) {
        return this.$Message.error("源码中未检测到 index.html !");
      }
      this.stepNumber++;
      this.codeZip();
    },
    codeChange() {
      this.stepNumber = 0;
      this.file = "";
    },
    codeZip() {
      fs.existsSync(this.compressPath) ? "" : fs.mkdirSync(this.compressPath);

      compress
        .compress(this.codePath, this.codeZipPath)
        .then(() => {
          this.getFile(this.codeZipPath);
          this.stepNumber++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 将文件转为 File 对象
    getFile(zipPath) {
      let data = fs.readFileSync(zipPath);
      let name = path.basename(zipPath);
      this.file = new File([data], name, {
        type: mime.getType(zipPath),
      });
    },
    dataCeck() {
      if (
        this.file != "" &&
        this.title != "" &&
        this.subTitle != "" &&
        this.tags.length != 0
      ) {
        alert("true");
      } else {
        alert("false");
      }
    },
  },

  mounted() {},
  computed: {
    // 源码压缩文件缓存文件夹地址
    compressPath() {
      return path.join(ipcRenderer.sendSync(enumData.AppPath), this.compressPathAdd);
    },
    // 源码压缩文件缓存文件地址
    codeZipPath() {
      return path.join(this.compressPath, `${tools.getTimeStamp()}.tar`);
    },
  },
};
</script>

<style lang="less">
.gameUpload {
  .ivu-tabs-bar {
    display: none !important;
  }

  .ivu-form-item {
    margin-bottom: 1rem !important;
  }

  .ivu-form-item-label {
    margin-bottom: 0 !important;
  }
}
</style>
