<template>
<div class="">
    <div v-if="images.length < imageMax">
        <Input icon="md-link" placeholder="请输入图片URL(Enter确认)" style="width: 20rem" v-model.trim="imageInput" @on-enter="enterImage" />
        <span v-if="imageMax != 1">
            {{ `${images.length}/${imageMax}` }}
        </span>
    </div>
    <div class="mt-2">
        <div v-for="(item, index) in images" :key="index" class="enter-image-body border p-5 d-inline-block position-relative rounded mb-2 mr-2" :style="getStyle(item)">
            <Button @click="imageRemove(index)" size="small" class="enter-image-remove position-absolute" type="error" shape="circle" icon="md-close"></Button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        images: Array,
        imageMax: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            imageInput: "",
        };
    },
    model: {
        prop: "images",
        event: "vmodel",
    },
    methods: {
        enterImage() {
            this.$request
                .isUrlRight(this.imageInput)
                .then(() => {
                    this.images.push(this.imageInput);
                    this.imageInput = "";
                    this.$emit("vmodel", this.images);
                })
                .catch(() => {
                    this.$Message.error("URL找不到呀!");
                });
        },
        getStyle(imageUrl) {
            return {
                background: `url('${imageUrl}') center / cover`,
            };
        },
        imageRemove(index) {
            this.images.splice(index, 1);
        },
    },
};
</script>

<style lang="less">
.enter-image-body {
    &:hover .enter-image-remove {
        visibility: visible;
    }

    .enter-image-remove {
        visibility: hidden;
        left: 0.25rem;
        top: 0.25rem;
    }
}
</style>
