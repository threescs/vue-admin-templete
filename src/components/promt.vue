<template>
  <el-dialog
      :title="title"
      width="400px"
      center :visible.sync="display">
      <slot></slot>
      <span slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="confirm" type="primary">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  name: "promt",
  props: ["title", "visible"],
  data() {
    return {
      display: this.visible,
    };
  },
  watch: {
    visible(newValue, oldValue) { // 处理父组件传值
      this.display = newValue;
    },
    display(newValue, oldValue) { // el-dialog修改值
      this.$emit('update:visible', newValue);
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.display = false;
      this.$emit("cancel");
    },
  },
};
</script>
