<template>
  <div class="container">
    <div class="nav">
      <div class="nav-container">
        <div class="item">
          <div class="logo">
            <router-link to="/">MYBLOG</router-link>
          </div>
          <router-link
              v-for="(item, index) in navList"
              :key="index"
              :to="item.path"
              :class="['navitem', item.path == activePath ? 'active' : '']"
          >{{ item.name }}
          </router-link
          >
        </div>
        <div class="search" v-if="$route.name != '搜索'">
          <el-input
              placeholder="请输入内容"
              v-model="content"
              class="input-with-select"

              clearable
          >
            <el-button
                slot="append"
                icon="el-icon-search"

            ></el-button>
          </el-input>
        </div>

        <div class="user">
          <router-link to="/addBlog" target="_blank" class="addBlog" v-if="$route.path=='/'">发布博客</router-link>
          <router-link to="/addQuestion" target="_blank" class="addBlog" v-if="$route.path=='/question'">添加问题</router-link>
          欢迎进入，
          <div></div>
          <!-- <i class="el-icon-arrow-down"></i> -->
          <el-dropdown class="username">
            <span class="el-dropdown-link">
              {{
                userInfo?.userName
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/user"
              >
                <el-dropdown-item>个人信息</el-dropdown-item>
              </router-link
              >

              <span @click="logout"
              ><el-dropdown-item>退出</el-dropdown-item></span
              >
            </el-dropdown-menu>
          </el-dropdown>
          <router-link to="/user" class="img">
            <img v-if="userInfo?.avatar" :src="userInfo?.avatar"/>
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
          name: "个人中心",
          path: "/user",

        },
      ],
      // 导航选中路径
      activePath: "",
      content: "", // 搜索内容
    };
  },
  watch: {
    // 监听路由高亮当前所在页面
    $route(to, from) {
      // console.log(from); //从哪来
      this.activePath = to.meta.activePath; //到哪去
    },
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    this.activePath = this.$route.path;
    // 获取用户信息
    if(!this.$store.state.userInfo){
      this.$store.dispatch('getUserInfo');
    }
  },
  methods:{
    // 退出登录
    logout() {
      this.$message.success("退出成功");

      this.$router.push("/login");
    },
  }
}
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
      margin: 0px auto;
      width: 88%;
      height: 68px;
      display: flex;
      //justify-content: space-between;
      .item {
        display: flex;
        align-items: center;
        white-space: nowrap;

        .logo {
          margin-right: 40px;

          a {
            font-size: 25px;
            color: var(--main-color);
            font-weight: bold;
          }
        }

        .navitem {
          padding: 15px 10px;
          margin: 0 5px;
          min-height: 54px;
        }


        .navitem:hover{
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
        :deep(.el-input__inner){
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
        
        .addBlog{
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
    width: 88%;
    min-width: 1000px;
    min-height: calc(100vh - 60px);
    //box-sizing: border-box;
  }

  // 底部
  .footer {
    height: 60px;
    // margin: 30px 0 20px;
    padding-top: 20px;
    text-align: center;
    font-size: 13px;
    color: #939393;
    line-height: 25px;
  }
}
</style>