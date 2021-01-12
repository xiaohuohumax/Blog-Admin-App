<template>
<div>
    <div class="mb-3">
        <Input suffix="" placeholder="搜索" style="width: 10rem" class="mr-2" />
        <Button icon="ios-search">搜索</Button>
    </div>
    <MusicVideoUpdateItem v-for="(item, index) in 10" :key="index" />
</div>
</template>

<script>
export default {

};
</script>

<style lang="less">
</style>
