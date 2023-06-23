<template>
  <div class="blog" v-loading.fullscreen.lock="loading">
    <div class="tags">
      <a
          :class="['tag', currentFatherTag === '推荐' ? 'active' : '']"
          @click="changeFatherTag('推荐')"
      >
        推荐
      </a>
      <a
          :class="['tag', currentFatherTag === tag ? 'active' : '']"
          v-for="(tag, index) in fatherTags"
          @click="changeFatherTag(tag)"
          :key="index"
      >
        {{ tag }}
      </a>
    </div>
    <div class="son-tags" v-show="currentFatherTag !== '推荐'">
      <a
          :class="['son-tag', currentTag === '全部' ? 'son-active' : '']"
          @click="changeTag('全部')"
      >全部</a
      >
      <a
          v-for="(tag, index) in tags"
          :class="['son-tag', currentTag === tag ? 'son-active' : '']"
          @click="changeTag(tag)"
          :key="index"
      >
        {{ tag }}
      </a>
    </div>
    <div class="blog-content">
      <BlogItem
          :blogInfo="blogInfo"
          v-for="blogInfo in blogData.list"
          :key="blogInfo.id"
          :like="likeBlogList.indexOf(blogInfo.id) != -1"
          class="blog-item"
      ></BlogItem>
    </div>
    <Null v-if="blogData.list.length === 0 && !loading"></Null>
    <PaginationItem
        :pageNo="blogData.pageNo"
        :pageSize="blogData.pageSize"
        :totalCount="blogData.totalCount"
        :pageTotal="blogData.pageTotal"
        @changePageNo="changePageNo"
    ></PaginationItem>
  </div>
</template>

<script>
import BlogItem from "@/components/BlogItem";

export default {
  name: "Blog",
  data() {
    return {
      fatherTags: [], // 一级标签
      tags: [], // 二级标签
      currentFatherTag: "推荐", // 当前父标签
      currentTag: "全部", // 当前子标签
      categoryTags: {}, // 分类标签
      blogData: {
        pageSize: 10, // 每页页数
        pageNo: 1, // 当前页数
        list: [],
        pageTotal: 0,
        totalCount: 0,
      },
      blog: null, // 博客元素
      blogContent: null, // 博客内热元素
      likeBlogList: [], // 喜欢的博客列表
      loading: true
    };
  },
  components: {
    BlogItem,
  },
  methods: {
    // 获取标签
    async getTags() {
      let result = await this.$Request("/tags/get");
      if (result.code === 200) {
        this.categoryTags = result.categoryTags;
        for (const Tags in result.categoryTags) {
          this.fatherTags.push(Tags);
        }
        // 获取路由中的标签信息
        let currentFatherTag = this.$route.params.ft;
        let currentTag = this.$route.params.t;
        this.blogData.pageNo = this.$route.query.pageNo;
        if (currentFatherTag && currentTag) {
          this.currentFatherTag = currentFatherTag;
          this.currentTag = currentTag;
          if (currentFatherTag !== "推荐") {
            this.tags = [];
            let tags = this.categoryTags[currentFatherTag].tags;
            for (const Tag in tags) {
              this.tags.push(tags[Tag]);
            }
            // 获取当前标签内容
            return this.getBlogByTag(this.currentTag, this.currentFatherTag);
          }
        }
        // 获取当前标签内容
        this.getBlogByTag(this.currentTag, "");
      }
    },
    // 获取标签内容
    async getBlogByTag(tag, fatherTag) {
      this.loading = true;
      let result = await this.$Request("/blog/get", {
        pageSize: this.blogData.pageSize,
        pageNo: this.blogData.pageNo,
        tag,
        fatherTag,
      });
      if (result.code === 200) {
        this.blogData = result.data;
        this.loading = false;
      }
    },
    // 改变页数
    changePageNo(val) {
      this.blogData.pageNo = val;
      // 改变路由地址
      this.$router.replace(`/blog/${this.currentFatherTag}/${this.currentTag}?pageNo=${val}`);
      this.getBlogByTag(this.currentTag, this.currentFatherTag);
    },
    // 改变当前父标签
    changeFatherTag(tag) {
      this.blogData.pageNo = 1;
      // 改变路由地址
      this.$router.replace(`/blog/${tag}/全部?pageNo=${this.blogData.pageNo}`);
      // 更改标签内容
      this.currentFatherTag = tag;
      this.currentTag = "全部";
      if (tag !== "推荐") {
        this.tags = [];
        let tags = this.categoryTags[tag].tags;
        for (const Tag in tags) {
          this.tags.push(tags[Tag]);
        }
        // 获取当前标签内容
        this.getBlogByTag(this.currentTag, this.currentFatherTag);
      } else {
        // 获取当前标签内容
        this.getBlogByTag(this.currentTag, "");
      }
    },
    // 改变子标签
    changeTag(tag) {
      this.blogData.pageNo = 1;
      // 改变路由地址
      this.$router.replace(`/blog/${this.currentFatherTag}/${tag}?pageNo=1`);
      this.currentTag = tag;
      // 获取当前标签内容
      this.getBlogByTag(this.currentTag, this.currentFatherTag);
    },
    // 获取用喜欢的博客id列表
    async getBlogLikeList() {
      let result = await this.$Request("/blog/getLikeList");
      if (result.code === 200) {
        this.likeBlogList = result.data.likeBlog;
      }
    },
  },
  mounted() {
    // 获取用喜欢的博客id列表
    this.getBlogLikeList();
    // 获取标签
    if (!this.$store.state.categoryTags) {
      this.$store.dispatch("getTags");
    }
    // 获取标签
    this.getTags();
    // 给父标签添加事件
    let tags = document.querySelector(".tags");
    tags.style.height = "55px";
    tags.onmousemove = () => {
      tags.style.height = "";
    };
    tags.onmouseout = () => {
      tags.style.height = "55px";
    };
    this.blog = document.querySelector(".blog");
    this.blogContent = document.querySelector(".blog-content");
    // 页面刷新保留之前信息，防止刷新位置变化
    // window.onbeforeunload = () => {
    //   console.log('页面刷新之前触发');
    //   alert(1)
    //   window.sessionStorage.setItem('currentFatherTag', this.currentFatherTag);
    //   window.sessionStorage.setItem('currentTag', this.currentTag);
    // }
  },
  watch: {
    currentFatherTag: function (val, oldval) {
      if (val == "推荐") {
        this.blog.style.paddingTop = "30px";
        this.blogContent.style.marginTop = "45px";
      } else {
        this.blog.style.paddingTop = "0";
        this.blogContent.style.marginTop = "20px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.blog {
  position: relative;
  padding: 30px 0;

  .tags {
    position: absolute;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    padding: 10px 5px;
    min-height: 35px;
    overflow: hidden;

    .tag {
      padding: 8px 16px;
    }
    .tag:hover{
      color: var(--main-color);
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

    .son-tag:hover {
      color: #000;
      background: var(--bg-color);
    }

    // 子标签选择
    .son-active {
      color: #000;
      background: var(--bg-color);
    }
  }

  .blog-content {
    margin-top: 45px;
  }
}
</style>
