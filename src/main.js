// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import * as cookieUtil from '@/utils/cookieUtil';
import App from './App';
import router from './router';
import '../theme/index.css';
import './style/index.scss';
import './style/element-variables.scss';
import './assets/icon/iconfont.css';
import store from './store';
import filters from './services/filters-service';

for (const key in filters) {
  if (key) {
    Vue.filter(key, filters[key]);
  }
}

Vue.config.productionTip = false;
const whiteList = ['/login', '/authredirect'];
function hasPermission(roles, permissionRoles) {
  // if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
  // return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

router.beforeEach((to, from, next) => {
  const token = cookieUtil.get("token") || "";
  const domain = window.location.host;
  // 新管理后台 判断跳转原有管理后台域名地址
  if (domain.indexOf("localhost") > -1) {
    window.$adminHost = `${document.location.protocol}//admin.qa.ticketdashi.com`;
  }
  if (domain == "fhladmindev999.moretickets.com") {
    window.$adminHost = `${document.location.protocol}//admindev777.moretickets.com`;
  } else if (domain == "fhladminqa666.moretickets.com") {
    window.$adminHost = `${document.location.protocol}//adminqa666.moretickets.com`;
  } else if (domain == "fhl24k.juqitech.com") {
    window.$adminHost = `${document.location.protocol}//rjm12k.juqitech.com`;
  }
  if (token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else if (!store.getters.privileges || (store.getters.privileges && store.getters.privileges.length === 0)) { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetUserInfo').then((res) => { // 拉取info
        const privilegesArr = store.getters.privileges;
        const menuUrlArr = store.getters.menuUrl;
        const pathUrl = window.location.pathname;
        sessionStorage.setItem('urlArr', pathUrl);
        store.dispatch('GenerateRoutes', { privilegesArr }).then(() => { // 生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          // if (menuUrlArr && menuUrlArr.length > 0) {
          //   var pUrl = sessionStorage.getItem('urlArr');
          //   if (pUrl && pUrl != "/" && menuUrlArr.indexOf(pUrl) != -1) {
          //     next({ path: pUrl, replace: true });
          //   } else if (pUrl != "/" && menuUrlArr.indexOf(pUrl) == -1) {
          //     next({ path: "/organizer_admin/dashboard", replace: true });
          //   } else {
          //     next({ path: menuUrlArr[0], replace: true });
          //   }
          // } else {
          //   next();
          // }
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        });
      }).catch((err) => {
        console.log(err);
      });
    } else if (hasPermission(store.getters.privileges, to.meta.privileges)) {
      next();
    } else {
      next({ path: '/401', replace: true, query: { noGoBack: true },
      });
    }
  } else {
    if (domain == "fhladmindev999.moretickets.com") {
      window.location = "http://admindev777.moretickets.com";
    }
    if (domain == "fhladminqa666.moretickets.com") {
      window.location = "https://adminqa666.moretickets.com";
    }
    if (domain == "fhl24k.juqitech.com") {
      window.location = "http://rjm12k.juqitech.com";
    }
  }
});
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
