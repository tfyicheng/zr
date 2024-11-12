import auth from '@/plugins/auth';
import router, { constantRoutes, dynamicRoutes } from '@/router';
import { getRouters } from '@/api/menu';
import Layout from '@/layout/index';
import ParentView from '@/components/ParentView';
import InnerLink from '@/layout/components/InnerLink';

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
    allRoutes: [], //原封不动的路由接口数据
    indexPage: '', //修改默认首页
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes);
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      state.topbarRouters = routes;
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes;
    },
    SET_ALL_ROUTERS: (state, allRoutes) => {
      state.allRoutes = allRoutes;
    },

    SET_INDEX_PAGE: (state, indexPage) => {
      state.indexPage = indexPage;
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        getRouters().then((res) => {
          const sdata = JSON.parse(JSON.stringify(res.data));
          const rdata = JSON.parse(JSON.stringify(res.data));
          const adata = JSON.parse(JSON.stringify(res.data));

          //修改默认首页
          let indexdata = '';
          // if (res.data[0].path == '/') {
          //   //一级子菜单
          //   indexdata = res.data[0].path + res.data[0].children[0].path;
          // } else {
          //   if (res.data[0].children) {
          //     //三级子菜单
          //     indexdata =
          //       res.data[0].path +
          //       '/' +
          //       res.data[0].children[0].path +
          //       '/' +
          //       res.data[0].children[0].children[0].path;
          //   } else {
          //     //二级子菜单
          //     indexdata = res.data[0].path + '/' + res.data[0].children[0].path;
          //   }
          // }

          if (res.data && res.data.length == 0) {
            indexdata = '/noRouter';
          } else {
            if (res.data[0].path == '/') {
              indexdata = res.data[0].path + res.data[0].children[0].path;
            } else {
              indexdata = res.data[0].path + '/' + res.data[0].children[0].path;
            }
          }

          commit('SET_INDEX_PAGE', indexdata);
          console.log(res.data, indexdata);

          const sidebarRoutes = filterAsyncRouter(sdata);
          const rewriteRoutes = filterAsyncRouter(rdata, false, true);
          const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
          const allRoutes = filterAllRoutes(adata);
          rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true });
          router.addRoutes(asyncRoutes);
          commit('SET_ROUTES', rewriteRoutes);
          commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes));
          commit('SET_DEFAULT_ROUTES', sidebarRoutes);
          commit('SET_TOPBAR_ROUTES', sidebarRoutes);
          commit('SET_ALL_ROUTERS', allRoutes);
          resolve(rewriteRoutes);
        });
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout;
      } else if (route.component === 'ParentView') {
        route.component = ParentView;
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route['children'];
      delete route['redirect'];
    }
    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path;
    }
    children = children.concat(el);
  });
  return children;
}

//转换成所有路由集合
function filterAllRoutes(arr) {
  let newarr = [];
  try {
    arr.forEach((i1) => {
      if (i1.children && i1.children.length > 0) {
        i1.children.forEach((i2) => {
          if (i2.children && i2.children.length > 0) {
            i2.children.forEach((i3) => {
              if (i3.children && i3.children.length > 0) {
                i3.children.forEach((i4) => {
                  if (i4.children && i4.children.length > 0) {
                  } else {
                    newarr.push(i1.path + '/' + i2.path + '/' + i3.path + '/' + i4.path);
                  }
                });
              } else {
                newarr.push(i1.path + '/' + i2.path + '/' + i3.path);
              }
            });
          } else {
            newarr.push(i1.path + '/' + i2.path);
          }
        });
      }
    });
    return newarr;
  } catch (error) {
    return newarr;
  }
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = [];
  routes.forEach((route) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route);
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route);
      }
    }
  });
  return res;
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve);
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`);
  }
};

export default permission;
