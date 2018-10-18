<template>
  <!-- <el-container>
    <el-header>
      <main-header></main-header>
    </el-header>
    <el-container>
      <el-aside width="160px">
        <main-aside></main-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container> -->
  <el-container>
    <el-aside class="menu">
      <main-aside @toggle="toggleMenu"></main-aside>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import MainHeader from '@/components/main-header';
import MainAside from '@/components/main-aside';

export default {
  name: 'app',
  components: {
    MainHeader,
    MainAside,
  },
  mounted() {
    console.log('项目启动...');
  },
  methods: {
    toggleMenu() {
      document.querySelector(".el-aside").classList.toggle("menu-hide");
    },
  },
};
</script>

<style lang="scss">
.el-container{
  width: 100%;
  height: 100%;
}
.menu{
  width:200px!important;
}
.menu-hide{
  width:50px!important;
  .logo{
    visibility: hidden;
  }
  .el-menu-item{
    padding-left:15px!important;
    i{
      margin-right:10px!important;
    }
  }
}

.el-aside{
  background: #535C64;
}
.el-main{
  padding:40px;
  .page-title{
    font-size:20px;
    line-height: 28px;
    margin-bottom:30px;
    color:#606266;
  }
}
.el-pagination{
  margin:30px auto 10px;
  text-align:right;
}
</style>
