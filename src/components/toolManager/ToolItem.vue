<template>
  <Card class="mb-3">
    <div class="d-flex">
      <img
        :src="tool.icon"
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
      />
      <div>
        <router-link :to="`/ToolMore/${tool._id}`">{{ tool.title }}</router-link>
        <div class="small my-1">{{ tool.subTitle }}</div>
        <div class="small mt-2">
          <Icon class="mr-1" type="md-eye" />{{ tool.watch }}
          <Icon class="mr-1" type="md-thumbs-up" />{{ tool.nice }}
          <Icon class="mr-1" type="ios-thermometer-outline" />{{ tool.love }}
          <Icon class="mr-1" type="ios-clock-outline" />
          <Time :time="tool.uploadTime" type="datetime" />
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    tool: Object,
  },
};
</script>
