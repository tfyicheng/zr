import Cookies from 'js-cookie';

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    hide: false,
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  route: '',
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    if (state.sidebar.hide) {
      return false;
    }
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    Cookies.set('size', size);
  },
  SET_SIDEBAR_HIDE: (state, status) => {
    state.sidebar.hide = status;
  },
  SET_NAV: (state, route) => {
    state.curNav = route;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size);
  },
  toggleSideBarHide({ commit }, status) {
    commit('SET_SIDEBAR_HIDE', status);
  },
  //路由菜单点击事件
  setNav({ commit }, route) {
    commit('SET_NAV', route);
    // console.log(route);
    let tag = '';
    switch (route) {
      case '/data/index':
        tag = '资料管理';
        break;
      case '/production/index':
        tag = '生产管理';
        break;
      case '/project/index':
        tag = '项目管理';
        break;
      case '/purchase/index':
        tag = '资产采购管理';
        break;
      case '/car/index':
        tag = '车辆管理';
        break;
      case '/person/index':
        tag = '人员管理';
        break;
      case '/data/contractmanagement/index':
        tag = '合同管理';
        break;
      default:
        break;
    }

    // const elementBySelectors = document.getElementsByClassName('el-submenu__title');
    // console.log(elementBySelectors);
    // for (let i = 0; i < elementBySelectors.length; i++) {
    //   if (elementBySelectors[i].childNodes[1].innerHTML == tag) {
    //     elementBySelectors[i].classList.add('flag');
    //   } else {
    //     elementBySelectors[i].classList.remove('flag');
    //   }
    // }

    setTimeout(() => {
      const elementBySelectors = document.getElementsByClassName('el-submenu__title');
      for (let i = 0; i < elementBySelectors.length; i++) {
        if (elementBySelectors[i].childNodes[1].innerHTML == tag) {
          if (tag == '合同管理') {
            elementBySelectors[i].classList.add('flag2');
          } else {
            elementBySelectors[i].classList.add('flag');
          }
        } else {
          elementBySelectors[i].classList.remove('flag');
          elementBySelectors[i].classList.remove('flag2');
        }
      }
    }, 200);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
