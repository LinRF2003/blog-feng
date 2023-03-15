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
      <el-form-item label="输入手机号：" prop="phone">
        <el-input v-model="formData.phone" :validate-event="false"></el-input>
      </el-form-item>
      <el-form-item label="确认手机号：：" prop="rePhone">
        <el-input v-model="formData.rePhone" :validate-event="false"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="updatePhone">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 手机号两次输入对比
    var rePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入手机号"));
      } else if (value !== this.formData.phone) {
        callback(new Error("两次输入手机号不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        phone: "",
        rePhone: "",
      },
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
        rePhone: [
          {
            validator: rePass,
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
        let result = await this.$request({
          url: "updatePhone",
          method: "POST",
          data: {
            phone: this.formData.phone,
          },
        });
        if (result.status === 200) {
          if (result.data.status === 0) {
            this.$message.success(result.data.message);
            this.$router.push("/login");
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