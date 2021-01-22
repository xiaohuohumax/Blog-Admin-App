<template>
  <Content @scrollend="scrollend">
    <div class="virtual-file-head sticky-top bg-white">
      <!-- 操作 -->
      <div class="flex-shrink-0 d-flex justify-content-between">
        <div class="d-flex">
          <label>
            <div class="btn btn-primary btn-sm">上传文件</div>
            <input
              class="d-none"
              type="file"
              multiple
              ref="uploadFile"
              @input="uploadFile()"
            />
          </label>
          <ButtonGroup class="ml-2">
            <Button type="warning" ghost @click="createNewDirToggle">新建文件夹</Button>
            <Button v-show="chooseList.length == 1" type="primary" ghost>重命名</Button>
            <Button v-show="chooseList.length > 0" type="success" @click="copyUrl" ghost
              >复制路径</Button
            >
            <Button type="success" ghost @click="refSelectDirFiles">刷新</Button>
          </ButtonGroup>
          <Button class="ml-2" v-show="chooseList.length > 0" type="error" ghost>
            删除
          </Button>
        </div>
        <div class="d-flex align-items-center">
          <Input closeable placeholder="搜索"></Input>
          <Icon
            class="ml-2 cursor-pointer"
            title="切换视图"
            :type="viewmodel ? 'md-list' : 'ios-apps'"
            size="30"
            @click="viewmodelToggle"
          />
        </div>
      </div>
      <!-- 当前路径 -->
      <div
        class="mt-2 flex-shrink-0 d-flex justify-content-between small font-weight-bold"
      >
        <div class="d-flex align-items-center flex-wrap">
          <span class="cursor-pointer" @click="gotoBack">返回上一级</span>
          <span class="mx-2">|</span>
          <span class="cursor-pointer" @click="gotoRoot">根目录</span>
          <span class="mx-2">|</span>
          <div
            class="cursor-pointer virtual-file-path"
            v-for="(item, index) in filePath"
            :key="index"
            @click="gotoDir(item)"
          >
            <span class="px-1">
              {{ item.name }}
            </span>
          </div>
        </div>
        <div class="flex-shrink-0">
          总共{{ contextSum }}个文件,当前总共{{ contexts.length }}个文件
        </div>
      </div>
      <!-- 表头 -->
      <div
        class="mt-2 pb-2 flex-shrink-0 d-flex align-items-center small font-weight-bold"
      >
        <div class="d-flex align-items-center virtual-file-name">
          <Checkbox v-model="chooseAllInput"></Checkbox>
          <div class="mr-2 px-3 d-inline-block"></div>
          文件/文件夹
          <span v-show="chooseList.length > 0"
            >[已选择:{{ chooseList.length }}个文件]</span
          >
        </div>
        <div class="d-flex align-items-center virtual-file-tool">操作</div>
        <div class="d-flex align-items-center virtual-file-size">大小</div>
        <div class="d-flex align-items-center virtual-file-time">日期</div>
      </div>
    </div>
    <!-- 表身 -->
    <div class="virtual-file-body mt-2">
      <VirtualFileAddDir
        :nowdirid="nowDirId"
        @success="createDirSuccess"
        @fail="createDirFail"
        v-if="createNewDirOpen"
      />
      <VirtualFileItem
        @intodir="intoDir"
        @deletesuccess="deleteSuccess"
        @choosechange="chooseChange"
        :chooselist="chooseList"
        v-for="(item, index) in fileSort"
        :viewmodel="viewmodel"
        :key="index"
        :file="item"
      />
    </div>
    <!-- 加载中 -->
    <VirtualFileLoading v-if="selectMore" />
    <!-- 全部查完了 -->
    <VirtualFileSelectOver v-if="selectOver" />
  </Content>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      filePath: [{ name: "根目录", _id: "-1" }],

      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 40, // 每页条数
      selectWorld: "", // 搜索关键词

      selectMore: false, // 是否在查询更多
      selectOver: false, // 是否搜索完结

      page: 1,

      createNewDirOpen: false, // 是否新建文件夹

      viewmodel: false, // false 列表 true 方块

      chooseAllInput: false, // 选择总开关

      chooseList: [],
    };
  },

  watch: {
    fileRefsh() {
      this.refSelectDirFiles();
    },
    chooseAllInput() {
      this.chooseAllInput ? this.chooseAll : (this.chooseList = []);
    },
    chooseList() {
      if (this.chooseList.length == 0) {
        this.chooseAllInput = false;
      }
      if (this.contexts.length > 0 && this.chooseList.length == this.contexts.length) {
        this.chooseAllInput = true;
      }
    },
    filePath() {
      this.chooseAllInput = false;
    },
  },
  mounted() {
    this.refSelectDirFiles();
  },
  computed: {
    ...mapState(["fileRefsh"]),
    // 全选
    chooseAll() {
      this.chooseList = [];
      this.contexts.forEach((val) => {
        this.chooseList.push(val);
      });
    },
    // 当前文件夹id
    nowDirId() {
      return this.nowDir._id;
    },
    // 当前文件夹
    nowDir() {
      let len = this.filePath.length;
      return this.filePath[len - 1];
    },
    // 文件排序
    fileSort() {
      return this.contexts.sort((a, b) => a.kind.length - b.kind.length);
    },
  },
  methods: {
    ...mapMutations(["addUploadFile", "clearUploadFile"]),
    // 复制路径
    copyUrl() {
      let text = this.chooseList
        .filter((val) => val.kind != "dir")
        .map((val) => val.virtualUrl)
        .join(" ")
        .trim();
      this.$Message.success(text);
      this.copyText(text);
    },
    // 复制文字
    copyText(text) {
      let input = document.createElement("input");
      input.value = text;
      input.select();
      alert(document.execCommand("copy"));
      this.$Message.success("复制成功!");
    },
    // 选择更改
    chooseChange(file) {
      let index = this.chooseList.lastIndexOf(file);
      index == -1 ? this.chooseList.push(file) : this.chooseList.splice(index, 1);
    },
    // 上传文件
    uploadFile() {
      let file = this.$refs.uploadFile;
      this.$Message.success("开始上传文件!");
      // 清除上一次上传文件
      this.clearUploadFile();
      file.files.forEach((val) => {
        this.addUploadFile({ path: this.nowDir, file: val });
      });
      file.value = "";
      console.log(file.files);
    },
    // 切换视图
    viewmodelToggle() {
      this.viewmodel = !this.viewmodel;
    },
    // 文件删除
    deleteSuccess(file) {
      let index = this.contexts.lastIndexOf(file);
      if (index != -1) {
        this.contextSum--;
        this.contexts.splice(index, 1);
      }
      // this.refSelectDirFiles();
    },
    // 创建文件夹成功
    createDirSuccess() {
      this.createNewDirOpen = false;
      this.refSelectDirFiles();
    },

    // 创建文件夹失败
    createDirFail() {
      this.createNewDirOpen = false;
    },
    // 新建文件夹切换
    createNewDirToggle() {
      this.createNewDirOpen = !this.createNewDirOpen;
    },
    scrollend() {
      // 正在搜索 以及全部查完
      if (this.selectMore || this.selectOver) {
        return;
      }
      this.selectMore = true;
      this.page++;
      this.selectDirFiles();
    },
    // 查询当前文件夹内容
    selectDirFiles() {
      this.$request
        .virtualFileFindByPage(this.page, this.pageSteep, this.nowDirId)
        .then((result) => {
          this.contextSum = result.fileSum;

          result.files.forEach((val) => {
            this.addFile(val);
          });
          this.selectMore = false;
          this.selectOver = this.contexts.length == this.contextSum;
        })
        .catch((err) => {
          this.selectMore = false;
        });
    },
    addFile(file) {
      for (const val of this.contexts) {
        if (val._id == file._id) {
          return;
        }
      }
      this.contexts.push(file);
    },
    // 重新查询文件夹
    refSelectDirFiles() {
      this.contexts = [];
      this.page = 1;
      this.selectDirFiles();
      this.selectOver = false;
    },
    // 点击进入文件夹
    intoDir(file) {
      this.filePath.push(file);
      this.refSelectDirFiles();
    },
    // 去某个文件夹
    gotoDir(file) {
      let index = this.filePath.lastIndexOf(file) + 1;
      this.filePath.splice(index);
      this.refSelectDirFiles();
    },
    // 返回根目录
    gotoRoot() {
      this.filePath.splice(1);
      this.refSelectDirFiles();
    },
    // 返回上一级
    gotoBack() {
      let index = this.filePath.length - 1;
      index = index > 1 ? index : 1;
      this.filePath.splice(index);
      this.refSelectDirFiles();
    },
  },
};
</script>

<style lang="less">
.virtual-file-path {
  &::after {
    display: inline;
    content: ">";
  }
  &:last-child::after {
    display: none;
  }
}
.virtual-file-name {
  vertical-align: middle;
  width: 40%;
  .ivu-checkbox-wrapper {
    margin-bottom: 0 !important;
  }
}
.virtual-file-name,
.virtual-file-tool,
.virtual-file-size,
.virtual-file-time,
.virtual-file-head {
  overflow: hidden;
  text-overflow: ellipsis;
}
.virtual-file-tool {
  width: 20%;
}
.virtual-file-size {
  width: 10%;
}
.virtual-file-time {
  width: 30%;
}

.virtual-file-head {
  top: 0.1rem;
  z-index: 1000;
}
.virtual-file-body {
  overflow-y: auto;
}
</style>
