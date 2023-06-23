<template>
  <div>
    <!--  :visible.sync="dialogVisibleTags"-->
    <el-dialog
        title="标签"
        :visible.sync="dialogVisibleTags"
        width="30%"
        :before-close="closeDialog"
        center
        :modal="false"
        class="dialog"
        :style="`left:${left}px;top:${top}px`"
    >
      <div class="dialog-content">
        <div class="left">
          <div
              :class="['ft', currentFatherTag === tag ? 'active' : '']"
              v-for="(tag, index) in fatherTagsList"
              @click="changeFatherTag(tag)"
              :key="index"
          >
            {{ tag }}
          </div>
        </div>
        <div class="right">
          <el-tag
              v-for="(tag, index) in tags"
              :key="index"
              :class="[
              'tag',
              // tagsMap.get(tag) === currentFatherTag ? 'tag-active' : '',
              tagsMap.get(tag)? 'tag-active' : ''
            ]"
              @click="clickTags(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
    <div class="bg" @click="$emit('logout');">

    </div>
  </div>
</template>

<script>
import {getSonTags} from "@/utils/methods";

export default {
  name: "TagSelect",
  props: {
    categoryTags: {
      type: Object,
      required: true,
    },
    top: {
      type: Number,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    tagsMap:{
      type:Map,
      required:true,

    }
  },
  data() {
    return {
      currentFatherTag: "python", // 当前父标签
      dialogVisibleTags: true, // 标签选中框是否显示
      tags: [], // 标签列表
      // tagsMap: new Map(), // 选中的标签列表
    };
  },
  methods: {
    // 关闭标签对话框
    closeDialog() {
      this.dialogVisibleTags = false;
      this.$emit("logout");
    },
    // 改变当前父标签
    changeFatherTag(tag) {
      // 更改标签内容
      this.currentFatherTag = tag;
      this.tags = getSonTags(this.categoryTags, tag);
    },
    // 点击子标签
    clickTags(tag) {
      // console.log(this.tagsMap.get(tag) == this.currentFatherTag);
      // 判断tags中是否已有此标签
      // if (this.tagsMap.get(tag) == this.currentFatherTag) {
      if (this.tagsMap.has(tag)) {
        this.tagsMap.delete(tag);
        // 刷新数据，防止页面不变化
        this.changeFatherTag(this.currentFatherTag);
        this.$emit("changeTags", this.tagsMap);
        // 删除数据
        return;
      }
      // 判断标签是否超过5个
      if (this.tagsMap.size >= 5) {
        return this.$Message.warning("标签不能超过五个");
      }
      // 父标签最多为3个
      // 设置标签map 利于查找父标签
      let ft = new Set();
      // 转换下父标签数据
      for (const item of this.tagsMap.values()) {
        console.log(item)
        ft.add(item);
      }
      ft.add(this.currentFatherTag);
      // 父标签不能大于3个
      if (ft.size > 3) {
        return this.$Message.warning("父标签不能大于三个");
      }
      this.tagsMap.set(tag, this.currentFatherTag);
      // 刷新数据，防止页面不变化
      this.changeFatherTag(this.currentFatherTag);
      this.$emit("changeTags", this.tagsMap);
    },
  },
  computed: {
    fatherTagsList() {
      return this.$store.state.fatherTagsList;
    },
  },
  mounted() {
    this.tags = getSonTags(this.categoryTags, this.$store.state.fatherTagsList[0]);


  }
};
</script>

<style scoped lang="scss">
.bg {
  background: #999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: .1;
  z-index: 903;
}

.dialog {
  line-height: 20px;
  position: absolute;
  width: 500px;
  height: 300px;
  //border:1px solid #ccc;
  :deep(.el-dialog__body) {
    padding: 0;
  }

  .dialog-content {
    padding: 10px;
    display: flex;

    .left {
      padding: 0 20px;
      max-height: 230px;
      overflow-y: scroll;
      min-width: 104px;

      .ft {
        padding: 5px 0;
        cursor: pointer;

      }

      .ft:hover {
        color: var(--main-color);
      }
    }

    .right {
      padding: 0 10px;

      .tag {
        margin: 5px;
        cursor: pointer;
      }

      .tag-active {
        background: var(--bg-color);
      }
    }
  }

  :deep(.el-dialog) {
    margin: 0 !important;
    width: 500px !important;
    height: 300px;
    border: 1px solid #ccc;
  }

  :deep(.el-dialog__header) {
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    font-weight: bold;
  }
  :deep(.el-dialog__headerbtn) {
    top: 5px !important;
  }
  :deep(.el-dialog__close:before){
    position: absolute;
    right: 5px;
    top: 10px;
  }
}
</style>
