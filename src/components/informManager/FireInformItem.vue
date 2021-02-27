<template>
  <Alert class="mt-2" :type="inform.kind" show-icon>
    {{ inform.title }}
    <div slot="desc" class=" font-weight-bold">
      {{ inform.desc }}
      <div class="small">发送时间: <Time :time="inform.time" type="datetime" /></div>
    </div>
  </Alert>
</template>

<script>
export default {
  props: {
    inform: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
