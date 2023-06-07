<template>
  <div class="login">
    <div class="content">
      <div class="title" v-if="$route.params.type === '1'">注册</div>
      <div class="title" v-else>重置密码</div>
      <el-form ref="formData" :model="formData" :rules="rules">
        <el-form-item prop="email">
          <el-input
              placeholder="请输入邮箱"
              v-model="formData.email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
              placeholder="请输入验证码"
              v-model="formData.captcha"
              style="width: 260px;"
          ></el-input>
          <div class="send size" v-if="canSend" @click="sendCaptcha">发送验证码</div>
          <div v-show="!canSend" class="ban size">剩余{{ captchaSecond }}秒</div>
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
                     v-if="$route.params.type === '1'"
        >已有账号？立即登录
        </router-link
        >
        <router-link to="/login" class="register"
                     v-else
        >去登陆？
        </router-link
        >
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="register" v-if="$route.params.type === '1'"
          >注册
          </el-button>
          <el-button type="primary" :style="{ width: '100%' }" @click="register" v-else>
            重置密码
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {captchaReg, emailReg, passwordReg} from "@/utils/Regular";

export default {
  name: 'Register',
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
        email: "",
        captcha: "",
        password: "",
        rePassword: "",
      },
      canSend: true, // 是否可以发送验证码请求
      captchaSecond: 0,// 倒计时剩余秒数
      timer: null, // 定时器
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
        captcha: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: captchaReg,
            message: "验证需为6位整数",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            pattern: passwordReg,
            message: "密码至少8位且必有数字+特殊字符+字母",
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
        // 注册
        // 调用注册接口
        let result = await this.$Request('/register', {
          email: this.formData.email,
          password: this.formData.password,
          repassword: this.formData.rePassword,
          captcha: this.formData.captcha,
          type:this.$route.params.type
        });
        if (result.code === 200) {
          if (this.$route.params.type === '1') {
            this.$Message.success('注册成功');
          } else {
            this.$Message.success('重置成功');
          }
          this.$router.push("/login");
        } else {
          this.$Message.warning(result.message);
        }
      });

    },
    // 发送验证码
    async sendCaptcha() {
      let result = await this.$Request('/email/send', {email: this.formData.email});
      if (result.code === 200) {
        this.captchaSecond = 60;
        this.canSend = false;
        this.timer = setInterval(() => {
          this.captchaSecond -= 1;
        }, 1000);
      } else {
        console.log(result)
        this.$Message.warning(result.desc);
      }
    },
  },
  watch: {
    captchaSecond: function () {
      if (this.captchaSecond == 0) {
        clearInterval(this.timer);
        this.timer = null;
        this.canSend = true;
        this.captchaSecond = 60;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
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
      top: 300px;
      right: 20px;
      font-size: 12px;
    }

    .size {
      flex: 1;
      min-width: 70px;
      margin: 0 0 0 8px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      height: 40px;
    }

    .send {
      cursor: pointer;
      background: #409EFF;
    }

    .ban {
      background: #aaa;
      cursor: no-drop;
    }

    :deep(.el-form-item__content) {
      display: flex;
    }
  }
}
</style>