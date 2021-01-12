<template>
<Content>
    <template #head>
        <Input class="mr-2" placeholder="文章" style="width: 10rem" />
        <Button icon="ios-search">搜索</Button>
    </template>
    <Page :total="100" class="small" />
    <WebUserItem v-for="(item, index) in 10" :key="index" />
</Content>
</template>

<script>
export default {};
</script>

<style>
</style>
