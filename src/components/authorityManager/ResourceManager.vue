<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2">返回详细</Button>
      <Button class="mr-2">返回列表</Button>
      <Button type="success">发布</Button>

      <Button class="mr-2" type="success">更新</Button>
      <Button type="error" ghost>删除</Button>
    </template>
  </Content>
</template>

<script>
export default {};
</script>

<style></style>
