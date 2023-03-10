<template>
  <div class="blog">
    <div class="tags">
      <a :class="['tag',currentFatherTag=='推荐'?'active':'']" @click="changeFatherTag('推荐')">
        推荐
      </a>
      <a :class="['tag',currentFatherTag==tag?'active':'']" v-for="tag in fatherTags" @click="changeFatherTag(tag)">
        {{ tag }}
      </a>
    </div>
    <div class="son-tags" v-show="currentFatherTag!='推荐'">
      <a :class="['son-tag', currentTag==='全部'?'son-active':'']" @click="changeTag('全部')">全部</a>
      <a v-for="tag in tags" :class="['son-tag', currentTag===tag?'son-active':'']" @click="changeTag(tag)">
        {{ tag }}
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      fatherTags: [], // 一级标签
      tags: [], // 二级标签
      currentFatherTag: "推荐", // 当前父标签
      currentTag: "全部",// 当前子标签
      categoryTags: {} // 分类标签
    }
  },
  methods: {
    // 获取标签
    async getTags() {
      let result = await this.$Request('/tags/get');
      if (result.code === 200) {
        this.categoryTags = result.categoryTags;
        for (const Tags in result.categoryTags) {
          this.fatherTags.push(Tags);

        }
        // 判断session中是否有sessionStorage数据；
        let currentFatherTag = sessionStorage.getItem("currentFatherTag");
        let currentTag = sessionStorage.getItem("currentTag");
        if (currentFatherTag && currentTag) {
          this.currentFatherTag = currentFatherTag;
          this.currentTag = currentTag;
          this.tags = [];
          let tags = this.categoryTags[currentFatherTag].tags;
          for (const Tag in tags) {
            this.tags.push(tags[Tag]);
          }
        }
        // 页面刷新保留之前信息，防止刷新位置变化
        window.onbeforeunload = () => {
          console.log('页面刷新之前触发');
          window.sessionStorage.setItem('currentFatherTag', this.currentFatherTag);
          window.sessionStorage.setItem('currentTag', this.currentTag);
        }
      }
    },
    // 改变当前父标签
    changeFatherTag(tag) {
      this.currentFatherTag = tag;
      console.log(this.currentFatherTag);
      this.currentTag = '全部'
      if (tag != '推荐') {
        this.tags = [];
        let tags = this.categoryTags[tag].tags;
        for (const Tag in tags) {
          this.tags.push(tags[Tag]);
        }
      }
    },
    // 改变子标签
    changeTag(tag) {
      this.currentTag = tag;
    }
  },
  mounted() {
    this.getTags();
    // 给父标签添加事件
    let tags = document.querySelector('.tags');
    tags.style.height = '55px';
    tags.onmousemove = () => {
      tags.style.height = '';
    }
    tags.onmouseout = () => {
      tags.style.height = '55px';
    }

  }
}
</script>

<style lang="scss" scoped>
.blog {
  position: relative;

  .tags {
    position: absolute;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    padding: 10px 5px;
    //height: 35px;
    overflow: hidden;

    .tag {
      padding: 8px 16px;
    }
  }

  .son-tags {
    padding-top: 65px;
    display: flex;
    flex-wrap: wrap;

    .son-tag {
      background: #f0f0f0;

      padding: 1px 20px;
      margin-right: 10px;
      margin-top: 10px;
      text-align: center;
      font-size: 14px;
      line-height: 24px;
      border-radius: 26px;
    }

    // 子标签选择
    .son-active {
      color: #000;
      background: var(--bg-color);
    }
  }
}
</style>
