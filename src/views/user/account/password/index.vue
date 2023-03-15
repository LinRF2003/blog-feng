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
      <el-form-item label="输入原密码：" prop="oldPassword">
        <el-input
            v-model="formData.oldPassword"
            type="password"
            show-password
            :validate-event="false"
        ></el-input>
      </el-form-item>
      <el-form-item label="输入新密码：" prop="newPassword">
        <el-input
            v-model="formData.newPassword"
            type="password"
            show-password
            :validate-event="false"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" prop="rePassword">
        <el-input
            v-model="formData.rePassword"
            type="password"
            show-password
            :validate-event="false"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="updatePassword">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 新旧密码对比
    var samePass = (rule, value, callback) => {
      if (value === this.formData.oldPassword) {
        callback(new Error("新密码不能和旧密码相同"));
      } else {
        callback();
      }
    };
    // 新密码两次输入对比
    var rePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        oldPassword: "",
        newPassword: "",
        rePassword: "",
      },
      // 密码校验规则
      rules: {
        oldPassword: [
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
        newPassword: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            min: 6,
            max: 20,
            message: "密码在6 - 20位之间",
          },
          {
            validator: samePass,
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
    // 更新密码
    updatePassword() {
      this.$refs["formData"].validate(async (valid) => {
        console.log(valid);
        if (!valid) {
          return;
        }
        let result = await this.$request({
          url: "/updatePassword",
          method: "POST",
          data: {
            oldPassword: this.formData.oldPassword,
            newPassword: this.formData.newPassword,
          },
        });
        if (result.status === 200) {
          if (result.data.status == 0) {
            this.$message.success(result.data.message);
          } else {
            this.$message.warning(result.data.message);
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.form {
  margin: 50px auto 30px;
  width: 420px;
}
</style>