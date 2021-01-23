<template>
  <toolItemModel icon="md-cog">
    <VirtualFileManager class="tool-upload-file-mini" />
  </toolItemModel>
</template>

<script>
export default {};
</script>

<style lang="less">
.tool-upload-file-mini {
  min-height: 20rem;
  min-width: 30rem;
  .ivu-card {
    border: none !important;
    .ivu-card-body {
      padding: 0 !important;
    }
  }
}
</style>
