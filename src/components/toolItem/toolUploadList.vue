<template>
  <toolItemModel icon="md-cog">
    <div class="tool-upload-list d-flex flex-column">
      <div class="d-flex justify-content-between flex-shrink-0 font-weight-bold">
        <div>文件上传{{ fileSum }}</div>
        <div>
          <span class="pr-2 cursor-pointer" @click="clearUploadFile">清除</span>
          <!-- <span class="cursor-pointer" @click="clearAllUploadFile">取消</span> -->
        </div>
      </div>
      <div class="flex-shrink-0 small font-weight-bold d-flex my-1 border-bottom pb-1">
        <div class="w-25">名字</div>
        <div class="w-25">模目标路径</div>
        <div class="w-25">大小</div>
        <div class="w-25">状态</div>
      </div>
      <div class="tool-upload-list-body flex-grow-1 small font-weight-bold">
        <div class="text-center" v-if="uploadFileList.length == 0">啥也没有呦~~~</div>
        <div class="d-flex" v-for="(item, index) in uploadFileList" :key="index">
          <div class="w-25">{{ item.file.name }}</div>
          <div class="w-25">{{ item.path.name }}</div>
          <div class="w-25">{{ fileSize(item.file.size) }}</div>
          <div class="w-25"><Progress :percent="item.steep" /></div>
        </div>
      </div>
    </div>
  </toolItemModel>
</template>

<script>
import tools from "@/script/tools";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      uploadConent: 0,
      uploadMax: 3, // 同时上传最大数
      uploading: false, // 是否在上传

      uploadSuccess: 0, // 成功数
      uploadFail: 0, //失败数
    };
  },
  computed: {
    ...mapState(["uploadFileList", "userInf"]),
    ...mapGetters(["unUploadFileList"]),
    fileSum() {
      let nowSum = this.uploadFileList.length - this.unUploadFileList.length;
      return `${nowSum}/${this.uploadFileList.length}`;
    },
  },
  mounted() {
    this.uploadFile();
  },
  methods: {
    ...mapMutations(["clearUploadFile", "clearAllUploadFile", "addFileRefsh"]),
    // 字节转换
    fileSize(size) {
      return tools.byteFormat(size);
    },
    uploadFile() {
      setInterval(() => {
        if (this.unUploadFileList.length != 0 && this.uploadMax > this.uploadConent) {
          
          this.upload(this.unUploadFileList[0]);
        }
      }, 100);
    },
    upload(item) {
      item.stat = 1;
      this.uploadConent++;
      this.$request
        .virtualFileInsert(
          this.userInf._id,
          item.path._id,
          item.file,
          (progressEvent) => {
            item.steep = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          }
        )
        .then((result) => {
          item.stat = 2;
          this.uploadConent--;
          if (this.unUploadFileList.length == 0&&this.uploadConent==0) {
            this.$Message.success("上传完成!");
            this.addFileRefsh();
          }
        })
        .catch((err) => {
          item.stat = 3;
          this.uploadConent--;
        });
    },
  },
};
</script>

<style lang="less">
.tool-upload-list {
  min-width: 20rem;
  height: 20rem;
  max-height: 13rem;
  .tool-upload-list-body {
    overflow-y: auto;
  }
}
</style>
