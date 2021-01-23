<template>
  <div class="tools d-flex flex-column">
    <!-- @mouseover="isShow = true" @mouseout="isShow = false" -->
    <!-- <Button icon="md-cog" shape="circle" size="large" v-show="!isShow"></Button> -->
    <!-- <div class="border border-danger" v-show="isShow"></div> -->
    <toolUploadList />
    <toolUploadFileMini />
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
}
</style>
