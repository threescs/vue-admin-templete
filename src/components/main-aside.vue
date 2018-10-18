<template>
<div class="left-nav">
  <router-link class="logo" :to="{ name: 'dashboard' }">
      <img class="logo-img" src="@/assets/logo.png" alt="">
  </router-link>
  <img class="ico-menu" src="@/assets/ico_menu.jpg" alt="" @click="toggleMenu">
  <el-menu :default-active="routeMatch" :router="true" text-color="#ffffff">
    <el-menu-item index="dashboard" :route="{ name: 'dashboard' }">
      <i class="iconfont icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item v-for="menu in menuList" :key="menu.name" :index="menu.name" :route="{ name: menu.name }" :v-if="privilegesArr.indexOf(menu.privileges)!=-1">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.title }}</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
import loginService from "@/services/login";
import commonUtil from "@/utils/commonUtil";

export default {
  name: 'navLeft',
  data() {
    return {
      routeMatch: "",
      privilegesArr: this.$store.getters.privileges || [],
      menuList: commonUtil.menu,
    };
  },
  components: {
  },
  methods: {
    navDefaultMatch(route) {
      const pathArray = route.path.split("/");
      this.routeMatch = pathArray[2] || "";
    },
    toggleMenu() {
      this.$emit("toggle", "toggle");
    },
  },
  watch: {
    $route(to, from) {
      this.navDefaultMatch(to);
    },
  },
  mounted() {
    this.navDefaultMatch(this.$route);
  },
};
</script>

<style scoped lang="scss">
.left-nav {
  position:relative;
  overflow: auto;
  background: #535C64;
  min-height:100px;
  overflow-x: hidden;
  .iconfont{
    font-size:22px;
    margin-right:5px;
  }
  .logo-img {
    display: block;
    width: 145px;
    margin:25px 10px;
  }
  .ico-menu{
    position:absolute;
    top:35px;
    right:10px;
    cursor: pointer;
  }
}

.el-menu {
    height: 100%;
    border-right: solid 1px #ECECEC;
    background:none;
    border-right:none;
    .is-active{
      background: #434A50;
    }
}
.el-menu-item{
  &:hover{
    background: #434A50;
  }
}

// .el-menu-item {
//     height: 48px;
//     line-height: 48px;
//     font-size: 13px;
//     border-top: 1px solid #364150;
//     [class^="el-icon-"] {
//         position: relative;
//         margin-right: 2px;
//         color: rgb(215, 218, 225);
//     }
//     &.is-active {
//         background-color: #364150;
//         [class^="el-icon-"] {
//             color: #e83c7b;
//         }
//         &:before {
//             position: absolute;
//             left: 0;
//             top: 0;
//             content: "";
//             display: block;
//             width: 5px;
//             height: 100%;
//             background-color: #e83c7b;
//         }
//     }
// }

// .el-submenu {
//     /*border-top: 1px solid #efefef;*/
//     [class^="el-icon-"] {
//         position: relative;
//         margin-right: 2px;
//         color: rgb(215, 218, 225);
//     }
//     /deep/ .el-submenu__title {
//         height: 48px;
//         line-height: 48px;
//         font-size: 13px;
//     }
//     /deep/ .el-submenu__icon-arrow {
//         right: 15px;
//     }
//     .el-menu-item {
//         height: 42px;
//         line-height: 42px;
//         min-width: 0;
//         padding: 0 15px 0 50px !important;
//     }
// }
// .qr_box {
//     position: fixed;
//     bottom: 80px;
//     right: 90px;
//     width: 150px;
//     min-height: 160px;
//     border: 1px solid #f2f2f2;
//     text-align: center;
//     padding-top: 7px;
//     font-size: 12px;
//     letter-spacing: 0.2em;
//     box-sizing: border-box;
//     background-color: #fff;
//     z-index: 500;
//     cursor: pointer;
//     border-radius: 6px;
//     img {
//         width: 100%;
//         height: 100%;
//     }
// }

// .qr-icon {
//     position: fixed;
//     bottom: 120px;
//     right: 0;
//     width: 50px;
//     height: 50px;
//     border: 1px solid #f2f2f2;
//     text-align: center;
//     padding-top: 7px;
//     font-size: 12px;
//     letter-spacing: 0.2em;
//     box-sizing: border-box;
//     background-color: #fff;
//     z-index: 500;
//     cursor: pointer;
//     color: #fff;
//     background: rgba(62, 70, 97, 0.4);
//     border-radius: 6px;
// }
</style>
