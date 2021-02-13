<template>
  <div class="">
    <Editor id="tinymce" v-model="val" :init="editorInit"></Editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme.min";
import "tinymce/icons/default";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/media";
import "tinymce/plugins/quickbars";

export default {
  components: {
    Editor,
  },
  props: {
    value: String,
  },

  watch: {
    value(val) {
      this.val = val;
    },
    val() {
      this.$emit("input", this.val);
    },
  },

  created() {
    this.val = this.value;
  },

  data() {
    return {
      val: "",
      editorInit: {
        language_url: "/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        menubar: false, // 禁用菜单
        plugins: ["link", "lists", "image", "code", "table", "wordcount", "media"], // 插件
        toolbar: [
          // 界面布局
          "bold  italic  underline strikethrough | forecolor backcolor | alignleft  aligncenter  alignright alignjustify | cut copy paste",
          "outdent indent | blockquote subscript superscript|  undo redo |   link unlink | image media |  removeformat | quickbars",
          "formatselect | fontselect | fontsizeselect  | bullist numlist",
        ],
        height: 500,
        branding: false,
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
};
</script>

<style>
.tox-dialog--width-lg {
  height: auto !important;
  max-width: 480px !important;
}
.tox-dialog-wrap__backdrop {
  display: none !important;
}
.tox {
  z-index: 100 !important;
}
</style>
