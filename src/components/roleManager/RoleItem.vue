<template>
  <Card class="mb-3">
    <router-link :to="`/FireRoleManager?id=${role._id}`" class="h6 font-weight-bold">
      {{ role.name }}
    </router-link>
    <div>
      <div class="my-1">授权码: {{ role.code }}</div>
      <div>拥有资源数: {{ role.resources.length }}</div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    role: Object,
  },
};
</script>
