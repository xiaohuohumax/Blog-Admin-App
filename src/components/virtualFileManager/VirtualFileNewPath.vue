<template>
  <div
    class="d-flex flex-column virtual-file-new-path border w-50 h-50 bg-white rounded p-2 small font-weight-bold"
  >
    <div class="flex-shrink-0 d-flex justify-content-between">
      <div>选择新路径</div>
      <div></div>
    </div>
    <div class="flex-grow-1 border my-2"></div>
    <div class="flex-shrink-0 d-flex justify-content-between">
      <div class="">已选择:[]</div>
      <div class="">
        <Button class="mr-2" type="success" size="small">确认</Button>
        <Button size="small">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      filePath: [{ name: "根目录", _id: "-1" }],

      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 20, // 每页条数
      selectWorld: "", // 搜索关键词

      selectMore: false, // 是否在查询更多
      selectOver: false, // 是否搜索完结

      page: 1,

      createNewDirOpen: false, // 是否新建文件夹
      viewmodel: false, // false 列表 true 方块
    };
  },

  watch: {
    fileRefsh() {
      this.refSelectDirFiles();
    },
  },
  mounted() {
    this.refSelectDirFiles();
  },
  computed: {
    ...mapState(["fileRefsh"]),

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

    // 查询当前文件夹内容
    selectDirFiles() {
      this.$request
        .virtualFileFindByPage(this.page, this.pageSteep, this.nowDirId, "")
        .then((result) => {
          if (result.flag) {
            this.contextSum = result.data.fileSum;

            result.data.files.forEach((val) => {
              this.addFile(val);
            });
            this.selectMore = false;
            this.selectOver = this.contexts.length == this.contextSum;
          }
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
.virtual-file-new-path {
  min-height: 16rem;
  min-width: 20rem;
}
</style>
