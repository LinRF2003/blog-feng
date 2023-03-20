<template>
  <el-pagination
      v-if="totalCount > 10"
      style="text-align: center; margin-top: 20px"
      @current-change="changePageNo"
      :current-page="pageNo"
      :page-size="pageSize"
      layout=" prev, pager, next,jumper, ->, total"
      :total="totalCount"
  >
    <!-- @size-change="handleSizeChange" -->
  </el-pagination>
</template>

<script>
export default {
  props: ["totalCount", "pageNo", "pageSize", "pageTotal"],
  methods: {
    async changePageNo(val) {
      this.$emit("changePageNo", val);
    },
  },
};
</script>
