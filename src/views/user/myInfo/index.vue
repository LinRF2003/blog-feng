<template>
  <div>
    1312312
  </div>
</template>

<script>

export default {
  name: '',
}
</script>

<style>
</style>

<!--<template>-->
<!--  <div>-->
<!--    <div class="user">-->
<!--      <div class="avatar"><img :src="userInfo.avatar"/></div>-->
<!--      <div class="user-detail">-->
<!--        <div class="user-name">{{ userInfo.userName }}</div>-->
<!--        <div class="blog-count">博客数：{{ userInfo.blogCount }}篇</div>-->
<!--        <div class="desc">-->
<!--          <span class="n">简介：</span>-->
<!--          <div class="de">-->
<!--            {{ userInfo.introduction || "该用户很懒，没有添加简介" }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="user-info" v-loading.fullscreen.lock="loading">-->
<!--      <div class="top">-->
<!--        <span class="font">基本资料</span>-->
<!--        <el-button type="primary" @click="editShow = true" v-if="!editShow"-->
<!--        >编辑-->
<!--        </el-button-->
<!--        >-->
<!--      </div>-->
<!--      <el-form-->
<!--          label-width="100px"-->
<!--          ref="updateInfo"-->
<!--          :model="updateInfo"-->
<!--          :rules="rules"-->
<!--          hide-required-asterisk-->
<!--      >-->
<!--        <el-form-item label="昵称：" prop="user_name">-->
<!--          <el-input-->
<!--              v-if="editShow"-->
<!--              v-model="updateInfo.userName"-->
<!--              :maxlength="20"-->
<!--              :minlength="5"-->
<!--          ></el-input>-->
<!--          <div class="user-name" v-else>{{ userInfo.userName }}</div>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="性别：">-->
<!--          <div v-if="editShow">-->
<!--            <el-radio v-model="updateInfo.sex" label="男">男</el-radio>-->
<!--            <el-radio v-model="updateInfo.sex" label="女">女</el-radio>-->
<!--          </div>-->
<!--          <span v-else> {{ userInfo.sex || "未填写" }}</span>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="头像：">-->
<!--          <Upload-->
<!--              v-if="editShow"-->
<!--              :imageUrl="userInfo.avatar"-->
<!--              @getImageUrl="getImageUrl"-->
<!--          ></Upload>-->
<!--          <div class="img" v-else><img :src="userInfo.avatar"/></div>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="简介：">-->
<!--          <el-input-->
<!--              v-if="editShow"-->
<!--              v-model="updateInfo.introduction"-->
<!--              type="textarea"-->
<!--              :autosize="{ minRows: 4, maxRows: 4 }"-->
<!--          ></el-input>-->
<!--          <div class="desc" v-else>-->
<!--            {{ userInfo.introduction || "该用户很懒，没有添加简介" }}-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出生日期：">-->
<!--          <el-date-picker-->
<!--              v-if="editShow"-->
<!--              v-model="updateInfo.birthdate"-->
<!--              type="date"-->
<!--              placeholder="选择日期"-->
<!--              value-format="yyyy-MM-dd"-->
<!--          >-->
<!--          </el-date-picker>-->

<!--          <div class="desc" v-else>-->
<!--            &lt;!&ndash; {{ updateInfo.birthdate || userInfo.birthdate }} &ndash;&gt;-->
<!--            <div v-if="userInfo.birthdate">-->
<!--              {{ userInfo.birthdate.substring(0, 10) }}-->
<!--            </div>-->
<!--            <span v-else> {{ userInfo.birthdate || "未填写" }}</span>-->
<!--          </div>-->
<!--        </el-form-item>-->

<!--        <el-form-item v-if="editShow">-->
<!--          <el-button type="primary" @click="updateUser">完成-->
<!--          </el-button-->
<!--          >-->
<!--          <el-button @click="editShow = false">取消</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "MyInfo",-->
<!--  data() {-->
<!--    return {-->
<!--      // userInfo: {},-->
<!--      editShow: false,-->
<!--      updateInfo: {},-->
<!--      loading: false,-->
<!--      rules: {-->
<!--        user_name: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: "用户名不能为空",-->
<!--          },-->
<!--        ],-->
<!--      },-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    userInfo() {-->
<!--      return this.$store.state.userInfo;-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    getUserInfo() {-->
<!--      // this.$store.dispatch("getUserInfo");-->
<!--      // console.log(this.userInfo);-->
<!--      this.updateInfo = {...this.$store.state.userInfo};-->
<!--      // this.userInfo.birthdate = this.userInfo;-->
<!--    },-->
<!--    getImageUrl(e) {-->
<!--      this.updateInfo.avatar = e;-->
<!--    },-->
<!--    // 更新用户信息-->
<!--    async updateUser() {-->
<!--      this.$refs["updateInfo"].validate(async (valid) => {-->
<!--        if (!valid) {-->
<!--          return;-->
<!--        }-->
<!--        this.loading = true;-->
<!--        let result = await this.$request({-->
<!--          url: "/updateUserInfo",-->
<!--          method: "POST",-->
<!--          data: {-->
<!--            userName: this.updateInfo.user_name,-->
<!--            sex: this.updateInfo.sex,-->
<!--            avatar: this.updateInfo.avatar,-->
<!--            introduction: this.updateInfo.introduction,-->
<!--            birthdate: this.updateInfo.birthdate,-->
<!--          },-->
<!--        });-->
<!--        // console.log(result);-->
<!--        if (result.status === 200) {-->
<!--          // 重新获取用户信息-->
<!--          this.$store.dispatch("getUserInfo");-->
<!--          this.editShow = false;-->

<!--          this.loading = false;-->
<!--          this.$message.success("修改成功");-->
<!--        }-->
<!--        // location.reload();-->
<!--      });-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getUserInfo();-->
<!--  },-->
<!--  watch: {-->
<!--    userInfo(newVal, oldVal) {-->
<!--      this.updateInfo = {...newVal};-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.user {-->
<!--  background: #fff;-->
<!--  padding: 10px 20px;-->
<!--  margin-bottom: 20px;-->
<!--  display: flex;-->

<!--  .avatar {-->
<!--    min-width: 122px;-->
<!--    height: 122px;-->
<!--    border-radius: 182px;-->
<!--    border: 1px solid #d9d9d9;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    overflow: hidden;-->
<!--    background: #f4f4f4;-->

<!--    img {-->
<!--      width: 120px;-->
<!--    }-->
<!--  }-->

<!--  .user-detail {-->
<!--    margin-left: 20px;-->
<!--    margin-top: 10px;-->

<!--    .user-name {-->
<!--      font-size: 22px;-->
<!--      font-weight: 500;-->
<!--      margin-bottom: 10px;-->
<!--    }-->

<!--    .blog-count {-->
<!--      margin-bottom: 10px;-->
<!--      font-size: 14px;-->
<!--    }-->

<!--    .desc {-->
<!--      // display: flex;-->
<!--      font-size: 15px;-->
<!--      line-height: 24px;-->

<!--      .n {-->
<!--        position: absolute;-->
<!--        width: 60px;-->
<!--      }-->

<!--      .de {-->
<!--        margin-left: 42px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.user-info {-->
<!--  background: #fff;-->
<!--  padding: 20px;-->
<!--  color: #222;-->

<!--  .top {-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->
<!--    line-height: 40px;-->

<!--    .font {-->
<!--      font-size: 18px;-->
<!--      font-weight: 550;-->
<!--    }-->
<!--  }-->

<!--  .img {-->
<!--    width: 150px;-->
<!--    height: 150px;-->
<!--    border-radius: 150px;-->
<!--    // border: 1px solid #d9d9d9;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    overflow: hidden;-->
<!--    background: #f4f4f4;-->

<!--    img {-->
<!--      width: 150px;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.el-input {-->
<!--  width: 300px;-->
<!--  color: #222;-->
<!--}-->

<!--.el-textarea {-->
<!--  width: 500px;-->
<!--}-->

<!--.el-textarea__inner {-->
<!--  color: #222;-->
<!--}-->

<!--.el-form-item {-->
<!--  margin-bottom: 12px;-->
<!--}-->
<!--</style>-->