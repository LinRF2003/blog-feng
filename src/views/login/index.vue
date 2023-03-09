<template>
  <div class="login">
    <div class="content">
      <div class="title">登录</div>
      <el-form ref="formData" :model="formData" :rules="rules">
        <el-form-item prop="email">
          <el-input
              placeholder="请输入邮箱"
              v-model="formData.email"
              @keyup.enter.native="login"
              :validate-event='false'
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              placeholder="请输入密码"
              v-model="formData.password"
              type="password"
              show-password
              @keyup.enter.native="login"
              clearable
              :validate-event='false'
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
import {emailReg, passwordReg} from "@/utils/Regular";

export default {
  name:"Login",
  data() {
    return {
      // 表单数据
      formData: {
        email: "",
        password: "",
        rememberMe: "",
      },
      // 表单验证规程
      rules: {
        email: [
          {
            required: true,
            message: "邮箱不能为空",
          },
          {
            pattern: emailReg,
            message: "邮箱格式不正确",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            pattern:  passwordReg,
            message: "密码至少8位且必有数字+特殊字符+字母",
          },

        ],
      },
    };
  },
  methods: {
    login(){
      this.$refs["formData"].validate(async (valid) => {
        console.log(1)
      })
    }
  }
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
    right: 100px;
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
/*html {*/
/*  overflow-y: hidden !important;*/
/*}*/
</style>