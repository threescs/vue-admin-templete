import Vue from 'vue';
import Router from 'vue-router';

const Main = () => import(/* webpackChunkName: "main" */'@/pages/main');
const Dashboard = () => import(/* webpackChunkName: "dashboard" */'@/pages/dashboard/dashboard');

Vue.use(Router);
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/organizer_admin/dashboard',
  },
];
// 实例化vue的时候只挂载constantRouter
export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: constantRouterMap,
});

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/organizer_admin',
    component: Main,
    children: [{
      name: 'dashboard',
      path: 'dashboard',
      component: Dashboard,
    },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
];
