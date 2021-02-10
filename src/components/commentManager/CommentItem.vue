<template>
  <Card class="comment-item mb-3">
    <div class="d-flex">
      <Button
        class="comment-item-icon"
        size="small"
        type="error"
        shape="circle"
        icon="md-close"
        @click="deleteComment"
      ></Button>
       <img
        :src="comment.user.icon"
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
      />
      <div>
        <div>
          <router-link class="mr-1 small" :to="articlePath">
            #{{ article.title }}
          </router-link>
          <router-link :to="`/WebUserMore/${comment.user._id}`">
            {{ comment.user.name }}
          </router-link>
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
import articleEnum from "../../script/articleEnum";
export default {
  props: {
    comment: Object,
  },
  data() {
    return {
      article: {},
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.$request
        .commentGetArticleByIdKind(this.comment.articleId, this.comment.kind)
        .then((result) => {
          if (result.flag) {
            this.article = result.data[0];
          }
        })
        .catch((err) => {});
    },
    deleteComment() {
      this.$request
        .commentDeleteById(this.comment._id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$emit("change");
          } else {
            this.$Message.success(result.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
  },
  computed: {
    articlePath() {
      if (this.comment.kind == articleEnum.article) {
        return `/ArticleMore/${this.comment.articleId}`;
      } else if (this.comment.kind == articleEnum.image) {
        return `/ImageMore/${this.comment.articleId}`;
      } else if (this.comment.kind == articleEnum.video) {
        return `/MusicVideoMore/${this.comment.articleId}`;
      }
    },
  },
};
</script>

<style lang="less">
.card-icon {
  object-fit: cover;
  width: 4.5rem;
  height: 4.5rem;
}
.comment-item {
  position: relative;
  .comment-item-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    visibility: hidden;
  }
  &:hover .comment-item-icon {
    visibility: visible;
  }
}
</style>
