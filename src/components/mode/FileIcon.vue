<template>
  <div class="file-icon cursor-pointer" @click="$emit('intodir')">
    <img class="file-icon-img w-100 rounded" :src="imgUrl" v-if="isImage" />
    <svg v-else width="100%" height="100%" viewBox="0 0 128 128">
      <path
        :fill="circleColor"
        d="M0,85.76a41.6,41.6,0,1,0,41.6-41.6A41.59,41.59,0,0,0,0,85.76Z"
        transform="translate(0 0)"
      />
      <path
        :fill="borderColor"
        d="M110.4,128h-80a17.64,17.64,0,0,1-17.6-17.6V17.6A17.64,17.64,0,0,1,30.4,0H94.94a11.18,11.18,0,0,1,7.91,3.2l23.71,23.71A4.78,4.78,0,0,1,128,30.4v80A17.64,17.64,0,0,1,110.4,128ZM30.4,9.6a8,8,0,0,0-8,8v92.8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8h0v-78L96,10a1.62,1.62,0,0,0-1.06-.38Z"
        transform="translate(0 0)"
      />
      <text v-if="isUnknow" :fill="textColor" class="file-unknow" x="70" y="90">?</text>
      <text v-else :fill="textColor" class="file-suffix" x="70" y="74">
        {{ fileSuffix }}
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    kind: {
      // 文件类型 dir file
      type: String,
      default: "",
    },
    name: {
      // 文件名
      type: String,
      default: "",
    },
    url: {
      // 资源路径
      type: String,
      default: "",
    },
  },
  data() {
    return {
      borderColor: "#3b8da1d7", // 边框颜色
      circleColor: "#d3efde", // 左下角圆颜色
      textColor: "tomato", // 文字颜色
      textMaxShow: 5, // 文字最多显示位数
      imageRule: ["png", "jpg", "jpeg", "jif", "svg"], // 图片类型识别
    };
  },

  computed: {
    isImage() {
      return this.kind == "dir" || this.imageRule.includes(this.fileSuffix);
    },
    isUnknow() {
      return this.kind != "dir" && this.fileSuffix == "";
    },
    fileSuffix() {
      let index = this.name.lastIndexOf(".");
      if (index == -1) return "";
      return this.name.substring(index + 1, this.textMaxShow + index + 1).trim();
    },
    imgUrl() {
      return this.kind == "dir" ? "/image/fileIcon/dir.png" : this.url;
    },
  },
};
</script>

<style lang="less">
.file-icon {
  .file-icon-img {
    object-fit: cover;
    color: #3b8da1d7;
  }

  .file-suffix {
    font-size: 36px;
    font-weight: 900;
    line-height: 36px;
    text-anchor: middle;
  }
  .file-unknow {
    font-size: 70px;
    font-weight: 900;
    line-height: 70px;
    text-anchor: middle;
  }
}
</style>
