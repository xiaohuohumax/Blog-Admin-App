<template>
  <div class="d-flex align-items-center mt-2">
    <RadioGroup class="mr-2" v-model="color" @on-change="$emit('input', color)">
      <Radio
        :label="item.color"
        v-for="(item, index) in definearray"
        :key="index"
        :style="`color:${item.color}`"
      >
        {{ item.name }}
      </Radio>
    </RadioGroup>
    <ColorPicker v-model="color" alpha @on-change="$emit('input', color)" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "#6B9AC4",
    },
    definearray: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      color: "",
    };
  },
  created() {
    this.color = this.value;
  },
};
</script>

<style lang="less">
.enter-video-item {
  position: relative;
  .enter-video-img {
    width: 6rem;
    height: 6rem;
  }
  &:hover .enter-video-icon {
    visibility: visible;
  }
  .enter-video-icon {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    visibility: hidden;
    z-index: 10;
  }
}
</style>
