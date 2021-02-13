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
