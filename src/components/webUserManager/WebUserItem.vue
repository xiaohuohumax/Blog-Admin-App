<template>
<div class="webUser">
    <Card class="mb-3">
        <div class="d-flex">
            <div class="flex-shrink-0 px-2">
                <img class="web-user-icon d-inline-block border rounded-circle" src="../../assets/userIcon.jpg" />
            </div>
            <div class="flex-grow-1 ml-2 font-weight-bold">
                <div class="h6 font-weight-bold">
                    {{ userInfo.name }}
                    <span class="small ml-2">{{ userInfo.signature }}</span>
                </div>
                <Row type="flex" class="small">
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">性别:</span>{{ userInfo.gender }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">等级:</span>{{ userInfo.level }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">上次登录:</span>{{ userInfo.lastLoginTime }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">上次登录IP:</span>{{ userInfo.lastLoginIP }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">注册使用IP:</span>{{ userInfo.logonIP }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">注册日期:</span>{{ userInfo.logonTime }}
                    12:09.00
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">用户ID:</span>{{ userInfo.userID }}
                    12:09.00
                    </Col>
                </Row>
                <div class="">
                    <Button type="success" ghost size="small">详细</Button>
                </div>
            </div>
        </div>
    </Card>
</div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                name: "XIAOHUOHU", // 昵称
                icon: require("../../assets/logo.png"), // 头像
                signature: "一条侧躺的咸鱼)", // 个性签名
                gender: "man/woman/other", // 性别
                level: "lv6", // 等级
                lastLoginTime: "2020-09-12 12:09.00", // 上次登录时间
                // isCanlogin: true, // 能否登录
                // isCanSendMessage: true, // 能否发送消息
                lastLoginIP: "192.168.1.1", // 上次登陆 IP
                logonIP: "192.168.1.1", // 注册IP
                logonTime: "2020-09-12 12:09.00", // 注册时间
                userID: "10222212", // 用户ID
            },
        };
    },

    computed: {
        getMoreInfo() {
            return;
        },
    },
};
</script>

<style lang="less">
.webUser {
    .web-user-icon {
        width: 4rem;
        height: 4rem;
    }

    .ivu-collapse-content,
    .ivu-collapse-header {
        padding: 0 !important;

        .ivu-icon.ivu-icon-ios-arrow-forward {
            margin: 0 !important;
        }
    }
}
</style>
