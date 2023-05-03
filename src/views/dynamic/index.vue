<template>
  <div class="dynamic">
    <div class="content">
      <DynamicItem
          v-for="dynamicInfo in dynamicList"
          :key="dynamicInfo.id"
          :dynamicInfo="dynamicInfo"
      ></DynamicItem>
      <Null v-if="dynamicList.length == 0"></Null>
      <PaginationItem
          :pageNo="pageNo"
          :pageSize="pageSize"
          :totalCount="totalCount"
          :pageTotal="pageTotal"
          @changePageNo="changePageNo"
      ></PaginationItem>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      dynamicList: [],
      pageSize: 10, // 每页页数
      pageNo: 1, // 当前页数
      pageTotal: 0,
      totalCount: 0,
    }
  },
  methods: {
    // 获取动态列表
    async getDynamicList() {
      let result = await this.$Request("/dynamic/get", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
      if (result.code === 200) {
        this.dynamicList = result.data.list;
        this.pageNo = result.data.pageNo;
        this.pageSize = result.data.pageSize;
        this.totalCount = result.data.totalCount;
        this.pageTotal = result.data.pageTotal;
      }
    },
    // 改变页数
    changePageNo(val) {
      this.pageNo = val;
      // 改变路由地址
      this.$router.replace(`/dynamic?pageNo=${val}`);
      this.getDynamicList();
    },
  },
  mounted() {

    let pageNo = this.$route.query.pageNo
    if (pageNo) {
      this.pageNo = pageNo
    }
    this.getDynamicList();
  }
}
</script>

<style scoped lang="scss">
.dynamic {
  width: 1000px;
  margin: 0 auto;

}
</style>
