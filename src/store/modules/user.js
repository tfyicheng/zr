import { login, logout, getInfo, refreshToken } from '@/api/login';
import { getToken, setToken, setExpiresIn, removeToken } from '@/utils/auth';
import { userDeptInfo } from '@/api/data/person';
import { listDept } from '@/api/system/dept';
import { handleNotice } from '@/api/data/statistic';
import { getCity } from '@/api/system/user';
const user = {
  state: {
    token: getToken(),
    name: '',
    id: '',
    deptName: '', //部门名字
    deptId: '', //部门id
    avatar: '',
    roles: [],
    permissions: [],
    cdeptName: '', //公司组织
    cdeptId: '', //公司组织
    notifyNum: 0, //通知消息
    provinceData: [], //区域省数据
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_EXPIRES_IN: (state, time) => {
      state.expires_in = time;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_DEPTNAME: (state, deptName) => {
      state.deptName = deptName;
    },
    SET_DEPTID: (state, deptId) => {
      state.deptId = deptId;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    SET_CDEPTNAME: (state, cdeptName) => {
      state.cdeptName = cdeptName;
    },
    SET_CDEPTID: (state, cdeptId) => {
      state.cdeptId = cdeptId;
    },

    SET_NOTIFYNUM: (state, notifyNum) => {
      state.notifyNum = notifyNum;
    },

    SET_ProvinceData: (state, provinceData) => {
      state.provinceData = provinceData;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then((res) => {
            let data = res.data;
            setToken(data.access_token);
            commit('SET_TOKEN', data.access_token);
            setExpiresIn(data.expires_in);
            commit('SET_EXPIRES_IN', data.expires_in);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user;
            const avatar =
              user.avatar == '' || user.avatar == null
                ? require('@/assets/images/default_header.png')
                : user.avatar;
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', res.roles);
              commit('SET_PERMISSIONS', res.permissions);
            } else {
              commit('SET_ROLES', ['ROLE_DEFAULT']);
            }
            commit('SET_NAME', user.userName);
            commit('SET_ID', user.userId);
            //  getUserDept(user.userId);
            userDeptInfo(user.userId).then((response) => {
              // return response.data;
              commit('SET_DEPTID', response.data.deptId);
              commit('SET_DEPTNAME', response.data.deptName);
            });
            listDept().then((response) => {
              if (response) {
                commit('SET_CDEPTID', response.data[0].deptId);
                commit('SET_CDEPTNAME', response.data[0].deptName);
              }
            });
            // handleNotice().then((res) => {
            //   if (res && res.code == 200) {
            //     commit('SET_NOTIFYNUM', res.total);
            //   }
            // });
            getCity().then((response) => {
              if (res && res.code == 200) {
                commit('SET_ProvinceData', response.data);
              }
            });
            commit('SET_AVATAR', avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户部门信息
    getUserDept(id) {
      if (id) {
      }
    },

    // 刷新token
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.token)
          .then((res) => {
            setExpiresIn(res.data);
            commit('SET_EXPIRES_IN', res.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            commit('SET_PERMISSIONS', []);
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    setNav({ commit, state }) {},

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
