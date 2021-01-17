<template>
  <div class="login text-center">
    <div
      class="login-control d-flex align-items-center justify-content-end p-2 text-success"
    >
      <div class="login-drag w-100 h-100"></div>
      <div class="login-no-drag">
        <Icon
          @click="controlSmall"
          title="最小化"
          size="20"
          class="mr-3"
          type="md-remove"
        />
        <Icon @click="controlQuit" title="退出" size="20" type="md-close" />
      </div>
    </div>
    <div class="login-body mx-5 d-inline-block">
      <img
        :src="icon"
        class="login-icon rounded-circle border shadow d-inline-block mb-3"
      />
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input
            prefix="md-contact"
            type="text"
            v-model="formInline.user"
            placeholder="Username"
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            @keydown.enter.native="handleSubmit('formInline')"
            prefix="md-code-working"
            type="password"
            v-model="formInline.password"
            placeholder="Password"
          />
        </FormItem>
        <div class="mb-2 d-flex justify-content-between">
          <Checkbox v-model="formInline.remember">记住密码</Checkbox>
          <Checkbox v-model="formInline.autoLogin">自动登录</Checkbox>
        </div>
        <Button type="success" long @click="handleSubmit('formInline')">登录</Button>
      </Form>
    </div>
  </div>
</template>

<script>
let { remote } = window.require("electron");
let win = remote.getCurrentWindow();

import { mapMutations } from "vuex";
export default {
  data() {
    return {
      icon: "",
      defineIcon: require("@/assets/userIcon.jpg"),
      formInline: {
        user: "",
        password: "",
        remember: false,
        autoLogin: false,
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "密码必须大于6位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    "formInline.user"() {
      this.getIcon();
    },
  },
  mounted() {
    this.icon = this.defineIcon;
  },
  created() {
    this.changeSize();
  },
  methods: {
    ...mapMutations(["userLogin"]),
    changeSize() {
      win.setMinimumSize(300, 360);
      win.setSize(300, 360);
      win.center();
      win.setResizable(false);
    },
    controlSmall() {
      win.minimize();
    },
    controlQuit() {
      win.close();
    },
    login() {
      this.$request
        .adminuserlogin(this.formInline.user, this.formInline.password)
        .then((result) => {
          if (result.flag) {
            // 登录成功
            this.userLogin(result); // 添加信息
            this.$router.push("/Welcome");
            this.$Message.success(`[${result.inf.name}]欢迎回来!`);
          } else {
            this.$Message.error(result.inf);
          }
        })
        .catch((err) => this.$Message.error("登录失败!"));
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login();
        }
      });
    },
    getIcon() {
      this.$request
        .adminByNameFindIcon(this.formInline.user)
        .then((result) => {
          if (result.flag) {
            this.icon = result.icon;
          } else {
            this.icon = this.defineIcon;
          }
        })
        .catch((err) => (this.icon = this.defineIcon));
    },
  },
};
</script>

<style lang="less">
.login {
  position: relative;

  .login-control {
    position: relative;

    .login-drag {
      position: absolute;
      left: 0;
      top: 0;
      -webkit-app-region: drag;
      z-index: -1;
    }

    .login-no-drag {
      -webkit-app-region: no-drag;
    }
  }

  .login-icon {
    width: 6rem;
    height: 6rem;
  }
}
</style>
