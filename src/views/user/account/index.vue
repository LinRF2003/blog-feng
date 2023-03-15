<template>
  <div>
    <div class="userSettings" v-if="$route.path == '/user/account'">
      <!--    <div class="userSettings">-->
      <div class="font">账号设置</div>
      <div class="content">
        <div class="item">
          <span class="word"><span>密</span><span>码</span></span>
          <div class="operation">
            <router-link to="account/password"
            >修改密码
            </router-link
            >
          </div>
        </div>
        <div class="item">
          <span class="word"
          ><span>手</span><span>机</span><span>号</span></span
          >
          <div class="operation">
            <div class="phone">{{ phone }}</div>
            <router-link to="account/email">修改手机号</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="router">
      <div class="title">
        <router-link to="/user/account">账号设置</router-link>
        <div class="white">/</div>
        <a class="title2">{{ $route.meta.title }}</a>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    phone() {
      // return this.$store.state.userInfo.phone;
      return 13519777777;
    },
  },
};
</script>

<style scoped lang="scss">
.userSettings {
  background: #fff;
  padding: 20px;

  .top {
    margin-bottom: 10px;

    .font {
      font-weight: 550;
      font-size: 18px;
    }
  }

  .item {
    // display: flex;
    // justify-content: space-between;
    padding: 30px 0 40px 20px;
    border-bottom: 1px solid #ddd;
  }

  .word {
    color: #555666;
    font-size: 14px;
    width: 56px;
    float: left;
    display: flex;
    justify-content: space-between;
  }

  .operation {
    display: flex;
    float: right;
    font-size: 14px;

    .phone {
      margin-right: 20px;
    }

    a {
      color: #1890ff;
    }
  }
}

.router {
  background: #fff;
  padding: 20px;

  .title {
    display: flex;
    color: #999aaa;

    .white {
      margin: 0 8px;
    }

    a {
      color: #999aaa;
    }

    a:hover {
      color: #1890ff;
    }

    .title2 {
      cursor: pointer;
    }
  }
}
</style>