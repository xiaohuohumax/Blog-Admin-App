<template>
<Card class="mb-3">
    <div class="h6">
        {{ article.title }}
    </div>
    <div class="small mb-1">
        {{ article.subTitle }}
    </div>
    <div class="small my-2">
        <span class="mr-2">
            <Icon class="mr-1" type="md-eye" />{{ article.watch }}
        </span>
        <span class="mr-2">
            <Icon class="mr-1" type="md-thumbs-up" />{{ article.nice }}
        </span>
        <span class="mr-2">
            <Icon class="mr-1" type="ios-thermometer-outline" />{{ article.love }}
        </span>
        <span>
            <Icon class="mr-1" type="ios-clock-outline" />{{ article.uploadTime }}
        </span>
    </div>
    <div>
        <Button type="success" class="mr-2" ghost size="small">修改</Button>
        <Button type="error" ghost size="small">删除</Button>
    </div>
</Card>
</template>

<script>
export default {
    props: {
        article: Object,
    },
};
</script>

<style>
</style>
