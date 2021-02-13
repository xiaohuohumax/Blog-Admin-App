<template>
  <div class="tools d-flex flex-column">
    <toolUploadList v-if="$authres(['view_righttool_uploadlist'])" />
    <toolUploadFileMini v-if="$authres(['view_righttool_uploadfilemini'])" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
};
</script>
<style lang="less">
.tools {
  z-index: 9999;
  position: relative;
}
</style>
