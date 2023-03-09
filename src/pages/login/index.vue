<template>
  <div class="login">
    <div class="content">
      <div class="title">登录</div>
      <el-form ref="formData" :model="formData" :rules="rules">
        <el-form-item prop="phone">
          <el-input
              placeholder="请输入手机号"
              v-model="formData.phone"
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              placeholder="请输入密码"
              v-model="formData.password"
              type="password"
              show-password
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <router-link to="/register" class="register"
        >还没有账号？立即注册</router-link
        >
        <el-form-item>
          <el-checkbox v-model="formData.rememberMe" :true-label="1"
          >记住我</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="login"
          >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      formData: {
        phone: "",
        password: "",
        rememberMe: "",
      },

      // 表单验证规程
      rules: {
        phone: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码不正确",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            min: 6,
            max: 20,
            message: "密码在6 - 20位之间",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    login() {
      // this.$refs.updateFrom.
      this.$refs["formData"].validate(async (valid) => {
        if (!valid) {
          return;
        }

        let result = await this.$request({
          url: "/login",
          method: "post",
          data: {
            phone: this.formData.phone,
            password: this.formData.password,
          },
        });

        if (result.data.status === 0) {
          // this.$store.dispatch("getUserInfo");
          const token = result.data.token;
          // 存储token开始时间
          window.localStorage.setItem("tokenStartTime", new Date().getTime());
          // 成功登录添加token标识，才可进入其他页面
          window.localStorage.setItem("token", token);

          // 用户选择记住账户密码
          if (this.formData.rememberMe === 1) {
            window.localStorage.setItem(
                "userinfo",
                JSON.stringify({
                  phone: this.formData.phone,
                  password: this.formData.password,
                })
            );
          } else {
            window.localStorage.removeItem("userinfo");
          }
          this.$message.success(result.data.message);
          this.$store.commit("logout", true); // 首次登录首页需要重新刷新
          this.$router.push("/");
        } else {
          this.$message.warning(result.data.message);
        }
      });
    },
    // 判断用户之前是否进行记住密码的操作
    getUserInfo() {
      let userinfo = JSON.parse(localStorage.getItem("userinfo"));

      if (userinfo) {
        this.formData.phone = userinfo.phone;
        this.formData.password = userinfo.password;
        this.formData.rememberMe = 1;
      }
    },
  },
  mounted() {
    // 获取是否记住了账号密码
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped >
.login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/login-bg.jpg");
  background-size: cover;
  .content {
    position: absolute;
    right: 200px;
    top: 150px;
    width: 350px;
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px #ddd;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .register {
      color: #333;
      position: absolute;
      top: 180px;
      right: 20px;
      font-size: 12px;
    }
  }
}
</style>
<style >
html {
  overflow-y: hidden !important;
}
</style>