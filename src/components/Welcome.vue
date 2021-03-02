<template>
  <Content>
    <div class="display-4 text-center pt-5">welcome</div>
    <div class="d-flex justify-content-center align-items-center mb-5">
      <Button type="warning" class="mx-1" size="small" to="/FireArticleManager" ghost>发表文章</Button>
      <Button type="success" class="mx-1"  size="small" to="/VirtualFileManager" ghost>虚拟文件</Button>
      <Button class="mx-1"  size="small" to="/FireInformManager">发送通知</Button>
      <Button type="error" class="mx-1"  size="small" to="/BasicSetManager" ghost>网站设置</Button>
    </div>
    <Weather />
  </Content>
</template>

<script>
export default {};
</script>

<style></style>
