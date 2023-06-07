<template>
  <div class="container">
    <div class="nav">
      <div class="nav-container">
        <div class="item">
          <div class="logo">
            <router-link to="/">BLOGFENG</router-link>
          </div>
          <router-link
            v-for="(item, index) in navList"
            :key="index"
            :to="item.path"
            :class="['navitem', item.path === activePath ? 'active' : '']"
            >{{ item.name }}
          </router-link>
          <router-link
              :to="`/userCenter/${userInfo?.userId}`"
              :class="['navitem',userInfo?.userId && userInfo?.userId == $route.params.id? 'active' : ''] "
          >个人中心
          </router-link>
        </div>
        <div class="search">
          <el-input
              v-if="$route.name != '搜索'"
            placeholder="请输入内容"
            v-model="content"
            class="input-with-select"
            clearable
              @keyup.enter.native="search"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <div class="user">
          <router-link
            to="/editBlog"
            class="addBlog"
            v-if="$route.meta.activePath == '/'"
            >发布博客</router-link
          >
          <router-link
            to="/addQuestion"
            target="_blank"
            class="addBlog"
            v-if="$route.path == '/question'"
            >添加问题</router-link
          >
          <router-link
              to="/addDynamic"
              target="_blank"
              class="addBlog"
              v-if="$route.path == '/dynamic'"
          >添加动态</router-link
          >
          欢迎进入，
          <div></div>
          <!-- <i class="el-icon-arrow-down"></i> -->
          <el-dropdown class="username">
            <span class="el-dropdown-link">
              {{ userInfo?.userName
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/user">
                <el-dropdown-item>个人信息</el-dropdown-item>
              </router-link>
              <span @click="logout"
                ><el-dropdown-item>退出</el-dropdown-item></span
              >
            </el-dropdown-menu>
          </el-dropdown>
          <router-link to="/user" class="img">
            <img v-if="userInfo?.avatar" :src="userInfo?.avatar" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <!--    <div class="footer">-->
    <!--      <div>©2023 www.blogtree.com All rights reserved.</div>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 导航数据
      navList: [
        {
          name: "博客",
          path: "/",
        },
        {
          name: "问答",
          path: "/question",
        },
        {
          name:"动态",
          path: "/dynamic"
        }
      ],
      // 导航选中路径
      activePath: "",
      content: "", // 搜索内容
    };
  },
  watch: {
    // 监听路由高亮当前所在页面
    $route(to, from) {
      console.log(111)
      // console.log(from); //从哪来
      this.activePath = to.meta.activePath; //到哪去
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {
    this.activePath = this.$route.meta.activePath;
    // 获取用户信息
    if (!this.$store.state.userInfo) {
      this.$store.dispatch("getUserInfo");
    }
  },
  methods: {
    // 退出登录
    logout() {
      this.$Message.success("退出成功");
      this.$router.push("/login");
    },
    search(){

      this.$router.push(`/search/blog?text=${this.content}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  // 导航
  .nav {
    position: fixed;
    top: 0;
    z-index: 901;
    width: 100vw;
    background: #fff;
    height: 68px;
    text-align: center;
    box-shadow: 0 2px 6px 0 #ddd;

    .nav-container {
      margin: 0 auto;
      width: 1400px;
      height: 68px;
      display: flex;
      //justify-content: space-between;
      .item {
        display: flex;
        align-items: center;
        white-space: nowrap;

        .logo {
          //margin-right: 60px;
          width: 200px;
          text-align: center;
          a {
            font-size: 25px;
            //color: var(--main-color);
            font-weight: bold;
            display: block;
            //-webkit-text-stroke:1px #0000FF;        /*文字描边*/
            //-webkit-text-fill-color:transparent;    /*设置文字的填充颜色*/
            //background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
            //-webkit-background-clip:text;
            //-webkit-text-fill-color:transparent;
            background: linear-gradient(to left, #F902FF, #00DBDE);
            -webkit-background-clip: text;
            color: transparent;
          }
        }

        .navitem {
          padding: 15px 10px;
          margin: 0 5px;
          min-height: 54px;
        }

        .navitem:hover {
          background: #f4f4f4;
        }
        .active {
          border-bottom: 3px var(--main-color) solid;
          color: #000;
        }
      }

      .search {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 20px;
        :deep(.el-input__inner) {
          min-width: 150px;
        }
      }

      .user {
        display: flex;
        align-items: center;
        white-space: nowrap;
        .username {
          color: var(--main-color);
        }

        .img {
          height: 52px;
          width: 52px;
          margin-left: 8px;
          border-radius: 60px;
          border: var(--main-color) 1px solid;
          display: flex;
          align-items: center;
          overflow: hidden;

          img {
            width: 50px;
          }
        }

        .addBlog {
          background: #18b8be;
          margin-right: 10px;
          padding: 5px 15px;
          border-radius: 15px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }

  // 内容
  .content {
    margin: 0 auto;
    padding-top: 78px;
    width: 1000px;
    min-width: 1000px;
    min-height: calc(100vh - 60px);
  }

  // 底部
  .footer {
    height: 60px;
    padding-top: 20px;
    text-align: center;
    font-size: 13px;
    color: #939393;
    line-height: 25px;
  }
}


</style>
<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
</style>