<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{

  },
  mounted() {
    // vuex 中添加标签列表
    if (!this.$store.state.categoryTags) {
      this.$store.dispatch('getTags');
    }
  }
}
</script>

<style>
</style>
