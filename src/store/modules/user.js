import * as cookieUtil from '@/utils/cookieUtil';
import loginService from "@/services/login";

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: cookieUtil.get('token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    privileges: [],
    menuUrl: [],
    setting: {
      articlePlatform: [],
    },
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PRIVILEGES: (state, privileges) => {
      state.privileges = privileges;
    },
    SET_MENURL: (state, menuUrl) => {
      state.menuUrl = menuUrl;
    },
    SET_BUTTON_PRIVILEGES: (state, buttonPrivileges) => {
      state.buttonPrivileges = buttonPrivileges;
    },
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginService.getUserInfo("5ab0b091695b2c336a28e0b1").then((response) => {
          const data = response.result.data || response.data;
          const roleArr = ['admin'];
          const privilegesArr = [];
          const menuUrlArr = [];
          if (data.length == 0) {
            privilegesArr.push("5678fghjkl5678");
            menuUrlArr.push("/xq_admin/dashboard");
          }
          if (data && data.length > 0) {
            data.forEach((item) => {
              privilegesArr.push(item.menuId);
              menuUrlArr.push(item.menuUrl);
            });
          }
          commit('SET_ROLES', roleArr);
          commit('SET_PRIVILEGES', privilegesArr);
          commit('SET_MENURL', menuUrlArr);
          resolve(response.result.data || response.data);
        }).catch((error) => {
          alert("服务器繁忙请稍后再试");
          reject(error);
        });
      });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise((resolve) => {
    //     commit('SET_TOKEN', role);
    //     setToken(role);
    //     getUserInfo(role).then((response) => {
    //       const data = response.data;
    //       commit('SET_ROLES', data.roles);
    //       commit('SET_NAME', data.name);
    //       commit('SET_AVATAR', data.avatar);
    //       commit('SET_INTRODUCTION', data.introduction);
    //       resolve();
    //     });
    //   });
    // },
  },
};

export default user;
