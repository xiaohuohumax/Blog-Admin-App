<template>
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<div class="gameUpload">
    <input type="text" class="w-100 h3 py-3 border-0" placeholder="请输入游戏标题(30字)" />
    <input type="text" class="w-100 h5 py-3 border-0" placeholder="请输入游戏副标题(100字)" />
    <div>
        <Steps :current="stepNumber" :status="stepError">
            <Step title="选择游戏源码" content="请选择已经编写好的程序代码"></Step>
            <Step title="打包游戏源码" content="源码打包大概时间(200m-6s)"></Step>
            <Step title="打包已经完成" content="打包完成，准备上传"></Step>
        </Steps>
        <Tabs v-model="stepNumber" class="mt-2" name="tab-gupload">
            <TabPane label="选择源码" tab="tab-gupload">
                <Card class="text-center h-100 p-5">
                    <div class="m-5">
                        <Icon type="ios-analytics" :size="80" class="d-block" />
                        <div class="small text-danger my-2">游戏源码要求(详细要求)</div>
                        <Button type="primary" @click="chooseCode">选择源码文件夹</Button>
                    </div>
                </Card>
            </TabPane>
            <TabPane label="打包源码" tab="tab-gupload">
                <Card class="h-100">
                    <Form label-position="top">
                        <FormItem label="源码路径">
                            <Input readonly :value="codePath"></Input>
                        </FormItem>
                        <FormItem label="源码打包路径">
                            <Input readonly :value="codeZipPath"></Input>
                        </FormItem>
                        <FormItem class="text-center pt-4">
                            <Icon type="ios-analytics" :size="80" class="d-block" />
                            正在打包中，请耐心等待！
                            <Button type="error" @click="codeChange" long ghost>重新选择源码文件夹</Button>
                        </FormItem>
                    </Form>
                </Card>
            </TabPane>
            <TabPane label="准备完成" tab="tab-gupload">
                <Card class="h-100">
                    <Form label-position="top">
                        <FormItem label="源码路径">
                            <Input readonly :value="codePath"></Input>
                        </FormItem>
                        <FormItem label="源码打包路径">
                            <Input readonly :value="codeZipPath"></Input>
                        </FormItem>
                        <FormItem class="pt-4 text-center">
                            <Icon type="ios-analytics" :size="80" class="d-block" />
                            <div class="my-2">游戏源码已经打包完成！</div>
                            <Button type="success" @click="codeChange" long ghost>更换源码</Button>
                        </FormItem>
                    </Form>
                </Card>
            </TabPane>
        </Tabs>
    </div>
    <div class="py-3">
        <p class="small mr-2">
            添加标签<span class="text-success">回车Enter添加</span>
        </p>
        <TagsList v-model="tags" :tagsMax="10" />
    </div>
    <div class="mt-3">
        <Button type="success" @click="dataCeck">提交</Button>
    </div>
</div>
</template>

<script>
let {
    dialog
} = window.require("electron").remote;

let {
    ipcRenderer
} = window.require("electron");

let path = window.require("path");

let fs = window.require("fs");

let mime = window.require("mime");

import compress from "../../script/compress";

import enumData from "../../script/enumData";

import tools from "../../script/tools";

export default {
    data() {
        return {
            codePath: "",
            compressPathAdd: "gameZipCache",
            stepNumber: 0,
            stepError: "process",
            file: "",
            title: "",
            subTitle: "",
            tags: [],
        };
    },
    methods: {
        chooseCode() {
            this.codePath = dialog.showOpenDialogSync({
                properties: ["openDirectory", "multiSelections"],
            });
            if (!this.codePath) return;
            this.codePath = this.codePath.toString(); // object -> string

            if (!fs.existsSync(path.join(this.codePath, "index.html"))) {
                return this.$Message.error("源码中未检测到 index.html !");
            }
            this.stepNumber++;
            this.codeZip();
        },
        codeChange() {
            this.stepNumber = 0;
            this.file = "";
        },
        codeZip() {
            fs.existsSync(this.compressPath) ? "" : fs.mkdirSync(this.compressPath);

            compress
                .compress(this.codePath, this.codeZipPath)
                .then(() => {
                    this.getFile(this.codeZipPath);
                    this.stepNumber++;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 将文件转为 File 对象
        getFile(zipPath) {
            let data = fs.readFileSync(zipPath);
            let name = path.basename(zipPath);
            this.file = new File([data], name, {
                type: mime.getType(zipPath),
            });
        },
        dataCeck() {
            if (
                this.file != "" &&
                this.title != "" &&
                this.subTitle != "" &&
                this.tags.length != 0
            ) {
                alert('true')
            } else {
                alert('false')
            }

        },
    },

    mounted() {},
    computed: {
        // 源码压缩文件缓存文件夹地址
        compressPath() {
            return path.join(
                ipcRenderer.sendSync(enumData.AppPath),
                this.compressPathAdd
            );
        },
        // 源码压缩文件缓存文件地址
        codeZipPath() {
            return path.join(this.compressPath, `${tools.getTimeStamp()}.tar`);
        },
    },
};
</script>

<style lang="less">
.gameUpload {
    .ivu-tabs-bar {
        display: none !important;
    }

    .ivu-form-item {
        margin-bottom: 1rem !important;
    }

    .ivu-form-item-label {
        margin-bottom: 0 !important;
    }
}
</style>
