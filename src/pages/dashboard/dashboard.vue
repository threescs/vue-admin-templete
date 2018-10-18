<template>
  <div class="dashboard-component">
    <h3 class="page-title">主办管理首页</h3>
    <h3 class="page-title margin-bottom10">是否新页面打开</h3>
    <el-form label-width="200px" label-position="left">
      <el-form-item v-for="(item, index) in routerList" :key="index" v-if="privilegesArr.indexOf(item.privileges) > -1" :label="item.title">
        <el-switch
          v-model="item.openStatus">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOpenWindowRule('save')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import commonUtil from "@/utils/commonUtil";
import * as adapterStorageUtil from "@/utils/adapterStorageUtil";

export default {
  data() {
    return {
      privilegesArr: this.$store.getters.privileges || [],
      routerList: commonUtil.menu,
    };
  },
  methods: {
    saveOpenWindowRule(type) {
      const routerConfig = {};
      this.routerList.forEach((item) => {
        routerConfig[item.name] = item.openStatus;
      });
      adapterStorageUtil.set("routerConfig", JSON.stringify(routerConfig));
      this.$store.commit("UPDATE_LOCAL_ROUTER", { routerConfig });
      if (type) {
        return this.$message.success("保存成功");
      }
    },
    getLocalConfig() {
      let localConfig = adapterStorageUtil.get("routerConfig") || {};
      if (Object.keys(localConfig).length > 0) {
        if (typeof localConfig === "string") {
          localConfig = JSON.parse(localConfig);
        }
        this.routerList.forEach((item, i) => {
          this.routerList[i].openStatus = localConfig[item.name];
        });
      }
      this.saveOpenWindowRule();
    },
  },
  mounted() {
    this.getLocalConfig();
  },
};
</script>

<style scoped lang="scss">
  .dashboard-component{
    .margin-bottom10{
      margin-bottom: 10px;
    }
    .el-form{
      padding-left: 30px;
    }
    .el-form-item{
      margin-bottom: 0;
      &:last-child{
        margin-top: 20px;
      }
    }
  }
</style>
