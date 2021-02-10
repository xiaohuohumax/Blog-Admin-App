<template>
  <Card class="mb-3">
    <div class="d-flex">
      <img :src="article.icon" class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0" />
      <div>
        <router-link :to="`/ArticleMore/${article._id}`">{{ article.title }}</router-link>
        <div class="small my-1">{{ article.subTitle }}</div>
        <div class="small mt-2">
          <Icon class="mr-1" type="md-eye" />{{ article.watch }}
          <Icon class="mr-1" type="md-thumbs-up" />{{ article.nice }}
          <Icon class="mr-1" type="ios-thermometer-outline" />{{ article.love }}
          <Icon class="mr-1" type="ios-clock-outline" />
          <Time :time="article.uploadTime" type="datetime" />
        </div>
      </div>
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
.card-icon {
  object-fit: cover;
  width: 4.5rem;
  height: 4.5rem;
}
</style>
