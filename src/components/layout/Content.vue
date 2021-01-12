<template>
<div class="content">
    <div class="sticky-top py-1" v-show="this.$slots.head">
        <div class="content-head">
            <div :class="headOpen ? '' : 'content-head-body-close'" class="content-head-body bg-white p-2 rounded-right shadow-sm">
                <div class="">
                    <slot name="head" />
                </div>
                <Button class="content-head-body-icon bg-white" type="success" size="small" ghost shape="circle" icon="ios-analytics-outline" @click="HeadOpenChange"></Button>
            </div>
        </div>
    </div>
    <Card class="m-2">
        <slot />
    </Card>
</div>
</template>

<script>
export default {
    data() {
        return {
            headOpen: true,
        };
    },
    created() {
        console.log()
    },
    methods: {
        HeadOpenChange() {
            this.headOpen = !this.headOpen;
        },
    },
};
</script>

<style lang="less">
.content {
    .content-head {
        position: relative;
        right: 100%;

        .content-head-body {
            position: relative;
            left: 100%;
            transition: all linear 1s;

            .content-head-body-icon {
                position: absolute;
                top: 50%;
                transition: all linear 1s;
                transform: translate(0, -50%);
                right: 1rem;
            }
        }

        .content-head-body-close {
            left: 0;

            .content-head-body-icon {
                transform: translate(100%, -50%);
                right: -1rem;
            }
        }

    }
}
</style>
