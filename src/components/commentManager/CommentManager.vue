<template>
<Content>
    <template #head>
        <Input class="mr-2" placeholder="文章" style="width: 10rem" />
        <DatePicker type="date" class="mr-2" placeholder="起始日期" style="width: 10rem"></DatePicker>
        <DatePicker type="date" class="mr-2" placeholder="结束日期" style="width: 10rem"></DatePicker>
        <Button icon="ios-search">搜索</Button>
    </template>
    <Page :total="100" class="small" />

    <CommentItem v-for="(item, index) in 10" :key="index" />
</Content>
</template>

<script>
export default {};
</script>

<style>
</style>
