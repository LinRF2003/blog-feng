<template>
  <div class="add-dynamic">
    <el-input
      type="textarea"
      show-word-limit
      v-model="content"
      placeholder="请输入此刻的心情吧"
      class="input"
      :maxlength="250"
      :autosize="{ minRows: 7, maxRows: 7 }"
      resize="none"
    ></el-input>
    <!--    action="http://121.196.194.159:3030/api/imgUpload"-->
    <el-upload
      :action="$UploadAction"
      :headers="headers"
      name="img"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :limit="9"
      :on-exceed="exceedLimit"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button type="primary" class="button" @click="releaseDynamic"
      >发布</el-button
    >
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrlList: [],
      headers: { enctype: "multipart/form-data" },
      content: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let i = this.imgUrlList.indexOf(file.response.data.path);
      this.imgUrlList.splice(i, 1);
      console.log(this.imgUrlList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      //res这个参数自己打印出来一看便知，在此不做解释
      console.log(res);
      // //将后端发送的地址赋值到我们需要显示的img中的src动态绑定的参数中
      this.imgUrlList.push(res.data.path);
      console.log(this.imgUrlList);
      // //将图片地址绑定到我们的form表单数据中 后期存入数据库中
      // this.formData.imageUrl = res.data.path;
    },
    // 图片上传前判断
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt3M = file.size / 1024 / 1024 / 1024 < 3;
      if (!isJPG && !isPNG) {
        this.$Message.error("上传头像图片只能是 JPG 格式或 png 格式!");
      }
      if (!isLt3M) {
        this.$Message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG | isJPG && isLt3M;
    },
    // 超出指定格式
    exceedLimit() {
      this.$Message.warning("图片个数最大为9张");
    },
    // 发布动态
    async releaseDynamic() {
      // 判断内容是否正确
      if (this.content.replace(/\s*/g, "") === "") {
        this.$Message.warning("内容不能为空");
      }
      console.log(this.imgUrlList);
      let result = await this.$Request("/dynamic/add", {
        content: this.content,
        imgUrlList: JSON.stringify(this.imgUrlList),
      });
      if (result.code === 200) {
        this.$Message.success("发布成功");
        // 刷新页面
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.add-dynamic {
  width: 800px;
  margin: 20px auto 0;

  .input {
    width: 100%;
    margin-bottom: 10px;
    font-size: 20px;
    color: #111;

    textarea {
      color: #000;
    }
  }

  .button {
    float: right;
    margin-top: 20px;
  }
}
</style>
