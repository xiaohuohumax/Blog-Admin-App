<template>
  <Card class="mb-3">
    <div class="d-flex">
       <img
        :src="image.icon"
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
      />
      <div>
        <router-link :to="`/ImageMore/${image._id}`">{{ image.title }}</router-link>
        <div class="small my-1">{{ image.subTitle }}</div>
        <div class="small mt-2">
          <Icon class="mr-1" type="md-eye" />{{ image.watch }}
          <Icon class="mr-1" type="md-thumbs-up" />{{ image.nice }}
          <Icon class="mr-1" type="ios-thermometer-outline" />{{ image.love }}
          <Icon class="mr-1" type="ios-clock-outline" />
          <Time :time="image.uploadTime" type="datetime" />
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    image: Object,
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
