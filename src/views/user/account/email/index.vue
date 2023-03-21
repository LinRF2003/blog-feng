<template>
  <div>
    <el-form
        ref="formData"
        :model="formData"
        label-width="120px"
        class="form"
        :rules="rules"
        :hide-required-asterisk="true"
    >
      <el-form-item label="输入新邮箱：" prop="email">
        <el-input v-model="formData.email" :validate-event="false"></el-input>
      </el-form-item>
      <el-form-item label="输入验证码：：" prop="captcha">
        <el-input v-model="formData.captcha" :validate-event="false" style="width: 200px;"></el-input>
        <div class="send size" v-if="canSend" @click="sendCaptcha">发送验证码</div>
        <div v-show="!canSend" class="ban size">剩余{{ captchaSecond }}秒</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePhone">确认</el-button>
        <el-button type="danger" @click="() => {
         $router.push('/user/account')
        }">取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {captchaReg, emailReg} from "@/utils/Regular";

export default {
  data() {
    return {
      formData: {
        email: "",
        captcha: "",
      },
      canSend: true, // 是否可以发送验证码请求
      captchaSecond: 0,// 倒计时剩余秒数
      timer: null, // 定时器
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
      },
    };
  },
  methods: {
    updatePhone() {
      this.$refs["formData"].validate(async (valid) => {
        if (!valid) {
          return;
        }
        let result = await this.$Request(
            "/user/updateEmail",
            {
              email: this.formData.email,
              captcha: this.formData.captcha
            },
        );
        if (result.code === 200) {
          this.$Message.success(result.message);
          // 修改成功重新登录
          this.$router.push("/login");
        } else {
          this.$Message.warning(result.message);
        }
      });
    },
    // 发送验证码
    async sendCaptcha() {
      // 判断邮箱是否正确
      if (!emailReg.test(this.formData.email)) {
        return this.$Message.warning('请输入正确的邮箱');
      }
      let result = await this.$Request('/email/send', {email: this.formData.email});
      if (result.code === 200) {
        this.captchaSecond = 60;
        this.canSend = false;
        this.timer = setInterval(() => {
          this.captchaSecond -= 1;
        }, 1000);
      } else {
        this.$Message.warning(result.message);
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

<style scoped lang="scss">
.form {
  margin: 50px auto 30px;
  width: 420px;

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
</style>