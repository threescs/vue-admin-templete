<template>
  <div v-show="total>10" class="pagination-container">
    <el-pagination
        background
         layout="total, sizes, prev, pager, next, jumper"
         :page-sizes="[10,20, 50, 100]"
         :page-size="pageSize"
         :current-page="current"
         @size-change="sizeChange"
         @current-change="change"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["current", "total", "pageSize"],
  methods: {
    change(pageIndex) {
      this.$emit("change", pageIndex);
    },
    sizeChange(size) {
      this.$emit("changeSize", size);
    },
  },
};
</script>

<style scoped>
  .pagination-container{
    text-align: right;
  }
</style>
