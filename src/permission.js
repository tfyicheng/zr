import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { isRelogin } from '@/utils/request';
import { ChartView } from 'echarts';
import { saveRoute } from '@/api/system/operlog';

NProgress.configure({ showSpinner: false });

const whiteList = ['/test', '/login', '/register', '/forgetPwd'];

router.beforeEach((to, from, next) => {
  console.log('to:', to.path, store.state.permission.indexPage);
  if (getToken()) {
    // 三级菜单组件无法缓存问题
    if (to.matched && to.matched.length > 2) {
      to.matched.splice(1, to.matched.length - 2);
    }
    //to.meta.title && useSettingsStore().setTitle(to.meta.title)
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title);
    /* has token*/
    if (to.path === '/login') {
      //console.log('toLogin:', store.state.permission.indexPage);
      //工作台/路径不再是所有账号具备需要特别处理
      next({ path: store.state.permission.indexPage ? store.state.permission.indexPage : '/' });
      //修改默认首页  偶发死循环
      //location.href = store.state.permission.indexPage;
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        isRelogin.show = true;
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetInfo')
          .then(() => {
            //console.log('GetInfo:' + to.path);
            isRelogin.show = false;
            store.dispatch('GenerateRoutes').then((accessRoutes) => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(accessRoutes); // 动态添加可访问路由表
              console.log('GetInfo2:', to.path, store.state.permission.indexPage);
              //next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
              // 路径/特别处理
              if (to.path == '/' && store.state.permission.indexPage) {
                next({ path: store.state.permission.indexPage });
              } else {
                next({ ...to, replace: true });
              }
            });
          })
          .catch((err) => {
            store.dispatch('LogOut').then(() => {
              Message.error(err);
              next({ path: '/' });
            });
          });
      } else {
        console.log('toNext:' + to.path); // 路径/特别处理
        if (to.path == '/' && store.state.permission.indexPage) {
          next({ path: store.state.permission.indexPage });
        } else {
          next();
        }
      }
    }
  } else {
    console.log('noTake:' + to.path);
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      //  next(`/test`)
      next();
    } else {
      //  next({ path: '/test' })
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  //console.log(router);
  //路由菜单点击事件

  store.dispatch('app/setNav', router.currentRoute.fullPath);
  NProgress.done();

  //常用功能路由记录
  if (
    router.currentRoute.fullPath != '/' &&
    router.currentRoute.fullPath != '/index' &&
    router.currentRoute.fullPath.indexOf('/login') == -1 &&
    router.currentRoute.fullPath.indexOf('redirect') == -1
  ) {
    try {
      let rp = '';
      //路由去掉参数
      if (router.currentRoute.fullPath.split('?').length > 1) {
        rp = router.currentRoute.fullPath.split('?')[0];
      } else {
        rp = router.currentRoute.fullPath;
      }

      saveRoute({ component: rp });
    } catch (error) {
      saveRoute({ component: router.currentRoute.fullPath });
    }
  }
});
