<template>
  <div class="tools" @mouseover="isShow = true" @mouseout="isShow = false">
    <Button icon="md-cog" shape="circle" size="large" v-show="!isShow"></Button>
    <ButtonGroup vertical size="large" v-show="isShow">
      <Button icon="logo-facebook"></Button>
      <Button icon="logo-twitter"></Button>
      <Button icon="logo-googleplus"></Button>
      <Button icon="logo-tumblr"></Button>
    </ButtonGroup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    };
  }
};
</script>
<style lang="less">
</style>