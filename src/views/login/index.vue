<template>
  <div class="login">
    <div class="content">
      <div class="title">登录</div>
      <el-form :model="formData">
        <el-form-item>
          <el-input
              placeholder="请输入邮箱"
              v-model="formData.email"
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
              placeholder="请输入密码"
              v-model="formData.password"
              type="password"
              show-password
              @keyup.enter.native="login"
              clearable
          ></el-input>
        </el-form-item>
        <router-link to="/register/2" class="pa"
        >忘记密码?
        </router-link
        >
        <router-link to="/register/1" class="register"
        >还没有账号？立即注册
        </router-link
        >
        <el-form-item style="margin-bottom: 5px;">
          <el-checkbox v-model="formData.rememberMe" :true-label="1"
          >记住我
          </el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="login"
          >登录
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {emailReg} from "@/utils/Regular";

export default {
  name: "Login",
  data() {
    return {
      // 表单数据
      formData: {
        //
        email: "",
        password: "",
        rememberMe: "",
      },
    };
  },
  methods: {
    async login() {
      if (!this.formData.email || !this.formData.password) {
        return this.$Message.warning('账号密码不能为空');
      }
      if (!emailReg.test(this.formData.email)) {
        return this.$Message.warning('请输入正确的邮箱');
      }
      if (this.formData.password.length < 8 || this.formData.password.length > 20) {
        return this.$Message.warning('密码在8-20位之间');
      }
      let result = await this.$Request('/login', {
        email: this.formData.email,
        password: this.formData.password
      });
      if (result.code !== 200) {
        return this.$Message.warning(result.message,);
      } else {
        // 登录成功
        this.$Message.success('登录成功');
        // 存储token
        localStorage.setItem("token", result.token);
        localStorage.setItem("tokenStartTime", '' + Date.now());
        // 判断是否需要记住密码
        if (this.formData.rememberMe === 1) {
          const account = {
            email: this.formData.email,
            password: this.formData.password,
          }
          localStorage.setItem("account", JSON.stringify(account));
        } else {
          localStorage.removeItem("account");
        }
        // 返回路由
        this.$router.push('/');
      }
    }
  },
  mounted() {
    // 判断用户是否选择的记住账号
    let account = JSON.parse(localStorage.getItem("account"));
    if (account) {
      this.formData.email = account.email;
      this.formData.password = account.password;
      this.formData.rememberMe = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/login-bg.jpg");
  background-size: cover;

  .content {
    position: absolute;
    right: 120px;
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
    .pa{
      color: #333;
      position: absolute;
      top: 180px;
      left: 20px;
      font-size: 12px;
    }
  }
}
</style>
<style>
/*html {*/
/*  overflow-y: hidden !important;*/
/*}*/
</style>