<template>
  <Content :loading="loading">
    <template #head>
      <Button type="success" ghost class="mr-2" to="/ImageManager">返回列表</Button>
      <Button
        type="primary"
        ghost
        class="mr-2"
        :to="`/FireImageManager?id=${$route.params.id}`"
        >修改图包</Button
      >
      <Button type="error" ghost class="mr-2" @click="remove">删除图包</Button>
    </template>
    <div class="text-center my-3">
      <div class="h4">{{ content.title }}</div>
      <div class="small my-2">
        {{ content.subTitle }}
      </div>
      <div class="flex-center">
        <Icon type="md-eye" class="mr-1" /> {{ content.watch }}
        <Icon type="md-happy" class="ml-2 mr-1" /> {{ content.nice }}
        <Icon type="md-heart" class="ml-2 mr-1" /> {{ content.love }}
      </div>
      <div class="mt-2">
        <Tag
          type="border"
          color="success"
          v-for="(item, index) in content.tags"
          :key="index"
        >
          {{ item }}
        </Tag>
      </div>
    </div>

    <div class="text-center">
      <img
        class="w-75 rounded mt-3"
        :src="item"
        v-for="(item, index) in content.icons"
        :key="index"
      />
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,

      content: {},
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.loading = 1;
      this.$request
        .imageFindbyid(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.content = result.data[0];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .imageDeleteById(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/ImageManager");
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
  },
};
</script>

<style></style>
