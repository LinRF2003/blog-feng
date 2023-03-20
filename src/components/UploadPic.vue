<template>
  <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:3030/api/imgUpload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :data="data"
      name="img"
      :headers="headers"
  >
    <div class="img" v-if="url">
      <img :src="url" class="avatar" />
    </div>

    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      headers: { enctype: "multipart/form-data" },
      data: { type: "0" },
    };
  },
  props: ["imageUrl"],
  methods: {
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      //res这个参数自己打印出来一看便知，在此不做解释
      console.log(res);
      // //将后端发送的地址赋值到我们需要显示的img中的src动态绑定的参数中
      this.url = res.data.path;
      // //将图片地址绑定到我们的form表单数据中 后期存入数据库中
      // this.formData.imageUrl = res.data.path;
      // 给父组件传参
      this.$emit("getImageUrl", this.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt3M = file.size / 1024 / 1024 / 1024 < 3;
      if (!isJPG && !isPNG) {
        this.$message.error`在这里插入代码片`(
            "上传头像图片只能是 JPG 格式或 png 格式!"
        );
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG | isJPG && isLt3M;
    },
  },
  mounted() {
    if(this.imageUrl){
      this.url = this.imageUrl;
    }
  }
};
</script>

<style scoped>
.avatar-uploader {
  width: 152px;
  height: 152px;
  border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.img {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
}
.avatar {
  width: 150px;

  display: block;
}
</style>