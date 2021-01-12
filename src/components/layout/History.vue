<template>
  <div class="history d-flex align-items-center px-2 pb-2">
    <ButtonGroup size="small" class="flex-shrink-0 flex-grow-0 mr-3">
      <Button  @click="$router.go(-1)">
        <Icon type="ios-arrow-back" />
      </Button>
      <Button @click="$router.go(1)">
        <Icon type="ios-arrow-forward" />
      </Button>
    </ButtonGroup>
    <div class="">
      <Tag v-for="(item, index) in history" :key="index" closable @on-close="removeHistory(index)">
          <router-link :to="item.path">{{ item.name }}</router-link>
      </Tag>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["removeHistory"]),
  },
  computed: {
    ...mapState(["history"]),
  },
};
</script>

<style>
</style>