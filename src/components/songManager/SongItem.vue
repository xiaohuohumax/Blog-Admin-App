<template>
  <Card class="mb-3">
    <div class="d-flex">
      <img
        :src="song.icon"
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
      />
      <div>
        <router-link :to="`/FireSongManager?id=${song._id}`" class="h6 font-weight-bold">
          {{ song.name }}
        </router-link>
        <div class="small my-1">{{ song.subTitle }}</div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    song: Object,
  },
};
</script>
