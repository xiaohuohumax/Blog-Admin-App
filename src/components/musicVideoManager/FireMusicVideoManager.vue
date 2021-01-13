<template>
  <Content>
    <template #head>
      <Button type="success">提交</Button>
    </template>
    <input type="text" class="w-100 h3 py-3 border-0" placeholder="请输入标题(30字)" />
    <input type="text" class="w-100 h5 py-3 border-0" placeholder="请输入副标题(100字)" />
    <div class="py-3">
      <p class="small mr-2">设置关键字:</p>
      <EnterTags />
    </div>
    <div class="pb-3">
      <p class="small mr-2">添加音视频<span class="text-success">回车Enter添加</span>:</p>
      <EnterVideo />
    </div>
    <div class="pb-3">
      <p class="small mr-2">添加封面<span class="text-success">回车Enter添加</span></p>
      <EnterImage />
    </div>
  </Content>
</template>


<script>
import EnterVideo from "../mode/EnterVideo.vue";
export default {
  components: { EnterVideo },
};
</script>

<style></style>
