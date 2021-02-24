<template>
  <Card class="mb-3">
    <div class="d-flex">
      <img
        :src="playlist.icon"
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
      />
      <div>
        <router-link
          :to="`/FirePlayListManager?id=${playlist._id}`"
          class="h6 font-weight-bold"
        >
          {{ playlist.title }}
        </router-link>
        <div class="small my-1">{{ playlist.subTitle }}</div>
        <div class="small my-1">歌曲数[{{ playlist.songs.length }}]</div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    playlist: Object,
  },
};
</script>
