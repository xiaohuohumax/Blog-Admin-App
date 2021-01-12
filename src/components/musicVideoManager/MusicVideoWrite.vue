<template>
<div class="musicVideoWrite">
    <div class="px-3 pb-3">
        <input type="text" class="w-100 h3 py-3 border-0" placeholder="请输入标题(30字)" />
        <input type="text" class="w-100 h5 py-3 border-0" placeholder="请输入副标题(100字)" />
        <div class="py-3">
            <p class="small mr-2">设置关键字:</p>
            <TagsList v-model="bokeKeywords" :tagsMax="10" />
        </div>
        <div class="pb-3">
            <p class="small mr-2">
                添加音视频<span class="text-success">回车Enter添加</span>:
            </p>
            <Input v-if="!videoOK" icon="md-link" placeholder="请输入音视频URL(Enter确认)" style="width: 20rem" v-model.trim="videoInput" @on-enter="videoAdd" />
            <div v-if="videoOK" class="d-flex align-items-center my-2 position-relative">
                <Button class="video-remove position-absolute font-weight-bold" type="error" shape="circle" icon="ios-close" @click="videoRemove"></Button>
                <video :src="videoInput" class="w-50 rounded" controls></video>
            </div>
        </div>
        <div class="pb-3">
            <p class="small mr-2">
                添加封面<span class="text-success">回车Enter添加</span>
            </p>
            <EnterImage v-model="icon" :imageMax="1" />
        </div>
        <div class="">
            <Button type="success">提交</Button>
        </div>
    </div>
</div>
</template>

<script>
import request from "../../script/request";

export default {
    data() {
        return {
            bokeKeywords: [],
            videoInput: "",
            videoOK: false, // 是否成功
            icon: []
        };
    },
    methods: {
        videoAdd() {
            if (this.videoInput == "") {
                return this.$Message.error("链接不能为空呦!");
            }
            this.$Message.success("链接检查中!");
            request
                .isUrlRight(this.videoInput)
                .then(() => {
                    this.videoOK = true;
                })
                .catch(() => {
                    this.videoOK = false;
                    this.$Message.error("URL找不到呀!");
                });
        },
        videoRemove() {
            this.videoOK = false;
            this.videoInput = "";
        },
    },
};
</script>

<style lang="less">
.writeUpdataArticle-image-list {
    min-height: 8rem;
    min-width: 8rem;
    padding: 5px;

    .writeUpdataArticle-image-remove {
        visibility: hidden;
    }

    &:hover .writeUpdataArticle-image-remove {
        visibility: visible;
    }
}

.video-remove {
    top: 1rem;
    left: 1rem;
    z-index: 10;
}
</style>
