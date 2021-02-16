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
import "tinymce/plugins/imagetools";
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
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/searchreplace";
import "../../assets/tinymce/importword/index.js";

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
        emoticons_database_url: "/emojis.js",
        menubar: false, // 禁用菜单
        plugins: [
          "link",
          "lists",
          "image",
          "code",
          "table",
          "wordcount",
          "media",
          "insertdatetime",
          "searchreplace",
          "imagetools",
          "importword",
        ], // 插件
        toolbar: [
          // 界面布局
          "bold  italic  underline strikethrough | forecolor backcolor | alignleft  aligncenter  alignright alignjustify | cut copy paste | table tabledelete",
          "outdent indent | blockquote subscript superscript|  undo redo |   link unlink | image media |  removeformat | quickbars | code | importword",
          "formatselect | fontselect | fontsizeselect  | bullist numlist | insertdatetime |searchreplace ",
          // " | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
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
/* .tox-dialog--width-lg {
  height: auto !important;
  max-width: 480px !important;
}*/
.tox-dialog-wrap__backdrop {
  display: none !important;
}
.tox-dialog {
  margin: 4rem !important;
  border: 1px solid red i !important;
}
/* .tox {
  z-index: 100 !important;
} */
</style>
