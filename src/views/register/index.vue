<template>
  <div class="login">
    <div class="content">
      <div class="title">注册</div>
      <el-form ref="formData" :model="formData" :rules="rules">
        <el-form-item prop="phone">
          <el-input
              placeholder="请输入手机号"
              v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              placeholder="请输入密码"
              v-model="formData.password"
              type="password"
              show-password
              @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
              placeholder="再次输入密码"
              v-model="formData.rePassword"
              type="password"
              show-password
              :validate-event="false"
          ></el-input>
        </el-form-item>
        <router-link to="/login" class="register"
        >已有账号？立即登录</router-link
        >
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="register"
          >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'Register',
  data() {
    // 密码两次输入对比
    var rePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      formData: {
        phone: "",
        password: "",
        rePassword: "",
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
        rePassword: [
          {
            validator: rePass,
          },
        ],
      },
    };
  },
  methods: {
    // 注册
    register() {
      // this.$refs.updateFrom.
      this.$refs["formData"].validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 调用注册接口
        let result = await this.$request({
          url: "/reguser",
          method: "post",
          data: {
            phone: this.formData.phone,
            password: this.formData.password,
          },
        });
        // console.log(result);
        if (result.data.status === 0) {
          this.$message.success(result.data.message);
          this.$router.push("/login");
        } else {
          this.$message.warning(result.data.message);
        }
      });
    },
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
      top: 235px;
      right: 20px;
      font-size: 12px;
    }
  }
}
</style>