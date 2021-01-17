<template>
  <Card class="mb-3">
    <iframe
      :src="toolUrl"
      frameborder="0"
      id="iframe"
      class="w-100"
      scrolling="no"
    ></iframe>
  </Card>
</template>

<script>
export default {
  props: {
    toolUrl: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.addListener();
  },
  methods: {
    addListener() {
      window.addEventListener("message", function (event) {
        var data = event.data;
        if (!data.height) return;
        document.getElementById("iframe").height = data.height;
      });
    },
  },
};
</script>

<style></style>
