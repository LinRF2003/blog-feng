<template>
  <div class="my">
    <div class="left">
      <div class="bg">
        <router-link
            :class="['my-info', activePath == '/myinfo' ? 'active' : '']"
            to="/user"
        >个人信息
        </router-link>
        <router-link
            :class="['my-info', activePath == '/AS' ? 'active' : '']"
            to="/user/account"
        >账号设置
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {activePath: ""};
  },
  methods: {
    init() {
      this.activePath = this.$route.meta.activePath2;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {
      // console.log(from); //从哪来
      this.activePath = to.meta.activePath2; //到哪去
    },
  },
};
</script>

<style scoped lang="scss">
.my {
  display: flex;
  width: 1400px;
  margin: 0 auto;
  .left {
    position: fixed;
    min-width: 180px;
    //height: 50px;
    max-width: 180px;
    //color: #444;
    text-align: center;
    .bg{
      padding: 10px 0;
      background: #fff;
      //width: 120px;
      height: 500px;
    }
    a {
      display: block;
      padding: 15px 10px;
      color: #333;
    }

    a:hover {
      cursor: pointer;
      //color: #2f96fd;
      background: #f0f4f4;
    }
  }

  .content {
    flex: 1;
    margin-left: 190px;
    background: #fff ;
    padding: 20px;
  }
}

.active {
  background: #f0f4f4;
}
</style>