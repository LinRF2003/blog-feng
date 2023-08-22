<template>
  <div class="app">
    <router-view></router-view>
    <el-backtop  target=".app">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{

  },
  mounted() {
    // // vuex 中添加标签列表
    // if (!this.$store.state.categoryTags) {
    //   this.$store.dispatch('getTags');
    // }
  }
}
</script>

<style>
.app{
  height: 100vh;
  overflow-x: hidden;
}
</style>
