<template>
  <Card class="mb-3">
    <div class="d-flex">
      <div
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
        :style="cardIconStyle"
      ></div>
      <div>
        <div>
          <router-link to="/CommentMore">{{ comment.user.name }}</router-link>
          <span class="ml-2 small">lv{{ comment.user.level }}</span>
          <span class="ml-2 small">{{ comment.user.genger }}</span>
        </div>
        <div class="small my-1">{{ comment.message }}</div>
        <div class="small mt-2">
          <Icon class="mr-1" type="md-thumbs-up" />{{ comment.nice }}
          <Icon class="mr-1" type="ios-clock-outline" />
          <Time :time="comment.uploadTime" type="datetime" />
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
  computed: {
    cardIconStyle() {
      return `backgrond:url('${this.comment.user.icon}') center / cover;`;
    },
  },
};
</script>

<style>
.card-icon {
  width: 4.5rem;
  height: 4.5rem;
}
</style>
