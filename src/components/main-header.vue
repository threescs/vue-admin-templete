<template>
<div class="app-header" element-loading-text="提交中" v-if="$route.name != 'print' && $route.name != 'enlarge'">
  <router-link class="logo" :to="{ name: 'dashboard' }">
      <img class="logo-img" src="@/assets/logo.png" alt="">
  </router-link>
</div>
</template>
<script>

</script>

<style scoped lang="scss">
.app-header {
    position: fixed;
    z-index: 101;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    // background-color: #2b3643;
    background: #ccc;
    .logo {
        position: absolute;
        left: 25px;
        top: 50%;
        display: block;
        height: 40px;
        margin-top: -20px;
    }
    .logo-img {
        display: block;
        height: 100%;
    }
}

</style>
