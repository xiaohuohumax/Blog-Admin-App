<template>
<Content>
    <template #head>
        <Input suffix="" placeholder="搜索" style="width: 10rem" class="mr-2" />
        <Button icon="ios-search">搜索</Button>
    </template>
    <Page :total="100" class="small" />
    <ArticleItem v-for="(item, index) in articles" :key="index" :article="item" />
</Content>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
        };
    },
    created() {
        this.$request
            .articleFind()
            .then((res) => {
                this.articles = res;
            })
            .catch((err) => console.log(err));
    },
};
</script>

<style>
</style>
