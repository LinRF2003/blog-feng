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
<!--        <div class="user">-->
<!--          欢迎进入，-->
<!--          <div></div>-->
<!--          &lt;!&ndash; <i class="el-icon-arrow-down"></i> &ndash;&gt;-->
<!--          <el-dropdown class="username">-->
<!--            <span class="el-dropdown-link">-->
<!--              {{-->
<!--                userinfo?.user_name-->
<!--              }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--            </span>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <router-link to="/my"-->
<!--              >-->
<!--                <el-dropdown-item>个人信息</el-dropdown-item>-->
<!--              </router-link-->
<!--              >-->

<!--              <span @click="logout"-->
<!--              ><el-dropdown-item>退出</el-dropdown-item></span-->
<!--              >-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
<!--          <router-link to="/my" class="img">-->
<!--            <img v-if="userinfo?.avatar" :src="userinfo?.avatar"/>-->
<!--            <img src="@/assets/default.png" v-else/>-->
<!--          </router-link>-->
<!--        </div>-->
        <router-link to="/addblog" target="_blank">发布博客</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div>©2023 www.blogtree.com All rights reserved.</div>
    </div>
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
  mounted() {

    this.activePath = this.$route.path;
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
          margin-right: 80px;

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
        padding: 0 30px;
        :deep(.el-input__inner){
          min-width: 150px;
        }
      }

      .user {
        display: flex;
        align-items: center;

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