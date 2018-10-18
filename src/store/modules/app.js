import * as adapterStorageUtil from "@/utils/adapterStorageUtil";

const app = {
  state: {
    localRouter: adapterStorageUtil.get("routerConfig") || {},
  },
  mutations: {
    CHANGE_ROUTER(state, options) {
      let routerPath = "";
      const pathName = window.location.pathname;
      const newPathArr = pathName.split("/");
      routerPath = newPathArr[2]; // 从地址栏获取router中配置的path
      if (typeof state.localRouter === "string") {
        state.localRouter = JSON.parse(state.localRouter);
      }
      if (state.localRouter == null || state.localRouter[routerPath] == undefined || !!state.localRouter[routerPath]) {
        return window.open(`${options.path}`, "_blank");
      }
      return options.router.push({ path: `${options.path}` });
    },
    UPDATE_LOCAL_ROUTER(state, options) {
      state.localRouter = options.routerConfig;
    },
  },
};

export default app;
